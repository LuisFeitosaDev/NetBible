"use client";

import { sb } from "./supabase";
import {
  ehDinamico,
  montarEtapas,
  montarPorAssunto,
  metodoPorId,
  type EtapaMontada,
  type MetodoId,
  type Nivel,
  type Publico,
} from "./metodos";
import { gerarComIA } from "./ia";
import type { Assunto } from "./conteudo/tipos";
import type { BookMeta } from "@/lib/bible";
import type {
  Equipe,
  Estudo,
  Etapa,
  Formato,
  Grupo,
  Membro,
  Perfil,
  Pergunta,
  PreviaGrupo,
  Reacao,
  Referencia,
  Reflexao,
  Resposta,
  Resumo,
  TipoDeGrupo,
} from "./tipos";

const NOME_LOCAL = "lumen.nome";

function erro(e: unknown): never {
  const msg = e instanceof Error ? e.message : String(e);

  /*
   * Coluna faltando quase sempre significa migração não aplicada. O erro cru do
   * Postgres ("column estudos.assunto does not exist") não diz o que fazer, e
   * quem está criando um estudo não tem como adivinhar.
   */
  const coluna = msg.match(/column ([\w.]+) does not exist/i);
  if (coluna) {
    throw new Error(
      `Falta aplicar uma migração no banco (coluna ${coluna[1]}). ` +
        "Rode supabase/schema-metodos.sql no SQL Editor do Supabase.",
    );
  }

  throw new Error(msg);
}

// --------------------------------------------------------------- sessão --

/**
 * Login anônimo: o participante entra num grupo só com o código, sem cadastro.
 * Mesmo assim existe um JWT de verdade, que é o que sustenta as policies de RLS.
 */
export async function garantirSessao(): Promise<string> {
  const c = sb();
  const { data } = await c.auth.getSession();
  if (data.session?.user) return data.session.user.id;

  const { data: novo, error } = await c.auth.signInAnonymously();
  if (error) erro(error);
  return novo.user!.id;
}

export function nomeSalvo() {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(NOME_LOCAL) ?? "";
  } catch {
    return "";
  }
}

export async function salvarPerfil(nome: string): Promise<Perfil> {
  await garantirSessao();
  const { data, error } = await sb().rpc("salvar_perfil", { p_nome: nome });
  if (error) erro(error);
  try {
    localStorage.setItem(NOME_LOCAL, nome);
  } catch {
    /* modo privado */
  }
  return data as Perfil;
}

export async function meuPerfil(): Promise<Perfil | null> {
  const id = await garantirSessao();
  const { data } = await sb().from("profiles").select("*").eq("id", id).maybeSingle();
  return (data as Perfil) ?? null;
}

// ---------------------------------------------------------------- grupos --

export async function meusGrupos(): Promise<(Grupo & { papel: string; membros: number })[]> {
  await garantirSessao();
  const { data, error } = await sb()
    .from("membros")
    .select("papel, grupos (*)")
    .order("entrou_em", { ascending: false });
  if (error) erro(error);

  const linhas = (data ?? []) as unknown as { papel: string; grupos: Grupo }[];
  const ids = linhas.map((l) => l.grupos.id);
  if (!ids.length) return [];

  const { data: contagem } = await sb().from("membros").select("grupo_id").in("grupo_id", ids);
  const porGrupo = new Map<string, number>();
  (contagem ?? []).forEach((m: { grupo_id: string }) => {
    porGrupo.set(m.grupo_id, (porGrupo.get(m.grupo_id) ?? 0) + 1);
  });

  return linhas.map((l) => ({
    ...l.grupos,
    papel: l.papel,
    membros: porGrupo.get(l.grupos.id) ?? 1,
  }));
}

export async function criarGrupo(
  nome: string,
  descricao?: string,
  tipo: TipoDeGrupo = "estudo",
): Promise<Grupo> {
  await garantirSessao();
  const { data, error } = await sb().rpc("criar_grupo", {
    p_nome: nome,
    p_descricao: descricao ?? null,
    p_tipo: tipo,
  });
  if (error) erro(error);
  return data as Grupo;
}

/**
 * `tipo` não é cosmético: sem ele, um código de leitura em dupla digitado
 * aqui devolvia uma prévia (parcial, sem estudo) de um grupo que não é um
 * grupo de estudo, e vice-versa — os dois usam o mesmo espaço de códigos.
 * O padrão 'estudo' é só para quem já chamava esta função sem pensar nisso
 * continuar funcionando.
 */
export async function previaGrupo(
  codigo: string,
  tipo: TipoDeGrupo = "estudo",
): Promise<PreviaGrupo | null> {
  await garantirSessao();
  const { data, error } = await sb().rpc("previa_grupo", { p_codigo: codigo, p_tipo: tipo });
  if (error) erro(error);
  const linhas = (data ?? []) as PreviaGrupo[];
  return linhas[0] ?? null;
}

export async function entrarNoGrupo(codigo: string, tipo: TipoDeGrupo = "estudo"): Promise<Grupo> {
  await garantirSessao();
  const { data, error } = await sb().rpc("entrar_no_grupo", {
    p_codigo: codigo,
    p_tipo: tipo,
  });
  if (error) {
    if (String(error.message).includes("codigo_invalido")) {
      throw new Error("Código não encontrado. Confira com quem te passou.");
    }
    if (String(error.message).includes("tipo_incorreto")) {
      throw new Error(
        tipo === "leitura"
          ? "Esse código é de um grupo de estudo, não de um plano de leitura."
          : "Esse código é de um plano de leitura em dupla/grupo, não de um grupo de estudo.",
      );
    }
    erro(error);
  }
  return data as Grupo;
}

export async function grupoPorCodigo(codigo: string): Promise<Grupo | null> {
  await garantirSessao();
  const { data } = await sb()
    .from("grupos")
    .select("*")
    .eq("codigo", codigo.toUpperCase())
    .maybeSingle();
  return (data as Grupo) ?? null;
}

export async function membrosDoGrupo(grupoId: string): Promise<Membro[]> {
  const { data, error } = await sb()
    .from("membros")
    .select("*, profiles (*)")
    .eq("grupo_id", grupoId)
    .order("entrou_em");
  if (error) erro(error);
  return (data ?? []) as Membro[];
}

export async function sairDoGrupo(grupoId: string, perfilId: string) {
  const { error } = await sb()
    .from("membros")
    .delete()
    .eq("grupo_id", grupoId)
    .eq("perfil_id", perfilId);
  if (error) erro(error);
}

/**
 * Apaga o grupo inteiro. Só o líder consegue: a política `grupos_exclusao` no
 * banco exige `eh_lider(id)`, então não adianta o cliente tentar.
 *
 * Membros, estudos, etapas, perguntas e respostas caem junto pelo `on delete
 * cascade` do schema, e é por isso que não há limpeza manual aqui.
 */
export async function excluirGrupo(grupoId: string) {
  const { error, count } = await sb()
    .from("grupos")
    .delete({ count: "exact" })
    .eq("id", grupoId);
  if (error) erro(error);
  // O RLS não devolve erro quando a linha só está invisível para quem pede:
  // devolve zero linhas afetadas. Sem esta checagem, um participante veria
  // "apagado" e o grupo continuaria lá.
  if (!count) {
    throw new Error("Só o líder do grupo pode apagá-lo.");
  }
}

// --------------------------------------------------------------- estudos --

export async function estudosDoGrupo(grupoId: string): Promise<Estudo[]> {
  const { data, error } = await sb()
    .from("estudos")
    .select("*")
    .eq("grupo_id", grupoId)
    .order("criado_em", { ascending: false });
  if (error) erro(error);
  return (data ?? []) as Estudo[];
}

export type NovoEstudo = {
  grupoId: string;
  metodo: string;
  titulo: string;
  referencia: Referencia | null;
  tema: string | null;
  /** Assunto dos métodos dinâmicos (tema, personagem, doutrina, questão...). */
  assunto?: Assunto | null;
  /** Necessário no estudo de livro, para calcular o plano de encontros. */
  livro?: BookMeta | null;
  publico: Publico;
  nivel: Nivel;
  duracaoMin: number;
  formato: Formato;
  /** Nomes das equipes, quando o formato não é individual. */
  equipes: string[];
};

const COR_EQUIPE = ["#f5c45e", "#7dd3fc", "#a3e635", "#f472b6", "#a78bfa", "#2dd4bf"];

/**
 * Cria o estudo inteiro: etapas do método, perguntas já adaptadas a tempo,
 * público e nível, e as equipes com as perguntas distribuídas entre elas.
 */
export async function criarEstudo(entrada: NovoEstudo): Promise<Estudo> {
  const perfilId = await garantirSessao();
  const c = sb();

  const template = metodoPorId(entrada.metodo);
  if (!template?.disponivel) throw new Error("Método indisponível.");

  /*
   * Modo híbrido. Método fixo usa o template; método dinâmico tenta a
   * curadoria e, se não houver conteúdo revisado para o que o líder pediu,
   * pede à IA. `origem` registra qual caminho foi usado, para a interface
   * poder avisar quando o material não passou por revisão humana.
   */
  let montadas: EtapaMontada[];
  let origem: Estudo["origem"] = "curado";

  if (ehDinamico(entrada.metodo) && entrada.assunto) {
    const curado = montarPorAssunto(
      entrada.metodo as MetodoId,
      entrada.assunto,
      entrada.livro ?? undefined,
    );
    if (curado) {
      montadas = curado;
    } else {
      montadas = await gerarComIA({
        metodo: entrada.metodo,
        assunto: entrada.assunto,
        publico: entrada.publico,
        nivel: entrada.nivel,
        duracaoMin: entrada.duracaoMin,
      });
      origem = "ia";
    }
  } else {
    montadas = montarEtapas(template, {
      publico: entrada.publico,
      nivel: entrada.nivel,
      duracaoMin: entrada.duracaoMin,
    });
  }

  const { data: estudoBruto, error: e1 } = await c
    .from("estudos")
    .insert({
      grupo_id: entrada.grupoId,
      metodo: entrada.metodo,
      titulo: entrada.titulo,
      referencia: entrada.referencia,
      tema: entrada.tema,
      assunto: entrada.assunto ?? null,
      origem,
      publico: entrada.publico,
      nivel: entrada.nivel,
      duracao_min: entrada.duracaoMin,
      formato: entrada.formato,
      criado_por: perfilId,
      status: "rascunho",
    })
    .select()
    .single();
  if (e1) erro(e1);
  const estudo = estudoBruto as Estudo;

  const { data: etapasBrutas, error: e2 } = await c
    .from("etapas")
    .insert(
      montadas.map((etapa, i) => ({
        estudo_id: estudo.id,
        ordem: i,
        chave: etapa.chave,
        titulo: etapa.titulo,
        icone: etapa.icone,
        descricao: etapa.descricao,
        material: etapa.material ?? null,
        // A primeira etapa já nasce liberada: o estudo começa pela leitura.
        liberada: i === 0,
        liberada_em: i === 0 ? new Date().toISOString() : null,
      })),
    )
    .select();
  if (e2) erro(e2);
  const etapas = (etapasBrutas as Etapa[]).sort((a, b) => a.ordem - b.ordem);

  let equipes: Equipe[] = [];
  if (entrada.formato !== "individual" && entrada.equipes.length) {
    const { data, error } = await c
      .from("equipes")
      .insert(
        entrada.equipes.map((nome, i) => ({
          estudo_id: estudo.id,
          nome,
          cor: COR_EQUIPE[i % COR_EQUIPE.length],
        })),
      )
      .select();
    if (error) erro(error);
    equipes = data as Equipe[];
  }

  // Numa etapa com várias perguntas, cada equipe leva uma. Depois todas as
  // respostas ficam visíveis, que é o ponto da discussão coletiva.
  const perguntas = montadas.flatMap((etapa, i) =>
    etapa.perguntas.map((p, j) => ({
      estudo_id: estudo.id,
      etapa_id: etapas[i].id,
      ordem: j,
      texto: p.texto,
      ajuda: p.ajuda ?? null,
      equipe_id:
        equipes.length > 1 && etapa.perguntas.length > 1
          ? equipes[j % equipes.length].id
          : null,
    })),
  );

  if (perguntas.length) {
    const { error } = await c.from("perguntas").insert(perguntas);
    if (error) erro(error);
  }

  return estudo;
}

export type EstudoCompleto = {
  estudo: Estudo;
  etapas: Etapa[];
  perguntas: Pergunta[];
  equipes: Equipe[];
  minhaEquipe: string | null;
};

export async function carregarEstudo(estudoId: string): Promise<EstudoCompleto> {
  const perfilId = await garantirSessao();
  const c = sb();

  const [{ data: estudo }, { data: etapas }, { data: perguntas }, { data: equipes }] =
    await Promise.all([
      c.from("estudos").select("*").eq("id", estudoId).single(),
      c.from("etapas").select("*").eq("estudo_id", estudoId).order("ordem"),
      c.from("perguntas").select("*").eq("estudo_id", estudoId).order("ordem"),
      c.from("equipes").select("*").eq("estudo_id", estudoId),
    ]);

  if (!estudo) throw new Error("Estudo não encontrado.");

  const idsEquipe = (equipes ?? []).map((e: Equipe) => e.id);
  let minhaEquipe: string | null = null;
  if (idsEquipe.length) {
    const { data } = await c
      .from("equipe_membros")
      .select("equipe_id")
      .eq("perfil_id", perfilId)
      .in("equipe_id", idsEquipe)
      .maybeSingle();
    minhaEquipe = (data as { equipe_id: string } | null)?.equipe_id ?? null;
  }

  return {
    estudo: estudo as Estudo,
    etapas: (etapas ?? []) as Etapa[],
    perguntas: (perguntas ?? []) as Pergunta[],
    equipes: (equipes ?? []) as Equipe[],
    minhaEquipe,
  };
}

export async function respostasDoEstudo(estudoId: string): Promise<Resposta[]> {
  const { data: perguntas } = await sb()
    .from("perguntas")
    .select("id")
    .eq("estudo_id", estudoId);
  const ids = (perguntas ?? []).map((p: { id: string }) => p.id);
  if (!ids.length) return [];

  const { data, error } = await sb()
    .from("respostas")
    .select("*")
    .in("pergunta_id", ids)
    .order("criado_em");
  if (error) erro(error);
  return (data ?? []) as Resposta[];
}

export async function enviarResposta(
  perguntaId: string,
  texto: string,
  equipeId: string | null,
) {
  const perfilId = await garantirSessao();
  const { error } = await sb().from("respostas").upsert(
    {
      pergunta_id: perguntaId,
      perfil_id: perfilId,
      equipe_id: equipeId,
      texto: texto.trim(),
      atualizado_em: new Date().toISOString(),
    },
    { onConflict: "pergunta_id,perfil_id" },
  );
  if (error) erro(error);
}

// ------------------------------------------------------- controle do líder --

export async function iniciarEstudo(estudoId: string) {
  const { error } = await sb()
    .from("estudos")
    .update({ status: "ativo", iniciado_em: new Date().toISOString(), etapa_atual: 0 })
    .eq("id", estudoId);
  if (error) erro(error);
}

/** Libera a etapa e move o ponteiro do estudo para ela. */
export async function liberarEtapa(estudoId: string, etapa: Etapa) {
  const c = sb();
  const [{ error: e1 }, { error: e2 }] = await Promise.all([
    c
      .from("etapas")
      .update({ liberada: true, liberada_em: new Date().toISOString() })
      .eq("id", etapa.id),
    c.from("estudos").update({ etapa_atual: etapa.ordem }).eq("id", estudoId),
  ]);
  if (e1) erro(e1);
  if (e2) erro(e2);
}

export async function voltarEtapa(estudoId: string, ordem: number) {
  const { error } = await sb().from("estudos").update({ etapa_atual: ordem }).eq("id", estudoId);
  if (error) erro(error);
}

export async function encerrarEstudo(estudoId: string) {
  const { error } = await sb()
    .from("estudos")
    .update({ status: "encerrado", encerrado_em: new Date().toISOString() })
    .eq("id", estudoId);
  if (error) erro(error);
}

export async function excluirEstudo(estudoId: string) {
  const { error } = await sb().from("estudos").delete().eq("id", estudoId);
  if (error) erro(error);
}

// ------------------------------------------------------------- equipes --

export async function definirEquipes(
  estudoId: string,
  atribuicoes: { equipeId: string; perfis: string[] }[],
) {
  const c = sb();
  const ids = atribuicoes.map((a) => a.equipeId);
  if (ids.length) await c.from("equipe_membros").delete().in("equipe_id", ids);

  const linhas = atribuicoes.flatMap((a) =>
    a.perfis.map((perfil_id) => ({ equipe_id: a.equipeId, perfil_id })),
  );
  if (linhas.length) {
    const { error } = await c.from("equipe_membros").insert(linhas);
    if (error) erro(error);
  }
}

export async function membrosDasEquipes(estudoId: string) {
  const { data: equipes } = await sb().from("equipes").select("id").eq("estudo_id", estudoId);
  const ids = (equipes ?? []).map((e: { id: string }) => e.id);
  if (!ids.length) return [] as { equipe_id: string; perfil_id: string }[];
  const { data } = await sb().from("equipe_membros").select("*").in("equipe_id", ids);
  return (data ?? []) as { equipe_id: string; perfil_id: string }[];
}

// ------------------------------------------------- reações e reflexões --

export async function alternarReacao(respostaId: string, ativa: boolean) {
  const perfilId = await garantirSessao();
  const c = sb();
  if (ativa) {
    await c.from("reacoes").delete().eq("resposta_id", respostaId).eq("perfil_id", perfilId);
  } else {
    await c.from("reacoes").upsert({ resposta_id: respostaId, perfil_id: perfilId });
  }
}

export async function reacoesDoEstudo(respostaIds: string[]): Promise<Reacao[]> {
  if (!respostaIds.length) return [];
  const { data } = await sb().from("reacoes").select("*").in("resposta_id", respostaIds);
  return (data ?? []) as Reacao[];
}

export async function salvarReflexao(
  estudoId: string,
  texto: string,
  compartilhada: boolean,
) {
  const perfilId = await garantirSessao();
  const { error } = await sb().from("reflexoes").upsert({
    estudo_id: estudoId,
    perfil_id: perfilId,
    texto,
    compartilhada,
    atualizado_em: new Date().toISOString(),
  });
  if (error) erro(error);
}

export async function minhaReflexao(estudoId: string): Promise<Reflexao | null> {
  const perfilId = await garantirSessao();
  const { data } = await sb()
    .from("reflexoes")
    .select("*")
    .eq("estudo_id", estudoId)
    .eq("perfil_id", perfilId)
    .maybeSingle();
  return (data as Reflexao) ?? null;
}

export async function salvarResumo(
  estudoId: string,
  texto: string,
  destaques: { rotulo: string; valor: string }[],
) {
  const { error } = await sb()
    .from("resumos")
    .upsert({ estudo_id: estudoId, texto, destaques });
  if (error) erro(error);
}

export async function carregarResumo(estudoId: string): Promise<Resumo | null> {
  const { data } = await sb().from("resumos").select("*").eq("estudo_id", estudoId).maybeSingle();
  return (data as Resumo) ?? null;
}

// ------------------------------------------------------------- realtime --

/**
 * Um canal por estudo. É o que faz a resposta do participante aparecer na hora
 * no painel do líder, e a etapa liberada aparecer na hora para o participante.
 */
export function ouvirEstudo(estudoId: string, aoMudar: () => void) {
  const canal = sb()
    .channel(`estudo:${estudoId}`)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "etapas", filter: `estudo_id=eq.${estudoId}` },
      aoMudar,
    )
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "estudos", filter: `id=eq.${estudoId}` },
      aoMudar,
    )
    .on("postgres_changes", { event: "*", schema: "public", table: "respostas" }, aoMudar)
    .on("postgres_changes", { event: "*", schema: "public", table: "reacoes" }, aoMudar)
    .subscribe();

  return () => {
    void sb().removeChannel(canal);
  };
}

export function ouvirGrupo(grupoId: string, aoMudar: () => void) {
  const canal = sb()
    .channel(`grupo:${grupoId}`)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "membros", filter: `grupo_id=eq.${grupoId}` },
      aoMudar,
    )
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "estudos", filter: `grupo_id=eq.${grupoId}` },
      aoMudar,
    )
    .subscribe();

  return () => {
    void sb().removeChannel(canal);
  };
}
