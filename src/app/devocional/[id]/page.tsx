"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Check, Play, RotateCcw } from "lucide-react";
import { CapaDevocional } from "@/components/devocional/CapaDevocional";
import { LembreteDevocional } from "@/components/devocional/LembreteDevocional";
import {
  CATEGORIAS,
  concluido,
  devocionalPorId,
  proximoDia,
  referencia,
} from "@/lib/devocionais";
import { recomecarDevocional, useProgressoDevocional } from "@/lib/devocionalProgresso";
import { useBible } from "@/lib/store";

export default function SeriePage() {
  const { id } = useParams<{ id: string }>();
  const d = devocionalPorId(id);
  const progresso = useProgressoDevocional(id);
  const { bySlug } = useBible();

  if (!d) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Devocional não encontrado</h1>
        <Link href="/devocional" className="mt-4 inline-block text-gold-400 hover:underline">
          Ver todos os devocionais
        </Link>
      </div>
    );
  }

  const total = d.dias.length;
  const feitos = new Set(progresso?.feitos ?? []);
  const acabou = concluido(d, progresso);
  const proximo = proximoDia(d, progresso);
  const categoria = CATEGORIAS.find((c) => c.id === d.categoria);

  return (
    <div className="-mt-16">
      <section className="relative flex min-h-[60vh] items-end overflow-hidden pt-16">
        <CapaDevocional devocional={d} prioridade tom={0.3} className="absolute inset-0" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/10" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-ink-950/20 to-transparent" />

        <div className="relative mx-auto w-full max-w-[1500px] px-4 pb-10 pt-6 md:px-8 md:pb-14">
          <div className="max-w-2xl animate-[rise_0.4s_cubic-bezier(0.16,1,0.3,1)]">
            {/* No fluxo, e não absoluto: com descrição longa o texto subia até
                o topo e passava por baixo do botão no celular. */}
            <Link
              href="/devocional"
              className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-[12.5px] font-semibold text-white/90 backdrop-blur-md transition-colors hover:bg-black/60"
            >
              <ArrowLeft size={14} />
              Devocionais
            </Link>
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em]">
              {categoria && (
                <span
                  className="rounded-full px-2.5 py-1 text-white"
                  style={{ backgroundColor: `${d.cor}33` }}
                >
                  {categoria.titulo}
                </span>
              )}
              {d.selo && (
                <span className="rounded-full px-2.5 py-1 text-ink-950" style={{ backgroundColor: d.cor }}>
                  {d.selo}
                </span>
              )}
            </div>

            <h1 className="mt-4 font-display text-4xl font-black tracking-tight text-white md:text-6xl">
              {d.titulo}
            </h1>
            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-300">
              <span>{total} dias</span>
              <span className="text-ink-600">•</span>
              <span>15 minutos por dia, com oração guiada</span>
              {feitos.size > 0 && (
                <>
                  <span className="text-ink-600">•</span>
                  <span className="font-semibold" style={{ color: d.cor }}>
                    {acabou ? "Concluído" : `${feitos.size} de ${total} feitos`}
                  </span>
                </>
              )}
            </p>
            <p className="mt-4 max-w-xl font-reading text-base leading-relaxed text-ink-100/90 md:text-lg">
              {d.descricao}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href={`/devocional/${d.id}/${acabou ? 1 : proximo}`}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-display text-sm font-bold text-ink-950 transition-transform hover:scale-[1.03] active:scale-95"
              >
                <Play size={18} className="fill-ink-950" />
                {acabou ? "Ler de novo" : feitos.size ? `Continuar · Dia ${proximo}` : "Começar o dia 1"}
              </Link>
              {feitos.size > 0 && (
                <button
                  onClick={() => void recomecarDevocional(d.id)}
                  className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-5 py-3 font-display text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/25"
                >
                  <RotateCcw size={16} />
                  Recomeçar
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10 md:px-8">
        <div className="mb-8">
          <LembreteDevocional cor={d.cor} />
        </div>

        <h2 className="font-display text-lg font-bold md:text-xl">Os {total} dias</h2>
        <p className="mb-5 text-[13px] text-ink-400">
          Cada dia: aquietar, ler, refletir, meditar e orar em cinco movimentos.
        </p>

        <ol className="space-y-2.5">
          {d.dias.map((dia, i) => {
            const n = i + 1;
            const feito = feitos.has(n);
            const eHoje = !acabou && n === proximo;
            const livro = bySlug.get(dia.leitura.slug);
            return (
              <li key={n}>
                <Link
                  href={`/devocional/${d.id}/${n}`}
                  className={`group flex items-center gap-4 rounded-2xl border p-2.5 pr-3.5 transition-all hover:-translate-y-0.5 ${
                    eHoje
                      ? "border-white/20 bg-white/[0.07]"
                      : "border-white/6 bg-ink-900 hover:border-white/15"
                  }`}
                >
                  {/* A gravura do capítulo do dia, com o número (ou o visto)
                      por cima: a lista vira uma trilha de cenas. */}
                  <CapaDevocional
                    devocional={d}
                    arte={{ slug: dia.leitura.slug, capitulo: dia.leitura.capitulo }}
                    tom={feito ? 0.5 : 0.36}
                    className="relative aspect-[16/10] w-[92px] shrink-0 rounded-xl ring-1 ring-white/10"
                  >
                    <div aria-hidden className="absolute inset-0 bg-black/35" />
                    <span
                      className="absolute inset-0 m-auto grid h-8 w-8 place-items-center rounded-full font-display text-[14px] font-black backdrop-blur-sm"
                      style={
                        feito
                          ? { backgroundColor: d.cor, color: "#0b0a0e" }
                          : eHoje
                            ? { boxShadow: `inset 0 0 0 2px ${d.cor}`, color: "#fff", backgroundColor: "rgb(0 0 0 / 0.35)" }
                            : { backgroundColor: "rgb(0 0 0 / 0.45)", color: "#fff" }
                      }
                    >
                      {feito ? <Check size={15} strokeWidth={3} /> : n}
                    </span>
                  </CapaDevocional>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2">
                      <span className="truncate font-display text-[15px] font-bold">{dia.titulo}</span>
                      {eHoje && (
                        <span
                          className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-950"
                          style={{ backgroundColor: d.cor }}
                        >
                          {feitos.size ? "Próximo" : "Comece aqui"}
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 truncate text-[12.5px] text-ink-400">
                      Dia {n} · {livro ? referencia(dia.leitura, livro.name) : "…"}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
