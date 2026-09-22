"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Loader2, CornerDownLeft } from "lucide-react";
import { loadBook, type BookMeta, type VersionId } from "@/lib/bible";
import { useBible } from "@/lib/store";
import { GROUP_THEME } from "@/lib/catalog";

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

      {/* Só existe quando há resultado: vazio, o padding deixava um vão enorme
          entre a busca e o índice dos livros. */}
      <div className={hits?.length ? "mt-3 space-y-2 pb-16" : ""}>
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

      {query.trim().length < 3 && <IndiceDaBiblia />}
    </div>
  );
}

/**
 * Com a busca vazia, a tela vira o índice da Bíblia: os 66 livros na ordem
 * canônica, agrupados. Na maior parte das vezes a pessoa não quer procurar uma
 * palavra, quer só abrir um livro.
 */
function IndiceDaBiblia() {
  const { index } = useBible();
  if (!index) return null;

  return (
    <div className="pb-16">
      <p className="mt-6 text-[13px] leading-relaxed text-ink-400">
        Digite três letras para procurar uma palavra em toda a Bíblia, ou uma referência
        como <span className="font-mono text-gold-400">jo 3:16</span>. Abaixo, os 66 livros
        na ordem.
      </p>

      {(["VT", "NT"] as const).map((testamento) => (
        <section key={testamento} className="mt-7">
          <h2 className="mb-3 font-display text-xs font-bold uppercase tracking-[0.16em] text-gold-400">
            {testamento === "VT" ? "Antigo Testamento" : "Novo Testamento"}
          </h2>

          {index.groups
            .filter((g) => g.testament === testamento)
            .map((grupo) => {
              const livros = index.books.filter((b) => b.group === grupo.id);
              if (!livros.length) return null;
              const tema = GROUP_THEME[grupo.id];
              return (
                <div key={grupo.id} className="mb-5">
                  <p
                    className="mb-2 text-[11px] font-bold uppercase tracking-wider"
                    style={{ color: tema.accent }}
                  >
                    {grupo.label}
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {livros.map((livro) => (
                      <Link
                        key={livro.slug}
                        href={`/livro/${livro.slug}`}
                        className="group flex items-center justify-between gap-2 rounded-xl border border-white/6 bg-ink-900 px-3 py-2.5 transition-colors hover:border-white/25 hover:bg-ink-850"
                      >
                        <span className="min-w-0 truncate text-[14px] font-medium">
                          {livro.name}
                        </span>
                        <span className="shrink-0 text-[11px] text-ink-500">
                          {livro.verses.length}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
        </section>
      ))}
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
