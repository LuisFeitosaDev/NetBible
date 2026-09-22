"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { useBible } from "@/lib/store";
import type { VersionId } from "@/lib/bible";

const IDIOMA = { pt: "Português", en: "Inglês" } as const;

/**
 * Com seis traduções, a fileira de pílulas não cabe mais: virou menu.
 * `alvo` diz qual preferência este seletor controla, a da leitura principal ou
 * a da coluna paralela.
 */
export function VersionSwitch({ alvo = "principal" }: { alvo?: "principal" | "paralela" }) {
  const { index, version, setVersion, parallelVersion, setParallelVersion } = useBible();
  const [aberto, setAberto] = useState(false);
  const caixa = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aberto) return;
    const fora = (e: MouseEvent) => {
      if (!caixa.current?.contains(e.target as Node)) setAberto(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    document.addEventListener("mousedown", fora);
    window.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", fora);
      window.removeEventListener("keydown", esc);
    };
  }, [aberto]);

  const versoes = index?.versions ?? [];
  if (versoes.length < 2) return null;

  const atual = alvo === "principal" ? version : parallelVersion;
  const escolher = alvo === "principal" ? setVersion : setParallelVersion;
  // A coluna paralela não pode repetir a principal.
  const bloqueada = alvo === "paralela" ? version : null;
  const selecionada = versoes.find((v) => v.id === atual);

  const porIdioma = ["pt", "en"] as const;

  return (
    <div ref={caixa} className="relative">
      <button
        onClick={() => setAberto((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={aberto}
        className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 py-1.5 pl-3 pr-2 text-xs font-bold tracking-wide transition-colors hover:border-white/25"
      >
        <span className={alvo === "principal" ? "text-gold-400" : "text-ink-300"}>
          {selecionada?.short ?? "?"}
        </span>
        <ChevronDown
          size={13}
          className={`text-ink-400 transition-transform ${aberto ? "rotate-180" : ""}`}
        />
      </button>

      {aberto && (
        <div
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-64 animate-rise overflow-hidden rounded-xl border border-white/10 bg-ink-850 shadow-2xl shadow-black/60"
        >
          {porIdioma.map((idioma) => {
            const doIdioma = versoes.filter((v) => (v.idioma ?? "pt") === idioma);
            if (!doIdioma.length) return null;
            return (
              <div key={idioma}>
                <p className="border-b border-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-ink-500">
                  {IDIOMA[idioma]}
                </p>
                {doIdioma.map((v) => {
                  const indisponivel = v.id === bloqueada;
                  return (
                    <button
                      key={v.id}
                      role="option"
                      aria-selected={v.id === atual}
                      disabled={indisponivel}
                      onClick={() => {
                        escolher(v.id as VersionId);
                        setAberto(false);
                      }}
                      className={`flex w-full items-start gap-2.5 px-3 py-2.5 text-left transition-colors ${
                        indisponivel
                          ? "cursor-not-allowed opacity-35"
                          : "hover:bg-white/8"
                      }`}
                    >
                      <span
                        className={`mt-0.5 w-14 shrink-0 font-mono text-[11px] font-bold ${
                          v.id === atual ? "text-gold-400" : "text-ink-400"
                        }`}
                      >
                        {v.short}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[13px] font-semibold leading-tight">
                          {v.name}
                        </span>
                        <span className="block text-[11px] text-ink-500">
                          {indisponivel ? "já é a leitura principal" : v.note}
                        </span>
                      </span>
                      {v.id === atual && (
                        <Check size={14} className="mt-0.5 shrink-0 text-gold-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
