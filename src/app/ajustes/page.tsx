"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { Info } from "lucide-react";
import { useBible } from "@/lib/store";
import { db } from "@/lib/db";
import { ContaCard } from "@/components/ContaCard";
import { VersionSwitch } from "@/components/VersionSwitch";

export default function SettingsPage() {
  const { index, version, parallel, setParallel, parallelVersion } = useBible();

  const counts = useLiveQuery(async () => {
    const [marks, notes, reading, favorites] = await Promise.all([
      db.marks.count(),
      db.notes.count(),
      db.reading.count(),
      db.favorites.count(),
    ]);
    return { marks, notes, reading, favorites };
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4 pt-8 md:px-6">
      <h1 className="font-display text-3xl font-black tracking-tight md:text-4xl">Conta</h1>

      <Section title="Sua conta">
        <ContaCard />
      </Section>

      <Section title="Leitura">
        <Row
          label="Tradução padrão"
          hint={index?.versions.find((v) => v.id === version)?.name}
        >
          <VersionSwitch />
        </Row>

        <Row label="Leitura paralela" hint="Mostra duas traduções lado a lado">
          <Toggle checked={parallel} onChange={setParallel} />
        </Row>

        {parallel && (
          <Row
            label="Tradução da coluna paralela"
            hint={index?.versions.find((v) => v.id === parallelVersion)?.name}
          >
            <VersionSwitch alvo="paralela" />
          </Row>
        )}
      </Section>

      <Section title="Seus dados">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <Stat label="Marcações" value={counts?.marks} />
          <Stat label="Comentários" value={counts?.notes} />
          <Stat label="Livros iniciados" value={counts?.reading} />
          <Stat label="Na minha lista" value={counts?.favorites} />
        </div>
      </Section>

      <Section title="Sobre as traduções">
        <div className="space-y-3">
          {(index?.versions ?? []).map((v) => (
            <div key={v.id} className="rounded-lg bg-white/[0.04] p-3.5">
              <p className="font-display text-sm font-bold">
                {v.short} — {v.name}
              </p>
              <p className="mt-0.5 text-[13px] text-ink-400">{v.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 flex gap-2.5 text-[13px] leading-relaxed text-ink-400">
          <Info size={16} className="mt-0.5 shrink-0 text-ink-400" />
          A NVI é protegida por direitos autorais da Biblica. Para uso pessoal tudo bem; se
          você publicar o app, remova-a ou obtenha licença.
        </p>
      </Section>

      <div className="h-20" />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 font-display text-xs font-bold uppercase tracking-[0.16em] text-ink-400">
        {title}
      </h2>
      <div className="rounded-2xl border border-white/6 bg-ink-900 p-4">{children}</div>
    </section>
  );
}

function Row({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/5 py-3 last:border-0 last:pb-0 first:pt-0">
      <div>
        <p className="text-sm font-semibold">{label}</p>
        {hint && <p className="text-[12px] text-ink-400">{hint}</p>}
      </div>
      {children}
    </div>
  );
}

function Stat({ label, value }: { label: string; value?: number }) {
  return (
    <div className="rounded-lg bg-white/[0.04] p-3">
      <p className="font-display text-2xl font-black text-gold-400">{value ?? "—"}</p>
      <p className="text-[11px] text-ink-400">{label}</p>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        checked ? "bg-gold-400" : "bg-white/15"
      }`}
    >
      <span
        className={`absolute left-0 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
          checked ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
