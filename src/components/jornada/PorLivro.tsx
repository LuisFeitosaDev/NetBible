"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown, Highlighter, MessageSquareText, Trash2 } from "lucide-react";
import { GROUP_THEME, HIGHLIGHT_COLORS } from "@/lib/catalog";
import { clearMarks, deleteNote, type Mark, type Note, type Reading } from "@/lib/db";
import type { BookMeta } from "@/lib/bible";
import { MapaDaLeitura } from "./MapaDaLeitura";

/**
 * A jornada vista livro a livro.
 *
 * O mosaico em cima serve de índice e de retrato. Abaixo ficam só os livros em
 * que há alguma coisa sua, marcação, comentário ou leitura, cada um abrindo
 * para mostrar o conteúdo agrupado por capítulo. Listar os 66 aqui encheria a
 * tela de cartões vazios.
 */
export function PorLivro({
  livros,
  marks,
  notes,
  reading,
}: {
  livros: BookMeta[];
  marks: Mark[];
  notes: Note[];
  reading: Reading[];
}) {
  const [aberto, setAberto] = useState<string | null>(null);

  const lidosPorLivro = useMemo(
    () => new Map(reading.map((r) => [r.slug, r.done.length])),
    [reading],
  );

  const porLivro = useMemo(() => {
    const mapa = new Map<string, { marcas: Mark[]; notas: Note[] }>();
    const pegar = (slug: string) => {
      let atual = mapa.get(slug);
      if (!atual) mapa.set(slug, (atual = { marcas: [], notas: [] }));
      return atual;
    };
    for (const m of marks) pegar(m.slug).marcas.push(m);
    for (const n of notes) pegar(n.slug).notas.push(n);
    return mapa;
  }, [marks, notes]);

  const comAnotacao = useMemo(() => new Set(porLivro.keys()), [porLivro]);

  /* Ordem: o que tem anotação primeiro, depois o que só foi lido, e dentro de
     cada grupo a ordem da Bíblia, que é a que a pessoa tem na cabeça. */
  const comConteudo = useMemo(
    () =>
      livros
        .filter((l) => porLivro.has(l.slug) || (lidosPorLivro.get(l.slug) ?? 0) > 0)
        .sort((a, b) => {
          const pa = porLivro.has(a.slug) ? 0 : 1;
          const pb = porLivro.has(b.slug) ? 0 : 1;
          return pa - pb || a.position - b.position;
        }),
    [livros, porLivro, lidosPorLivro],
  );

  return (
    <div className="space-y-6 pb-16">
      <section className="rounded-2xl border border-white/8 bg-ink-900/60 p-3">
        <MapaDaLeitura
          livros={livros}
          lidosPorLivro={lidosPorLivro}
          comAnotacao={comAnotacao}
          selecionado={aberto}
          aoEscolher={(slug) => setAberto((a) => (a === slug ? null : slug))}
        />
      </section>

      {comConteudo.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-white/10 py-14 text-center text-sm text-ink-400">
          Quando você ler, marcar ou comentar, os livros aparecem aqui.
        </p>
      ) : (
        <div className="space-y-2.5">
          {comConteudo.map((livro) => (
            <CartaoDoLivro
              key={livro.slug}
              livro={livro}
              marcas={porLivro.get(livro.slug)?.marcas ?? []}
              notas={porLivro.get(livro.slug)?.notas ?? []}
              lidos={lidosPorLivro.get(livro.slug) ?? 0}
              aberto={aberto === livro.slug}
              aoAlternar={() =>
                setAberto((a) => (a === livro.slug ? null : livro.slug))
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CartaoDoLivro({
  livro,
  marcas,
  notas,
  lidos,
  aberto,
  aoAlternar,
}: {
  livro: BookMeta;
  marcas: Mark[];
  notas: Note[];
  lidos: number;
  aberto: boolean;
  aoAlternar: () => void;
}) {
  const tema = GROUP_THEME[livro.group];
  const fracao = lidos / livro.verses.length;

  /* Marcações e comentários do mesmo capítulo moram juntos: é assim que a
     pessoa lembra deles, "o que eu anotei em João 3", não "minha 4ª marcação". */
  const porCapitulo = useMemo(() => {
    const mapa = new Map<number, { marcas: Mark[]; notas: Note[] }>();
    const pegar = (c: number) => {
      let atual = mapa.get(c);
      if (!atual) mapa.set(c, (atual = { marcas: [], notas: [] }));
      return atual;
    };
    for (const m of marcas) pegar(m.chapter).marcas.push(m);
    for (const n of notas) pegar(n.chapter).notas.push(n);
    for (const grupo of mapa.values()) {
      grupo.marcas.sort((a, b) => a.verse - b.verse);
      grupo.notas.sort((a, b) => a.verse - b.verse);
    }
    return [...mapa.entries()].sort((a, b) => a[0] - b[0]);
  }, [marcas, notas]);

  return (
    <div
      className="overflow-hidden rounded-2xl border border-white/8 bg-ink-900"
      style={{ borderLeft: `3px solid ${tema.accent}` }}
    >
      <button
        onClick={aoAlternar}
        aria-expanded={aberto}
        className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-white/[0.03]"
      >
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-[15px] font-bold">{livro.name}</p>
          <div className="mt-1.5 flex items-center gap-3 text-[11px] text-ink-400">
            <span className="font-mono">
              {lidos}/{livro.verses.length} cap.
            </span>
            {marcas.length > 0 && (
              <span className="inline-flex items-center gap-1">
                <Highlighter size={11} />
                {marcas.length}
              </span>
            )}
            {notas.length > 0 && (
              <span className="inline-flex items-center gap-1">
                <MessageSquareText size={11} />
                {notas.length}
              </span>
            )}
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full transition-[width]"
              style={{
                width: `${fracao * 100}%`,
                background: `linear-gradient(90deg, ${tema.from}, ${tema.accent})`,
              }}
            />
          </div>
        </div>
        <ChevronDown
          size={16}
          className={`shrink-0 text-ink-500 transition-transform ${aberto ? "rotate-180" : ""}`}
        />
      </button>

      {aberto && (
        <div className="animate-fade border-t border-white/6 px-4 pb-4 pt-3">
          {porCapitulo.length === 0 ? (
            <p className="py-3 text-[13px] text-ink-500">
              Você leu {lidos} {lidos === 1 ? "capítulo" : "capítulos"} daqui, sem
              marcar nada ainda.{" "}
              <Link
                href={`/livro/${livro.slug}`}
                className="font-semibold text-gold-400 hover:underline"
              >
                Continuar
              </Link>
            </p>
          ) : (
            <div className="space-y-4">
              {porCapitulo.map(([capitulo, grupo]) => (
                <div key={capitulo}>
                  <Link
                    href={`/livro/${livro.slug}/${capitulo}`}
                    className="mb-2 inline-flex items-center gap-1.5 font-display text-[11px] font-bold uppercase tracking-[0.14em] text-ink-500 transition-colors hover:text-white"
                  >
                    Capítulo {capitulo}
                  </Link>
                  <div className="space-y-2">
                    {grupo.marcas.map((m) => (
                      <LinhaMarca key={m.ref} livro={livro} marca={m} />
                    ))}
                    {grupo.notas.map((n) => (
                      <LinhaNota key={n.ref} livro={livro} nota={n} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function LinhaMarca({ livro, marca }: { livro: BookMeta; marca: Mark }) {
  const cor = HIGHLIGHT_COLORS.find((c) => c.id === marca.color);
  return (
    <div className="group relative rounded-lg bg-white/[0.03] py-2 pl-3 pr-9">
      <Link
        href={`/livro/${livro.slug}/${marca.chapter}?v=${marca.verse}`}
        className="block"
      >
        <span
          aria-hidden
          className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full"
          style={{ backgroundColor: cor?.hex ?? "#fff" }}
        />
        <p className="font-reading text-[14px] leading-relaxed text-ink-100/90">
          <sup className="mr-1 font-sans text-[0.62em] font-bold text-gold-500">
            {marca.verse}
          </sup>
          {marca.text}
        </p>
      </Link>
      <BotaoApagar
        rotulo="Remover marcação"
        aoApagar={() => clearMarks([marca.ref])}
      />
    </div>
  );
}

function LinhaNota({ livro, nota }: { livro: BookMeta; nota: Note }) {
  return (
    <div className="group relative rounded-lg border border-gold-500/20 bg-gold-500/[0.06] py-2.5 pl-3 pr-9">
      <Link
        href={`/livro/${livro.slug}/${nota.chapter}?v=${nota.verse}`}
        className="block"
      >
        <p className="mb-1.5 border-l-2 border-white/12 pl-2.5 font-reading text-[12px] leading-relaxed text-ink-400">
          <sup className="mr-1 font-sans text-[0.68em] font-bold text-gold-500">
            {nota.verse}
          </sup>
          {nota.text}
        </p>
        <p className="whitespace-pre-wrap text-[13.5px] leading-relaxed text-ink-100">
          {nota.body}
        </p>
      </Link>
      <BotaoApagar
        rotulo="Excluir comentário"
        aoApagar={() => deleteNote(nota.ref)}
      />
    </div>
  );
}

function BotaoApagar({
  rotulo,
  aoApagar,
}: {
  rotulo: string;
  aoApagar: () => void;
}) {
  return (
    <button
      onClick={aoApagar}
      aria-label={rotulo}
      className="absolute right-1.5 top-1.5 rounded-full p-1.5 text-ink-600 opacity-0 transition-all hover:bg-white/10 hover:text-red-400 focus:opacity-100 group-hover:opacity-100"
    >
      <Trash2 size={13} />
    </button>
  );
}
