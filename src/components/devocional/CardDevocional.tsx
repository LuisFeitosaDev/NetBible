"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { CapaDevocional } from "./CapaDevocional";
import { concluido, proximoDia, type Devocional, type ProgressoDevocional } from "@/lib/devocionais";

/**
 * Card de prateleira: largo, porque a gravura de capítulo é panorâmica e um
 * pôster vertical cortaria quase toda a cena.
 */
export function CardDevocional({
  devocional,
  progresso,
  grande = false,
}: {
  devocional: Devocional;
  progresso?: ProgressoDevocional;
  /** Para as jornadas de um mês: card maior, com o número de dias em destaque. */
  grande?: boolean;
}) {
  const total = devocional.dias.length;
  const feitos = progresso?.feitos.length ?? 0;
  const acabou = concluido(devocional, progresso);
  const href = feitos
    ? `/devocional/${devocional.id}/${proximoDia(devocional, progresso)}`
    : `/devocional/${devocional.id}`;

  return (
    <Link
      href={href}
      className={`group relative block shrink-0 ${grande ? "w-[310px] sm:w-[460px]" : "w-[272px] sm:w-[320px]"}`}
    >
      <CapaDevocional
        devocional={devocional}
        className={`relative rounded-2xl ring-1 ring-white/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:ring-white/35 group-hover:shadow-2xl group-hover:shadow-black/60 ${
          grande ? "aspect-[4/3] sm:aspect-[16/10]" : "aspect-[16/10]"
        }`}
      >
        {/* O número de dias como elemento gráfico, no canto, por trás do texto. */}
        {grande && (
          <span
            aria-hidden
            className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[8.5rem] font-black leading-none tracking-tighter text-white/15 sm:text-[10rem]"
          >
            {total}
          </span>
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/5"
        />

        <div className="absolute left-3 top-3 flex gap-1.5">
          <span className="rounded-full bg-black/45 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-white/90 backdrop-blur-md">
            {total} dias
          </span>
          {devocional.selo && (
            <span
              className="rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-ink-950"
              style={{ backgroundColor: devocional.cor }}
            >
              {devocional.selo}
            </span>
          )}
        </div>

        {acabou && (
          <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-emerald-400 text-ink-950 shadow-lg">
            <Check size={15} strokeWidth={3} />
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 p-3.5">
          <h3
            className={`font-display font-black leading-tight tracking-tight text-white drop-shadow ${
              grande ? "text-[26px] sm:text-[30px]" : "text-[19px]"
            }`}
          >
            {devocional.titulo}
          </h3>
          <p className={`mt-0.5 line-clamp-1 text-white/70 ${grande ? "text-[14px]" : "text-[12.5px]"}`}>
            {devocional.chamada}
          </p>

          {feitos > 0 && !acabou && (
            <div className="mt-2.5 flex items-center gap-2">
              <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/25">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(feitos / total) * 100}%`, backgroundColor: devocional.cor }}
                />
              </div>
              <span className="text-[11px] font-semibold text-white/80">
                {feitos}/{total}
              </span>
            </div>
          )}
        </div>
      </CapaDevocional>
    </Link>
  );
}
