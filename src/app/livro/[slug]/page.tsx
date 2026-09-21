"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useLiveQuery } from "dexie-react-hooks";
import { Play, Check, Plus, Highlighter, MessageSquareText } from "lucide-react";
import { BookArt, bookSynopsis } from "@/components/BookCard";
import { useBible } from "@/lib/store";
import { db, toggleFavorite } from "@/lib/db";
import { GROUP_THEME } from "@/lib/catalog";

export default function BookPage() {
  const { slug } = useParams<{ slug: string }>();
  const { index, bySlug } = useBible();
  const book = bySlug.get(slug);

  const reading = useLiveQuery(() => db.reading.get(slug), [slug]);
  const favorite = useLiveQuery(() => db.favorites.get(slug), [slug]);
  const marks = useLiveQuery(() => db.marks.where("slug").equals(slug).toArray(), [slug]);
  const notes = useLiveQuery(() => db.notes.where("slug").equals(slug).toArray(), [slug]);

  if (!index) return <div className="h-[60vh] animate-pulse bg-ink-900" />;
  if (!book) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Livro não encontrado</h1>
        <Link href="/" className="mt-4 inline-block text-gold-400 hover:underline">
          Voltar ao início
        </Link>
      </div>
    );
  }

  const theme = GROUP_THEME[book.group];
  const groupLabel = index.groups.find((g) => g.id === book.group)?.label ?? "";
  const done = new Set(reading?.done ?? []);
  const chapters = book.verses.length;
  const pct = Math.round((done.size / chapters) * 100);
  const resumeAt = reading?.lastChapter ?? 1;

  return (
    <div className="-mt-16">
      <section className="relative flex min-h-[58vh] items-end overflow-hidden pt-16">
        <BookArt book={book} focus="right" className="absolute inset-0" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-transparent" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-ink-950/15 to-transparent" />

        <div className="relative mx-auto w-full max-w-[1500px] px-4 pb-10 md:px-8 md:pb-14">
          <div className="max-w-2xl animate-[rise_0.4s_cubic-bezier(0.16,1,0.3,1)]">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em]">
              <span
                className="rounded-full px-2.5 py-1"
                style={{ background: `${theme.accent}22`, color: theme.accent }}
              >
                {groupLabel}
              </span>
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-white/70">
                {book.testament === "VT" ? "Antigo Testamento" : "Novo Testamento"}
              </span>
            </div>

            <h1 className="mt-4 font-display text-4xl font-black tracking-tight md:text-6xl">
              {book.name}
            </h1>

            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-300">
              <span>{chapters} capítulos</span>
              <span className="text-ink-600">•</span>
              <span>{book.totalVerses.toLocaleString("pt-BR")} versículos</span>
              {pct > 0 && (
                <>
                  <span className="text-ink-600">•</span>
                  <span className="font-semibold text-gold-400">{pct}% lido</span>
                </>
              )}
            </p>

            <p className="mt-4 max-w-xl font-reading text-base leading-relaxed text-ink-100/90 md:text-lg">
              {bookSynopsis(book)}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href={`/livro/${book.slug}/${resumeAt}`}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-display text-sm font-bold text-ink-950 transition-transform hover:scale-[1.03] active:scale-95"
              >
                <Play size={18} className="fill-ink-950" />
                {reading ? `Continuar no capítulo ${resumeAt}` : "Começar a ler"}
              </Link>

              <button
                onClick={() => toggleFavorite(book.slug)}
                className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-5 py-3 font-display text-sm font-bold backdrop-blur transition-colors hover:bg-white/25"
              >
                {favorite ? <Check size={18} /> : <Plus size={18} />}
                Minha lista
              </button>
            </div>

            {(marks?.length || notes?.length) ? (
              <div className="mt-5 flex items-center gap-4 text-sm text-ink-300">
                {marks?.length ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Highlighter size={15} className="text-gold-400" />
                    {marks.length} {marks.length === 1 ? "marcação" : "marcações"}
                  </span>
                ) : null}
                {notes?.length ? (
                  <span className="inline-flex items-center gap-1.5">
                    <MessageSquareText size={15} className="text-gold-400" />
                    {notes.length} {notes.length === 1 ? "comentário" : "comentários"}
                  </span>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 py-10 md:px-8">
        <h2 className="font-display text-lg font-bold md:text-xl">Capítulos</h2>
        <p className="mb-5 text-[13px] text-ink-400">
          {done.size} de {chapters} concluídos
        </p>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(68px,1fr))] gap-2.5">
          {book.verses.map((verseCount, i) => {
            const n = i + 1;
            const read = done.has(n);
            return (
              <Link
                key={n}
                href={`/livro/${book.slug}/${n}`}
                className={`group relative flex aspect-square flex-col items-center justify-center rounded-lg border transition-all hover:-translate-y-0.5 ${
                  read
                    ? "border-gold-400/40 bg-gold-400/12 text-gold-300"
                    : "border-white/8 bg-ink-850 text-ink-100 hover:border-white/25 hover:bg-ink-800"
                }`}
              >
                <span className="font-display text-lg font-bold">{n}</span>
                <span className="text-[10px] text-ink-400">{verseCount} vs</span>
                {read && (
                  <Check size={12} className="absolute right-1.5 top-1.5 text-gold-400" />
                )}
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
