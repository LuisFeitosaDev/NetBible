"use client";

import { useState } from "react";
import { ChevronDown, Quote } from "lucide-react";
import { fichaDoCapitulo } from "@/lib/capitulos";
import { arteDoCapitulo, temArteDeCapitulo } from "@/lib/capitulos.generated";
import { GROUP_THEME } from "@/lib/catalog";
import type { BookMeta } from "@/lib/bible";

/**
 * Abertura do capítulo: arte, número e visão geral.
 *
 * Substitui o título simples quando existe ficha ou arte para aquele capítulo.
 * Sem nenhum dos dois, quem chama continua desenhando o cabeçalho antigo, e é
 * assim que os 1.185 capítulos ainda sem material seguem funcionando.
 *
 * O resumo aparece aberto; detalhe e marcos ficam atrás de um toque. Quem está
 * lendo a Bíblia não pediu um artigo antes do texto.
 */
export function CapituloHeader({
  book,
  capitulo,
  aoIrParaVersiculo,
}: {
  book: BookMeta;
  capitulo: number;
  aoIrParaVersiculo: (n: number) => void;
}) {
  const [aberto, setAberto] = useState(false);
  const ficha = fichaDoCapitulo(book.slug, capitulo);
  const temArte = temArteDeCapitulo(book.slug, capitulo);
  const tema = GROUP_THEME[book.group];

  if (!ficha && !temArte) return null;

  return (
    <header className="mb-8">
      {temArte && (
        <div className="relative -mx-4 mb-5 h-44 overflow-hidden sm:-mx-6 sm:h-52 sm:rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={arteDoCapitulo(book.slug, capitulo)}
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
          />
          {/* Um toque do tom do grupo, só para ligar à identidade do livro.
              Mais que isso e o sépia da gravura vira outra cor. */}
          <div
            aria-hidden
            className="absolute inset-0 mix-blend-soft-light"
            style={{ backgroundColor: tema.from, opacity: 0.16 }}
          />
          {/* Escurece a base, onde o número do capítulo se apoia. */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #0b0a0e 2%, rgba(11,10,14,0.55) 34%, transparent 78%)",
            }}
          />

          <div className="absolute inset-x-0 bottom-0 px-4 pb-3 sm:px-5">
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-ink-300">
              {book.name}
            </p>
            <p className="font-display text-4xl font-black leading-none tracking-tight">
              {capitulo}
            </p>
          </div>
        </div>
      )}

      {/* Sem arte, o título volta ao formato antigo, centralizado. */}
      {!temArte && (
        <div className="mb-5 text-center">
          <span className="block font-display text-xs font-bold uppercase tracking-[0.2em] text-ink-400">
            {book.name}
          </span>
          <span className="mt-1 block font-display text-5xl font-black tracking-tight">
            {capitulo}
          </span>
        </div>
      )}

      {ficha && (
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <p className="font-sans text-[14px] leading-relaxed text-ink-200">
            {ficha.resumo}
          </p>

          <button
            onClick={() => setAberto((v) => !v)}
            className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-ink-400 transition-colors hover:text-white"
          >
            {aberto ? "Menos" : "Contexto e roteiro"}
            <ChevronDown
              size={12}
              className={`transition-transform ${aberto ? "rotate-180" : ""}`}
            />
          </button>

          {aberto && (
            <div className="mt-3 space-y-4 border-t border-white/6 pt-3">
              <p className="font-sans text-[13px] leading-relaxed text-ink-300">
                {ficha.detalhe}
              </p>

              <div>
                <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-ink-500">
                  O que acontece
                </p>
                <ol className="space-y-1.5">
                  {ficha.marcos.map((m, i) => (
                    <li
                      key={m}
                      className="flex gap-2.5 font-sans text-[13px] leading-relaxed text-ink-300"
                    >
                      <span
                        className="mt-[3px] font-mono text-[10px] font-bold"
                        style={{ color: tema.accent }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {m}
                    </li>
                  ))}
                </ol>
              </div>

              <button
                onClick={() => aoIrParaVersiculo(ficha.chave)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.06] px-3 py-2 font-sans text-[12px] font-semibold transition-colors hover:bg-white/12"
              >
                <Quote size={12} className="text-gold-400" />
                Versículo-chave: {capitulo}:{ficha.chave}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
