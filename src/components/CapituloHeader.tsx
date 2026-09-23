"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Quote } from "lucide-react";
import { fichaDoCapitulo, type Capitulo } from "@/lib/capitulos";
import { temArteDeCapitulo } from "@/lib/capitulos.generated";
import { arteDeCapitulo } from "@/lib/arte";
import { GROUP_THEME } from "@/lib/catalog";
import type { BookMeta } from "@/lib/bible";

/**
 * Abertura do capítulo: arte, número e visão geral.
 *
 * Sempre desenha o título, porque é ele que abre o capítulo na tela. Com arte,
 * o título se apoia sobre a gravura; sem arte, volta ao formato centralizado.
 * A ficha, quando existe, entra logo abaixo.
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
  const [ficha, setFicha] = useState<Capitulo | null>(null);

  const temArte = temArteDeCapitulo(book.slug, capitulo);
  const fontes = arteDeCapitulo(book.slug, capitulo);
  const tema = GROUP_THEME[book.group];

  /*
   * A ficha vem de `/capitulos/<livro>.json`, baixado sob demanda. A primeira
   * pintura sai sem ela e a segunda a inclui, o que é imperceptível porque o
   * arquivo é pequeno e fica em cache depois do primeiro capítulo do livro.
   */
  useEffect(() => {
    let vivo = true;
    setAberto(false);
    // Limpa antes de buscar: sem isso, ao virar a página o resumo do capítulo
    // anterior continuaria na tela até a nova ficha chegar.
    setFicha(null);
    void fichaDoCapitulo(book.slug, capitulo).then((f) => {
      if (vivo) setFicha(f);
    });
    return () => {
      vivo = false;
    };
  }, [book.slug, capitulo]);

  return (
    <header className="mb-8">
      {temArte && (
        <div className="relative -mx-4 mb-5 h-44 overflow-hidden sm:-mx-6 sm:h-52 sm:rounded-2xl">
          {/* AVIF quando o navegador abre, WebP quando não. A gravura tem
              trama fina, que é justamente o que o AVIF comprime melhor: sai
              perto da metade do peso. */}
          <picture>
            <source srcSet={fontes.avif} type="image/avif" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fontes.webp}
              alt=""
              aria-hidden
              decoding="async"
              className="h-full w-full object-cover"
            />
          </picture>
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
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-white/75">
              {book.name}
            </p>
            <p className="font-display text-4xl font-black leading-none tracking-tight text-white">
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
          <span className="mt-1 block font-display text-5xl font-black tracking-tight text-[color:var(--rl-texto)]">
            {capitulo}
          </span>
        </div>
      )}

      {ficha && (
        <div className="rounded-2xl border border-[color:var(--rl-borda-2)] bg-[var(--rl-sutil-1)] p-4">
          <p className="font-sans text-[14px] leading-relaxed text-ink-100">
            {ficha.resumo}
          </p>

          <button
            onClick={() => setAberto((v) => !v)}
            className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-ink-400 transition-colors hover:text-[color:var(--rl-texto)]"
          >
            {aberto ? "Menos" : "Contexto e roteiro"}
            <ChevronDown
              size={12}
              className={`transition-transform ${aberto ? "rotate-180" : ""}`}
            />
          </button>

          {aberto && (
            <div className="mt-3 space-y-4 border-t border-[color:var(--rl-borda-1)] pt-3">
              <p className="font-sans text-[13px] leading-relaxed text-ink-300">
                {ficha.detalhe}
              </p>

              <div>
                <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-[color:var(--rl-texto-mudo)]">
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
                className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--rl-sutil-2)] px-3 py-2 font-sans text-[12px] font-semibold text-[color:var(--rl-texto)] transition-colors hover:bg-[var(--rl-sutil-3)]"
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
