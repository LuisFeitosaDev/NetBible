"use client";

import { sb, supabaseConfigurado } from "./grupos/supabase";
import {
  db,
  getPref,
  registrarSync,
  setPref,
  type Favorite,
  type Mark,
  type Note,
  type Reading,
} from "./db";
import type { HighlightColor } from "./catalog";
import type { VersionId } from "./bible";

/**
 * Sincronização de marcações, notas, progresso e favoritos.
 *
 * O IndexedDB continua sendo onde o app escreve primeiro: é o que mantém tudo
 * funcionando offline e instantâneo. Esta camada empurra para o Supabase e
 * puxa o que mudou em outro dispositivo, resolvendo conflito pelo carimbo mais
 * recente.
 *
 * Sem conta ou sem rede, tudo aqui vira no-op silencioso e nada se perde: na
 * próxima vez que houver sessão, o que ficou para trás sobe.
 */

const CHAVE_ULTIMA = "sync.ultimaEm";
const CHAVE_DONO = "sync.perfilId";

export type EstadoSync = "ocioso" | "sincronizando" | "erro" | "offline";

let emCurso: Promise<void> | null = null;
let agendado: ReturnType<typeof setTimeout> | null = null;
const ouvintes = new Set<(estado: EstadoSync) => void>();

function avisar(estado: EstadoSync) {
  ouvintes.forEach((fn) => fn(estado));
}

export function ouvirSync(fn: (estado: EstadoSync) => void) {
  ouvintes.add(fn);
  return () => {
    ouvintes.delete(fn);
  };
}

async function perfilAtual(): Promise<string | null> {
  if (!supabaseConfigurado) return null;
  const { data } = await sb().auth.getSession();
  return data.session?.user?.id ?? null;
}

/* ------------------------------ conversões ------------------------------ */

const marcaParaRemoto = (m: Mark, perfil: string) => ({
  perfil_id: perfil,
  ref: m.ref,
  slug: m.slug,
  capitulo: m.chapter,
  versiculo: m.verse,
  cor: m.color,
  texto: m.text,
  versao: m.version,
  criado_em: new Date(m.createdAt).toISOString(),
  atualizado_em: new Date(m.atualizadoEm ?? m.createdAt).toISOString(),
});

const notaParaRemoto = (n: Note, perfil: string) => ({
  perfil_id: perfil,
  ref: n.ref,
  slug: n.slug,
  capitulo: n.chapter,
  versiculo: n.verse,
  corpo: n.body,
  texto: n.text,
  versao: n.version,
  criado_em: new Date(n.createdAt).toISOString(),
  atualizado_em: new Date(n.atualizadoEm ?? n.updatedAt).toISOString(),
});

const leituraParaRemoto = (r: Reading, perfil: string) => ({
  perfil_id: perfil,
  slug: r.slug,
  concluidos: r.done,
  ultimo_capitulo: r.lastChapter,
  atualizado_em: new Date(r.atualizadoEm ?? r.updatedAt).toISOString(),
});

const favoritoParaRemoto = (f: Favorite, perfil: string) => ({
  perfil_id: perfil,
  slug: f.slug,
  criado_em: new Date(f.createdAt).toISOString(),
  atualizado_em: new Date(f.atualizadoEm ?? f.createdAt).toISOString(),
});

const ms = (iso: string) => new Date(iso).getTime();

/* ------------------------------ o sincronismo --------------------------- */

async function executar(): Promise<void> {
  const perfil = await perfilAtual();
  if (!perfil) return;

  avisar("sincronizando");
  const c = sb();

  // Trocou de conta neste navegador: recomeça a janela de sincronização para
  // não enviar os dados de uma pessoa para a conta de outra.
  const dono = await getPref<string | null>(CHAVE_DONO, null);
  const desde = dono === perfil ? await getPref<number>(CHAVE_ULTIMA, 0) : 0;
  const janela = new Date(desde).toISOString();
  const agora = Date.now();

  // ---------------------------------------------------------------- PUSH --
  const [marcas, notas, leituras, favoritos, removidos] = await Promise.all([
    db.marks.filter((m) => (m.atualizadoEm ?? m.createdAt) > desde).toArray(),
    db.notes.filter((n) => (n.atualizadoEm ?? n.updatedAt) > desde).toArray(),
    db.reading.filter((r) => (r.atualizadoEm ?? r.updatedAt) > desde).toArray(),
    db.favorites.filter((f) => (f.atualizadoEm ?? f.createdAt) > desde).toArray(),
    db.removidos.filter((r) => r.removidoEm > desde).toArray(),
  ]);

  if (marcas.length) {
    await c.from("marcacoes").upsert(marcas.map((m) => marcaParaRemoto(m, perfil)));
  }
  if (notas.length) {
    await c.from("notas").upsert(notas.map((n) => notaParaRemoto(n, perfil)));
  }
  if (leituras.length) {
    await c.from("leitura").upsert(leituras.map((r) => leituraParaRemoto(r, perfil)));
  }
  if (favoritos.length) {
    await c.from("favoritos").upsert(favoritos.map((f) => favoritoParaRemoto(f, perfil)));
  }

  for (const [tabela, destino, coluna] of [
    ["marks", "marcacoes", "ref"],
    ["notes", "notas", "ref"],
    ["favorites", "favoritos", "slug"],
  ] as const) {
    const chaves = removidos.filter((r) => r.tabela === tabela).map((r) => r.chave);
    if (chaves.length) {
      await c.from(destino).delete().eq("perfil_id", perfil).in(coluna, chaves);
    }
  }

  // ---------------------------------------------------------------- PULL --
  const [rMarcas, rNotas, rLeitura, rFav] = await Promise.all([
    c.from("marcacoes").select("*").eq("perfil_id", perfil).gt("atualizado_em", janela),
    c.from("notas").select("*").eq("perfil_id", perfil).gt("atualizado_em", janela),
    c.from("leitura").select("*").eq("perfil_id", perfil).gt("atualizado_em", janela),
    c.from("favoritos").select("*").eq("perfil_id", perfil).gt("atualizado_em", janela),
  ]);

  const apagadas = new Set(removidos.map((r) => `${r.tabela}:${r.chave}`));

  await db.transaction(
    "rw",
    db.marks,
    db.notes,
    db.reading,
    db.favorites,
    async () => {
      for (const m of rMarcas.data ?? []) {
        if (apagadas.has(`marks:${m.ref}`)) continue; // apagado aqui vence
        const local = await db.marks.get(m.ref);
        const remotoEm = ms(m.atualizado_em);
        if (local && (local.atualizadoEm ?? local.createdAt) >= remotoEm) continue;
        await db.marks.put({
          ref: m.ref,
          slug: m.slug,
          chapter: m.capitulo,
          verse: m.versiculo,
          color: m.cor as HighlightColor,
          text: m.texto,
          version: m.versao as VersionId,
          createdAt: ms(m.criado_em),
          atualizadoEm: remotoEm,
        });
      }

      for (const n of rNotas.data ?? []) {
        if (apagadas.has(`notes:${n.ref}`)) continue;
        const local = await db.notes.get(n.ref);
        const remotoEm = ms(n.atualizado_em);
        if (local && (local.atualizadoEm ?? local.updatedAt) >= remotoEm) continue;
        await db.notes.put({
          ref: n.ref,
          slug: n.slug,
          chapter: n.capitulo,
          verse: n.versiculo,
          body: n.corpo,
          text: n.texto,
          version: n.versao as VersionId,
          createdAt: ms(n.criado_em),
          updatedAt: remotoEm,
          atualizadoEm: remotoEm,
        });
      }

      for (const r of rLeitura.data ?? []) {
        const local = await db.reading.get(r.slug);
        const remotoEm = ms(r.atualizado_em);
        if (local && (local.atualizadoEm ?? local.updatedAt) >= remotoEm) continue;
        await db.reading.put({
          slug: r.slug,
          // Progresso é cumulativo: capítulo lido não "desle".
          done: [...new Set([...(local?.done ?? []), ...(r.concluidos ?? [])])].sort(
            (a, b) => a - b,
          ),
          lastChapter: r.ultimo_capitulo,
          updatedAt: remotoEm,
          atualizadoEm: remotoEm,
        });
      }

      for (const f of rFav.data ?? []) {
        if (apagadas.has(`favorites:${f.slug}`)) continue;
        const local = await db.favorites.get(f.slug);
        const remotoEm = ms(f.atualizado_em);
        if (local && (local.atualizadoEm ?? local.createdAt) >= remotoEm) continue;
        await db.favorites.put({
          slug: f.slug,
          createdAt: ms(f.criado_em),
          atualizadoEm: remotoEm,
        });
      }
    },
  );

  // Lápides já enviadas não precisam ficar guardadas para sempre.
  await db.removidos.where("removidoEm").below(desde).delete();

  await setPref(CHAVE_ULTIMA, agora);
  await setPref(CHAVE_DONO, perfil);
  avisar("ocioso");
}

/** Roda uma sincronização, sem nunca deixar duas correrem ao mesmo tempo. */
export async function sincronizar(): Promise<void> {
  if (!supabaseConfigurado) return;
  if (emCurso) return emCurso;

  emCurso = executar()
    .catch((e) => {
      console.error("sync falhou", e);
      avisar(navigator.onLine ? "erro" : "offline");
    })
    .finally(() => {
      emCurso = null;
    });

  return emCurso;
}

/** Agrupa rajadas de escrita numa subida só. */
export function agendarSincronizacao(atrasoMs = 2500) {
  if (agendado) clearTimeout(agendado);
  agendado = setTimeout(() => {
    agendado = null;
    void sincronizar();
  }, atrasoMs);
}

let ligado = false;

/** Chamado uma vez no boot do app. */
export function iniciarSync() {
  if (ligado || !supabaseConfigurado || typeof window === "undefined") return;
  ligado = true;

  registrarSync(() => agendarSincronizacao());

  void sincronizar();
  window.addEventListener("online", () => void sincronizar());
  window.addEventListener("focus", () => agendarSincronizacao(500));
  sb().auth.onAuthStateChange(() => void sincronizar());
}
