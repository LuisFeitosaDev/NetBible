"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Loader2, X } from "lucide-react";

/**
 * Confirmação de exclusão.
 *
 * Existe para não usar `confirm()` do navegador, que ignora o tema do app, não
 * dá para explicar o que será apagado e, num PWA instalado, às vezes nem
 * aparece. Aqui cabe dizer exatamente o que se perde, que é o mínimo antes de
 * apagar algo que a pessoa construiu.
 */
export function ConfirmarExclusao({
  titulo,
  aviso,
  rotuloConfirmar = "Apagar",
  /** Quando dado, exige digitar este texto. Para o que não volta. */
  exigirTexto,
  aoConfirmar,
  aoFechar,
}: {
  titulo: string;
  aviso: string;
  rotuloConfirmar?: string;
  exigirTexto?: string;
  aoConfirmar: () => void | Promise<void>;
  aoFechar: () => void;
}) {
  const [digitado, setDigitado] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !ocupado) aoFechar();
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aoFechar, ocupado]);

  const liberado =
    !exigirTexto ||
    digitado.trim().toLocaleLowerCase() === exigirTexto.trim().toLocaleLowerCase();

  const confirmar = async () => {
    if (!liberado || ocupado) return;
    setOcupado(true);
    setErro(null);
    try {
      await aoConfirmar();
      aoFechar();
    } catch (e) {
      // Fica aberto com o motivo: fechar aqui daria a impressão de que apagou.
      setErro(e instanceof Error ? e.message : "Não consegui apagar.");
      setOcupado(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={titulo}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
      onClick={(e) => e.target === e.currentTarget && !ocupado && aoFechar()}
    >
      <div className="w-full max-w-sm animate-rise rounded-2xl border border-white/12 bg-ink-900 p-5 shadow-2xl shadow-black/60">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-red-500/12 text-red-400">
            <AlertTriangle size={19} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-[16px] font-bold">{titulo}</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-400">{aviso}</p>
          </div>
          <button
            onClick={aoFechar}
            disabled={ocupado}
            aria-label="Fechar"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-500 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-40"
          >
            <X size={16} />
          </button>
        </div>

        {exigirTexto && (
          <label className="mt-4 block">
            <span className="block text-[12px] text-ink-400">
              Para confirmar, digite{" "}
              <span className="font-mono font-bold text-ink-200">{exigirTexto}</span>
            </span>
            <input
              value={digitado}
              onChange={(e) => setDigitado(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && void confirmar()}
              autoFocus
              autoComplete="off"
              className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 font-sans text-[14px] text-white focus:border-white/30 focus:outline-none"
            />
          </label>
        )}

        {erro && (
          <p className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-[12.5px] text-red-300">
            {erro}
          </p>
        )}

        <div className="mt-5 flex gap-2">
          <button
            onClick={aoFechar}
            disabled={ocupado}
            className="flex-1 rounded-xl border border-white/10 py-2.5 text-[13px] font-semibold text-ink-300 transition-colors hover:bg-white/[0.06] disabled:opacity-40"
          >
            Cancelar
          </button>
          <button
            onClick={confirmar}
            disabled={!liberado || ocupado}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 py-2.5 text-[13px] font-bold text-white transition-colors enabled:hover:bg-red-400 disabled:cursor-not-allowed disabled:bg-white/8 disabled:text-ink-500"
          >
            {ocupado && <Loader2 size={14} className="animate-spin" />}
            {rotuloConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}
