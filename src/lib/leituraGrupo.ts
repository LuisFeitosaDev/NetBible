"use client";

/**
 * Leitura em dupla ou em grupo: reaproveita `grupos`/`membros` (a mesma base
 * de Grupos de estudo), só que com `tipo: "leitura"`. Uma dupla é um grupo de
 * dois; um grupo maior é o mesmo grupo com mais gente — não são dois sistemas.
 *
 * O que o grupo COMPARTILHA é a visibilidade da LEITURA (a tabela
 * `reading`/`leitura`, a fonte única de progresso em todo o app) — isso é
 * automático, via RLS, e não depende de ninguém ter o mesmo plano. Mas quem
 * entra com um código normalmente quer o oposto de "cada um por si": quer ler
 * junto, o mesmo trecho no mesmo dia. Por isso `entrarNoGrupoComPlano` copia a
 * configuração do plano de quem já está lendo (mesma ordem, mesmo prazo, MESMO
 * início) para o recém-chegado — o resto (quanto cada um já leu) continua
 * sendo de cada um, porque vem de `leitura`, não do plano em si.
 */
import { sb } from "./grupos/supabase";
import {
  garantirSessao,
  entrarNoGrupo as entrarNoGrupoApi,
  membrosDoGrupo,
} from "./grupos/api";
import type { Grupo, Membro } from "./grupos/tipos";
import {
  montarPlano,
  planoDeLinhaRemota,
  progressoDoPlano,
  roteiroDoPlano,
  type PlanoSalvo,
} from "./planos";
import { apagarPlano, db, salvarPlano } from "./db";
import { sincronizar } from "./sync";
import type { BibleIndex } from "./bible";

export { criarGrupo, sairDoGrupo, excluirGrupo, garantirSessao } from "./grupos/api";

/**
 * `entrarNoGrupo` puro (de `grupos/api.ts`) atende por padrão a Grupos de
 * estudo — não é reexportado daqui sem tipo de propósito, porque quem chama a
 * partir da Jornada precisa SEMPRE de `'leitura'`: um código de dupla/grupo de
 * leitura digitado sem essa marca já foi aceito por engano na tela errada.
 */
export function entrarNoGrupoDeLeitura(codigo: string): Promise<Grupo> {
  return entrarNoGrupoApi(codigo, "leitura");
}

/**
 * O grupo de leitura em que estou agora — o mais recente, se por acaso houver
 * mais de um. `null` quando leio sozinho, que continua sendo o padrão.
 *
 * De propósito, NÃO chama `garantirSessao()`: essa função cria uma sessão
 * anônima se não houver nenhuma, e isto aqui é chamado toda vez que a tela do
 * plano abre. Quem nunca tocou em dupla/grupo não pode ganhar uma conta no
 * Supabase só por ter aberto a própria Jornada — por isso o `peek` abaixo, que
 * só olha se já existe sessão, sem criar uma.
 */
export type MeuGrupoDeLeitura = {
  grupo: Grupo;
  /** true quando fui eu quem criou o grupo — só o líder pode apagá-lo para todos. */
  souLider: boolean;
};

export async function meuGrupoDeLeitura(): Promise<MeuGrupoDeLeitura | null> {
  const { data: sessao } = await sb().auth.getSession();
  const meuId = sessao.session?.user?.id;
  if (!meuId) return null;

  const { data, error } = await sb()
    .from("membros")
    .select("entrou_em, papel, grupos(*)")
    .eq("perfil_id", meuId)
    .order("entrou_em", { ascending: false });
  if (error) throw error;

  const linha = (data ?? [])
    .map((m) => ({ grupo: m.grupos as unknown as Grupo, papel: m.papel as string }))
    .find((l) => l.grupo?.tipo === "leitura");
  return linha ? { grupo: linha.grupo, souLider: linha.papel === "lider" } : null;
}

export type ResultadoDeEntrada = {
  grupo: Grupo;
  /** true quando havia alguém já lendo e o plano dessa pessoa foi copiado. */
  adotouPlano: boolean;
};

/**
 * Entra num grupo pelo código e adota o plano de quem já está lendo — mesma
 * ordem, mesmo prazo, mesmo início, para o dia 15 significar a mesma leitura
 * para todo mundo. Prioriza o líder (quem criou o grupo, mais provável de já
 * ter combinado um plano); sem plano nele, tenta os outros membros na ordem
 * em que entraram.
 *
 * Se ninguém do grupo tiver plano ainda, só entra no grupo mesmo — a próxima
 * pessoa a criar um plano vira, na prática, quem o grupo segue.
 */
export async function entrarNoGrupoComPlano(
  codigo: string,
  index: BibleIndex,
  lido: (slug: string, capitulo: number) => boolean,
): Promise<ResultadoDeEntrada> {
  const grupo = await entrarNoGrupoDeLeitura(codigo);
  const meuId = await garantirSessao();

  const adotou = await adotarPlanoDoGrupoSeNecessario(grupo.id, index, lido, meuId);
  return { grupo, adotouPlano: adotou };
}

/**
  Tenta adotar o plano do grupo se o usuário estiver em um grupo de leitura mas não tiver plano local.
 */
export async function adotarPlanoDoGrupoSeNecessario(
  grupoId: string,
  index: BibleIndex,
  lido: (slug: string, capitulo: number) => boolean,
  meuIdParam?: string,
): Promise<boolean> {
  const localExistente = await db.planos.get("atual");
  if (localExistente) return false;

  const meuId = meuIdParam ?? (await garantirSessao());
  const membros = (await membrosDoGrupo(grupoId)) as Membro[];
  const ids = membros.map((m) => m.perfil_id);
  if (!ids.length) return false;

  let planosData: any[] | null = null;
  try {
    const { data: rpcData } = await sb().rpc("planos_do_grupo", { p_grupo_id: grupoId });
    if (rpcData && rpcData.length > 0) planosData = rpcData;
  } catch {
    /* fallback se a RPC ainda não foi executada no Supabase */
  }

  if (!planosData || !planosData.length) {
    const { data: directData } = await sb().from("planos").select("*").in("perfil_id", ids);
    planosData = directData ?? [];
  }

  const planoPorPerfil = new Map(planosData.map((p) => [p.perfil_id, p]));
  const ordemDeBusca = [
    ...membros.filter((m) => m.papel === "lider" && m.perfil_id !== meuId),
    ...membros.filter((m) => m.perfil_id !== meuId),
  ];

  for (const m of ordemDeBusca) {
    const data = planoPorPerfil.get(m.perfil_id);
    if (!data) continue;

    const remoto = planoDeLinhaRemota(data);
    const roteiro = roteiroDoPlano(remoto, index);
    const slugs = new Set(roteiro.map((c) => c.slug));
    for (const slug of slugs) {
      const atual = await db.reading.get(slug);
      if (atual && atual.done.length > 0) {
        await db.reading.put({
          ...atual,
          done: [],
          lastChapter: 1,
          updatedAt: Date.now(),
          atualizadoEm: Date.now(),
        });
      }
    }

    await salvarPlano(
      montarPlano(
        { nome: remoto.nome, ordem: remoto.ordem, dias: remoto.dias, livros: remoto.livros },
        0,
        remoto.inicioEm,
      ),
    );
    await sincronizar();
    return true;
  }

  return false;
}

export type ProgressoDoMembro = {
  perfilId: string;
  nome: string;
  souEu: boolean;
  capitulosLidos: number;
  plano: {
    nome: string;
    diaVisivel: number;
    dias: number;
    lidos: number;
    total: number;
    percentual: number;
    concluido: boolean;
    metaHoje: {
      total: number;
      feitos: number;
      concluida: boolean;
    };
  } | null;
};

/**
 * O progresso de todo mundo no grupo, você incluído, você sempre primeiro.
 *
 * Duas consultas cobrem todo mundo de uma vez (`in perfil_id`) em vez de uma
 * por pessoa — o RLS de `schema-leitura-grupo.sql` já libera ler `leitura` e
 * `planos` de quem está no mesmo grupo, então isto funciona sem nenhuma
 * permissão especial além de "eu sou membro".
 */
export async function progressoDoGrupo(
  grupo: Grupo,
  index: BibleIndex,
): Promise<ProgressoDoMembro[]> {
  /*
   * Espera a própria subida terminar antes de ler. Sem isto, quem acabou de
   * criar ou mudar o plano e abre o card na sequência via o debounce de
   * 2500ms ainda não ter disparado, e a própria linha aparece como "sem
   * plano" para si mesmo, quanto mais para o resto do grupo.
   */
  await sincronizar();

  const meuId = await garantirSessao();
  const membros = (await membrosDoGrupo(grupo.id)) as Membro[];
  const ids = membros.map((m) => m.perfil_id);
  if (!ids.length) return [];

  let planosData: any[] | null = null;
  try {
    const { data: rpcData } = await sb().rpc("planos_do_grupo", { p_grupo_id: grupo.id });
    if (rpcData && rpcData.length > 0) planosData = rpcData;
  } catch {
    /* fallback se a RPC ainda não foi executada no Supabase */
  }

  const [{ data: leituras }, directPlanosRes] = await Promise.all([
    sb().from("leitura").select("perfil_id, slug, concluidos").in("perfil_id", ids),
    planosData ? Promise.resolve({ data: planosData }) : sb().from("planos").select("*").in("perfil_id", ids),
  ]);

  const planosRemotos = directPlanosRes.data ?? [];

  const leituraPorPerfil = new Map<string, { slug: string; concluidos: number[] }[]>();
  for (const l of leituras ?? []) {
    const lista = leituraPorPerfil.get(l.perfil_id) ?? [];
    lista.push(l);
    leituraPorPerfil.set(l.perfil_id, lista);
  }
  const planoPorPerfil = new Map(planosRemotos.map((p) => [p.perfil_id, p]));

  const progresso = membros.map((m): ProgressoDoMembro => {
    const linhas = leituraPorPerfil.get(m.perfil_id) ?? [];
    const capitulosLidos = linhas.reduce((s, r) => s + (r.concluidos?.length ?? 0), 0);
    const planoRemoto = planoPorPerfil.get(m.perfil_id);

    let plano: ProgressoDoMembro["plano"] = null;
    if (planoRemoto) {
      const p = planoDeLinhaRemota(planoRemoto);
      const lidoPorLivro = new Map(linhas.map((r) => [r.slug, new Set(r.concluidos ?? [])]));
      const roteiro = roteiroDoPlano(p, index);
      const prog = progressoDoPlano(p, roteiro, (slug, cap) => lidoPorLivro.get(slug)?.has(cap) ?? false);
      const metaTotal = prog.hoje.length;
      const metaFeitos = prog.hojeFeitos;
      const metaConcluida = metaTotal > 0 && metaFeitos >= metaTotal;

      plano = {
        nome: p.nome,
        diaVisivel: prog.diaVisivel,
        dias: prog.dias,
        lidos: prog.lidos,
        total: prog.total,
        percentual: prog.total > 0 ? Math.round((prog.lidos / prog.total) * 100) : 0,
        concluido: prog.concluido,
        metaHoje: {
          total: metaTotal,
          feitos: metaFeitos,
          concluida: metaConcluida,
        },
      };
    }

    return {
      perfilId: m.perfil_id,
      nome: m.profiles?.nome ?? "Alguém",
      souEu: m.perfil_id === meuId,
      capitulosLidos,
      plano,
    };
  });

  return progresso.sort((a, b) => (a.souEu === b.souEu ? 0 : a.souEu ? -1 : 1));
}

/**
 * Limpa o plano local ao sair ou apagar um grupo de leitura.
 *
 * Sem isto, apagar o grupo no Supabase não apaga o plano local (IndexedDB)
 * porque `planos` referencia `profiles`, não `grupos`. O plano órfão
 * reaparece na próxima sincronização, e o usuário o vê duplicado — uma vez
 * como líder (que já foi embora) e outra como participante de um grupo que
 * não existe mais.
 */
export async function apagarPlanoDoGrupo() {
  await apagarPlano();
  await sincronizar();
}
