"use client";

import { useBible } from "@/lib/store";
import type { VersionId } from "@/lib/bible";

export function VersionSwitch() {
  const { index, version, setVersion } = useBible();
  const versions = index?.versions ?? [];
  if (versions.length < 2) return null;

  return (
    <div
      role="radiogroup"
      aria-label="Tradução"
      className="flex items-center rounded-full border border-white/10 bg-white/5 p-0.5"
    >
      {versions.map((v) => (
        <button
          key={v.id}
          role="radio"
          aria-checked={version === v.id}
          title={`${v.name} · ${v.note}`}
          onClick={() => setVersion(v.id as VersionId)}
          className={`rounded-full px-3 py-1 text-xs font-bold tracking-wide transition-colors ${
            version === v.id
              ? "bg-gold-400 text-ink-950"
              : "text-ink-300 hover:text-white"
          }`}
        >
          {v.short}
        </button>
      ))}
    </div>
  );
}
