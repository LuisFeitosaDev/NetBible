"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import {
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Columns2,
  Minus,
  Plus,
  Pencil,
  Info,
} from "lucide-react";
import {
  compactVerses,
  loadBook,
  refOf,
  type BookContent,
  type VersionId,
} from "@/lib/bible";
import { useBible } from "@/lib/store";
import {
  clearMarks,
  db,
  getPref,
  markChapterRead,
  setMark,
  setPref,
  touchReading,
} from "@/lib/db";
import type { HighlightColor } from "@/lib/catalog";
import { VerseActions } from "@/components/VerseActions";
import { NoteSheet, type NoteTarget } from "@/components/NoteSheet";
import { VersionSwitch } from "@/components/VersionSwitch";
import { AboutSheet } from "@/components/AboutBook";
import { AmbienteLeitura } from "@/components/AmbienteLeitura";

const TEXT_SIZES = ["text-[15px]", "text-[17px]", "text-[19px]", "text-[21px]", "text-[24px]"];

/**
 * Último capítulo aberto, guardado no módulo.
 *
 * Precisa sobreviver à remontagem do componente, que acontece toda vez que a
 * rota muda. Um `useRef` aqui nasceria já com o capítulo novo e a direção da
 * animação seria sempre "avança".
 */
let ultimaLeitura: { slug: string; chapter: number } | null = null;

export default function ReaderPage() {
  const { slug, cap } = useParams<{ slug: string; cap: string }>();
  const chapter = Number(cap);
  const router = useRouter();
  const { index, bySlug, version, parallel, setParallel, parallelVersion } = useBible();
  const book = bySlug.get(slug);

  const [content, setContent] = useState<BookContent | null>(null);
  const [second, setSecond] = useState<BookContent | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [noteTarget, setNoteTarget] = useState<NoteTarget | null>(null);
  const [sizeStep, setSizeStep] = useState(1);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [focusVerse, setFocusVerse] = useState<number | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  /*
   * Direção da virada: avançar entra pela direita, voltar pela esquerda.
   *
   * Calculada no inicializador do useState, e não num efeito, para a primeira
   * pintura já sair com a classe certa. O capítulo anterior vive fora do
   * componente (ver `ultimaLeitura`), porque trocar de capítulo é troca de
   * rota: o componente remonta e qualquer ref interno voltaria ao valor atual.
   */
  const [direcao] = useState<"avanca" | "volta">(() =>
    ultimaLeitura && ultimaLeitura.slug === slug && chapter < ultimaLeitura.chapter
      ? "volta"
      : "avanca",
  );

  useEffect(() => {
    ultimaLeitura = { slug, chapter };
  }, [slug, chapter]);

  const otherVersion: VersionId = parallelVersion;

  const marks = useLiveQuery(
    () => db.marks.where("[slug+chapter]").equals([slug, chapter]).toArray(),
    [slug, chapter],
  );
  const notes = useLiveQuery(
    () => db.notes.where("[slug+chapter]").equals([slug, chapter]).toArray(),
    [slug, chapter],
  );

  const markByVerse = useMemo(
    () => new Map((marks ?? []).map((m) => [m.verse, m])),
    [marks],
  );
  const noteByVerse = useMemo(
    () => new Map((notes ?? []).map((n) => [n.verse, n])),
    [notes],
  );

  useEffect(() => {
    void getPref<number>("textSize", 1).then(setSizeStep);
  }, []);

  // ?v=14 vem do versículo do dia e da biblioteca: rola até ele e pisca.
  useEffect(() => {
    const v = Number(new URLSearchParams(window.location.search).get("v"));
    if (v > 0) setFocusVerse(v);
  }, [slug, chapter]);

  useEffect(() => {
    let alive = true;
    setContent(null);
    setSelected([]);
    loadBook(version, slug)
      .then((c) => alive && setContent(c))
      .catch(console.error);
    return () => {
      alive = false;
    };
  }, [version, slug]);

  useEffect(() => {
    if (!parallel) {
      setSecond(null);
      return;
    }
    let alive = true;
    loadBook(otherVersion, slug)
      .then((c) => alive && setSecond(c))
      .catch(console.error);
    return () => {
      alive = false;
    };
  }, [parallel, otherVersion, slug]);

  useEffect(() => {
    if (!book) return;
    void touchReading(slug, chapter);
    window.scrollTo({ top: 0 });
  }, [book, slug, chapter]);

  // Chegou ao fim do capítulo: conta como lido.
  useEffect(() => {
    const el = endRef.current;
    if (!el || !content) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void markChapterRead(slug, chapter);
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [content, slug, chapter]);

  useEffect(() => {
    if (!focusVerse) return;
    const el = document.getElementById(`v-${focusVerse}`);
    if (!el) return;
    el.scrollIntoView({ block: "center", behavior: "smooth" });
    const timer = setTimeout(() => setFocusVerse(null), 2600);
    return () => clearTimeout(timer);
  }, [focusVerse, content]);

  const verses = content?.chapters[chapter - 1] ?? [];
  const secondVerses = second?.chapters[chapter - 1] ?? [];
  const totalChapters = book?.verses.length ?? 0;

  const label = book
    ? `${book.name} ${chapter}${selected.length ? `:${compactVerses(selected)}` : ""}`
    : "";

  const toggleVerse = useCallback((n: number) => {
    setSelected((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n].sort((a, b) => a - b),
    );
  }, []);

  const selectionText = () =>
    selected.map((n) => verses[n - 1]).filter(Boolean).join(" ");

  const shareBody = () => {
    const short = index?.versions.find((v) => v.id === version)?.short ?? "";
    return `“${selectionText()}”\n— ${label} (${short})`;
  };

  const applyColor = async (color: HighlightColor) => {
    await Promise.all(
      selected.map((n) =>
        setMark({
          slug,
          chapter,
          verse: n,
          color,
          text: verses[n - 1] ?? "",
          version,
        }),
      ),
    );
    setSelected([]);
  };

  const removeMarks = async () => {
    await clearMarks(selected.map((n) => refOf(slug, chapter, n)));
    setSelected([]);
  };

  const openNote = () => {
    const verse = selected[0];
    if (!verse || !book) return;
    setNoteTarget({
      slug,
      chapter,
      verse,
      text: verses[verse - 1] ?? "",
      label: `${book.name} ${chapter}:${verse}`,
      version,
    });
  };

  const changeSize = (delta: number) => {
    const next = Math.min(TEXT_SIZES.length - 1, Math.max(0, sizeStep + delta));
    setSizeStep(next);
    void setPref("textSize", next);
  };

  if (!book || !content) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 px-5 pt-28">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-5 animate-pulse rounded bg-ink-850" style={{ width: `${70 + (i % 4) * 8}%` }} />
        ))}
      </div>
    );
  }

  const selectionColor = selected.length
    ? markByVerse.get(selected[0])?.color
    : undefined;
  const selectionHasMarks = selected.some((n) => markByVerse.has(n));

  return (
    <div className="pb-40">
      <AmbienteLeitura book={book} />

      {/* Barra do leitor. Fundo semitransparente para o halo passar por trás. */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0b0a0e]/75 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-3xl items-center gap-2 px-3">
          <Link
            href={`/livro/${slug}`}
            aria-label="Voltar ao livro"
            className="grid h-9 w-9 place-items-center rounded-full text-ink-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={19} />
          </Link>

          <button
            onClick={() => setPickerOpen((v) => !v)}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 font-display text-base font-bold transition-colors hover:bg-white/10"
          >
            {book.name} {chapter}
            <ChevronDown size={16} className={`transition-transform ${pickerOpen ? "rotate-180" : ""}`} />
          </button>

          <div className="ml-auto flex items-center gap-1">
            <button
              onClick={() => setAboutOpen(true)}
              aria-label={`Sobre ${book.name}`}
              className="grid h-8 w-8 place-items-center rounded-full text-ink-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Info size={16} />
            </button>
            <button
              onClick={() => changeSize(-1)}
              disabled={sizeStep === 0}
              aria-label="Diminuir texto"
              className="grid h-8 w-8 place-items-center rounded-full text-ink-300 transition-colors enabled:hover:bg-white/10 enabled:hover:text-white disabled:opacity-25"
            >
              <Minus size={15} />
            </button>
            <button
              onClick={() => changeSize(1)}
              disabled={sizeStep === TEXT_SIZES.length - 1}
              aria-label="Aumentar texto"
              className="grid h-8 w-8 place-items-center rounded-full text-ink-300 transition-colors enabled:hover:bg-white/10 enabled:hover:text-white disabled:opacity-25"
            >
              <Plus size={15} />
            </button>
            <button
              onClick={() => setParallel(!parallel)}
              aria-label="Leitura paralela"
              aria-pressed={parallel}
              className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${
                parallel ? "bg-gold-400 text-ink-950" : "text-ink-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Columns2 size={16} />
            </button>
            <div className="ml-1 flex items-center gap-1">
              <VersionSwitch />
              {parallel && (
                <>
                  <span className="text-xs text-ink-600">/</span>
                  <VersionSwitch alvo="paralela" />
                </>
              )}
            </div>
          </div>
        </div>

        {pickerOpen && (
          <div className="max-h-[50vh] animate-fade overflow-y-auto border-t border-white/5 bg-ink-900 p-3">
            <div className="mx-auto grid max-w-3xl grid-cols-[repeat(auto-fill,minmax(52px,1fr))] gap-2">
              {Array.from({ length: totalChapters }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => {
                    setPickerOpen(false);
                    router.push(`/livro/${slug}/${n}`);
                  }}
                  className={`aspect-square rounded-lg font-display text-sm font-bold transition-colors ${
                    n === chapter
                      ? "bg-gold-400 text-ink-950"
                      : "bg-ink-850 text-ink-100 hover:bg-ink-700"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Texto */}
      <article className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
        {/* A chave remonta o bloco a cada capítulo, que é o que faz a animação
            tocar de novo. Fica só no texto: o cabeçalho e a navegação não se
            mexem, e nada `fixed` cai dentro do transform. */}
        <div key={`${slug}-${chapter}`} className={`vira-${direcao}`}>
        <h1 className="mb-8 text-center">
          <span className="block font-display text-xs font-bold uppercase tracking-[0.2em] text-ink-400">
            {book.name}
          </span>
          <span className="mt-1 block font-display text-5xl font-black tracking-tight">
            {chapter}
          </span>
        </h1>

        <div
          className={`font-reading ${TEXT_SIZES[sizeStep]} leading-[1.85] text-leitura`}
        >
          {verses.map((text, i) => {
            const n = i + 1;
            const mark = markByVerse.get(n);
            const note = noteByVerse.get(n);
            const isSelected = selected.includes(n);

            return (
              <div key={n} id={`v-${n}`} className="scroll-mt-24">
                <p
                  onClick={() => toggleVerse(n)}
                  className={`-mx-2 cursor-pointer rounded-md px-2 py-0.5 transition-colors ${
                    mark ? `mark-${mark.color}` : ""
                  } ${isSelected ? "bg-white/15 ring-1 ring-white/30" : ""} ${
                    focusVerse === n ? "animate-pulse bg-gold-400/25" : ""
                  }`}
                >
                  <sup className="mr-1.5 select-none font-sans text-[0.62em] font-bold text-gold-500">
                    {n}
                  </sup>
                  {text}
                  {note && (
                    <Pencil
                      size={12}
                      className="ml-1.5 inline-block -translate-y-0.5 text-gold-400"
                    />
                  )}
                </p>

                {parallel && secondVerses[i] && (
                  <p className="-mx-2 mb-2 border-l-2 border-white/10 px-3 py-1 text-[0.82em] italic leading-relaxed text-ink-400">
                    {secondVerses[i]}
                  </p>
                )}

                {note && (
                  <button
                    onClick={() =>
                      setNoteTarget({
                        slug,
                        chapter,
                        verse: n,
                        text,
                        label: `${book.name} ${chapter}:${n}`,
                        version,
                      })
                    }
                    className="my-2 block w-full rounded-lg border-l-2 border-gold-500 bg-gold-500/8 p-3 text-left font-sans text-[13px] leading-relaxed text-ink-300 transition-colors hover:bg-gold-500/14"
                  >
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-gold-400">
                      Seu comentário
                    </span>
                    {note.body}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        </div>

        <div ref={endRef} className="h-px" />

        {/* Navegação entre capítulos */}
        <nav className="mt-14 flex items-center justify-between gap-3 border-t border-white/5 pt-6">
          {chapter > 1 ? (
            <Link
              href={`/livro/${slug}/${chapter - 1}`}
              className="inline-flex items-center gap-2 rounded-lg bg-ink-850 px-4 py-3 text-sm font-semibold transition-colors hover:bg-ink-800"
            >
              <ChevronLeft size={17} />
              Capítulo {chapter - 1}
            </Link>
          ) : (
            <span />
          )}
          {chapter < totalChapters ? (
            <Link
              href={`/livro/${slug}/${chapter + 1}`}
              className="inline-flex items-center gap-2 rounded-lg bg-gold-400 px-4 py-3 text-sm font-bold text-ink-950 transition-colors hover:bg-gold-300"
            >
              Capítulo {chapter + 1}
              <ChevronRight size={17} />
            </Link>
          ) : (
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-gold-400 px-4 py-3 text-sm font-bold text-ink-950 transition-colors hover:bg-gold-300"
            >
              Fim de {book.name}
              <ChevronRight size={17} />
            </Link>
          )}
        </nav>
      </article>

      {selected.length > 0 && (
        <VerseActions
          count={selected.length}
          label={label}
          activeColor={selectionColor}
          hasMarks={selectionHasMarks}
          onColor={applyColor}
          onClearMarks={removeMarks}
          onNote={openNote}
          onCopy={async () => {
            await navigator.clipboard.writeText(shareBody());
          }}
          onShare={async () => {
            const body = shareBody();
            if (navigator.share) {
              try {
                await navigator.share({ title: label, text: body });
                return;
              } catch {
                /* usuário cancelou */
              }
            }
            await navigator.clipboard.writeText(body);
          }}
          onClose={() => setSelected([])}
        />
      )}

      {aboutOpen && <AboutSheet book={book} onClose={() => setAboutOpen(false)} />}

      {noteTarget && (
        <NoteSheet
          target={noteTarget}
          existing={noteByVerse.get(noteTarget.verse)}
          onClose={() => {
            setNoteTarget(null);
            setSelected([]);
          }}
        />
      )}
    </div>
  );
}
