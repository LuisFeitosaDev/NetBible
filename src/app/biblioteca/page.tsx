"use client";

import Link from "next/link";
import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Highlighter, MessageSquareText, Trash2, BookMarked } from "lucide-react";
import { useBible } from "@/lib/store";
import { clearMarks, db, deleteNote } from "@/lib/db";
import { HIGHLIGHT_COLORS, type HighlightColor } from "@/lib/catalog";

type Tab = "marcacoes" | "comentarios";

export default function LibraryPage() {
  const { bySlug } = useBible();
  const [tab, setTab] = useState<Tab>("marcacoes");
  const [colorFilter, setColorFilter] = useState<HighlightColor | null>(null);

  const marks = useLiveQuery(
    () => db.marks.orderBy("createdAt").reverse().toArray(),
    [],
  );
  const notes = useLiveQuery(
    () => db.notes.orderBy("updatedAt").reverse().toArray(),
    [],
  );

  const visibleMarks = (marks ?? []).filter(
    (m) => !colorFilter || m.color === colorFilter,
  );

  const counts = {
    marcacoes: marks?.length ?? 0,
    comentarios: notes?.length ?? 0,
  };

  return (
    <div className="mx-auto max-w-3xl px-4 pt-8 md:px-6">
      <h1 className="font-display text-3xl font-black tracking-tight md:text-4xl">
        Minha biblioteca
      </h1>
      <p className="mt-1.5 text-sm text-ink-400">
        Tudo que você marcou e comentou, guardado neste dispositivo.
      </p>

      <div className="mt-6 flex gap-1 rounded-xl border border-white/8 bg-ink-900 p-1">
        {(
          [
            ["marcacoes", "Marcações", Highlighter],
            ["comentarios", "Comentários", MessageSquareText],
          ] as const
        ).map(([id, label, Icon]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-colors ${
              tab === id ? "bg-white/12 text-white" : "text-ink-400 hover:text-white"
            }`}
          >
            <Icon size={16} />
            {label}
            <span className="rounded-full bg-white/10 px-1.5 text-[11px]">
              {counts[id]}
            </span>
          </button>
        ))}
      </div>

      {tab === "marcacoes" && (
        <>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setColorFilter(null)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                colorFilter === null
                  ? "bg-white text-ink-950"
                  : "bg-white/8 text-ink-300 hover:bg-white/14"
              }`}
            >
              Todas
            </button>
            {HIGHLIGHT_COLORS.map((c) => {
              const n = (marks ?? []).filter((m) => m.color === c.id).length;
              return (
                <button
                  key={c.id}
                  onClick={() => setColorFilter(colorFilter === c.id ? null : (c.id as HighlightColor))}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    colorFilter === c.id
                      ? "bg-white text-ink-950"
                      : "bg-white/8 text-ink-300 hover:bg-white/14"
                  }`}
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.hex }} />
                  {n}
                </button>
              );
            })}
          </div>

          <div className="mt-4 space-y-2.5 pb-16">
            {visibleMarks.length === 0 && (
              <Empty
                icon={Highlighter}
                title="Nenhuma marcação ainda"
                hint="Abra um capítulo, toque num versículo e escolha uma cor."
              />
            )}
            {visibleMarks.map((mark) => {
              const book = bySlug.get(mark.slug);
              const color = HIGHLIGHT_COLORS.find((c) => c.id === mark.color);
              return (
                <div
                  key={mark.ref}
                  className="group relative rounded-xl border border-white/6 bg-ink-900 p-4 transition-colors hover:border-white/18"
                  style={{ borderLeft: `3px solid ${color?.hex ?? "#fff"}` }}
                >
                  <Link href={`/livro/${mark.slug}/${mark.chapter}?v=${mark.verse}`} className="block">
                    <p className="mb-1.5 font-display text-[13px] font-bold text-gold-400">
                      {book?.name ?? mark.slug} {mark.chapter}:{mark.verse}
                    </p>
                    <p className="pr-8 font-reading text-[15px] leading-relaxed text-ink-100/90">
                      {mark.text}
                    </p>
                  </Link>
                  <button
                    onClick={() => clearMarks([mark.ref])}
                    aria-label="Remover marcação"
                    className="absolute right-3 top-3 rounded-full p-1.5 text-ink-600 opacity-0 transition-all hover:bg-white/10 hover:text-red-400 focus:opacity-100 group-hover:opacity-100"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}

      {tab === "comentarios" && (
        <div className="mt-5 space-y-2.5 pb-16">
          {(notes ?? []).length === 0 && (
            <Empty
              icon={MessageSquareText}
              title="Nenhum comentário ainda"
              hint="Selecione um versículo no leitor e toque em Comentar."
            />
          )}
          {(notes ?? []).map((note) => {
            const book = bySlug.get(note.slug);
            return (
              <div
                key={note.ref}
                className="group relative rounded-xl border border-white/6 bg-ink-900 p-4 transition-colors hover:border-white/18"
              >
                <Link href={`/livro/${note.slug}/${note.chapter}?v=${note.verse}`} className="block">
                  <p className="mb-1.5 font-display text-[13px] font-bold text-gold-400">
                    {book?.name ?? note.slug} {note.chapter}:{note.verse}
                  </p>
                  <p className="mb-3 border-l-2 border-white/12 pl-3 font-reading text-[13px] leading-relaxed text-ink-400">
                    {note.text}
                  </p>
                  <p className="whitespace-pre-wrap pr-8 text-[15px] leading-relaxed text-ink-100">
                    {note.body}
                  </p>
                  <p className="mt-2.5 text-[11px] text-ink-600">
                    {new Date(note.updatedAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </Link>
                <button
                  onClick={() => deleteNote(note.ref)}
                  aria-label="Excluir comentário"
                  className="absolute right-3 top-3 rounded-full p-1.5 text-ink-600 opacity-0 transition-all hover:bg-white/10 hover:text-red-400 focus:opacity-100 group-hover:opacity-100"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Empty({
  icon: Icon,
  title,
  hint,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center">
      <Icon size={30} className="mx-auto text-ink-600" />
      <p className="mt-4 font-display text-base font-bold text-ink-300">{title}</p>
      <p className="mx-auto mt-1.5 max-w-xs text-sm text-ink-400">{hint}</p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-white/18"
      >
        <BookMarked size={16} />
        Escolher um livro
      </Link>
    </div>
  );
}
