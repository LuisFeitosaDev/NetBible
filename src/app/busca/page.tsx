"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Loader2, CornerDownLeft } from "lucide-react";
import { loadBook, type BookMeta, type VersionId } from "@/lib/bible";
import { useBible } from "@/lib/store";

type Hit = { book: BookMeta; chapter: number; verse: number; text: string };

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

/** Cache do corpus por versão: a primeira busca baixa, as próximas são instantâneas. */
const corpusCache = new Map<VersionId, Promise<Map<string, string[][]>>>();

function loadCorpus(version: VersionId, books: BookMeta[]) {
  let pending = corpusCache.get(version);
  if (!pending) {
    pending = Promise.all(
      books.map((b) => loadBook(version, b.slug).then((c) => [b.slug, c.chapters] as const)),
    ).then((entries) => new Map(entries));
    corpusCache.set(version, pending);
  }
  return pending;
}

/** Referência direta: "jo 3:16", "1co 13", "salmos 23:1". */
function parseReference(query: string, books: BookMeta[]) {
  const m = query.trim().match(/^(.+?)\s*(\d+)(?:\s*[:.]\s*(\d+))?$/);
  if (!m) return null;
  const [, rawName, chapter, verse] = m;
  const needle = normalize(rawName).replace(/\s+/g, "");
  const book = books.find((b) => {
    const name = normalize(b.name).replace(/\s+/g, "");
    return (
      normalize(b.slug) === needle ||
      normalize(b.abbrev).replace(/\s+/g, "") === needle ||
      name === needle ||
      (needle.length >= 3 && name.startsWith(needle))
    );
  });
  if (!book) return null;
  const c = Number(chapter);
  if (c < 1 || c > book.verses.length) return null;
  return { book, chapter: c, verse: verse ? Number(verse) : undefined };
}

export default function SearchPage() {
  const { index, version } = useBible();
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<Hit[] | null>(null);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const books = index?.books ?? [];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const reference = useMemo(
    () => (books.length ? parseReference(query, books) : null),
    [query, books],
  );

  useEffect(() => {
    const term = query.trim();
    if (term.length < 3 || !books.length) {
      setHits(null);
      return;
    }

    let alive = true;
    setBusy(true);
    const timer = setTimeout(async () => {
      const corpus = await loadCorpus(version, books);
      if (!alive) return;

      const needle = normalize(term);
      const found: Hit[] = [];

      outer: for (const book of books) {
        const chapters = corpus.get(book.slug);
        if (!chapters) continue;
        for (let c = 0; c < chapters.length; c++) {
          const verses = chapters[c];
          for (let v = 0; v < verses.length; v++) {
            if (normalize(verses[v]).includes(needle)) {
              found.push({ book, chapter: c + 1, verse: v + 1, text: verses[v] });
              if (found.length >= 300) break outer;
            }
          }
        }
      }

      if (alive) {
        setHits(found);
        setBusy(false);
      }
    }, 220);

    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [query, version, books]);

  return (
    <div className="mx-auto max-w-3xl px-4 pt-6 md:px-6">
      <div className="sticky top-16 z-30 -mx-4 bg-ink-950/95 px-4 py-3 backdrop-blur-xl md:-mx-6 md:px-6">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busque uma palavra ou uma referência (jo 3:16)"
            className="w-full rounded-xl border border-white/10 bg-ink-850 py-3.5 pl-12 pr-4 text-[15px] outline-none transition-colors placeholder:text-ink-600 focus:border-gold-500/60"
          />
          {busy && (
            <Loader2
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-gold-400"
            />
          )}
        </div>
      </div>

      {reference && (
        <Link
          href={`/livro/${reference.book.slug}/${reference.chapter}${
            reference.verse ? `?v=${reference.verse}` : ""
          }`}
          className="mt-4 flex items-center gap-3 rounded-xl border border-gold-500/35 bg-gold-500/10 p-4 transition-colors hover:bg-gold-500/16"
        >
          <div className="flex-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gold-400">
              Ir direto para
            </p>
            <p className="font-display text-lg font-bold">
              {reference.book.name} {reference.chapter}
              {reference.verse ? `:${reference.verse}` : ""}
            </p>
          </div>
          <CornerDownLeft size={18} className="text-gold-400" />
        </Link>
      )}

      {query.trim().length >= 3 && hits && (
        <p className="mt-6 text-[13px] text-ink-400">
          {hits.length === 0
            ? "Nenhum versículo encontrado."
            : `${hits.length}${hits.length === 300 ? "+" : ""} ${
                hits.length === 1 ? "resultado" : "resultados"
              }`}
        </p>
      )}

      <div className="mt-3 space-y-2 pb-16">
        {(hits ?? []).map((hit) => (
          <Link
            key={`${hit.book.slug}-${hit.chapter}-${hit.verse}`}
            href={`/livro/${hit.book.slug}/${hit.chapter}?v=${hit.verse}`}
            className="block rounded-xl border border-white/6 bg-ink-900 p-4 transition-colors hover:border-white/20 hover:bg-ink-850"
          >
            <p className="mb-1.5 font-display text-[13px] font-bold text-gold-400">
              {hit.book.name} {hit.chapter}:{hit.verse}
            </p>
            <p className="font-reading text-[15px] leading-relaxed text-ink-100/90">
              <Marked text={hit.text} term={query.trim()} />
            </p>
          </Link>
        ))}
      </div>

      {query.trim().length < 3 && (
        <div className="py-20 text-center">
          <p className="font-display text-lg font-bold text-ink-300">
            Busque em toda a Bíblia
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-ink-400">
            Digite pelo menos três letras. A primeira busca baixa o texto completo — depois
            fica instantânea e funciona offline.
          </p>
        </div>
      )}
    </div>
  );
}

/** Destaca o trecho buscado sem quebrar acentuação. */
function Marked({ text, term }: { text: string; term: string }) {
  const haystack = normalize(text);
  const needle = normalize(term);
  const at = haystack.indexOf(needle);
  if (at < 0) return <>{text}</>;

  return (
    <>
      {text.slice(0, at)}
      <mark className="rounded bg-gold-400/30 px-0.5 text-gold-200">
        {text.slice(at, at + term.length)}
      </mark>
      {text.slice(at + term.length)}
    </>
  );
}
