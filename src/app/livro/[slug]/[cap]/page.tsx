"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
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
  desmarcarCapitulo,
  getPref,
  markChapterRead,
  setMark,
  setPref,
  touchReading,
} from "@/lib/db";
import { NOME_NA_BARRA, type HighlightColor } from "@/lib/catalog";
import {
  CHAVE_TEMA_LEITURA,
  TEMA_LEITURA_PADRAO,
  type TemaLeitura,
} from "@/lib/temaLeitura";
import { VerseActions } from "@/components/VerseActions";
import { NoteSheet, type NoteTarget } from "@/components/NoteSheet";
import { VersionSwitch } from "@/components/VersionSwitch";
import { AboutSheet } from "@/components/AboutBook";
import { AmbienteLeitura } from "@/components/AmbienteLeitura";
import { CapituloHeader } from "@/components/CapituloHeader";
import { ControlesLeitura } from "@/components/ControlesLeitura";
import { SeletorPassagem } from "@/components/SeletorPassagem";

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
  const { index, bySlug, version, parallel, setParallel, parallelVersion } = useBible();
  const book = bySlug.get(slug);

  const [content, setContent] = useState<BookContent | null>(null);
  const [second, setSecond] = useState<BookContent | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [noteTarget, setNoteTarget] = useState<NoteTarget | null>(null);
  const [sizeStep, setSizeStep] = useState(1);
  const [temaLeitura, setTemaLeitura] = useState<TemaLeitura>(TEMA_LEITURA_PADRAO);
  /**
   * Só true quando o capítulo foi aberto a partir do plano de leitura (a
   * lista de "Hoje" na Jornada), via `?de=plano` na URL. Muda para onde a
   * seta de voltar aponta, e só nesse caso: abrindo pela Bíblia ou pela
   * página do livro, ela continua indo para o livro, como sempre foi.
   */
  const [vindoDoPlano, setVindoDoPlano] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [controlesOpen, setControlesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [focusVerse, setFocusVerse] = useState<number | null>(null);

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
    void getPref<TemaLeitura>(CHAVE_TEMA_LEITURA, TEMA_LEITURA_PADRAO).then(setTemaLeitura);
  }, []);

  // ?v=14 vem do versículo do dia e da biblioteca: rola até ele e pisca.
  // ?de=plano vem da lista de "Hoje" no plano de leitura, e muda para onde a
  // seta de voltar aponta.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = Number(params.get("v"));
    if (v > 0) setFocusVerse(v);
    setVindoDoPlano(params.get("de") === "plano");
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

  /*
   * Ler não é mais detectado por rolagem: marcar como lido ao chegar perto do
   * fim da tela confundia quem abria o capítulo só para conferir um
   * versículo, e a rolagem inteira já vinha visível de cara — o capítulo
   * aparecia como lido sem ter sido. Agora é um toque, no botão do fim do
   * capítulo (`BotaoCapituloLido`, abaixo).
   */
  const registroDeLeitura = useLiveQuery(() => db.reading.get(slug), [slug]);
  const capituloLido = registroDeLeitura?.done.includes(chapter) ?? false;

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

  const changeTema = (t: TemaLeitura) => {
    setTemaLeitura(t);
    void setPref(CHAVE_TEMA_LEITURA, t);
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
    <div className="pb-40" data-tema-leitura={temaLeitura}>
      <AmbienteLeitura book={book} tema={temaLeitura} />

      {/* Barra do leitor. Fundo semitransparente para o halo passar por trás. */}
      <header className="sticky top-0 z-40 border-b border-[color:var(--rl-borda-1)] bg-[var(--rl-header)] backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-3xl items-center gap-1 px-2.5 sm:px-3">
          <Link
            href={vindoDoPlano ? "/biblioteca" : `/livro/${slug}`}
            aria-label={vindoDoPlano ? "Voltar ao plano de leitura" : "Voltar ao livro"}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink-300 transition-colors hover:bg-[var(--rl-sutil-3)] hover:text-[color:var(--rl-texto)]"
          >
            <ArrowLeft size={19} />
          </Link>

          {/* `min-w-0` nos dois níveis: sem ele o flex respeita a largura do
              texto e "2 Tessalonicenses" empurra a barra em vez de cortar. */}
          <button
            onClick={() => setPickerOpen((v) => !v)}
            aria-expanded={pickerOpen}
            className="flex min-w-0 flex-1 items-center gap-1 rounded-lg px-1.5 py-1.5 text-left text-[color:var(--rl-texto)] transition-colors hover:bg-[var(--rl-sutil-3)]"
          >
            {/* Um ponto menor e mais apertado no celular: é o que faz
                "2 Tessalonicenses" caber inteiro em 375px. */}
            <span className="min-w-0 truncate font-display text-[15px] font-bold tracking-tight text-[color:var(--rl-texto)] sm:text-base sm:tracking-normal">
              <span className="sm:hidden">
                {NOME_NA_BARRA[book.slug] ?? book.name}
              </span>
              <span className="hidden sm:inline">{book.name}</span>
            </span>
            <span className="shrink-0 font-display text-[15px] font-bold text-gold-400 sm:text-base">
              {chapter}
            </span>
            <ChevronDown
              size={15}
              className={`shrink-0 text-ink-400 transition-transform ${pickerOpen ? "rotate-180" : ""}`}
            />
          </button>

          <div className="flex shrink-0 items-center gap-1">
            <button
              onClick={() => setAboutOpen(true)}
              aria-label={`Sobre ${book.name}`}
              className="grid h-8 w-8 place-items-center rounded-full text-ink-300 transition-colors hover:bg-[var(--rl-sutil-3)] hover:text-[color:var(--rl-texto)]"
            >
              <Info size={16} />
            </button>

            <ControlesLeitura
              aberto={controlesOpen}
              aoAlternar={setControlesOpen}
              passo={sizeStep}
              totalPassos={TEXT_SIZES.length}
              aoMudarTamanho={changeSize}
              tema={temaLeitura}
              aoMudarTema={changeTema}
              paralela={parallel}
              aoMudarParalela={setParallel}
            />

            <div className="flex items-center gap-1">
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

        {pickerOpen && index && (
          <SeletorPassagem
            index={index}
            livroAtual={book}
            capituloAtual={chapter}
            aoFechar={() => setPickerOpen(false)}
          />
        )}
      </header>

      {/* Fecha o seletor ao tocar na leitura, sem escurecer a página: o painel
          já é opaco e um véu por cima do texto pareceria um modal. */}
      {pickerOpen && (
        <div
          aria-hidden
          onClick={() => setPickerOpen(false)}
          className="fixed inset-0 z-30"
        />
      )}

      {/* Texto */}
      <article className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
        {/* A chave remonta o bloco a cada capítulo, que é o que faz a animação
            tocar de novo. Fica só no texto: o cabeçalho e a navegação não se
            mexem, e nada `fixed` cai dentro do transform. */}
        <div key={`${slug}-${chapter}`} className={`vira-${direcao}`}>
        <CapituloHeader
          book={book}
          capitulo={chapter}
          aoIrParaVersiculo={setFocusVerse}
          temaLeitura={temaLeitura}
        />


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
                  } ${isSelected ? "bg-[var(--rl-selecao)] ring-1 ring-[color:var(--rl-selecao-anel)]" : ""} ${
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
                  <p className="-mx-2 mb-2 border-l-2 border-[color:var(--rl-borda-2)] px-3 py-1 text-[0.82em] italic leading-relaxed text-ink-400">
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

        {/* Toque explícito, não rolagem: abrir o capítulo só para conferir um
            versículo não pode contar como "li o capítulo inteiro". */}
        <button
          onClick={() =>
            capituloLido ? desmarcarCapitulo(slug, chapter) : markChapterRead(slug, chapter)
          }
          aria-pressed={capituloLido}
          className={`mt-10 flex w-full items-center justify-center gap-2.5 rounded-xl border py-3.5 font-display text-[13.5px] font-bold transition-colors ${
            capituloLido
              ? "border-gold-400/40 bg-gold-400/10 text-gold-400"
              : "border-[color:var(--rl-borda-2)] bg-[var(--rl-sutil-2)] text-[color:var(--rl-texto)] hover:bg-[var(--rl-sutil-3)]"
          }`}
        >
          <span
            className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
              capituloLido
                ? "border-gold-400 bg-gold-400 text-ink-950"
                : "border-[color:var(--rl-borda-4)] text-transparent"
            }`}
          >
            <Check size={12} strokeWidth={3} />
          </span>
          {capituloLido
            ? `${book.name} ${chapter} marcado como lido`
            : `Marcar ${book.name} ${chapter} como lido`}
        </button>

        {/* Navegação entre capítulos */}
        <nav className="mt-14 flex items-center justify-between gap-3 border-t border-[color:var(--rl-borda-1)] pt-6">
          {chapter > 1 ? (
            <Link
              href={`/livro/${slug}/${chapter - 1}${vindoDoPlano ? "?de=plano" : ""}`}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--rl-sutil-3)] px-4 py-3 text-sm font-semibold text-[color:var(--rl-texto)] transition-colors hover:bg-[var(--rl-borda-4)]"
            >
              <ChevronLeft size={17} />
              Capítulo {chapter - 1}
            </Link>
          ) : (
            <span />
          )}
          {chapter < totalChapters ? (
            <Link
              href={`/livro/${slug}/${chapter + 1}${vindoDoPlano ? "?de=plano" : ""}`}
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
