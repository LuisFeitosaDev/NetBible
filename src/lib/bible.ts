import type { GroupId } from "./catalog";

export type VersionId = "ara" | "nvi";

export type BibleVersion = {
  id: VersionId;
  name: string;
  short: string;
  note: string;
};

export type BookMeta = {
  slug: string;
  abbrev: string;
  name: string;
  position: number;
  testament: "VT" | "NT";
  group: GroupId;
  /** Quantidade de versículos de cada capítulo. */
  verses: number[];
  totalVerses: number;
};

export type BibleIndex = {
  versions: BibleVersion[];
  groups: { id: GroupId; label: string; testament: "VT" | "NT" }[];
  books: BookMeta[];
};

export type BookContent = {
  slug: string;
  name: string;
  version: VersionId;
  /** chapters[capítulo - 1][versículo - 1] */
  chapters: string[][];
};

/** Referência canônica de um versículo, independente da tradução. */
export const refOf = (slug: string, chapter: number, verse: number) =>
  `${slug}.${chapter}.${verse}`;

export const parseRef = (ref: string) => {
  const [slug, chapter, verse] = ref.split(".");
  return { slug, chapter: Number(chapter), verse: Number(verse) };
};

const indexCache: { value?: Promise<BibleIndex> } = {};
const bookCache = new Map<string, Promise<BookContent>>();

async function grab<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Não consegui carregar ${url} (${res.status})`);
  return res.json() as Promise<T>;
}

export function loadIndex(): Promise<BibleIndex> {
  indexCache.value ??= grab<BibleIndex>("/biblia/index.json");
  return indexCache.value;
}

export function loadBook(version: VersionId, slug: string): Promise<BookContent> {
  const key = `${version}/${slug}`;
  let pending = bookCache.get(key);
  if (!pending) {
    pending = grab<BookContent>(`/biblia/${key}.json`);
    bookCache.set(key, pending);
  }
  return pending;
}

/** Nome curto para citações: "Gn", "1Co", "Sl" — o dígito não conta como inicial. */
export function citationLabel(book: BookMeta) {
  const cleaned = book.abbrev.replace(/[^\p{L}\p{N}]/gu, "");
  return cleaned.replace(/\p{L}/u, (first) => first.toUpperCase());
}

export function formatRef(book: BookMeta, chapter: number, verse?: number) {
  return verse ? `${book.name} ${chapter}:${verse}` : `${book.name} ${chapter}`;
}

/**
 * Agrupa versículos consecutivos numa citação enxuta: "1, 3-5, 9".
 */
export function compactVerses(verses: number[]) {
  const sorted = [...new Set(verses)].sort((a, b) => a - b);
  const parts: string[] = [];
  let start = sorted[0];
  let prev = sorted[0];

  for (let i = 1; i <= sorted.length; i++) {
    const current = sorted[i];
    if (current !== prev + 1) {
      parts.push(start === prev ? `${start}` : `${start}-${prev}`);
      start = current;
    }
    prev = current;
  }
  return parts.join(", ");
}
