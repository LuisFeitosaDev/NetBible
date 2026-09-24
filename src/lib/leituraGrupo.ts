"use client";

/**
 * Leitura em dupla ou em grupo: reaproveita `grupos`/`membros` (a mesma base
 * de Grupos de estudo), só que com `tipo: "leitura"`. Uma dupla é um grupo de
 * dois; um grupo maior é o mesmo grupo com mais gente — não são dois sistemas.
 *
 * O vínculo com "qual plano" não existe de propósito: o que o grupo
 * compartilha é a LEITURA (a tabela `reading`/`leitura`, que já é a fonte
 * única de progresso em todo o app), não uma cópia do plano de ninguém. Duas
 * pessoas no mesmo grupo podem até estar em planos diferentes e ainda assim
 * acompanhar quantos capítulos cada uma já leu.
 */
import { sb } from "./grupos/supabase";
import { garantirSessao, membrosDoGrupo } from "./grupos/api";
import type { Grupo, Membro } from "./grupos/tipos";
import {
  progressoDoPlano,
  roteiroDoPlano,
  type OrdemDoPlano,
  type PlanoSalvo,
} from "./planos";
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
      const p: PlanoSalvo = {
        id: "atual",
        modelo: planoRemoto.modelo,
        nome: planoRemoto.nome,
        ordem: planoRemoto.ordem as OrdemDoPlano,
        dias: planoRemoto.dias,
        inicioEm: new Date(planoRemoto.inicio_em).getTime(),
        lidosAoComecar: planoRemoto.lidos_ao_comecar ?? 0,
        livros: planoRemoto.livros ?? undefined,
        criadoEm: new Date(planoRemoto.criado_em).getTime(),
        atualizadoEm: new Date(planoRemoto.atualizado_em).getTime(),
      };
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
