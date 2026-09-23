"use client";

import { useEffect, useRef, useState } from "react";
import { Trash2, X } from "lucide-react";
import { deleteNote, saveNote, type Note } from "@/lib/db";
import type { VersionId } from "@/lib/bible";

export type NoteTarget = {
  slug: string;
  chapter: number;
  verse: number;
  text: string;
  label: string;
  version: VersionId;
};

export function NoteSheet({
  target,
  existing,
  onClose,
}: {
  target: NoteTarget;
  existing?: Note;
  onClose: () => void;
}) {
  const [body, setBody] = useState(existing?.body ?? "");
  const area = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    area.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = async () => {
    const trimmed = body.trim();
    if (!trimmed) {
      if (existing) await deleteNote(existing.ref);
    } else {
      await saveNote({
        slug: target.slug,
        chapter: target.chapter,
        verse: target.verse,
        body: trimmed,
        text: target.text,
        version: target.version,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 animate-fade bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg animate-rise rounded-t-2xl border border-[color:var(--rl-borda-2)] bg-ink-900 p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-2xl sm:rounded-2xl sm:pb-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-base font-bold text-[color:var(--rl-texto)]">
              {existing ? "Editar comentário" : "Novo comentário"}
            </h2>
            <p className="text-xs text-gold-400">{target.label}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-full p-1.5 text-ink-400 transition-colors hover:bg-[var(--rl-sutil-3)] hover:text-[color:var(--rl-texto)]"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mb-4 max-h-28 overflow-y-auto rounded-lg border-l-2 border-gold-500/60 bg-[var(--rl-sutil-1)] p-3 font-reading text-sm leading-relaxed text-ink-300">
          {target.text}
        </p>

        <textarea
          ref={area}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) void submit();
          }}
          rows={5}
          placeholder="O que esse versículo te disse hoje?"
          className="w-full resize-none rounded-xl border border-[color:var(--rl-borda-2)] bg-ink-850 p-3.5 text-[15px] leading-relaxed text-ink-100 outline-none transition-colors placeholder:text-[color:var(--rl-texto-mudo)] focus:border-gold-500/60"
        />

        <div className="mt-4 flex items-center gap-2">
          {existing && (
            <button
              onClick={async () => {
                await deleteNote(existing.ref);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10"
            >
              <Trash2 size={16} />
              Excluir
            </button>
          )}
          <button
            onClick={submit}
            className="ml-auto rounded-lg bg-gold-400 px-6 py-2.5 font-display text-sm font-bold text-ink-950 transition-colors hover:bg-gold-300"
          >
            Salvar
          </button>
        </div>

        <p className="mt-3 text-center text-[11px] text-[color:var(--rl-texto-mudo)]">
          Ctrl + Enter salva
        </p>
      </div>
    </div>
  );
}
