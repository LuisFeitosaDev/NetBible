"use client";

import Dexie, { type Table } from "dexie";
import type { HighlightColor } from "./catalog";
import { refOf, type VersionId } from "./bible";

/**
 * Tudo que é do usuário vive aqui, no IndexedDB do próprio dispositivo.
 * Nenhuma requisição sai da máquina. `exportAll`/`importAll` cobrem backup
 * e são o ponto de entrada caso um dia entre sincronização na nuvem.
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
};

export type Reading = {
  slug: string;
  /** Capítulos concluídos, para a barra de progresso do card. */
  done: number[];
  lastChapter: number;
  updatedAt: number;
};

export type Favorite = { slug: string; createdAt: number };
export type Pref = { key: string; value: unknown };

class LumenDB extends Dexie {
  marks!: Table<Mark, string>;
  notes!: Table<Note, string>;
  reading!: Table<Reading, string>;
  favorites!: Table<Favorite, string>;
  prefs!: Table<Pref, string>;

  constructor() {
    super("lumen");
    this.version(1).stores({
      marks: "ref, slug, color, createdAt, [slug+chapter]",
      notes: "ref, slug, updatedAt, [slug+chapter]",
      reading: "slug, updatedAt",
      favorites: "slug, createdAt",
      prefs: "key",
    });
  }
}

export const db = new LumenDB();

/* ------------------------------ marcações ------------------------------ */

export async function setMark(
  input: Omit<Mark, "ref" | "createdAt"> & { createdAt?: number },
) {
  const ref = refOf(input.slug, input.chapter, input.verse);
  await db.marks.put({ ...input, ref, createdAt: input.createdAt ?? Date.now() });
}

export async function clearMarks(refs: string[]) {
  await db.marks.bulkDelete(refs);
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
  });
}

export async function deleteNote(ref: string) {
  await db.notes.delete(ref);
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
  });
}

/** Registra onde o usuário parou sem marcar o capítulo como lido. */
export async function touchReading(slug: string, chapter: number) {
  const current = await db.reading.get(slug);
  await db.reading.put({
    slug,
    done: current?.done ?? [],
    lastChapter: chapter,
    updatedAt: Date.now(),
  });
}

export async function toggleFavorite(slug: string) {
  const existing = await db.favorites.get(slug);
  if (existing) await db.favorites.delete(slug);
  else await db.favorites.put({ slug, createdAt: Date.now() });
  return !existing;
}

/* ----------------------------- preferências ---------------------------- */

export async function getPref<T>(key: string, fallback: T): Promise<T> {
  const row = await db.prefs.get(key);
  return row ? (row.value as T) : fallback;
}

export async function setPref(key: string, value: unknown) {
  await db.prefs.put({ key, value });
}

/* -------------------------- backup / restauração ------------------------ */

export type Backup = {
  app: "lumen";
  version: 1;
  exportedAt: string;
  marks: Mark[];
  notes: Note[];
  reading: Reading[];
  favorites: Favorite[];
  prefs: Pref[];
};

export async function exportAll(): Promise<Backup> {
  const [marks, notes, reading, favorites, prefs] = await Promise.all([
    db.marks.toArray(),
    db.notes.toArray(),
    db.reading.toArray(),
    db.favorites.toArray(),
    db.prefs.toArray(),
  ]);
  return {
    app: "lumen",
    version: 1,
    exportedAt: new Date().toISOString(),
    marks,
    notes,
    reading,
    favorites,
    prefs,
  };
}

/** Importação aditiva: nunca apaga o que já existe, só sobrescreve conflitos. */
export async function importAll(backup: Backup) {
  if (backup?.app !== "lumen") throw new Error("Esse arquivo não é um backup do Lumen.");
  await db.transaction("rw", db.marks, db.notes, db.reading, db.favorites, db.prefs, async () => {
    if (backup.marks?.length) await db.marks.bulkPut(backup.marks);
    if (backup.notes?.length) await db.notes.bulkPut(backup.notes);
    if (backup.reading?.length) await db.reading.bulkPut(backup.reading);
    if (backup.favorites?.length) await db.favorites.bulkPut(backup.favorites);
    if (backup.prefs?.length) await db.prefs.bulkPut(backup.prefs);
  });
  return {
    marks: backup.marks?.length ?? 0,
    notes: backup.notes?.length ?? 0,
  };
}
