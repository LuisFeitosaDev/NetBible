"use client";

import { useState } from "react";
import {
  Copy,
  Share2,
  Eraser,
  MessageSquarePlus,
  X,
  Check,
  Image as ImageIcon,
} from "lucide-react";
import { HIGHLIGHT_COLORS, type HighlightColor } from "@/lib/catalog";

export function VerseActions({
  count,
  label,
  activeColor,
  hasMarks,
  onColor,
  onClearMarks,
  onNote,
  onCopy,
  onShare,
  onImage,
  onClose,
}: {
  count: number;
  label: string;
  activeColor?: HighlightColor;
  hasMarks: boolean;
  onColor: (color: HighlightColor) => void;
  onClearMarks: () => void;
  onNote: () => void;
  onCopy: () => Promise<void>;
  onShare: () => Promise<void>;
  onImage: () => void;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
      <div className="pointer-events-auto w-full max-w-lg animate-rise rounded-2xl border border-[color:var(--rl-borda-2)] bg-ink-850/95 p-3 shadow-2xl shadow-black/70 backdrop-blur-xl">
        <div className="mb-3 flex items-center justify-between px-1">
          <span className="font-display text-sm font-bold text-[color:var(--rl-texto)]">
            {label}
            <span className="ml-2 font-sans text-xs font-normal text-ink-400">
              {count} {count === 1 ? "versículo" : "versículos"}
            </span>
          </span>
          <button
            onClick={onClose}
            aria-label="Cancelar seleção"
            className="rounded-full p-1 text-ink-400 transition-colors hover:bg-[var(--rl-sutil-3)] hover:text-[color:var(--rl-texto)]"
          >
            <X size={17} />
          </button>
        </div>

        <div className="mb-3 flex items-center gap-2">
          {HIGHLIGHT_COLORS.map((c) => (
            <button
              key={c.id}
              onClick={() => onColor(c.id as HighlightColor)}
              aria-label={`Marcar de ${c.label.toLowerCase()}`}
              className={`grid h-9 flex-1 place-items-center rounded-lg transition-transform hover:scale-105 active:scale-95 ${
                activeColor === c.id ? "ring-2 ring-[color:var(--rl-texto)]" : "ring-1 ring-[color:var(--rl-borda-3)]"
              }`}
              style={{ background: `${c.hex}40` }}
            >
              <span className="h-4 w-4 rounded-full" style={{ background: c.hex }} />
            </button>
          ))}
          <button
            onClick={onClearMarks}
            disabled={!hasMarks}
            aria-label="Remover marcação"
            className="grid h-9 w-11 place-items-center rounded-lg text-ink-300 ring-1 ring-[color:var(--rl-borda-3)] transition-colors enabled:hover:bg-[var(--rl-sutil-3)] enabled:hover:text-[color:var(--rl-texto)] disabled:opacity-30"
          >
            <Eraser size={16} />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <ActionButton icon={MessageSquarePlus} label="Comentar" onClick={onNote} />
          <ActionButton
            icon={copied ? Check : Copy}
            label={copied ? "Copiado" : "Copiar"}
            onClick={copy}
          />
          <ActionButton icon={ImageIcon} label="Imagem" onClick={onImage} destaque />
          <ActionButton icon={Share2} label="Enviar texto" onClick={() => void onShare()} />
        </div>
      </div>
    </div>
  );
}

function ActionButton({
  icon: Icon,
  label,
  onClick,
  destaque = false,
}: {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  onClick: () => void;
  destaque?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 rounded-lg py-2.5 text-[11px] font-semibold transition-colors ${
        destaque
          ? "bg-gold-400/15 text-gold-400 hover:bg-gold-400/25"
          : "bg-[var(--rl-sutil-2)] text-ink-100 hover:bg-[var(--rl-sutil-3)]"
      }`}
    >
      <Icon size={17} />
      {label}
    </button>
  );
}
