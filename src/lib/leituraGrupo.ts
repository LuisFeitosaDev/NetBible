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
import { garantirSessao, entrarNoGrupo, membrosDoGrupo } from "./grupos/api";
import type { Grupo, Membro } from "./grupos/tipos";
import {
  montarPlano,
  planoDeLinhaRemota,
  progressoDoPlano,
  roteiroDoPlano,
  type PlanoSalvo,
} from "./planos";
import { salvarPlano } from "./db";
import type { BibleIndex } from "./bible";

export { criarGrupo, entrarNoGrupo, sairDoGrupo, garantirSessao } from "./grupos/api";

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
export async function meuGrupoDeLeitura(): Promise<Grupo | null> {
  const { data: sessao } = await sb().auth.getSession();
  const meuId = sessao.session?.user?.id;
  if (!meuId) return null;

  const { data, error } = await sb()
    .from("membros")
    .select("entrou_em, grupos(*)")
    .eq("perfil_id", meuId)
    .order("entrou_em", { ascending: false });
  if (error) throw error;

  const grupo = (data ?? [])
    .map((m) => m.grupos as unknown as Grupo)
    .find((g) => g?.tipo === "leitura");
  return grupo ?? null;
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
  const grupo = await entrarNoGrupo(codigo);
  const meuId = await garantirSessao();

  const membros = (await membrosDoGrupo(grupo.id)) as Membro[];
  const ordemDeBusca = [
    ...membros.filter((m) => m.papel === "lider" && m.perfil_id !== meuId),
    ...membros.filter((m) => m.papel !== "lider" && m.perfil_id !== meuId),
  ];

  for (const m of ordemDeBusca) {
    const { data } = await sb()
      .from("planos")
      .select("*")
      .eq("perfil_id", m.perfil_id)
      .maybeSingle();
    if (!data) continue;

    const remoto = planoDeLinhaRemota(data);
    const roteiro = roteiroDoPlano(remoto, index);
    let jaLidos = 0;
    for (const c of roteiro) if (lido(c.slug, c.capitulo)) jaLidos++;

    await salvarPlano(
      montarPlano(
        { nome: remoto.nome, ordem: remoto.ordem, dias: remoto.dias, livros: remoto.livros },
        jaLidos,
        remoto.inicioEm, // mesmo início de quem já está lendo: o mesmo dia do plano para os dois
      ),
    );
    return { grupo, adotouPlano: true };
  }

  return { grupo, adotouPlano: false };
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
  const meuId = await garantirSessao();
  const membros = (await membrosDoGrupo(grupo.id)) as Membro[];
  const ids = membros.map((m) => m.perfil_id);
  if (!ids.length) return [];

  const [{ data: leituras }, { data: planosRemotos }] = await Promise.all([
    sb().from("leitura").select("perfil_id, slug, concluidos").in("perfil_id", ids),
    sb().from("planos").select("*").in("perfil_id", ids),
  ]);

  const leituraPorPerfil = new Map<string, { slug: string; concluidos: number[] }[]>();
  for (const l of leituras ?? []) {
    const lista = leituraPorPerfil.get(l.perfil_id) ?? [];
    lista.push(l);
    leituraPorPerfil.set(l.perfil_id, lista);
  }
  const planoPorPerfil = new Map((planosRemotos ?? []).map((p) => [p.perfil_id, p]));

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
      plano = {
        nome: p.nome,
        diaVisivel: prog.diaVisivel,
        dias: prog.dias,
        lidos: prog.lidos,
        total: prog.total,
        percentual: Math.round((prog.lidos / prog.total) * 100),
        concluido: prog.concluido,
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
