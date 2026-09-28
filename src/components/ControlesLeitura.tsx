"use client";

import { useEffect, useRef } from "react";
import { Columns2, Minus, Plus, Type } from "lucide-react";
import {
  FONTES_DE_LEITURA,
  type FonteLeitura,
  type TemaLeitura,
} from "@/lib/temaLeitura";

/** Amostras com as cores reais de cada fundo (as mesmas de globals.css). */
const FUNDOS: { id: TemaLeitura; rotulo: string; fundo: string; texto: string; borda: string }[] = [
  { id: "escuro", rotulo: "Escuro", fundo: "#0b0a0e", texto: "#ece7dc", borda: "rgb(255 255 255 / 14%)" },
  { id: "claro", rotulo: "Claro", fundo: "#f7f1e3", texto: "#211a0d", borda: "rgb(40 30 10 / 16%)" },
  { id: "papel", rotulo: "Papel", fundo: "#efdfb9", texto: "#2b1f0c", borda: "rgb(60 40 5 / 20%)" },
];

/**
 * Tamanho do texto, fundo de leitura e leitura paralela, atrás de um botão só.
 *
 * Eram quatro botões soltos na barra do leitor. Num celular de 375px eles
 * comiam a largura toda e o nome do livro quebrava em três linhas, que foi o
 * problema que isto veio resolver. Juntos aqui, nada some e o título respira.
 */
export function ControlesLeitura({
  aberto,
  aoAlternar,
  passo,
  totalPassos,
  aoMudarTamanho,
  tema,
  aoMudarTema,
  fonte,
  aoMudarFonte,
  paralela,
  aoMudarParalela,
}: {
  aberto: boolean;
  aoAlternar: (v: boolean) => void;
  passo: number;
  totalPassos: number;
  aoMudarTamanho: (delta: number) => void;
  tema: TemaLeitura;
  aoMudarTema: (t: TemaLeitura) => void;
  fonte: FonteLeitura;
  aoMudarFonte: (f: FonteLeitura) => void;
  paralela: boolean;
  aoMudarParalela: (v: boolean) => void;
}) {
  const caixaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aberto) return;
    const aoTocarFora = (e: PointerEvent) => {
      if (!caixaRef.current?.contains(e.target as Node)) aoAlternar(false);
    };
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") aoAlternar(false);
    };
    // `pointerdown` e não `click`: fechar só no clique deixava o painel aberto
    // durante o arrasto de uma seleção de versículo.
    window.addEventListener("pointerdown", aoTocarFora);
    window.addEventListener("keydown", aoTeclar);
    return () => {
      window.removeEventListener("pointerdown", aoTocarFora);
      window.removeEventListener("keydown", aoTeclar);
    };
  }, [aberto, aoAlternar]);

  return (
    <div ref={caixaRef} className="relative">
      <button
        onClick={() => aoAlternar(!aberto)}
        aria-label="Ajustes de leitura"
        aria-expanded={aberto}
        className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${
          aberto
            ? "bg-[var(--rl-sutil-3)] text-[var(--rl-texto)]"
            : "text-ink-300 hover:bg-[var(--rl-sutil-2)] hover:text-[var(--rl-texto)]"
        }`}
      >
        <Type size={16} />
      </button>

      {aberto && (
        // No celular o painel ocupa a largura toda, logo abaixo da barra. Preso
        // ao botão, ele vazava pela esquerda quando a leitura paralela põe a
        // segunda versão na barra e empurra o botão para o meio da tela.
        <div className="fixed inset-x-3 top-[calc(3.75rem+env(safe-area-inset-top))] z-50 max-h-[calc(100dvh-5rem-env(safe-area-inset-top))] overflow-y-auto sm:absolute sm:inset-x-auto sm:right-0 sm:top-10 sm:w-64 animate-fade rounded-2xl border border-[color:var(--rl-borda-2)] bg-ink-900/98 p-3 shadow-2xl shadow-black/60 backdrop-blur-xl">
          <p className="mb-2 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-[color:var(--rl-texto-mudo)]">
            Tamanho do texto
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => aoMudarTamanho(-1)}
              disabled={passo === 0}
              aria-label="Diminuir texto"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--rl-sutil-2)] text-ink-100 transition-colors enabled:hover:bg-[var(--rl-sutil-3)] enabled:hover:text-[var(--rl-texto)] disabled:opacity-25"
            >
              <Minus size={15} />
            </button>

            {/* Régua de passos: mostra onde o leitor está sem precisar de texto. */}
            <div className="flex flex-1 items-center justify-center gap-1.5">
              {Array.from({ length: totalPassos }, (_, i) => (
                <span
                  key={i}
                  className="h-1.5 rounded-full transition-all"
                  style={{
                    width: i === passo ? 14 : 6,
                    background: i <= passo ? "var(--color-gold-400)" : "var(--rl-sutil-3)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => aoMudarTamanho(1)}
              disabled={passo === totalPassos - 1}
              aria-label="Aumentar texto"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--rl-sutil-2)] text-ink-100 transition-colors enabled:hover:bg-[var(--rl-sutil-3)] enabled:hover:text-[var(--rl-texto)] disabled:opacity-25"
            >
              <Plus size={15} />
            </button>
          </div>

          {/* Fundo de leitura. Existe só aqui, dentro do capítulo — o resto
              do app continua escuro sempre. Cada botão é uma amostra do fundo
              de verdade, com um "Aa" na cor do texto daquele tema. */}
          <div className="mt-3 border-t border-[color:var(--rl-borda-1)] pt-3">
            <p className="mb-2 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-[color:var(--rl-texto-mudo)]">
              Fundo de leitura
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {FUNDOS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => aoMudarTema(f.id)}
                  aria-pressed={tema === f.id}
                  aria-label={`Fundo ${f.rotulo}`}
                  className="flex flex-col items-center gap-1"
                >
                  <span
                    className={`grid h-11 w-full place-items-center rounded-lg border font-reading text-[15px] font-semibold transition-shadow ${
                      tema === f.id ? "ring-2 ring-gold-400" : ""
                    }`}
                    style={{ background: f.fundo, color: f.texto, borderColor: f.borda }}
                  >
                    Aa
                  </span>
                  <span
                    className={`text-[11px] font-semibold ${
                      tema === f.id ? "text-gold-500" : "text-[color:var(--rl-texto-mudo)]"
                    }`}
                  >
                    {f.rotulo}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 border-t border-[color:var(--rl-borda-1)] pt-3">
            <p className="mb-2 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-[color:var(--rl-texto-mudo)]">
              Fonte
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {FONTES_DE_LEITURA.map((f) => (
                <button
                  key={f.id}
                  onClick={() => aoMudarFonte(f.id)}
                  aria-pressed={fonte === f.id}
                  className={`flex items-baseline justify-center gap-1.5 rounded-lg py-2 transition-colors ${
                    fonte === f.id
                      ? "bg-gold-400 text-ink-950"
                      : "bg-[var(--rl-sutil-2)] text-ink-100 hover:bg-[var(--rl-sutil-3)]"
                  }`}
                  style={{ fontFamily: f.familia }}
                >
                  <span className="text-[16px] font-semibold leading-none">Aa</span>
                  <span className="text-[12px] leading-none">{f.rotulo}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => aoMudarParalela(!paralela)}
            aria-pressed={paralela}
            className="mt-3 flex w-full items-center gap-2.5 rounded-lg border-t border-[color:var(--rl-borda-1)] pt-3 text-left transition-colors"
          >
            <span
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors ${
                paralela ? "bg-gold-400 text-ink-950" : "bg-[var(--rl-sutil-2)] text-ink-100"
              }`}
            >
              <Columns2 size={16} />
            </span>
            <span className="min-w-0">
              <span className="block font-sans text-[13px] font-semibold text-ink-100">
                Leitura paralela
              </span>
              <span className="block font-sans text-[11px] text-[color:var(--rl-texto-mudo)]">
                {paralela ? "Duas traduções" : "Uma tradução"}
              </span>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
