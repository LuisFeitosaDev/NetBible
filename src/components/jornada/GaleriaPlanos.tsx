"use client";

import { useState } from "react";
import { CalendarDays, Check, Sliders } from "lucide-react";
import {
  MODELOS,
  dataDeTermino,
  formatarData,
  ritmoDoModelo,
  type ModeloDePlano,
  type OrdemDoPlano,
} from "@/lib/planos";

/**
 * O que a galeria devolve: a escolha, não o plano pronto.
 *
 * Montar o plano exige saber quantos capítulos do roteiro já estavam lidos, e
 * isso quem tem é o painel, que carrega o índice e o progresso.
 */
export type EscolhaDePlano =
  | ModeloDePlano
  | { nome: string; ordem: OrdemDoPlano; dias: number };

/**
 * Escolha do plano.
 *
 * Cada cartão diz de antemão o ritmo e a data de fim, porque é isso que decide
 * a escolha. "Em 1 ano" não significa nada até virar "cerca de 3 capítulos por
 * dia, terminando em 23 de setembro de 2027".
 */
export function GaleriaPlanos({
  total,
  aoEscolher,
  aoCancelar,
}: {
  total: number;
  aoEscolher: (escolha: EscolhaDePlano) => void;
  aoCancelar?: () => void;
}) {
  const [personalizando, setPersonalizando] = useState(false);

  return (
    <div className="space-y-3 pb-16">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm text-ink-400">
          Escolha um ritmo. Dá para trocar depois sem perder nada do que já leu.
        </p>
        {aoCancelar && (
          <button
            onClick={aoCancelar}
            className="shrink-0 text-[13px] font-semibold text-ink-400 transition-colors hover:text-white"
          >
            Cancelar
          </button>
        )}
      </div>

      {MODELOS.map((modelo) => (
        <CartaoModelo
          key={modelo.id}
          modelo={modelo}
          total={total}
          aoEscolher={() => aoEscolher(modelo)}
        />
      ))}

      {personalizando ? (
        <Personalizado
          total={total}
          aoEscolher={aoEscolher}
          aoFechar={() => setPersonalizando(false)}
        />
      ) : (
        <button
          onClick={() => setPersonalizando(true)}
          className="flex w-full items-center gap-3 rounded-2xl border border-dashed border-white/14 p-4 text-left transition-colors hover:border-white/30 hover:bg-white/[0.03]"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-ink-300">
            <Sliders size={18} />
          </span>
          <span>
            <span className="block font-display text-[15px] font-bold">
              Do meu jeito
            </span>
            <span className="block text-[12.5px] text-ink-400">
              Você escolhe a ordem e em quantos meses quer terminar.
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

function CartaoModelo({
  modelo,
  total,
  aoEscolher,
}: {
  modelo: ModeloDePlano;
  total: number;
  aoEscolher: () => void;
}) {
  const cronologico = modelo.ordem === "cronologica";
  return (
    <button
      onClick={aoEscolher}
      className="group w-full overflow-hidden rounded-2xl border border-white/8 bg-ink-900 p-4 text-left transition-colors hover:border-white/22"
      style={{
        borderLeft: `3px solid ${cronologico ? "#f59e0b" : "#818cf8"}`,
      }}
    >
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-display text-[15px] font-bold">{modelo.nome}</p>
          <p className="mt-1 text-[12.5px] leading-relaxed text-ink-400">
            {modelo.resumo}
          </p>
        </div>
        <span className="mt-0.5 shrink-0 rounded-full bg-white/[0.06] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink-300">
          {cronologico ? "Histórico" : "Canônico"}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/6 pt-2.5 text-[11.5px] text-ink-500">
        <span>{ritmoDoModelo(modelo.dias, total)}</span>
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays size={11} />
          termina em {formatarData(dataDeTermino(modelo.dias))}
        </span>
      </div>
    </button>
  );
}

const MESES = [3, 6, 9, 12, 18, 24, 36];

function Personalizado({
  total,
  aoEscolher,
  aoFechar,
}: {
  total: number;
  aoEscolher: (escolha: EscolhaDePlano) => void;
  aoFechar: () => void;
}) {
  const [ordem, setOrdem] = useState<OrdemDoPlano>("canonica");
  const [meses, setMeses] = useState(12);

  // Meses viram dias pelo mês médio do calendário, não por 30: em 24 meses a
  // diferença já é de mais de uma semana no fim do plano.
  const dias = Math.round(meses * 30.437);
  const nome =
    ordem === "cronologica"
      ? `Cronológico em ${rotuloDePrazo(meses)}`
      : `Gênesis a Apocalipse em ${rotuloDePrazo(meses)}`;

  return (
    <div className="animate-fade rounded-2xl border border-white/14 bg-ink-900 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-[15px] font-bold">Do meu jeito</p>
        <button
          onClick={aoFechar}
          className="text-[13px] font-semibold text-ink-400 transition-colors hover:text-white"
        >
          Fechar
        </button>
      </div>

      <p className="mb-2 mt-4 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink-500">
        Ordem
      </p>
      <div className="grid grid-cols-2 gap-2">
        {(
          [
            ["canonica", "Gênesis a Apocalipse", "Na ordem da Bíblia."],
            ["cronologica", "Cronológica", "Na ordem dos fatos."],
          ] as const
        ).map(([id, titulo, nota]) => (
          <button
            key={id}
            onClick={() => setOrdem(id)}
            aria-pressed={ordem === id}
            className={`rounded-xl border p-3 text-left transition-colors ${
              ordem === id
                ? "border-white/45 bg-white/10"
                : "border-white/8 hover:border-white/20"
            }`}
          >
            <span className="flex items-center gap-1.5 font-sans text-[13px] font-bold">
              {ordem === id && <Check size={13} className="text-gold-400" />}
              {titulo}
            </span>
            <span className="mt-0.5 block text-[11.5px] text-ink-500">{nota}</span>
          </button>
        ))}
      </div>

      <p className="mb-2 mt-5 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink-500">
        Em quanto tempo
      </p>
      <div className="flex flex-wrap gap-2">
        {MESES.map((m) => (
          <button
            key={m}
            onClick={() => setMeses(m)}
            aria-pressed={meses === m}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              meses === m
                ? "bg-white text-ink-950"
                : "bg-white/8 text-ink-300 hover:bg-white/14"
            }`}
          >
            {rotuloDePrazo(m)}
          </button>
        ))}
      </div>

      <p className="mt-4 border-t border-white/6 pt-3 text-[12.5px] text-ink-400">
        {ritmoDoModelo(dias, total)}, terminando em{" "}
        <span className="font-semibold text-ink-200">
          {formatarData(dataDeTermino(dias))}
        </span>
        .
      </p>

      <button
        onClick={() => aoEscolher({ nome, ordem, dias })}
        className="mt-4 w-full rounded-xl bg-gold-400 py-3 font-display text-sm font-bold text-ink-950 transition-colors hover:bg-gold-300"
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
