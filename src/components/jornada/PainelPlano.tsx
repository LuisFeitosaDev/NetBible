"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Check, ChevronDown, RotateCcw, Settings2, Sparkles } from "lucide-react";
import {
  apagarPlano,
  markChapterRead,
  desmarcarCapitulo,
  salvarPlano,
  type Reading,
} from "@/lib/db";
import {
  formatarData,
  inicioDoDia,
  montarPlano,
  progressoDoPlano,
  roteiroDoPlano,
  type PlanoSalvo,
} from "@/lib/planos";
import type { BibleIndex, BookMeta } from "@/lib/bible";
import { GaleriaPlanos } from "./GaleriaPlanos";

/**
 * O plano em andamento.
 *
 * O tom aqui é deliberadamente sem cobrança. Ficar para trás num plano de
 * leitura é a regra, não a exceção, e um app que responde a isso com vermelho
 * e "você está 12 dias atrasado" é um app que a pessoa desinstala em fevereiro.
 * Então: o atraso aparece como uma lista do que sobrou, com um botão para
 * remarcar o início, e a previsão é feita pelo ritmo real de quem lê.
 */
export function PainelPlano({
  plano,
  index,
  bySlug,
  reading,
}: {
  plano: PlanoSalvo | null;
  index: BibleIndex;
  bySlug: Map<string, BookMeta>;
  reading: Reading[];
}) {
  const [trocando, setTrocando] = useState(false);
  const [verPendentes, setVerPendentes] = useState(false);

  const lidosPorLivro = useMemo(
    () => new Map(reading.map((r) => [r.slug, new Set(r.done)])),
    [reading],
  );
  const lido = useMemo(
    () => (slug: string, capitulo: number) =>
      lidosPorLivro.get(slug)?.has(capitulo) ?? false,
    [lidosPorLivro],
  );

  const roteiro = useMemo(
    () => (plano ? roteiroDoPlano(plano, index) : []),
    [plano, index],
  );

  const p = useMemo(
    () => (plano ? progressoDoPlano(plano, roteiro, lido) : null),
    [plano, roteiro, lido],
  );

  if (!plano || trocando) {
    return (
      <GaleriaPlanos
        total={roteiro.length || 1189}
        aoEscolher={async (escolha) => {
          // O que já estava lido vira o marco zero da previsão de ritmo, e não
          // desaparece do progresso: quem já leu 300 capítulos começa em 25%.
          const novoRoteiro = roteiroDoPlano(escolha, index);
          let jaLidos = 0;
          for (const c of novoRoteiro) if (lido(c.slug, c.capitulo)) jaLidos++;
          await salvarPlano(montarPlano(escolha, jaLidos));
          setTrocando(false);
        }}
        aoCancelar={plano ? () => setTrocando(false) : undefined}
      />
    );
  }

  if (!p) return null;
  const percentual = Math.round((p.lidos / p.total) * 100);

  return (
    <div className="space-y-4 pb-16">
      {/* Cabeçalho do plano */}
      <section className="overflow-hidden rounded-2xl border border-white/8 bg-ink-900">
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate font-display text-[17px] font-bold">
                {plano.nome}
              </p>
              <p className="mt-0.5 text-[12.5px] text-ink-400">
                {p.concluido
                  ? "Plano concluído."
                  : `Dia ${p.diaVisivel} de ${p.dias} · começou em ${formatarData(plano.inicioEm)}`}
              </p>
            </div>
            <button
              onClick={() => setTrocando(true)}
              aria-label="Trocar de plano"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Settings2 size={16} />
            </button>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-3xl font-black tracking-tight">
              {percentual}%
            </span>
            <span className="font-mono text-[12px] text-ink-500">
              {p.lidos} de {p.total} capítulos
            </span>
          </div>

          <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-300 transition-[width] duration-500"
              style={{ width: `${percentual}%` }}
            />
          </div>

          <p className="mt-3 text-[12.5px] leading-relaxed text-ink-400">
            {p.concluido ? (
              <span className="inline-flex items-center gap-1.5 font-semibold text-gold-400">
                <Sparkles size={13} />
                Você leu a Bíblia inteira.
              </span>
            ) : (
              <>
                {p.atrasado > 0 ? (
                  <>
                    Faltam {p.atrasado}{" "}
                    {p.atrasado === 1 ? "capítulo" : "capítulos"} para alcançar o
                    calendário.
                  </>
                ) : p.adiantado > 0 ? (
                  <>
                    Adiantado em {p.adiantado}{" "}
                    {p.adiantado === 1 ? "capítulo" : "capítulos"}.
                  </>
                ) : (
                  <>Em dia.</>
                )}{" "}
                {p.terminaNoRitmo ? (
                  <>
                    No ritmo que você vem lendo, termina em{" "}
                    <span className="text-ink-200">
                      {formatarData(p.terminaNoRitmo)}
                    </span>
                    .
                  </>
                ) : (
                  <>
                    Previsto para terminar em{" "}
                    <span className="text-ink-200">
                      {formatarData(p.terminaPrevisto)}
                    </span>
                    .
                  </>
                )}
              </>
            )}
          </p>
        </div>
      </section>

      {/* Leitura de hoje */}
      {!p.concluido && (
        <section className="rounded-2xl border border-white/8 bg-ink-900 p-4">
          <p className="mb-3 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink-500">
            Hoje
          </p>
          {p.hoje.length === 0 ? (
            <p className="text-[13px] text-ink-400">
              Nada marcado para hoje. O plano já passou do último dia.
            </p>
          ) : (
            <div className="space-y-1.5">
              {p.hoje.map((c) => (
                <LinhaCapitulo
                  key={`${c.slug}.${c.capitulo}`}
                  slug={c.slug}
                  capitulo={c.capitulo}
                  nome={bySlug.get(c.slug)?.name ?? c.slug}
                  lido={lido(c.slug, c.capitulo)}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Pendentes */}
      {p.pendentes.length > 0 && (
        <section className="rounded-2xl border border-white/8 bg-ink-900 p-4">
          <button
            onClick={() => setVerPendentes((v) => !v)}
            aria-expanded={verPendentes}
            className="flex w-full items-center justify-between gap-3 text-left"
          >
            <span>
              <span className="block font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink-500">
                Ficou para trás
              </span>
              <span className="mt-0.5 block text-[13px] text-ink-300">
                {p.pendentes.length} {p.pendentes.length === 1 ? "capítulo" : "capítulos"}
                {p.pendentes.length === 30 && " (os mais recentes)"}
              </span>
            </span>
            <ChevronDown
              size={16}
              className={`shrink-0 text-ink-500 transition-transform ${verPendentes ? "rotate-180" : ""}`}
            />
          </button>

          {verPendentes && (
            <div className="mt-3 animate-fade space-y-1.5 border-t border-white/6 pt-3">
              {p.pendentes.map((c) => (
                <LinhaCapitulo
                  key={`${c.slug}.${c.capitulo}`}
                  slug={c.slug}
                  capitulo={c.capitulo}
                  nome={bySlug.get(c.slug)?.name ?? c.slug}
                  lido={false}
                />
              ))}
              {/* Recomeçar a contagem de hoje é o caminho honesto para quem
                  sumiu um mês: apaga a dívida sem apagar o que foi lido. */}
              <button
                onClick={() =>
                  salvarPlano({ ...plano, inicioEm: inicioDoDia(), criadoEm: Date.now() })
                }
                className="mt-2 inline-flex items-center gap-2 rounded-lg bg-white/[0.06] px-3 py-2 text-[12.5px] font-semibold text-ink-200 transition-colors hover:bg-white/12"
              >
                <RotateCcw size={13} />
                Recomeçar a contagem a partir de hoje
              </button>
            </div>
          )}
        </section>
      )}

      <button
        onClick={() => {
          if (confirm("Encerrar o plano? O que você já leu continua salvo.")) {
            void apagarPlano();
          }
        }}
        className="w-full rounded-xl border border-white/8 py-2.5 text-[12.5px] font-semibold text-ink-500 transition-colors hover:border-white/20 hover:text-ink-300"
      >
        Encerrar plano
      </button>
    </div>
  );
}

function LinhaCapitulo({
  slug,
  capitulo,
  nome,
  lido,
}: {
  slug: string;
  capitulo: number;
  nome: string;
  lido: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg bg-white/[0.03] p-1.5 pr-3">
      <button
        onClick={() =>
          lido ? desmarcarCapitulo(slug, capitulo) : markChapterRead(slug, capitulo)
        }
        aria-pressed={lido}
        aria-label={`${nome} ${capitulo}, ${lido ? "lido" : "não lido"}`}
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border transition-colors ${
          lido
            ? "border-gold-400 bg-gold-400 text-ink-950"
            : "border-white/14 text-transparent hover:border-white/35"
        }`}
      >
        <Check size={15} strokeWidth={3} />
      </button>
      <Link
        href={`/livro/${slug}/${capitulo}`}
        className={`min-w-0 flex-1 truncate font-sans text-[14px] transition-colors hover:text-white ${
          lido ? "text-ink-500 line-through decoration-ink-700" : "text-ink-100"
        }`}
      >
        {nome} {capitulo}
      </Link>
    </div>
  );
}
