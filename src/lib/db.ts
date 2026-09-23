"use client";

import Dexie, { type Table } from "dexie";
import type { HighlightColor } from "./catalog";
import { refOf, type VersionId } from "./bible";
import type { PlanoSalvo } from "./planos";

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

export async function salvarPlano(plano: PlanoSalvo) {
  await db.planos.put({ ...plano, atualizadoEm: Date.now() });
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
function agendarSync() {
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
  /** Ausente nos backups gerados antes dos planos de leitura. */
  planos?: PlanoSalvo[];
};

export async function exportAll(): Promise<Backup> {
  const [marks, notes, reading, favorites, prefs, planos] = await Promise.all([
    db.marks.toArray(),
    db.notes.toArray(),
    db.reading.toArray(),
    db.favorites.toArray(),
    db.prefs.toArray(),
    db.planos.toArray(),
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
    planos,
  };
}

/** Importação aditiva: nunca apaga o que já existe, só sobrescreve conflitos. */
export async function importAll(backup: Backup) {
  // "lumen" é o nome antigo do app; backups gerados antes continuam válidos.
  if (backup?.app !== "lumen") {
    throw new Error("Esse arquivo não é um backup do Genipse Bible.");
  }
  // Lista e não argumentos soltos: a sobrecarga variádica do Dexie para em
  // cinco tabelas, e com `planos` passamos de seis.
  await db.transaction(
    "rw",
    [db.marks, db.notes, db.reading, db.favorites, db.prefs, db.planos],
    async () => {
      if (backup.marks?.length) await db.marks.bulkPut(backup.marks);
      if (backup.notes?.length) await db.notes.bulkPut(backup.notes);
      if (backup.reading?.length) await db.reading.bulkPut(backup.reading);
      if (backup.favorites?.length) await db.favorites.bulkPut(backup.favorites);
      if (backup.prefs?.length) await db.prefs.bulkPut(backup.prefs);
      if (backup.planos?.length) await db.planos.bulkPut(backup.planos);
    },
  );
  return {
    marks: backup.marks?.length ?? 0,
    notes: backup.notes?.length ?? 0,
  };
}
