"use client";

import { useState } from "react";
import { CalendarDays, Check, Gauge } from "lucide-react";
import {
  ORDENS,
  dataDeTermino,
  formatarData,
  type OrdemDoPlano,
} from "@/lib/planos";

export type EscolhaDePlano = {
  nome: string;
  ordem: OrdemDoPlano;
  dias: number;
};

const PRAZOS = [3, 6, 9, 12, 18, 24, 36];

/**
 * Criação do plano, numa tela só.
 *
 * Escolher a ordem e o prazo são duas perguntas, não seis cartões prontos. E a
 * conta aparece enquanto você mexe, porque "1 ano" não decide nada até virar
 * "4 capítulos por dia, terminando em 22 de setembro de 2027".
 */
export function CriarPlano({
  total,
  aoCriar,
  aoCancelar,
}: {
  total: number;
  aoCriar: (escolha: EscolhaDePlano) => void;
  aoCancelar?: () => void;
}) {
  const [ordem, setOrdem] = useState<OrdemDoPlano | null>(null);
  const [meses, setMeses] = useState<number | null>(null);

  // Meses viram dias pelo mês médio do calendário, não por 30: em 24 meses a
  // diferença já passa de uma semana no fim do plano.
  const dias = meses ? Math.round(meses * 30.437) : 0;
  const porDia = dias ? total / dias : 0;
  const pronto = Boolean(ordem && meses);

  const nome =
    ordem === "cronologica"
      ? `Cronológico em ${rotuloDePrazo(meses ?? 0)}`
      : `Gênesis a Apocalipse em ${rotuloDePrazo(meses ?? 0)}`;

  return (
    <div className="space-y-5 pb-16">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-display text-lg font-bold">Criar plano de leitura</h2>
        {aoCancelar && (
          <button
            onClick={aoCancelar}
            className="shrink-0 text-[13px] font-semibold text-ink-400 transition-colors hover:text-white"
          >
            Cancelar
          </button>
        )}
      </div>

      <section>
        <p className="mb-2 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink-500">
          1 · Em que ordem
        </p>
        <div className="space-y-2">
          {ORDENS.map((o) => (
            <button
              key={o.id}
              onClick={() => setOrdem(o.id)}
              aria-pressed={ordem === o.id}
              className={`flex w-full gap-3 rounded-2xl border p-4 text-left transition-colors ${
                ordem === o.id
                  ? "border-white/45 bg-white/[0.07]"
                  : "border-white/8 bg-ink-900 hover:border-white/22"
              }`}
              style={
                ordem === o.id
                  ? {
                      borderLeft: `3px solid ${
                        o.id === "cronologica" ? "#f59e0b" : "#818cf8"
                      }`,
                    }
                  : undefined
              }
            >
              <span
                className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors ${
                  ordem === o.id
                    ? "border-gold-400 bg-gold-400 text-ink-950"
                    : "border-white/20 text-transparent"
                }`}
              >
                <Check size={12} strokeWidth={3} />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-[15px] font-bold">
                  {o.nome}
                </span>
                <span className="mt-1 block text-[12.5px] leading-relaxed text-ink-400">
                  {o.resumo}
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <p className="mb-2 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink-500">
          2 · Em quanto tempo
        </p>
        <div className="flex flex-wrap gap-2">
          {PRAZOS.map((m) => (
            <button
              key={m}
              onClick={() => setMeses(m)}
              aria-pressed={meses === m}
              className={`rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors ${
                meses === m
                  ? "bg-white text-ink-950"
                  : "bg-white/8 text-ink-300 hover:bg-white/14"
              }`}
            >
              {rotuloDePrazo(m)}
            </button>
          ))}
        </div>
      </section>

      {/* A conta, ao vivo. Aparece assim que dá para calcular alguma coisa. */}
      <section
        className={`rounded-2xl border p-4 transition-colors ${
          pronto ? "border-gold-500/30 bg-gold-500/[0.06]" : "border-dashed border-white/10"
        }`}
      >
        {pronto ? (
          <>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="inline-flex items-center gap-2">
                <Gauge size={15} className="text-gold-400" />
                <span className="font-display text-xl font-black tracking-tight">
                  {porDia < 1.2 ? "1" : Math.round(porDia)}
                </span>
                <span className="text-[12.5px] text-ink-300">
                  {porDia < 1.2 ? "capítulo por dia" : "capítulos por dia"}
                </span>
              </span>
              <span className="inline-flex items-center gap-2 text-[12.5px] text-ink-300">
                <CalendarDays size={14} className="text-ink-500" />
                termina em{" "}
                <span className="font-semibold text-white">
                  {formatarData(dataDeTermino(dias))}
                </span>
              </span>
            </div>
            <p className="mt-2.5 border-t border-white/8 pt-2.5 text-[12px] leading-relaxed text-ink-400">
              São {total} capítulos em {dias} dias. Se você pular um dia, o app
              redistribui o que faltou nos dias seguintes e refaz essa conta
              sozinho.
            </p>
          </>
        ) : (
          <p className="text-center text-[13px] text-ink-500">
            {!ordem ? "Escolha a ordem para ver o ritmo." : "Escolha o prazo."}
          </p>
        )}
      </section>

      <button
        onClick={() => pronto && aoCriar({ nome, ordem: ordem!, dias })}
        disabled={!pronto}
        className="w-full rounded-xl bg-gold-400 py-3.5 font-display text-sm font-bold text-ink-950 transition-colors enabled:hover:bg-gold-300 disabled:cursor-not-allowed disabled:bg-white/8 disabled:text-ink-500"
      >
        Começar hoje
      </button>
    </div>
  );
}

function rotuloDePrazo(meses: number) {
  if (meses < 12) return `${meses} meses`;
  const anos = meses / 12;
  if (Number.isInteger(anos)) return anos === 1 ? "1 ano" : `${anos} anos`;
  return `${meses} meses`;
}
