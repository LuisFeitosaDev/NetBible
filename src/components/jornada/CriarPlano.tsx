"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Check, Gauge, ListPlus, Sparkles } from "lucide-react";
import {
  ORDENS,
  PLANOS_FAMOSOS,
  dataDeTermino,
  formatarData,
  roteiroDoPlano,
  type OrdemDoPlano,
} from "@/lib/planos";
import type { BibleIndex } from "@/lib/bible";
import { ComoVaiLer } from "./ComoVaiLer";
import { EscolherLivros } from "./EscolherLivros";

export type EscolhaDePlano = {
  nome: string;
  ordem: OrdemDoPlano;
  dias: number;
  /** Só em "personalizado": os livros escolhidos, na ordem de leitura. */
  livros?: string[];
};

const PRAZOS = [3, 6, 9, 12, 18, 24, 36];

/** Cor do risco à esquerda de cada ordem, só para diferenciar os cartões. */
const COR_DA_ORDEM: Record<OrdemDoPlano, string> = {
  iniciante: "#34d399",
  cronologica: "#f59e0b",
  canonica: "#818cf8",
  proverbios: "#f59e0b",
  evangelhos: "#38bdf8",
  personalizado: "#f472b6",
};

/**
 * Criação do plano, numa tela só, em três passos: o quê (um plano famoso, uma
 * ordem pronta, ou um roteiro montado por você — livro por livro), e por fim
 * com quem — sozinho, ou em dupla/grupo com um código. O plano só é de fato
 * criado depois desse terceiro passo, para "criar grupo" e "criar plano"
 * nunca virarem dois fluxos separados.
 */
export function CriarPlano({
  index,
  aoCriar,
  aoCancelar,
}: {
  index: BibleIndex;
  aoCriar: (escolha: EscolhaDePlano) => void;
  aoCancelar?: () => void;
}) {
  const [ordem, setOrdem] = useState<OrdemDoPlano | null>(null);
  const [meses, setMeses] = useState<number | null>(null);
  const [personalizando, setPersonalizando] = useState(false);
  const [livrosEscolhidos, setLivrosEscolhidos] = useState<string[]>([]);
  const [escolhaPendente, setEscolhaPendente] = useState<EscolhaDePlano | null>(null);

  const livroPorSlug = useMemo(
    () => new Map(index.books.map((b) => [b.slug, b])),
    [index],
  );
  const totalBiblia = useMemo(
    () => roteiroDoPlano({ ordem: "canonica" }, index).length,
    [index],
  );
  const totalPersonalizado = useMemo(
    () =>
      livrosEscolhidos.reduce(
        (soma, slug) => soma + (livroPorSlug.get(slug)?.verses.length ?? 0),
        0,
      ),
    [livrosEscolhidos, livroPorSlug],
  );

  const total = personalizando ? totalPersonalizado : totalBiblia;
  // Meses viram dias pelo mês médio do calendário, não por 30: em 24 meses a
  // diferença já passa de uma semana no fim do plano.
  const dias = meses ? Math.round(meses * 30.437) : 0;
  const porDia = dias && total ? total / dias : 0;
  const pronto = personalizando
    ? Boolean(livrosEscolhidos.length && meses)
    : Boolean(ordem && meses);

  const nomeDaOrdem = ORDENS.find((o) => o.id === ordem)?.nome ?? "";
  const nome = personalizando
    ? nomeDoPersonalizado(livrosEscolhidos, livroPorSlug, meses ?? 0)
    : `${nomeDaOrdem} em ${rotuloDePrazo(meses ?? 0)}`;

  if (escolhaPendente) {
    return (
      <div className="space-y-5 pb-16">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-lg font-bold">{escolhaPendente.nome}</h2>
          <button
            onClick={() => setEscolhaPendente(null)}
            className="shrink-0 text-[13px] font-semibold text-ink-400 transition-colors hover:text-white"
          >
            Trocar plano
          </button>
        </div>
        <ComoVaiLer
          nomeDoPlano={escolhaPendente.nome}
          aoContinuar={() => aoCriar(escolhaPendente)}
        />
      </div>
    );
  }

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

      {!personalizando && (
        <section>
          <p className="mb-2 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink-500">
            Planos conhecidos
          </p>
          <div className="space-y-2">
            {PLANOS_FAMOSOS.map((f) => (
              <button
                key={f.id}
                onClick={() => setEscolhaPendente({ nome: f.nome, ordem: f.ordem, dias: f.dias })}
                className="group flex w-full items-start gap-3 rounded-2xl border border-white/8 bg-ink-900 p-4 text-left transition-colors hover:border-white/22"
                style={{ borderLeft: `3px solid ${COR_DA_ORDEM[f.ordem]}` }}
              >
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-gold-400">
                  <Sparkles size={15} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[15px] font-bold">{f.nome}</span>
                  <span className="mt-1 block text-[12.5px] leading-relaxed text-ink-400">
                    {f.resumo}
                  </span>
                </span>
                <span className="mt-1 shrink-0 font-sans text-[12px] font-semibold text-gold-400 opacity-0 transition-opacity group-hover:opacity-100">
                  Escolher
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <p className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink-500">
            {personalizando ? "Crie seu próprio · escolha os livros" : "Ou do seu jeito · 1 · Em que ordem"}
          </p>
          {personalizando && (
            <button
              onClick={() => {
                setPersonalizando(false);
                setLivrosEscolhidos([]);
              }}
              className="shrink-0 text-[12px] font-semibold text-ink-400 hover:text-white"
            >
              Usar uma ordem pronta
            </button>
          )}
        </div>

        {personalizando ? (
          <EscolherLivros
            index={index}
            selecionados={livrosEscolhidos}
            aoMudar={setLivrosEscolhidos}
          />
        ) : (
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
                  ordem === o.id ? { borderLeft: `3px solid ${COR_DA_ORDEM[o.id]}` } : undefined
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

            <button
              onClick={() => {
                setPersonalizando(true);
                setOrdem(null);
              }}
              className="flex w-full items-center gap-3 rounded-2xl border border-dashed border-white/16 p-4 text-left transition-colors hover:border-white/32 hover:bg-white/[0.03]"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-pink-400/12 text-pink-300">
                <ListPlus size={17} />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-[15px] font-bold">
                  Crie seu próprio plano
                </span>
                <span className="mt-0.5 block text-[12.5px] leading-relaxed text-ink-400">
                  Você escolhe quais livros ler e em que ordem.
                </span>
              </span>
            </button>
          </div>
        )}
      </section>

      <section>
        <p className="mb-2 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink-500">
          {personalizando ? "Em quanto tempo" : "2 · Em quanto tempo"}
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
            {personalizando
              ? !livrosEscolhidos.length
                ? "Escolha ao menos um livro para ver o ritmo."
                : "Escolha o prazo."
              : !ordem
                ? "Escolha a ordem para ver o ritmo."
                : "Escolha o prazo."}
          </p>
        )}
      </section>

      <button
        onClick={() =>
          pronto &&
          setEscolhaPendente(
            personalizando
              ? { nome, ordem: "personalizado", dias, livros: livrosEscolhidos }
              : { nome, ordem: ordem!, dias },
          )
        }
        disabled={!pronto}
        className="w-full rounded-xl bg-gold-400 py-3.5 font-display text-sm font-bold text-ink-950 transition-colors enabled:hover:bg-gold-300 disabled:cursor-not-allowed disabled:bg-white/8 disabled:text-ink-500"
      >
        Continuar
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

/**
 * "Rute e Jonas em 2 meses" para poucos livros, "6 livros em 8 meses" para
 * muitos — nomear cada combinação por extenso viraria um título maior que a
 * tela.
 */
function nomeDoPersonalizado(
  slugs: string[],
  livroPorSlug: Map<string, { name: string }>,
  meses: number,
) {
  const prazo = rotuloDePrazo(meses);
  if (slugs.length === 0) return `Meu plano em ${prazo}`;
  if (slugs.length <= 2) {
    const nomes = slugs.map((s) => livroPorSlug.get(s)?.name ?? s);
    return `${nomes.join(" e ")} em ${prazo}`;
  }
  return `${slugs.length} livros em ${prazo}`;
}
