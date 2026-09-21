"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Play, Info } from "lucide-react";
import { loadBook, type BookMeta } from "@/lib/bible";
import { DAILY, GROUP_THEME } from "@/lib/catalog";
import { useBible } from "@/lib/store";

/** Um versículo por dia, estável durante as 24h e igual para todo mundo. */
function pickOfTheDay() {
  const now = new Date();
  const start = Date.UTC(now.getFullYear(), 0, 0);
  const day = Math.floor((Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) - start) / 86_400_000);
  return DAILY[day % DAILY.length];
}

export function Hero() {
  const { bySlug, version } = useBible();
  const [pick] = useState(pickOfTheDay);
  const [text, setText] = useState<string | null>(null);

  const book: BookMeta | undefined = bySlug.get(pick.slug);

  useEffect(() => {
    let alive = true;
    if (!book) return;
    loadBook(version, pick.slug)
      .then((content) => {
        if (!alive) return;
        setText(content.chapters[pick.chapter - 1]?.[pick.verse - 1] ?? null);
      })
      .catch(console.error);
    return () => {
      alive = false;
    };
  }, [book, version, pick.slug, pick.chapter, pick.verse]);

  if (!book) {
    return <div className="h-[62vh] min-h-[420px] animate-pulse bg-ink-900 md:h-[68vh]" />;
  }

  const theme = GROUP_THEME[book.group];

  return (
    <section className="relative flex h-[62vh] min-h-[440px] items-end overflow-hidden md:h-[70vh]">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(90% 80% at 70% 20%, ${theme.from}cc 0%, ${theme.to} 45%, #08080b 82%)`,
        }}
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-transparent" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/20 to-transparent" />

      <div className="relative mx-auto w-full max-w-[1500px] px-4 pb-10 md:px-8 md:pb-16">
        <div className="max-w-2xl animate-[rise_0.5s_cubic-bezier(0.16,1,0.3,1)]">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-gold-300">
            Versículo do dia
          </span>

          <blockquote className="mt-5 font-reading text-[1.6rem] font-medium leading-[1.3] text-white drop-shadow-lg md:text-[2.6rem] md:leading-[1.2]">
            {text ? `“${text}”` : <span className="inline-block h-9 w-80 max-w-full animate-pulse rounded bg-white/15" />}
          </blockquote>

          <p className="mt-4 font-display text-base font-semibold text-white/85 md:text-lg">
            {book.name} {pick.chapter}:{pick.verse}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href={`/livro/${book.slug}/${pick.chapter}?v=${pick.verse}`}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-display text-sm font-bold text-ink-950 transition-transform hover:scale-[1.03] active:scale-95"
            >
              <Play size={18} className="fill-ink-950" />
              Ler agora
            </Link>
            <Link
              href={`/livro/${book.slug}`}
              className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-6 py-3 font-display text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/25"
            >
              <Info size={18} />
              Sobre {book.name}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
