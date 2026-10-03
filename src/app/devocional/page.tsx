"use client";

import Link from "next/link";
import { useState } from "react";
import { Play, ListOrdered } from "lucide-react";
import { Shelf } from "@/components/Shelf";
import { CapaDevocional } from "@/components/devocional/CapaDevocional";
import { CardDevocional } from "@/components/devocional/CardDevocional";
import {
  CATEGORIAS,
  DEVOCIONAIS,
  concluido,
  destaqueDoDia,
  proximoDia,
  type Devocional,
} from "@/lib/devocionais";
import { useProgressosDevocionais } from "@/lib/devocionalProgresso";

export default function DevocionalPage() {
  const progressos = useProgressosDevocionais();
  const [hoje] = useState(() => destaqueDoDia());

  // Em andamento: começados e não terminados, o mais recente primeiro.
  const emAndamento = DEVOCIONAIS.filter((d) => {
    const p = progressos?.get(d.id);
    return p && p.feitos.length > 0 && !concluido(d, p);
  }).sort(
    (a, b) =>
      (progressos?.get(b.id)?.atualizadoEm ?? 0) - (progressos?.get(a.id)?.atualizadoEm ?? 0),
  );
  const concluidos = DEVOCIONAIS.filter((d) => concluido(d, progressos?.get(d.id)));

  const destaque = emAndamento[0] ?? hoje;

  return (
    <div className="-mt-16">
      {/* Espera o progresso antes de escolher o destaque: sem isto, o topo
          mostrava o destaque do dia e trocava para o devocional em andamento
          meio segundo depois. */}
      {progressos === undefined ? (
        <div className="h-[66vh] min-h-[460px] animate-pulse bg-ink-900 md:h-[72vh]" />
      ) : (
        <Destaque
          devocional={destaque}
          continuando={Boolean(emAndamento[0])}
          diaAtual={proximoDia(destaque, progressos.get(destaque.id))}
          feitos={progressos.get(destaque.id)?.feitos.length ?? 0}
        />
      )}

      <div className="relative z-10 -mt-8 space-y-1 md:-mt-14">
        {emAndamento.length > 0 && (
          <Shelf title="Continue de onde parou" subtitle="Um dia de cada vez">
            {emAndamento.map((d) => (
              <CardDevocional key={d.id} devocional={d} progresso={progressos?.get(d.id)} />
            ))}
          </Shelf>
        )}

        {CATEGORIAS.map((c) => (
          <Shelf key={c.id} title={c.titulo} subtitle={c.subtitulo}>
            {DEVOCIONAIS.filter((d) => d.categoria === c.id).map((d) => (
              <CardDevocional
                key={d.id}
                devocional={d}
                progresso={progressos?.get(d.id)}
                grande={c.id === "jornada"}
              />
            ))}
          </Shelf>
        ))}

        {concluidos.length > 0 && (
          <Shelf title="Concluídos" subtitle="Vale reler quando precisar">
            {concluidos.map((d) => (
              <CardDevocional key={d.id} devocional={d} progresso={progressos?.get(d.id)} />
            ))}
          </Shelf>
        )}
      </div>

      <p className="mx-auto max-w-xl px-6 pb-6 pt-8 text-center text-[12.5px] leading-relaxed text-ink-400">
        {DEVOCIONAIS.length} devocionais, {DEVOCIONAIS.reduce((n, d) => n + d.dias.length, 0)}{" "}
        dias de leitura. O texto bíblico de cada dia aparece na tradução que você escolheu.
      </p>
    </div>
  );
}

/** O topo da página: o devocional em andamento, ou o destaque do dia. */
function Destaque({
  devocional: d,
  continuando,
  diaAtual,
  feitos,
}: {
  devocional: Devocional;
  continuando: boolean;
  diaAtual: number;
  feitos: number;
}) {
  const total = d.dias.length;
  return (
    <section className="relative flex h-[66vh] min-h-[460px] items-end overflow-hidden md:h-[72vh]">
      <CapaDevocional devocional={d} prioridade tom={0.3} className="absolute inset-0" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-ink-950/10" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/25 to-transparent" />

      <div className="relative mx-auto w-full max-w-[1500px] px-4 pb-16 md:px-8 md:pb-24">
        <div key={d.id} className="max-w-2xl animate-[rise_0.5s_cubic-bezier(0.16,1,0.3,1)]">
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]"
            style={{ borderColor: `${d.cor}66`, backgroundColor: `${d.cor}22`, color: "#fff" }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: d.cor }} />
            {continuando ? "Seu devocional" : "Devocional em destaque"}
          </span>

          <h1 className="mt-4 font-display text-[2.6rem] font-black leading-[1.02] tracking-tight text-white drop-shadow-lg md:text-7xl">
            {d.titulo}
          </h1>
          <p className="mt-3 max-w-xl font-reading text-lg leading-snug text-white/85 md:text-xl">
            {d.chamada}
          </p>

          <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/70">
            <span>{total} dias</span>
            <span className="text-white/30">•</span>
            <span>cerca de 5 minutos por dia</span>
            {feitos > 0 && (
              <>
                <span className="text-white/30">•</span>
                <span className="font-semibold" style={{ color: d.cor }}>
                  {feitos} de {total} feitos
                </span>
              </>
            )}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href={`/devocional/${d.id}/${diaAtual}`}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-display text-sm font-bold text-ink-950 transition-transform hover:scale-[1.03] active:scale-95"
            >
              <Play size={18} className="fill-ink-950" />
              {feitos > 0 ? `Continuar · Dia ${diaAtual}` : "Começar o dia 1"}
            </Link>
            <Link
              href={`/devocional/${d.id}`}
              className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-5 py-3 font-display text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/25"
            >
              <ListOrdered size={18} />
              Ver os {total} dias
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
