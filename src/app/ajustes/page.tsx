"use client";

import { useRef, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Download, Upload, ShieldCheck, Info } from "lucide-react";
import { useBible } from "@/lib/store";
import { db, exportAll, importAll, type Backup } from "@/lib/db";
import { ContaCard } from "@/components/ContaCard";
import { VersionSwitch } from "@/components/VersionSwitch";
import type { VersionId } from "@/lib/bible";

export default function SettingsPage() {
  const { index, version, parallel, setParallel, parallelVersion } = useBible();
  const fileInput = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<string | null>(null);

  const counts = useLiveQuery(async () => {
    const [marks, notes, reading, favorites] = await Promise.all([
      db.marks.count(),
      db.notes.count(),
      db.reading.count(),
      db.favorites.count(),
    ]);
    return { marks, notes, reading, favorites };
  }, []);

  const doExport = async () => {
    const backup = await exportAll();
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `genipse-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatus(`Backup gerado com ${backup.marks.length} marcações e ${backup.notes.length} comentários.`);
  };

  const doImport = async (file: File) => {
    try {
      const parsed = JSON.parse(await file.text()) as Backup;
      const result = await importAll(parsed);
      setStatus(`Importado: ${result.marks} marcações e ${result.notes} comentários.`);
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Não consegui ler esse arquivo.");
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 pt-8 md:px-6">
      <h1 className="font-display text-3xl font-black tracking-tight md:text-4xl">Ajustes</h1>

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

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <button
            onClick={doExport}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/18"
          >
            <Download size={17} />
            Exportar backup
          </button>
          <button
            onClick={() => fileInput.current?.click()}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/18"
          >
            <Upload size={17} />
            Importar backup
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void doImport(file);
              e.target.value = "";
            }}
          />
        </div>

        {status && (
          <p className="mt-3 rounded-lg bg-gold-500/10 px-3.5 py-2.5 text-[13px] text-gold-300">
            {status}
          </p>
        )}

        <p className="mt-4 flex gap-2.5 text-[13px] leading-relaxed text-ink-400">
          <ShieldCheck size={16} className="mt-0.5 shrink-0 text-emerald-400" />
          Nada sai deste dispositivo. Marcações e comentários ficam no armazenamento local do
          navegador — se você limpar os dados do site, eles vão junto. Exporte de vez em quando.
        </p>
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
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
          checked ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
