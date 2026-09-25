"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  CalendarPlus,
  Check,
  Gauge,
  RotateCcw,
  Settings2,
  Sparkles,
  Trash2,
} from "lucide-react";
import {
  apagarPlano,
  db,
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
  type OrdemDoPlano,
  type PlanoSalvo,
} from "@/lib/planos";
import { sincronizar } from "@/lib/sync";
import type { BibleIndex, BookMeta } from "@/lib/bible";
import { ConfirmarExclusao } from "@/components/ConfirmarExclusao";
import { CriarPlano } from "./CriarPlano";
import { EntrarComCodigo } from "./EntrarComCodigo";
import { GrupoDeLeitura } from "./GrupoDeLeitura";

/**
 * O plano em andamento.
 *
 * O tom aqui é deliberadamente sem cobrança. Ficar para trás num plano de
 * leitura é a regra, não a exceção, e um app que responde a isso com vermelho e
 * "você está 12 dias atrasado" é um app que a pessoa desinstala em fevereiro.
 * Em vez de acusar, ele recalcula: o que faltou se dilui nos dias que restam e
 * a cota de hoje já vem ajustada.
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
  const [criando, setCriando] = useState(false);
  const [confirmando, setConfirmando] = useState(false);

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

  /*
   * Grava a cota do dia assim que o dia vira. Fica num efeito, e não no cálculo,
   * porque `progressoDoPlano` é chamado a cada pintura e escrever no banco dali
   * criaria um laço: grava, o Dexie avisa, repinta, grava de novo.
   */
  useEffect(() => {
    if (!plano || !p?.precisaAtribuir || !roteiro.length) return;
    void salvarPlano({
      ...plano,
      diaAtribuido: p.dia,
      atribuicao: p.atribuicaoDeHoje,
    });
  }, [plano, p, roteiro.length]);

  if (criando) {
    return (
      <CriarPlano
        index={index}
        aoCriar={async (escolha) => {
          await criar(escolha, index, lido);
          setCriando(false);
        }}
        aoSalvar={async (escolha) => {
          await criar(escolha, index, lido);
        }}
        aoCancelar={() => setCriando(false)}
      />
    );
  }

  if (!plano) {
    return (
      <div className="space-y-4 pb-16">
        <SemPlano aoComecar={() => setCriando(true)} index={index} lido={lido} />
        <GrupoDeLeitura index={index} />
      </div>
    );
  }

  if (!p) return null;
  // `p.total` pode ser 0 quando todo o roteiro já estava lido antes do plano
  // nascer (crédito igual ao total) — nesse caso o plano já nasce completo.
  const percentual = p.total > 0 ? Math.round((p.lidos / p.total) * 100) : 100;
  // `> 1` faz parte da condição: num plano esparso (poucos capítulos num prazo
  // longo, comum nos personalizados) o ritmo original já é bem menor que 1
  // capítulo por dia, então 1 capítulo — o mínimo possível, não dá pra ler
  // menos que um inteiro — sempre pareceria "apertado" sem nunca ter sido.
  const apertado = p.ritmoNecessario > 1 && p.ritmoNecessario > p.ritmoOriginal * 1.8;

  return (
    <div className="space-y-4 pb-16">
      <GrupoDeLeitura index={index} />

      <section className="rounded-2xl border border-white/8 bg-ink-900 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate font-display text-[17px] font-bold">{plano.nome}</p>
            <p className="mt-0.5 text-[12.5px] text-ink-400">
              {p.concluido
                ? "Plano concluído."
                : p.vencido
                  ? `O prazo terminou em ${formatarData(p.terminaPrevisto)}`
                  : `Dia ${p.diaVisivel} de ${p.dias}`}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              onClick={() => setCriando(true)}
              aria-label="Trocar de plano"
              className="grid h-8 w-8 place-items-center rounded-full text-ink-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Settings2 size={16} />
            </button>
            <button
              onClick={() => setConfirmando(true)}
              aria-label="Apagar plano"
              className="grid h-8 w-8 place-items-center rounded-full text-ink-400 transition-colors hover:bg-red-500/15 hover:text-red-400"
            >
              <Trash2 size={16} />
            </button>
          </div>
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

        {p.concluido ? (
          <p className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-gold-400">
            <Sparkles size={13} />
            Você leu a Bíblia inteira.
          </p>
        ) : (
          <p className="mt-3 text-[12.5px] leading-relaxed text-ink-400">
            <span className="inline-flex items-center gap-1.5 font-semibold text-ink-200">
              <Gauge size={12} className="text-gold-400" />
              {p.ritmoNecessario} {p.ritmoNecessario === 1 ? "capítulo" : "capítulos"} por
              dia
            </span>{" "}
            {p.vencido ? (
              <>para fechar os {p.faltam} que faltam.</>
            ) : (
              <>
                nos {p.diasRestantes} dias que restam, para terminar em{" "}
                <span className="text-ink-200">{formatarData(p.terminaPrevisto)}</span>.
              </>
            )}
            {p.terminaNoRitmo && !p.vencido && (
              <>
                {" "}
                No ritmo que você vem lendo, termina em{" "}
                <span className="text-ink-200">{formatarData(p.terminaNoRitmo)}</span>.
              </>
            )}
          </p>
        )}
      </section>

      {/* Leitura de hoje */}
      {!p.concluido && (
        <section className="rounded-2xl border border-white/8 bg-ink-900 p-4">
          <div className="mb-3 flex items-baseline justify-between gap-3">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink-500">
              Hoje
            </p>
            <p className="font-mono text-[10px] text-ink-500">
              {p.hojeFeitos}/{p.hoje.length}
            </p>
          </div>
          {/*
            Fica acima da lista, e não abaixo: com o ritmo apertado a lista tem
            dezenas de linhas, e um convite para recomeçar que só aparece depois
            de rolar tudo chega tarde demais para quem já se assustou.

            Oferecer "leia 39 por dia" é oferecer a desistência. Recomeçar a
            contagem devolve o prazo inteiro a partir de hoje, sem apagar um
            capítulo do que já foi lido.
          */}
          {apertado && (
            <div className="mb-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
              <p className="text-[12.5px] leading-relaxed text-ink-300">
                Para fechar no prazo seriam {p.ritmoNecessario} capítulos hoje. Se
                preferir, recomece a contagem e tenha os {p.dias} dias de novo,
                mantendo os {p.lidosBrutos} capítulos que você já leu.
              </p>
              <button
                onClick={() =>
                  salvarPlano({
                    ...plano,
                    inicioEm: inicioDoDia(),
                    lidosAoComecar: p.lidosBrutos,
                    diaAtribuido: undefined,
                    atribuicao: undefined,
                  })
                }
                className="mt-2.5 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-[12.5px] font-semibold text-white transition-colors hover:bg-white/16"
              >
                <RotateCcw size={13} />
                Recomeçar a contagem hoje
              </button>
            </div>
          )}

          {p.hoje.length === 0 ? (
            <p className="text-[13px] text-ink-400">Nada separado para hoje.</p>
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


      {confirmando && (
        <ConfirmarExclusao
          titulo="Apagar o plano?"
          aviso={`"${plano.nome}" sai da sua jornada. Os ${p.lidosBrutos} capítulos que você leu, as marcações e os comentários continuam salvos.`}
          rotuloConfirmar="Apagar plano"
          aoConfirmar={apagarPlano}
          aoFechar={() => setConfirmando(false)}
        />
      )}
    </div>
  );
}

/** Monta e grava o plano, sempre começando do zero no primeiro capítulo. */
async function criar(
  escolha: { nome: string; ordem: OrdemDoPlano; dias: number; livros?: string[] },
  index: BibleIndex,
  _lido: (slug: string, capitulo: number) => boolean,
) {
  const roteiro = roteiroDoPlano(escolha, index);
  const slugs = new Set(roteiro.map((c) => c.slug));

  // Um plano novo sempre começa zerado a partir do primeiro capítulo:
  for (const slug of slugs) {
    const atual = await db.reading.get(slug);
    if (atual && atual.done.length > 0) {
      await db.reading.put({
        ...atual,
        done: [],
        lastChapter: 1,
        updatedAt: Date.now(),
        atualizadoEm: Date.now(),
      });
    }
  }

  await salvarPlano(montarPlano(escolha, 0));
  await sincronizar();
}

function SemPlano({
  aoComecar,
  index,
  lido,
}: {
  aoComecar: () => void;
  index: BibleIndex;
  lido: (slug: string, capitulo: number) => boolean;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-white/12 px-5 py-10 text-center">
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gold-400/12 text-gold-400">
        <CalendarPlus size={22} />
      </span>
      <p className="mt-4 font-display text-[17px] font-bold">Nenhum plano ativo</p>
      <p className="mx-auto mt-1.5 max-w-xs text-[13px] leading-relaxed text-ink-400">
        Escolha uma ordem e um prazo. O app calcula o ritmo, separa a leitura de
        cada dia e refaz a conta se você pular algum.
      </p>
      <button
        onClick={aoComecar}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gold-400 px-5 py-3 font-display text-sm font-bold text-ink-950 transition-colors hover:bg-gold-300"
      >
        <CalendarPlus size={16} />
        Criar plano de leitura
      </button>
      {/* Quem só recebeu um código de alguém não devia precisar montar o
          próprio plano antes de entrar no que já está rolando. */}
      <div>
        <EntrarComCodigo index={index} lido={lido} />
      </div>
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
        href={`/livro/${slug}/${capitulo}?de=plano`}
        className={`min-w-0 flex-1 truncate font-sans text-[14px] transition-colors hover:text-white ${
          lido ? "text-ink-500 line-through decoration-ink-700" : "text-ink-100"
        }`}
      >
        {nome} {capitulo}
      </Link>
    </div>
  );
}
