"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Minus, Plus, Type, X } from "lucide-react";
import { ESCALAS, useLeituraDevocional } from "@/lib/devocionalLeitura";
import { FONTES_DE_LEITURA, type TemaLeitura } from "@/lib/temaLeitura";

const TEMAS: { id: TemaLeitura; rotulo: string; fundo: string; texto: string }[] = [
  { id: "escuro", rotulo: "Escuro", fundo: "#0b0a0e", texto: "#ececf2" },
  { id: "claro", rotulo: "Claro", fundo: "#f7f1e3", texto: "#17130a" },
  { id: "papel", rotulo: "Papel", fundo: "#ead9b2", texto: "#2b1f0c" },
];

/**
 * O botão "Aa" da página do dia: fundo claro ou escuro, tamanho do texto e
 * fonte. As escolhas ficam guardadas e valem para todos os devocionais.
 */
export function AjustesDeLeitura({ cor }: { cor: string }) {
  const { leitura, mudar } = useLeituraDevocional();
  const [aberto, setAberto] = useState(false);
  const caixa = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aberto) return;
    const fora = (e: PointerEvent) => {
      if (!caixa.current?.contains(e.target as Node)) setAberto(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    document.addEventListener("pointerdown", fora);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", fora);
      document.removeEventListener("keydown", esc);
    };
  }, [aberto]);

  return (
    <div
      ref={caixa}
      className="fixed bottom-[calc(6rem+env(safe-area-inset-bottom))] right-4 z-40 md:bottom-8 md:right-8"
    >
      {aberto && (
        <div
          role="dialog"
          aria-label="Ajustes de leitura"
          className="absolute bottom-16 right-0 w-[290px] animate-[rise_0.25s_cubic-bezier(0.16,1,0.3,1)] rounded-2xl border border-white/10 bg-ink-850/95 p-4 text-white shadow-2xl shadow-black/60 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between">
            <p className="font-display text-[13px] font-bold">Leitura</p>
            <button
              onClick={() => setAberto(false)}
              aria-label="Fechar ajustes"
              className="grid h-7 w-7 place-items-center rounded-full text-ink-400 hover:bg-white/10 hover:text-white"
            >
              <X size={15} />
            </button>
          </div>

          <p className="mb-2 mt-3 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink-400">
            Fundo
          </p>
          <div className="grid grid-cols-3 gap-2">
            {TEMAS.map((t) => (
              <button
                key={t.id}
                onClick={() => mudar({ tema: t.id })}
                aria-pressed={leitura.tema === t.id}
                className="flex flex-col items-center gap-1.5"
              >
                <span
                  className="grid h-11 w-full place-items-center rounded-lg border font-reading text-[15px] font-semibold"
                  style={{
                    backgroundColor: t.fundo,
                    color: t.texto,
                    borderColor: leitura.tema === t.id ? cor : "rgb(255 255 255 / 0.12)",
                    boxShadow: leitura.tema === t.id ? `0 0 0 2px ${cor}` : undefined,
                  }}
                >
                  Aa
                </span>
                <span className="text-[11px] font-semibold text-ink-300">{t.rotulo}</span>
              </button>
            ))}
          </div>

          <p className="mb-2 mt-4 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink-400">
            Tamanho do texto
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => mudar({ tamanho: Math.max(0, leitura.tamanho - 1) })}
              disabled={leitura.tamanho === 0}
              aria-label="Diminuir o texto"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/12 hover:bg-white/10 disabled:opacity-30"
            >
              <Minus size={16} />
            </button>
            <div className="flex flex-1 items-center justify-center gap-1.5" aria-hidden>
              {ESCALAS.map((_, n) => (
                <span
                  key={n}
                  className="rounded-full transition-all"
                  style={{
                    width: 6 + n * 1.6,
                    height: 6 + n * 1.6,
                    backgroundColor: n <= leitura.tamanho ? cor : "rgb(255 255 255 / 0.18)",
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => mudar({ tamanho: Math.min(ESCALAS.length - 1, leitura.tamanho + 1) })}
              disabled={leitura.tamanho === ESCALAS.length - 1}
              aria-label="Aumentar o texto"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/12 hover:bg-white/10 disabled:opacity-30"
            >
              <Plus size={16} />
            </button>
          </div>

          <p className="mb-2 mt-4 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink-400">
            Fonte
          </p>
          <div className="grid grid-cols-2 gap-2">
            {FONTES_DE_LEITURA.map((f) => (
              <button
                key={f.id}
                onClick={() => mudar({ fonte: f.id })}
                aria-pressed={leitura.fonte === f.id}
                className={`flex items-center justify-between rounded-lg border px-3 py-2 text-left transition-colors ${
                  leitura.fonte === f.id ? "bg-white/10" : "border-white/10 hover:bg-white/5"
                }`}
                style={leitura.fonte === f.id ? { borderColor: cor } : undefined}
              >
                <span style={{ fontFamily: f.familia }}>
                  <span className="block text-[17px] font-semibold leading-none">Aa</span>
                  <span className="mt-1 block font-sans text-[11px] text-ink-400">{f.rotulo}</span>
                </span>
                {leitura.fonte === f.id && <Check size={15} style={{ color: cor }} />}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setAberto((a) => !a)}
        aria-label="Ajustes de leitura"
        aria-expanded={aberto}
        className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-ink-850/90 text-white shadow-xl shadow-black/50 backdrop-blur-md transition-transform hover:scale-105"
      >
        <Type size={19} />
      </button>
    </div>
  );
}
