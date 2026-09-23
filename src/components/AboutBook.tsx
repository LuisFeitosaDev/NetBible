"use client";

import Link from "next/link";
import { PenLine, CalendarDays, Users, BookType, Quote } from "lucide-react";
import type { BookMeta } from "@/lib/bible";
import { ABOUT } from "@/lib/about";
import { GROUP_THEME } from "@/lib/catalog";

/** Ficha completa: aparece na página do livro, abaixo da capa. */
export function AboutBook({ book }: { book: BookMeta }) {
  const about = ABOUT[book.slug];
  if (!about) return null;

  const theme = GROUP_THEME[book.group];

  return (
    <section className="mx-auto max-w-[1500px] px-4 pb-4 md:px-8">
      <h2 className="mb-4 font-display text-lg font-bold md:text-xl">Sobre o livro</h2>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-2xl border border-white/6 bg-ink-900 p-5">
          <p className="font-reading text-[15px] leading-relaxed text-ink-100/90 md:text-base">
            {about.contexto}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {about.temas.map((tema) => (
              <span
                key={tema}
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: `${theme.accent}1f`, color: theme.accent }}
              >
                {tema}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <dl className="rounded-2xl border border-white/6 bg-ink-900 p-5">
            <Fact icon={PenLine} label="Autor" value={about.autor} />
            <Fact icon={CalendarDays} label="Quando" value={about.quando} />
            <Fact icon={Users} label="Para quem" value={about.publico} />
            <Fact icon={BookType} label="Gênero" value={about.genero} />
          </dl>

          <Link
            href={`/livro/${book.slug}/${about.chave.c}?v=${about.chave.v}`}
            className="group block rounded-2xl border border-gold-500/25 bg-gold-500/8 p-5 transition-colors hover:bg-gold-500/14"
          >
            <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gold-400">
              <Quote size={13} />
              Versículo-chave
            </span>
            <p className="mt-2 font-display text-lg font-bold text-white">
              {book.name} {about.chave.c}:{about.chave.v}
            </p>
            <p className="mt-1 text-[13px] text-ink-400 group-hover:text-ink-300">
              Abrir no leitor
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 border-b border-[color:var(--rl-borda-1)] py-3 first:pt-0 last:border-0 last:pb-0">
      <Icon size={15} className="mt-0.5 shrink-0 text-ink-400" />
      <div>
        <dt className="text-[11px] font-bold uppercase tracking-wider text-ink-400">
          {label}
        </dt>
        <dd className="mt-0.5 text-[13px] leading-relaxed text-ink-100">{value}</dd>
      </div>
    </div>
  );
}

/** Versão compacta, para o painel que abre dentro do leitor. */
export function AboutSheet({ book, onClose }: { book: BookMeta; onClose: () => void }) {
  const about = ABOUT[book.slug];
  const theme = GROUP_THEME[book.group];

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 animate-fade bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative max-h-[85vh] w-full max-w-lg animate-rise overflow-y-auto rounded-t-2xl border border-[color:var(--rl-borda-2)] bg-ink-900 p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-2xl sm:rounded-2xl sm:pb-5">
        <h2 className="font-display text-2xl font-black tracking-tight text-[color:var(--rl-texto)]">{book.name}</h2>

        {about ? (
          <>
            <p className="mt-1 text-[13px] text-ink-400">
              {about.genero} · {about.quando}
            </p>

            <p className="mt-4 font-reading text-[15px] leading-relaxed text-ink-100/90">
              {about.contexto}
            </p>

            <dl className="mt-4 rounded-xl bg-[var(--rl-sutil-1)] p-4">
              <Fact icon={PenLine} label="Autor" value={about.autor} />
              <Fact icon={Users} label="Para quem" value={about.publico} />
            </dl>

            <div className="mt-4 flex flex-wrap gap-2">
              {about.temas.map((tema) => (
                <span
                  key={tema}
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ background: `${theme.accent}1f`, color: theme.accent }}
                >
                  {tema}
                </span>
              ))}
            </div>
          </>
        ) : (
          <p className="mt-4 text-sm text-ink-400">
            A ficha deste livro ainda não foi escrita.
          </p>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-[var(--rl-sutil-3)] py-3 font-display text-sm font-bold text-[color:var(--rl-texto)] transition-colors hover:bg-[var(--rl-borda-4)]"
        >
          Voltar à leitura
        </button>
      </div>
    </div>
  );
}
