"use client";

import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { Play } from "lucide-react";
import type { BookMeta } from "@/lib/bible";
import { citationLabel } from "@/lib/bible";
import { GROUP_THEME, SYNOPSIS } from "@/lib/catalog";
import { hasCover, posterUrl, wideUrl } from "@/lib/covers.generated";
import { db } from "@/lib/db";

/**
 * Capa do livro: gravura de Doré quando existe, gradiente do grupo quando não.
 * O gradiente fica sempre no fundo — é o placeholder enquanto a imagem carrega
 * e o resultado final nos livros sem arte.
 */
export function BookArt({
  book,
  className = "",
  /** "corner" para os cards; "right" quando a arte é fundo de página e o texto fica à esquerda. */
  focus = "corner",
  /** "poster" é 2:3 (cards); "wide" é 16:9 (fundo de página). */
  shape = "poster",
  children,
}: {
  book: BookMeta;
  className?: string;
  focus?: "corner" | "right";
  shape?: "poster" | "wide";
  children?: React.ReactNode;
}) {
  const theme = GROUP_THEME[book.group];
  const origin = focus === "right" ? "78% 18%" : "18% 8%";
  const art = hasCover(book.slug);
  // Sem `relative` aqui: quem chama define o posicionamento (os cards usam
  // relative, o fundo de página usa absolute) e no Tailwind v4 a ordem das
  // classes não decide quem vence.
  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{
        backgroundImage: `radial-gradient(120% 90% at ${origin}, ${theme.from}f2 0%, ${theme.to} 62%, #08080b 100%)`,
      }}
    >
      {art ? (
        <img
          src={shape === "wide" ? wideUrl(book.slug) : posterUrl(book.slug)}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        // Sem gravura, a sigla vira o elemento gráfico da capa.
        <span
          aria-hidden
          className="pointer-events-none absolute -right-2 top-0 select-none font-display text-[5.25rem] font-black leading-[0.85] tracking-tighter text-white/15"
        >
          {citationLabel(book)}
        </span>
      )}

      {/* A gravura é quase monocromática; o tom do grupo volta por cima dela. */}
      {art && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          style={{ backgroundColor: theme.from, opacity: 0.38 }}
        />
      )}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {children}
    </div>
  );
}

function useProgress(slug: string, totalChapters: number) {
  const reading = useLiveQuery(() => db.reading.get(slug), [slug]);
  const done = reading?.done.length ?? 0;
  return {
    pct: totalChapters ? Math.round((done / totalChapters) * 100) : 0,
    lastChapter: reading?.lastChapter ?? 1,
    started: Boolean(reading),
  };
}

/** Pôster vertical, o formato padrão das prateleiras. */
export function BookCard({ book }: { book: BookMeta }) {
  const chapters = book.verses.length;
  const { pct } = useProgress(book.slug, chapters);

  return (
    <Link
      href={`/livro/${book.slug}`}
      className="group relative block w-[144px] shrink-0 sm:w-[170px]"
    >
      <BookArt
        book={book}
        className="relative aspect-[2/3] rounded-xl ring-1 ring-white/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:ring-white/35 group-hover:shadow-2xl group-hover:shadow-black/60"
      >
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-3 pt-10">
          <h3 className="font-display text-[15px] font-bold leading-tight text-white">
            {book.name}
          </h3>
          <p className="mt-0.5 text-[11px] text-white/60">
            {chapters} {chapters === 1 ? "capítulo" : "capítulos"}
          </p>
        </div>

        {pct > 0 && (
          <div className="absolute inset-x-3 bottom-[52px] h-[3px] overflow-hidden rounded-full bg-white/25">
            <div className="h-full rounded-full bg-gold-400" style={{ width: `${pct}%` }} />
          </div>
        )}
      </BookArt>
    </Link>
  );
}

/** Card largo de "Continue lendo", com o capítulo exato onde parou. */
export function ResumeCard({ book }: { book: BookMeta }) {
  const chapters = book.verses.length;
  const { pct, lastChapter } = useProgress(book.slug, chapters);

  return (
    <Link
      href={`/livro/${book.slug}/${lastChapter}`}
      className="group relative block w-[260px] shrink-0 sm:w-[300px]"
    >
      <BookArt
        book={book}
        shape="wide"
        className="relative aspect-video rounded-xl ring-1 ring-white/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:ring-white/35"
      >
        <div className="absolute inset-0 grid place-items-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/40 transition-transform duration-300 group-hover:scale-110">
            <Play size={18} className="ml-0.5 fill-white text-white" />
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-3 pt-8">
          <p className="font-display text-sm font-bold text-white">
            {book.name} {lastChapter}
          </p>
          <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-white/25">
            <div className="h-full rounded-full bg-gold-400" style={{ width: `${Math.max(pct, 4)}%` }} />
          </div>
        </div>
      </BookArt>
    </Link>
  );
}

export function bookSynopsis(book: BookMeta) {
  return SYNOPSIS[book.slug] ?? `${book.verses.length} capítulos do ${book.testament === "VT" ? "Antigo" : "Novo"} Testamento.`;
}
