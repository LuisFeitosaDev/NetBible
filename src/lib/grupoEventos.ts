"use client";

/**
 * O mural do grupo de leitura: grifos, metas batidas, cutucadas, quem entrou.
 *
 * É daqui que saem os avisos. As marcações de cada um continuam na tabela
 * própria (`marcacoes`); o grifo publicado aqui é uma cópia para o grupo, que
 * some quando o grupo é apagado — a marcação na Bíblia fica.
 */
import { sb } from "./grupos/supabase";
import { garantirSessao } from "./grupos/api";
import { refOf } from "./bible";
import { avisarPorPush } from "./push";
import type { DadosDoEvento, TipoDeEvento } from "./avisoTexto";

export type { TipoDeEvento } from "./avisoTexto";
export { textoDoAviso, destinoDoAviso, etiquetaDoAviso } from "./avisoTexto";

export type EventoDoGrupo = {
  id: string;
  grupo_id: string;
  perfil_id: string;
  tipo: TipoDeEvento;
  alvo_id: string | null;
  ref: string | null;
  dados: DadosDoEvento;
  criado_em: string;
};

export type Grifo = {
  slug: string;
  capitulo: number;
  versiculo: number;
  livro: string;
  cor: string;
  texto: string;
};

export async function publicarEvento(
  grupoId: string,
  tipo: TipoDeEvento,
  extra: { alvoId?: string; ref?: string; dados?: EventoDoGrupo["dados"] } = {},
) {
  const id = await garantirSessao();
  const { data, error } = await sb()
    .from("grupo_eventos")
    .insert({
      grupo_id: grupoId,
      perfil_id: id,
      tipo,
      alvo_id: extra.alvoId ?? null,
      ref: extra.ref ?? null,
      dados: extra.dados ?? {},
    })
    .select("id")
    .single();
  if (error) throw error;
  avisarPorPush([data.id]);
}

/** Publica grifos, trocando os que eu já tinha nos mesmos versículos (mudou a cor). */
export async function publicarGrifos(grupoId: string, grifos: Grifo[]) {
  if (!grifos.length) return;
  const id = await garantirSessao();
  const refs = grifos.map((g) => refOf(g.slug, g.capitulo, g.versiculo));
  await removerGrifos(grupoId, refs);
  const { data, error } = await sb()
    .from("grupo_eventos")
    .insert(
      grifos.map((g, i) => ({
        grupo_id: grupoId,
        perfil_id: id,
        tipo: "grifo",
        ref: refs[i],
        dados: g,
      })),
    )
    .select("id");
  if (error) throw error;
  avisarPorPush((data ?? []).map((e) => e.id as string));
}

export async function removerGrifos(grupoId: string, refs: string[]) {
  if (!refs.length) return;
  const id = await garantirSessao();
  const { error } = await sb()
    .from("grupo_eventos")
    .delete()
    .eq("grupo_id", grupoId)
    .eq("perfil_id", id)
    .eq("tipo", "grifo")
    .in("ref", refs);
  if (error) throw error;
}

export async function eventosDoGrupo(grupoId: string, limite = 30): Promise<EventoDoGrupo[]> {
  const { data, error } = await sb()
    .from("grupo_eventos")
    .select("*")
    .eq("grupo_id", grupoId)
    .order("criado_em", { ascending: false })
    .limit(limite);
  if (error) throw error;
  return (data ?? []) as EventoDoGrupo[];
}

/** Grifos do grupo num capítulo, para o leitor mostrar o que os outros marcaram. */
export async function grifosDoCapitulo(
  grupoId: string,
  slug: string,
  capitulo: number,
): Promise<EventoDoGrupo[]> {
  const { data, error } = await sb()
    .from("grupo_eventos")
    .select("*")
    .eq("grupo_id", grupoId)
    .eq("tipo", "grifo")
    .like("ref", `${slug}.${capitulo}.%`);
  if (error) throw error;
  return (data ?? []) as EventoDoGrupo[];
}

export function cutucar(grupoId: string, alvoId: string) {
  return publicarEvento(grupoId, "cutucada", { alvoId });
}

/** Avisa a cada evento novo do grupo, em tempo real. Devolve o "parar de ouvir". */
export function ouvirEventos(grupoId: string, aoChegar: (e: EventoDoGrupo) => void) {
  // Nome único por inscrição: o card do grupo e os avisos globais ouvem o
  // mesmo grupo ao mesmo tempo, e dois canais com o mesmo nome se atropelam.
  const canal = sb()
    .channel(`grupo-eventos-${grupoId}-${Math.random().toString(36).slice(2, 8)}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "grupo_eventos",
        filter: `grupo_id=eq.${grupoId}`,
      },
      (payload) => aoChegar(payload.new as EventoDoGrupo),
    )
    .subscribe();
  return () => {
    void sb().removeChannel(canal);
  };
}

/* ------------------------------------------------ não vistos (badge) ---- */

const CHAVE_VISTO = "genipse.mural.vistoEm";
let naoVistos = 0;
const ouvintes = new Set<(n: number) => void>();

export function ouvirNaoVistos(fn: (n: number) => void) {
  ouvintes.add(fn);
  fn(naoVistos);
  return () => {
    ouvintes.delete(fn);
  };
}

export function somarNaoVisto() {
  definirNaoVistos(naoVistos + 1);
}

/** Evento que merece aviso para mim: dos outros, e cutucada só se for comigo. */
export function eventoParaMim(e: EventoDoGrupo, meuId: string | undefined) {
  if (e.perfil_id === meuId) return false;
  return e.tipo !== "cutucada" || e.alvo_id === meuId;
}

export function definirNaoVistos(n: number) {
  naoVistos = n;
  ouvintes.forEach((fn) => fn(n));
}

export function vistoEm(): number {
  try {
    return Number(localStorage.getItem(CHAVE_VISTO)) || 0;
  } catch {
    return 0;
  }
}

export function marcarMuralComoVisto() {
  try {
    localStorage.setItem(CHAVE_VISTO, String(Date.now()));
  } catch {
    /* modo privado */
  }
  definirNaoVistos(0);
}
