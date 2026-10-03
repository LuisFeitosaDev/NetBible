"use client";

import Dexie, { type Table } from "dexie";
import type { HighlightColor } from "./catalog";
import { refOf, type VersionId } from "./bible";
import { chaveDoCapitulo, type PlanoSalvo } from "./planos";

/**
 * Tudo que é do usuário é escrito primeiro aqui, no IndexedDB: é o que deixa
 * o app instantâneo e funcionando offline. `lib/sync.ts` leva para a conta.
 */

export type Mark = {
  ref: string;
  slug: string;
  chapter: number;
  verse: number;
  color: HighlightColor;
  /** Cópia do texto no momento da marcação: a biblioteca abre sem baixar o livro. */
  text: string;
  version: VersionId;
  createdAt: number;
  /** Carimbo de sincronização. Toda escrita atualiza. */
  atualizadoEm?: number;
};

/**
 * Lápide de item apagado.
 *
 * Sem isso, tirar uma marcação no celular não tiraria no computador: a
 * sincronização só veria linhas que existem, nunca as que sumiram.
 */
export type Removido = {
  chave: string;
  tabela: "marks" | "notes" | "favorites" | "planos";
  removidoEm: number;
};

export type Note = {
  ref: string;
  slug: string;
  chapter: number;
  verse: number;
  body: string;
  text: string;
  version: VersionId;
  createdAt: number;
  updatedAt: number;
  atualizadoEm?: number;
};

export type Reading = {
  slug: string;
  /** Capítulos concluídos, para a barra de progresso do card. */
  done: number[];
  lastChapter: number;
  updatedAt: number;
  atualizadoEm?: number;
};

export type Favorite = { slug: string; createdAt: number; atualizadoEm?: number };
export type Pref = { key: string; value: unknown };

/**
 * O nome do banco continua "lumen", de antes do app virar Genipse Bible.
 * Renomear criaria um IndexedDB novo e vazio, e quem já tem marcações no
 * dispositivo perderia tudo. É um nome interno: ninguém vê.
 */
class GenipseDB extends Dexie {
  marks!: Table<Mark, string>;
  notes!: Table<Note, string>;
  reading!: Table<Reading, string>;
  favorites!: Table<Favorite, string>;
  prefs!: Table<Pref, string>;
  removidos!: Table<Removido, string>;
  planos!: Table<PlanoSalvo, string>;

  constructor() {
    super("lumen");
    this.version(1).stores({
      marks: "ref, slug, color, createdAt, [slug+chapter]",
      notes: "ref, slug, updatedAt, [slug+chapter]",
      reading: "slug, updatedAt",
      favorites: "slug, createdAt",
      prefs: "key",
    });
    // v2 acrescenta o carimbo de sincronização e as lápides.
    this.version(2)
      .stores({
        marks: "ref, slug, color, createdAt, atualizadoEm, [slug+chapter]",
        notes: "ref, slug, updatedAt, atualizadoEm, [slug+chapter]",
        reading: "slug, updatedAt, atualizadoEm",
        favorites: "slug, createdAt, atualizadoEm",
        prefs: "key",
        removidos: "chave, tabela, removidoEm",
      })
      .upgrade(async (tx) => {
        // Quem já tinha dados entra na sincronização com o carimbo de agora.
        const agora = Date.now();
        for (const nome of ["marks", "notes", "reading", "favorites"] as const) {
          await tx
            .table(nome)
            .toCollection()
            .modify((linha: { atualizadoEm?: number }) => {
              linha.atualizadoEm = agora;
            });
        }
      });
    // v3 acrescenta o plano de leitura. Só a configuração mora aqui; o que já
    // foi lido continua vindo de `reading`, que é a fonte única de progresso.
    this.version(3).stores({
      marks: "ref, slug, color, createdAt, atualizadoEm, [slug+chapter]",
      notes: "ref, slug, updatedAt, atualizadoEm, [slug+chapter]",
      reading: "slug, updatedAt, atualizadoEm",
      favorites: "slug, createdAt, atualizadoEm",
      prefs: "key",
      removidos: "chave, tabela, removidoEm",
      planos: "id, atualizadoEm",
    });
  }
}

export const db = new GenipseDB();

/* ------------------------------ marcações ------------------------------ */

export async function setMark(
  input: Omit<Mark, "ref" | "createdAt"> & { createdAt?: number },
) {
  const ref = refOf(input.slug, input.chapter, input.verse);
  await db.marks.put({
    ...input,
    ref,
    createdAt: input.createdAt ?? Date.now(),
    atualizadoEm: Date.now(),
  });
  agendarSync();
}

export async function clearMarks(refs: string[]) {
  const removidoEm = Date.now();
  await db.transaction("rw", db.marks, db.removidos, async () => {
    await db.marks.bulkDelete(refs);
    await db.removidos.bulkPut(
      refs.map((chave) => ({ chave, tabela: "marks" as const, removidoEm })),
    );
  });
  agendarSync();
}

/* -------------------------------- notas -------------------------------- */

export async function saveNote(
  input: Omit<Note, "ref" | "createdAt" | "updatedAt">,
) {
  const ref = refOf(input.slug, input.chapter, input.verse);
  const now = Date.now();
  const existing = await db.notes.get(ref);
  await db.notes.put({
    ...input,
    ref,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    atualizadoEm: now,
  });
  agendarSync();
}

export async function deleteNote(ref: string) {
  await db.transaction("rw", db.notes, db.removidos, async () => {
    await db.notes.delete(ref);
    await db.removidos.put({ chave: ref, tabela: "notes", removidoEm: Date.now() });
  });
  agendarSync();
}

/* ------------------------------ progresso ------------------------------ */

export async function markChapterRead(slug: string, chapter: number) {
  const current = await db.reading.get(slug);
  const done = new Set(current?.done ?? []);
  done.add(chapter);
  await db.reading.put({
    slug,
    done: [...done].sort((a, b) => a - b),
    lastChapter: chapter,
    updatedAt: Date.now(),
    atualizadoEm: Date.now(),
  });
  agendarSync();
}

/** Registra onde o usuário parou sem marcar o capítulo como lido. */
export async function touchReading(slug: string, chapter: number) {
  const current = await db.reading.get(slug);
  await db.reading.put({
    slug,
    done: current?.done ?? [],
    lastChapter: chapter,
    updatedAt: Date.now(),
    atualizadoEm: Date.now(),
  });
  agendarSync();
}

/** Desmarca um capítulo, para quem tocou no lugar errado na lista do plano. */
export async function desmarcarCapitulo(slug: string, chapter: number) {
  const atual = await db.reading.get(slug);
  if (!atual) return;
  await db.reading.put({
    ...atual,
    done: atual.done.filter((n) => n !== chapter),
    updatedAt: Date.now(),
    atualizadoEm: Date.now(),
  });
  agendarSync();
}

/* -------------------------- plano de leitura --------------------------- */

/**
 * Marca (ou desmarca) um capítulo no plano ativo e na Bíblia, juntos.
 *
 * Os dois registros são separados de propósito — o plano começa em 0% mesmo
 * com capítulos já lidos na Bíblia — mas ler durante o plano conta nos dois.
 */
export async function marcarNoPlano(slug: string, chapter: number, lido: boolean) {
  if (lido) await markChapterRead(slug, chapter);
  else await desmarcarCapitulo(slug, chapter);

  const plano = await db.planos.get("atual");
  if (!plano) return;
  const chave = chaveDoCapitulo(slug, chapter);
  const conjunto = new Set(plano.lidosNoPlano ?? []);
  if (lido === conjunto.has(chave)) return;
  if (lido) conjunto.add(chave);
  else conjunto.delete(chave);
  await salvarPlano({ ...plano, lidosNoPlano: [...conjunto] });
}

export async function salvarPlano(plano: PlanoSalvo) {
  await db.transaction("rw", db.planos, db.removidos, async () => {
    await db.planos.put({ ...plano, atualizadoEm: Date.now() });
    await db.removidos.where("tabela").equals("planos").delete();
  });
  agendarSync();
}

export async function apagarPlano() {
  // Lápide junto: sem ela, encerrar o plano no celular deixaria o computador
  // sincronizando o plano antigo de volta na visita seguinte.
  await db.transaction("rw", db.planos, db.removidos, async () => {
    await db.planos.delete("atual");
    await db.removidos.put({
      chave: "atual",
      tabela: "planos",
      removidoEm: Date.now(),
    });
  });
  agendarSync();
}

export async function toggleFavorite(slug: string) {
  const existing = await db.favorites.get(slug);
  const agora = Date.now();
  await db.transaction("rw", db.favorites, db.removidos, async () => {
    if (existing) {
      await db.favorites.delete(slug);
      await db.removidos.put({ chave: slug, tabela: "favorites", removidoEm: agora });
    } else {
      await db.favorites.put({ slug, createdAt: agora, atualizadoEm: agora });
    }
  });
  agendarSync();
  return !existing;
}

/**
 * A sincronização se registra aqui no boot (ver lib/sync.ts). Enquanto não há
 * conta, isso é um no-op e o app segue 100% local, como antes.
 */
let aoMudar: (() => void) | null = null;
export function registrarSync(fn: () => void) {
  aoMudar = fn;
}
export function agendarSync() {
  aoMudar?.();
}

/* ----------------------------- preferências ---------------------------- */

export async function getPref<T>(key: string, fallback: T): Promise<T> {
  const row = await db.prefs.get(key);
  return row ? (row.value as T) : fallback;
}

export async function setPref(key: string, value: unknown) {
  await db.prefs.put({ key, value });
}
