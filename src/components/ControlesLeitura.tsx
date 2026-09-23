"use client";

import { useEffect, useRef } from "react";
import { Columns2, Minus, Plus, Type } from "lucide-react";

/**
 * Tamanho do texto e leitura paralela, atrás de um botão só.
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
  paralela,
  aoMudarParalela,
}: {
  aberto: boolean;
  aoAlternar: (v: boolean) => void;
  passo: number;
  totalPassos: number;
  aoMudarTamanho: (delta: number) => void;
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
            ? "bg-white/12 text-white"
            : "text-ink-300 hover:bg-white/10 hover:text-white"
        }`}
      >
        <Type size={16} />
      </button>

      {aberto && (
        <div className="absolute right-0 top-10 z-50 w-56 animate-fade rounded-2xl border border-white/10 bg-ink-900/98 p-3 shadow-2xl shadow-black/60 backdrop-blur-xl">
          <p className="mb-2 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink-500">
            Tamanho do texto
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => aoMudarTamanho(-1)}
              disabled={passo === 0}
              aria-label="Diminuir texto"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-ink-200 transition-colors enabled:hover:bg-white/12 enabled:hover:text-white disabled:opacity-25"
            >
              <Minus size={15} />
            </button>

            {/* Régua de passos: mostra onde o leitor está sem precisar de texto. */}
            <div className="flex flex-1 items-center justify-center gap-1.5">
              {Array.from({ length: totalPassos }, (_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i <= passo ? "bg-gold-400" : "bg-white/12"
                  }`}
                  style={{ width: i === passo ? 14 : 6 }}
                />
              ))}
            </div>

            <button
              onClick={() => aoMudarTamanho(1)}
              disabled={passo === totalPassos - 1}
              aria-label="Aumentar texto"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-ink-200 transition-colors enabled:hover:bg-white/12 enabled:hover:text-white disabled:opacity-25"
            >
              <Plus size={15} />
            </button>
          </div>

          <button
            onClick={() => aoMudarParalela(!paralela)}
            aria-pressed={paralela}
            className="mt-3 flex w-full items-center gap-2.5 rounded-lg border-t border-white/6 pt-3 text-left transition-colors"
          >
            <span
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors ${
                paralela ? "bg-gold-400 text-ink-950" : "bg-white/[0.06] text-ink-200"
              }`}
            >
              <Columns2 size={16} />
            </span>
            <span className="min-w-0">
              <span className="block font-sans text-[13px] font-semibold text-ink-100">
                Leitura paralela
              </span>
              <span className="block font-sans text-[11px] text-ink-500">
                {paralela ? "Duas traduções" : "Uma tradução"}
              </span>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
