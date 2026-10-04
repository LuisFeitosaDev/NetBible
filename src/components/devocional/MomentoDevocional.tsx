"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { CapaDevocional } from "./CapaDevocional";
import { AnotacaoDoDia } from "./AnotacaoDoDia";
import { LembreteDevocional } from "./LembreteDevocional";
import {
  citacoesNaVersao,
  type Citacoes,
  type DiaDevocional,
  type GuiaDeOracao,
  type Serie,
} from "@/lib/devocionais";

/**
 * O momento devocional guiado: uma tela cheia, um passo por vez, uns 15
 * minutos. Aquietar, ler, refletir, meditar, orar em cinco movimentos e um
 * silêncio, encerrar.
 *
 * Os tempos são sugestão, nunca trava: o cronômetro avisa com um sino baixo
 * e a pessoa segue quando quiser. A tela não apaga enquanto ele está aberto,
 * que é justamente quando a pessoa está de olhos fechados orando.
 */

type Movimento = keyof GuiaDeOracao | "ouvir";

type Passo =
  | { etapa: "aquietar"; segundos: number }
  | { etapa: "ler" }
  | { etapa: "refletir" }
  | { etapa: "meditar"; segundos: number }
  | { etapa: "orar"; movimento: Movimento; segundos: number }
  | { etapa: "encerrar" };

const ETAPAS = [
  { id: "aquietar", nome: "Aquietar" },
  { id: "ler", nome: "Ler" },
  { id: "refletir", nome: "Refletir" },
  { id: "meditar", nome: "Meditar" },
  { id: "orar", nome: "Orar" },
  { id: "encerrar", nome: "Encerrar" },
] as const;

/** Os movimentos da oração, com um convite genérico para dias que ainda não têm o seu. */
const MOVIMENTOS: { id: Movimento; nome: string; subtitulo: string; generico: string }[] = [
  {
    id: "adorar",
    nome: "Adorar",
    subtitulo: "Olhe para quem Deus é",
    generico:
      "Antes de pedir qualquer coisa, olhe para quem Deus é no texto de hoje. Diga a ele, com as suas palavras, o que você viu dele na leitura.",
  },
  {
    id: "confessar",
    nome: "Confessar",
    subtitulo: "Seja honesto com ele",
    generico:
      "Conte a Deus, com honestidade, onde você tem resistido ou falhado. Ele já sabe e não se espanta. Receba o perdão que ele oferece.",
  },
  {
    id: "agradecer",
    nome: "Agradecer",
    subtitulo: "Dê nome ao que recebeu",
    generico:
      "Agradeça por três coisas concretas das últimas 24 horas, das grandes às pequenas. Diga o nome de cada uma.",
  },
  {
    id: "pedir",
    nome: "Pedir",
    subtitulo: "Peça o que você precisa",
    generico:
      "Peça a Deus o que você precisa para viver hoje o que leu. Seja específico, como quem fala com um pai.",
  },
  {
    id: "interceder",
    nome: "Interceder",
    subtitulo: "Lembre de alguém",
    generico:
      "Pense em uma pessoa que precisa de Deus hoje. Ore por ela pelo nome, pedindo o que você pediria para si.",
  },
  {
    id: "ouvir",
    nome: "Silêncio",
    subtitulo: "Só fique",
    generico:
      "Fique um minuto em silêncio, sem pedir nem dizer nada. Às vezes orar é só ficar na presença de quem te ama. Se a mente fugir, volte devagar, sem se cobrar.",
  },
];

const PASSOS: Passo[] = [
  { etapa: "aquietar", segundos: 60 },
  { etapa: "ler" },
  { etapa: "refletir" },
  { etapa: "meditar", segundos: 120 },
  ...MOVIMENTOS.map((m) => ({ etapa: "orar" as const, movimento: m.id, segundos: 60 })),
  { etapa: "encerrar" },
];

const CHAVE_SOM = "devocional.som";

export function MomentoDevocional({
  serie,
  n,
  dia,
  citacoes,
  versao,
  versiculos,
  referencia,
  nomeDoLivro,
  traducao,
  feito,
  feitos,
  anotacao,
  aoConcluir,
  aoFechar,
}: {
  serie: Serie;
  n: number;
  dia: DiaDevocional;
  citacoes: Citacoes;
  versao: string;
  versiculos: { n: number; texto: string }[] | null;
  referencia: string;
  nomeDoLivro: string;
  traducao?: string;
  feito: boolean;
  /** Quantos dias da série já estão feitos. */
  feitos: number;
  anotacao?: string;
  aoConcluir: () => Promise<void>;
  aoFechar: () => void;
}) {
  const [indice, setIndice] = useState(0);
  const [celebrando, setCelebrando] = useState(false);
  const [tempoAcabou, setTempoAcabou] = useState(false);
  const [som, setSom] = useState(true);
  const rolagem = useRef<HTMLDivElement>(null);
  const audio = useRef<AudioContext | null>(null);

  const passo = PASSOS[indice];
  const ultimo = indice === PASSOS.length - 1;
  const total = serie.dias.length;
  const citar = (t: string) => citacoesNaVersao(t, versao, citacoes);

  useEffect(() => {
    try {
      setSom(localStorage.getItem(CHAVE_SOM) !== "nao");
    } catch {
      /* sem armazenamento, fica com som */
    }
  }, []);

  const alternarSom = () => {
    setSom((s) => {
      try {
        localStorage.setItem(CHAVE_SOM, s ? "nao" : "sim");
      } catch {
        /* preferência só desta visita */
      }
      return !s;
    });
  };

  // O navegador só deixa tocar som depois de um toque da pessoa; o contexto
  // nasce (ou acorda) no primeiro toque dentro do momento.
  const prepararAudio = () => {
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    audio.current ??= new Ctx();
    if (audio.current.state === "suspended") void audio.current.resume();
  };

  const fimDoTempo = useCallback(() => {
    setTempoAcabou(true);
    // Vibrar antes do primeiro toque na página é bloqueado pelo navegador (e gera erro no console).
    if (navigator.userActivation?.hasBeenActive) navigator.vibrate?.(60);
    if (som && audio.current?.state === "running") tocarSino(audio.current);
  }, [som]);

  const ir = useCallback((para: number) => {
    setIndice(Math.max(0, Math.min(PASSOS.length - 1, para)));
    setTempoAcabou(false);
  }, []);

  const concluir = async () => {
    if (!feito) await aoConcluir();
    setCelebrando(true);
  };

  // Cada passo começa do topo.
  useEffect(() => {
    rolagem.current?.scrollTo({ top: 0 });
  }, [indice, celebrando]);

  // Tela cheia de verdade: a página de trás não rola, e a tela não apaga.
  useEffect(() => {
    const antes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let trava: WakeLockSentinel | null = null;
    const travar = async () => {
      try {
        trava = (await navigator.wakeLock?.request("screen")) ?? null;
      } catch {
        /* sem wake lock, a tela apaga como sempre */
      }
    };
    const aoVoltar = () => {
      if (document.visibilityState === "visible") void travar();
    };
    void travar();
    document.addEventListener("visibilitychange", aoVoltar);
    return () => {
      document.body.style.overflow = antes;
      document.removeEventListener("visibilitychange", aoVoltar);
      void trava?.release().catch(() => {});
      void audio.current?.close().catch(() => {});
    };
  }, []);

  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) return;
      if (e.key === "Escape") aoFechar();
      if (celebrando) return;
      if (e.key === "ArrowRight" && !ultimo) ir(indice + 1);
      if (e.key === "ArrowLeft") ir(indice - 1);
    };
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  }, [aoFechar, celebrando, indice, ir, ultimo]);

  const etapaAtual = celebrando ? "encerrar" : passo.etapa;
  const chave = dia.chave ?? dia.leitura.de;
  const versiculoChave = versiculos?.find((v) => v.n === chave);
  // Mais da gravura onde há pouco texto; mais escuro onde a leitura pede.
  const escuro = etapaAtual === "aquietar" || celebrando ? 0.72 : 0.9;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Momento devocional: ${dia.titulo}`}
      onPointerDown={prepararAudio}
      className="fixed inset-0 z-[80] flex flex-col overflow-hidden bg-ink-950 text-white"
    >
      <style>{`
        @keyframes momento-respira { 0%, 100% { transform: scale(.55) } 40% { transform: scale(1) } }
        @keyframes momento-zoom { from { transform: scale(1.04) } to { transform: scale(1.16) } }
        @media (prefers-reduced-motion: reduce) { .momento-anima { animation: none !important } }
      `}</style>

      {/* A gravura do capítulo do dia, respirando devagar atrás de tudo. */}
      <div aria-hidden className="absolute inset-0">
        <div
          className="momento-anima absolute inset-0"
          style={{ animation: "momento-zoom 48s ease-in-out infinite alternate", filter: "saturate(0.6) brightness(0.62) contrast(1.08)" }}
        >
          <CapaDevocional
            devocional={serie}
            arte={{ slug: dia.leitura.slug, capitulo: dia.leitura.capitulo }}
            tom={0.45}
            prioridade
            className="absolute inset-0"
          />
        </div>
        <div
          className="absolute inset-0 bg-ink-950 transition-opacity duration-700"
          style={{ opacity: escuro }}
        />
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(90% 55% at 50% 0%, ${serie.cor}1f 0%, transparent 70%)` }}
        />
        {/* Vinheta e degradês de topo e base: o olhar vai para o centro, como numa sala escura. */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 85% 75% at 50% 45%, transparent 40%, rgb(0 0 0 / 0.8) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgb(0 0 0 / 0.65), transparent 16%, transparent 78%, rgb(0 0 0 / 0.85))" }} />
      </div>

      {/* Topo: fechar, as seis etapas e o som. */}
      <header className="relative z-10 px-4 pt-[max(env(safe-area-inset-top),14px)]">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          <button
            onClick={aoFechar}
            aria-label="Fechar o momento devocional"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-black/30 text-white/80 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={17} />
          </button>
          <div className="flex flex-1 gap-1.5" aria-hidden>
            {ETAPAS.map((e) => (
              <span key={e.id} className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/20">
                <span
                  className="block h-full rounded-full transition-[width] duration-500"
                  style={{
                    width: `${celebrando ? 100 : preenchimento(e.id, indice) * 100}%`,
                    backgroundColor: "rgb(255 255 255 / 0.92)",
                  }}
                />
              </span>
            ))}
          </div>
          <button
            onClick={alternarSom}
            aria-label={som ? "Desligar o sino" : "Ligar o sino"}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-black/30 text-white/80 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
          >
            {som ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>
        <p className="mx-auto mt-4 flex max-w-2xl items-center justify-center gap-3 font-display text-[10.5px] font-semibold uppercase tracking-[0.32em] text-white/50">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-white/30" />
          {ETAPAS.find((e) => e.id === etapaAtual)?.nome} · Dia {n} de {total}
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-white/30" />
        </p>
      </header>

      <div
        ref={rolagem}
        className="relative z-10 flex-1 overflow-y-auto overscroll-contain [scrollbar-color:rgb(255_255_255/0.15)_transparent] [scrollbar-width:thin]"
      >
        <div
          key={celebrando ? "fim" : indice}
          className="mx-auto flex min-h-full max-w-2xl animate-[rise_0.55s_cubic-bezier(0.16,1,0.3,1)] flex-col justify-center px-6 py-8"
        >
          {celebrando ? (
            <Celebracao
              serie={serie}
              n={n}
              feitos={Math.max(feitos, 1)}
              aoFechar={aoFechar}
            />
          ) : passo.etapa === "aquietar" ? (
            <div className="text-center">
              <Respiracao cor={serie.cor} />
              <h2 className="mt-8 font-reading text-4xl font-semibold tracking-tight md:text-[calc(18.5px*var(--fs,1))]xl">
                Chegue devagar
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[15.5px] leading-relaxed text-white/75">
                Silencie o celular, ajeite o corpo e respire fundo algumas vezes. Você não
                precisa estar pronto. Só presente.
              </p>
              <p className="mt-5 font-reading text-[18px] italic text-white/85">
                “Fala, Senhor. Estou aqui para ouvir.”
              </p>
              <Cronometro key={indice} segundos={passo.segundos} cor={serie.cor} aoTerminar={fimDoTempo} />
            </div>
          ) : passo.etapa === "ler" ? (
            <div>
              <Rotulo cor={serie.cor}>Leia devagar</Rotulo>
              <h2 className="mt-3 flex flex-wrap items-baseline gap-x-3 font-reading text-4xl font-semibold tracking-tight">
                {referencia}
                {traducao && <span className="text-[13px] font-semibold text-white/50">{traducao}</span>}
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-white/60">
                Se puder, em voz alta. Depois leia de novo e pare no versículo destacado.
              </p>
              <div className="mt-6 font-reading text-[19px] leading-[1.85] text-white/95">
                {versiculos === null ? (
                  <Esqueleto linhas={5} />
                ) : (
                  versiculos.map((v) => (
                    <span
                      key={v.n}
                      className={v.n === chave ? "rounded-md px-1 box-decoration-clone" : undefined}
                      style={v.n === chave ? { backgroundColor: `${serie.cor}33` } : undefined}
                    >
                      <sup className="mr-1 font-sans text-[10px] font-bold text-white/45">{v.n}</sup>
                      {v.texto}{" "}
                    </span>
                  ))
                )}
              </div>
            </div>
          ) : passo.etapa === "refletir" ? (
            <div>
              <Rotulo cor={serie.cor}>Refletir</Rotulo>
              <h2 className="mt-3 font-reading text-4xl font-semibold leading-tight tracking-tight md:text-[calc(18.5px*var(--fs,1))]xl">
                {dia.titulo}
              </h2>
              <div className="mt-6 space-y-5 font-reading text-[18.5px] leading-[1.85] text-white/90">
                {dia.reflexao.map((p, i) => (
                  <p key={i}>{citar(p)}</p>
                ))}
              </div>
            </div>
          ) : passo.etapa === "meditar" ? (
            <div>
              <Rotulo cor={serie.cor}>Meditar</Rotulo>
              <p className="mt-4 font-reading text-[28px] font-medium italic leading-snug md:text-[34px]">
                {citar(dia.pergunta)}
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-white/60">
                Fique com a pergunta, sem pressa de responder certo. Se escrever ajudar, escreva.
              </p>
              <AnotacaoDoDia id={serie.id} dia={n} inicial={anotacao} className="mt-5" />
              <Cronometro key={indice} segundos={passo.segundos} cor={serie.cor} aoTerminar={fimDoTempo} />
            </div>
          ) : passo.etapa === "orar" ? (
            <MovimentoDeOracao
              movimento={passo.movimento}
              convite={passo.movimento === "ouvir" ? undefined : dia.guia?.[passo.movimento]}
              cor={serie.cor}
              citar={citar}
            >
              <Cronometro key={indice} segundos={passo.segundos} cor={serie.cor} aoTerminar={fimDoTempo} />
            </MovimentoDeOracao>
          ) : (
            <div>
              <Rotulo cor={serie.cor}>Ore junto</Rotulo>
              <p className="mt-3 font-reading text-[20px] italic leading-[1.75] text-white/95">
                {citar(dia.oracao)}
              </p>

              {versiculoChave && (
                <figure
                  className="mt-8 rounded-2xl border p-5"
                  style={{ borderColor: `${serie.cor}55`, backgroundColor: `${serie.cor}14` }}
                >
                  <figcaption className="font-display text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: serie.cor }}>
                    Para levar hoje
                  </figcaption>
                  <blockquote className="mt-2 font-reading text-[18px] leading-relaxed text-white">
                    {/* O versículo sozinho, sem a vírgula ou o ponto e vírgula que o ligava ao seguinte. */}
                    “{versiculoChave.texto.replace(/[\s;,:]+$/, "")}”
                  </blockquote>
                  <p className="mt-2 text-[13px] font-semibold text-white/60">
                    {nomeDoLivro} {dia.leitura.capitulo}:{chave}
                  </p>
                </figure>
              )}

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">
                  Para hoje
                </p>
                <p className="mt-1.5 text-[15.5px] leading-relaxed text-white/90">{citar(dia.pratica)}</p>
              </div>

              <p className="mt-8 text-center font-reading text-[16px] italic text-white/70">
                Vá em paz. Que o Senhor te abençoe e te guarde hoje.
              </p>
            </div>
          )}
        </div>
      </div>

      {!celebrando && (
        <footer className="relative z-10 px-4 pb-[max(env(safe-area-inset-bottom),16px)] pt-3">
          <div className="mx-auto flex max-w-2xl items-center gap-3">
            <button
              onClick={() => ir(indice - 1)}
              disabled={indice === 0}
              aria-label="Passo anterior"
              className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-md transition-colors hover:bg-white/10 disabled:opacity-25"
            >
              <ArrowLeft size={18} />
            </button>
            {ultimo ? (
              <button
                onClick={() => void concluir()}
                className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full font-display text-[15px] font-bold tracking-wide text-ink-950 shadow-[0_10px_40px_-10px_rgb(0_0_0/0.8)] transition-transform active:scale-[0.98]"
                style={{ backgroundColor: serie.cor }}
              >
                <Check size={18} strokeWidth={3} />
                {feito ? "Dia já concluído" : `Concluir o dia ${n}`}
              </button>
            ) : (
              <button
                onClick={() => ir(indice + 1)}
                className={`flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-white font-display text-[15px] font-bold tracking-wide text-ink-950 shadow-[0_10px_40px_-10px_rgb(0_0_0/0.8)] transition-all active:scale-[0.98] ${
                  tempoAcabou ? "shadow-[0_0_0_4px_rgb(255_255_255/0.18)]" : ""
                }`}
              >
                {rotuloDoProximo(indice)}
                <ArrowRight size={17} />
              </button>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}

/** Quanto de cada etapa já foi: as completas cheias, a atual pela metade do caminho. */
function preenchimento(etapa: string, indice: number) {
  const meus = PASSOS.map((p, i) => ({ p, i })).filter(({ p }) => p.etapa === etapa);
  const feitos = meus.filter(({ i }) => i < indice).length;
  const atual = meus.some(({ i }) => i === indice) ? 0.5 : 0;
  return (feitos + atual) / meus.length;
}

function rotuloDoProximo(indice: number) {
  const proximo = PASSOS[indice + 1];
  if (!proximo) return "Continuar";
  if (proximo.etapa === "orar" && PASSOS[indice].etapa !== "orar") return "Orar";
  if (proximo.etapa === "encerrar") return "Encerrar";
  if (proximo.etapa === "orar") return "Próximo";
  return ETAPAS.find((e) => e.id === proximo.etapa)?.nome ?? "Continuar";
}

function Rotulo({ cor, children }: { cor: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-display text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: cor }}>
      <span className="h-px w-8" style={{ backgroundColor: cor }} />
      {children}
    </p>
  );
}

function Esqueleto({ linhas }: { linhas: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: linhas }, (_, i) => (
        <div key={i} className="h-4 animate-pulse rounded bg-white/10" style={{ width: `${92 - (i % 3) * 9}%` }} />
      ))}
    </div>
  );
}

function MovimentoDeOracao({
  movimento,
  convite,
  cor,
  citar,
  children,
}: {
  movimento: Movimento;
  convite?: string;
  cor: string;
  citar: (t: string) => string;
  children: React.ReactNode;
}) {
  const i = MOVIMENTOS.findIndex((m) => m.id === movimento);
  const m = MOVIMENTOS[i];
  return (
    <div className="text-center">
      <div className="flex justify-center gap-2" aria-label={`Movimento ${i + 1} de ${MOVIMENTOS.length}`}>
        {MOVIMENTOS.map((x, j) => (
          <span
            key={x.id}
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              width: j === i ? 22 : 6,
              backgroundColor: j <= i ? cor : "rgb(255 255 255 / 0.2)",
            }}
          />
        ))}
      </div>
      <h2 className="mt-7 font-reading text-6xl font-semibold italic tracking-tight md:text-7xl">{m.nome}</h2>
      <p className="mt-2 font-display text-[13px] font-bold uppercase tracking-[0.18em]" style={{ color: cor }}>
        {m.subtitulo}
      </p>
      <p className="mx-auto mt-6 max-w-lg font-reading text-[19px] leading-[1.75] text-white/90">
        {citar(convite ?? m.generico)}
      </p>
      {children}
    </div>
  );
}

/** Um círculo que cresce em 4 segundos e encolhe em 6: o ritmo de uma respiração lenta. */
function Respiracao({ cor }: { cor: string }) {
  const [inspira, setInspira] = useState(true);
  useEffect(() => {
    const inicio = Date.now();
    const t = setInterval(() => setInspira((Date.now() - inicio) % 10_000 < 4_000), 250);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative mx-auto grid h-48 w-48 place-items-center">
      <span
        aria-hidden
        className="momento-anima absolute inset-0 rounded-full"
        style={{
          animation: "momento-respira 10s ease-in-out infinite",
          background: `radial-gradient(circle, ${cor}66 0%, ${cor}22 55%, transparent 72%)`,
          boxShadow: `0 0 80px ${cor}40`,
        }}
      />
      <span
        aria-hidden
        className="momento-anima absolute inset-6 rounded-full border"
        style={{ animation: "momento-respira 10s ease-in-out infinite", borderColor: `${cor}88` }}
      />
      <span className="relative font-display text-[15px] font-bold tracking-wide text-white" aria-live="polite">
        {inspira ? "Inspire" : "Solte o ar"}
      </span>
    </div>
  );
}

/** O tempo sugerido de um passo: corre sozinho, pausa, e avisa quando acaba. */
function Cronometro({
  segundos,
  cor,
  aoTerminar,
}: {
  segundos: number;
  cor: string;
  aoTerminar: () => void;
}) {
  const [restante, setRestante] = useState(segundos);
  const [rodando, setRodando] = useState(true);

  useEffect(() => {
    if (!rodando || restante <= 0) return;
    const t = setTimeout(() => setRestante((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [rodando, restante]);

  const terminou = restante <= 0;
  useEffect(() => {
    if (terminou) aoTerminar();
    // Só na virada para zero; `aoTerminar` muda quando o som é ligado e desligado.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terminou]);

  const raio = 15;
  const volta = 2 * Math.PI * raio;
  const mm = Math.floor(Math.max(restante, 0) / 60);
  const ss = String(Math.max(restante, 0) % 60).padStart(2, "0");

  return (
    <div className="mt-8 flex items-center justify-center">
      <button
        onClick={() => {
          if (terminou) {
            setRestante(segundos);
            setRodando(true);
          } else setRodando((r) => !r);
        }}
        aria-label={terminou ? "Recomeçar o tempo" : rodando ? "Pausar o tempo" : "Continuar o tempo"}
        className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-black/25 py-1.5 pl-1.5 pr-4 text-[13px] font-medium tabular-nums tracking-wide text-white/80 backdrop-blur-md transition-colors hover:bg-white/10"
      >
        <span className="relative grid h-9 w-9 place-items-center">
          <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90">
            <circle cx="18" cy="18" r={raio} fill="none" stroke="rgb(255 255 255 / 0.15)" strokeWidth="3" />
            <circle
              cx="18"
              cy="18"
              r={raio}
              fill="none"
              stroke={cor}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={volta}
              strokeDashoffset={volta * (Math.max(restante, 0) / segundos)}
              className="transition-[stroke-dashoffset] duration-1000 ease-linear"
            />
          </svg>
          {terminou ? (
            <RotateCcw size={13} />
          ) : rodando ? (
            <Pause size={13} className="fill-white" />
          ) : (
            <Play size={13} className="fill-white" />
          )}
        </span>
        {terminou ? "Tempo cumprido · siga quando quiser" : `${mm}:${ss}`}
      </button>
    </div>
  );
}

function Celebracao({
  serie,
  n,
  feitos,
  aoFechar,
}: {
  serie: Serie;
  n: number;
  feitos: number;
  aoFechar: () => void;
}) {
  const total = serie.dias.length;
  const proximo = n < total ? serie.dias[n] : null;
  const acabou = feitos >= total;
  return (
    <div className="text-center">
      <span
        className="mx-auto grid h-20 w-20 animate-pop place-items-center rounded-full text-ink-950"
        style={{ backgroundColor: serie.cor, boxShadow: `0 0 60px ${serie.cor}66` }}
      >
        <Check size={38} strokeWidth={3} />
      </span>
      <h2 className="mt-7 font-reading text-4xl font-semibold tracking-tight md:text-[calc(18.5px*var(--fs,1))]xl">
        {acabou ? `Você concluiu “${serie.titulo}”` : `Dia ${n} concluído`}
      </h2>
      <p className="mt-2 text-[15px] text-white/70">
        {acabou
          ? `${total} dias com a Palavra. Que tal começar outro?`
          : `${feitos} de ${total} dias feitos. Um dia de cada vez.`}
      </p>

      {!acabou && proximo && (
        <p className="mx-auto mt-6 max-w-sm rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-[14px] text-white/80">
          <span className="block font-display text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
            Amanhã
          </span>
          Dia {n + 1} · {proximo.titulo}
        </p>
      )}

      <div className="mx-auto mt-6 max-w-md text-left">
        <LembreteDevocional cor={serie.cor} soOferecer />
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          onClick={aoFechar}
          className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-display text-sm font-bold text-ink-950"
        >
          Voltar ao dia
        </button>
        <Link
          href={acabou ? "/devocional" : `/devocional/${serie.id}`}
          className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-5 py-3 font-display text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/25"
        >
          {acabou ? "Escolher o próximo" : "Ver a série"}
        </Link>
      </div>
    </div>
  );
}

/** Um sino curto e baixo, feito na hora: dois tons que somem em três segundos. */
function tocarSino(ctx: AudioContext) {
  const agora = ctx.currentTime;
  [
    { f: 528, v: 0.16 },
    { f: 792, v: 0.07 },
  ].forEach(({ f, v }) => {
    const osc = ctx.createOscillator();
    const ganho = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = f;
    ganho.gain.setValueAtTime(0.0001, agora);
    ganho.gain.exponentialRampToValueAtTime(v, agora + 0.02);
    ganho.gain.exponentialRampToValueAtTime(0.0001, agora + 3);
    osc.connect(ganho).connect(ctx.destination);
    osc.start(agora);
    osc.stop(agora + 3.1);
  });
}
