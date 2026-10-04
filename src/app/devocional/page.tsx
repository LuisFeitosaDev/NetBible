"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, ListOrdered } from "lucide-react";
import { Shelf } from "@/components/Shelf";
import { CapaDevocional } from "@/components/devocional/CapaDevocional";
import { CardDevocional } from "@/components/devocional/CardDevocional";
import {
  CATEGORIAS,
  DEVOCIONAIS,
  concluido,
  destaqueDoDia,
  proximoDia,
  type Serie,
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

  /*
   * O topo gira, como numa vitrine: primeiro o que a pessoa está fazendo, depois
   * o destaque do dia e as séries novas (que mudam de dia para dia), sem
   * repetir nem mostrar o que ela já concluiu.
   */
  const [novas] = useState(() => {
    const lista = DEVOCIONAIS.filter((d) => d.selo === "Novo");
    const giro = Math.floor(Date.now() / 86_400_000) % Math.max(lista.length, 1);
    return [...lista.slice(giro), ...lista.slice(0, giro)];
  });
  const vitrine = [...new Set([...emAndamento, hoje, ...novas])]
    .filter((d) => !concluido(d, progressos?.get(d.id)))
    .slice(0, Math.max(6, emAndamento.length + 3));

  return (
    <div className="-mt-[calc(4rem+env(safe-area-inset-top))]">
      {/* Espera o progresso antes de montar a vitrine: sem isto, o topo
          mostrava o destaque do dia e trocava para o devocional em andamento
          meio segundo depois. */}
      {progressos === undefined ? (
        <div className="h-[66vh] min-h-[460px] animate-pulse bg-ink-900 md:h-[72vh]" />
      ) : (
        <Vitrine
          slides={vitrine.map((d) => ({
            devocional: d,
            continuando: emAndamento.includes(d),
            diaAtual: proximoDia(d, progressos.get(d.id)),
            feitos: progressos.get(d.id)?.feitos.length ?? 0,
          }))}
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
        dias. Cada um é um momento de uns 15 minutos: aquietar, ler, refletir, meditar e
        orar. O texto bíblico e as citações aparecem na tradução que você escolheu.
      </p>
    </div>
  );
}

type Slide = { devocional: Serie; continuando: boolean; diaAtual: number; feitos: number };

const DURACAO = 8000;

/**
 * O topo da página, girando como vitrine de streaming: uma série por vez,
 * troca em fade a cada 8 segundos, com as barrinhas de progresso dos
 * stories. Para quando o mouse está em cima, quando a aba some e para quem
 * pediu menos movimento; no celular, dá para arrastar para o lado.
 */
function Vitrine({ slides }: { slides: Slide[] }) {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [semMovimento, setSemMovimento] = useState(false);
  // Arrastar com o dedo: o conteúdo acompanha, e ao soltar passa para a próxima ou volta.
  const toque = useRef<{ x: number; y: number; horizontal: boolean | null } | null>(null);
  const [arrasto, setArrasto] = useState(0);
  const total = slides.length;
  const i = Math.min(atual, total - 1);

  const ir = useCallback((n: number) => setAtual(((n % total) + total) % total), [total]);

  useEffect(() => {
    setSemMovimento(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const aoMudar = () => setPausado(document.visibilityState === "hidden");
    document.addEventListener("visibilitychange", aoMudar);
    return () => document.removeEventListener("visibilitychange", aoMudar);
  }, []);

  useEffect(() => {
    if (pausado || semMovimento || total < 2) return;
    const t = setTimeout(() => ir(i + 1), DURACAO);
    return () => clearTimeout(t);
  }, [i, pausado, semMovimento, total, ir]);

  if (!total) return null;

  return (
    <section
      className="group/vitrine relative flex min-h-[66vh] items-end overflow-hidden pt-[calc(6rem+env(safe-area-inset-top))] md:min-h-[72vh]"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      style={{ touchAction: "pan-y" }}
      onTouchStart={(e) => {
        toque.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, horizontal: null };
        setPausado(true);
      }}
      onTouchMove={(e) => {
        const t = toque.current;
        if (!t) return;
        const dx = e.touches[0].clientX - t.x;
        const dy = e.touches[0].clientY - t.y;
        // Decide no primeiro movimento: de lado é da vitrine, de cima a baixo é rolagem.
        t.horizontal ??= Math.abs(dx) > Math.abs(dy);
        if (t.horizontal) setArrasto(dx);
      }}
      onTouchEnd={() => {
        const t = toque.current;
        toque.current = null;
        setPausado(false);
        if (t?.horizontal && Math.abs(arrasto) > 50) ir(i + (arrasto < 0 ? 1 : -1));
        setArrasto(0);
      }}
      onTouchCancel={() => {
        toque.current = null;
        setPausado(false);
        setArrasto(0);
      }}
    >
      <style>{`
        @keyframes vitrine-zoom { from { transform: scale(1.02) } to { transform: scale(1.1) } }
        @keyframes vitrine-barra { from { width: 0 } to { width: 100% } }
      `}</style>

      {/* Todas as capas empilhadas; a da vez aparece em fade e se aproxima devagar. */}
      {slides.map((s, n) => (
        <div
          key={s.devocional.id}
          aria-hidden={n !== i}
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-out"
          style={{ opacity: n === i ? 1 : 0 }}
        >
          <div
            className="absolute inset-0"
            style={n === i && !semMovimento ? { animation: `vitrine-zoom ${DURACAO + 1500}ms ease-out forwards` } : undefined}
          >
            <CapaDevocional devocional={s.devocional} prioridade={n === 0} tom={0.3} className="absolute inset-0" />
          </div>
        </div>
      ))}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-ink-950/10" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/25 to-transparent" />
      {total > 1 && (
        <>
      <button
        onClick={() => ir(i - 1)}
        aria-label="Devocional anterior"
        className="absolute left-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/35 text-white opacity-0 backdrop-blur-md transition-opacity hover:bg-black/55 group-hover/vitrine:opacity-100 md:grid"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={() => ir(i + 1)}
        aria-label="Próximo devocional"
        className="absolute right-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/35 text-white opacity-0 backdrop-blur-md transition-opacity hover:bg-black/55 group-hover/vitrine:opacity-100 md:grid"
      >
        <ChevronRight size={22} />
      </button>
        </>
      )}

      <div className="relative mx-auto w-full max-w-[1500px] px-4 pb-16 md:px-8 md:pb-24">
        {/* Todas as séries empilhadas na mesma célula, só a da vez visível: a vitrine
            fica sempre com a altura da maior, e nada embaixo pula quando troca. */}
        <div className="grid">
          {slides.map((s, n) => (
            <div
              key={n === i ? `${s.devocional.id}-ativo` : s.devocional.id}
              aria-hidden={n !== i}
              className={`col-start-1 row-start-1 max-w-2xl self-end ${
                n === i ? "animate-[rise_0.6s_cubic-bezier(0.16,1,0.3,1)]" : "pointer-events-none invisible"
              }`}
              style={n === i && arrasto ? { transform: `translateX(${arrasto * 0.6}px)`, opacity: 1 - Math.min(Math.abs(arrasto) / 400, 0.5) } : undefined}
            >
              <ConteudoDoSlide slide={s} />
            </div>
          ))}
        </div>

        {/* As barrinhas dos stories: a da vez enche no tempo da troca; tocar leva àquela. */}
        {total > 1 && (
          <div className="mt-8 flex max-w-sm gap-1.5" role="tablist" aria-label="Devocionais em destaque">
            {slides.map((s, n) => (
              <button
                key={s.devocional.id}
                role="tab"
                aria-selected={n === i}
                aria-label={s.devocional.titulo}
                onClick={() => ir(n)}
                className="group relative h-6 flex-1"
              >
                <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/25 transition-colors group-hover:bg-white/40">
                  <span
                    key={n === i ? `ativa-${i}` : n}
                    className="block h-full rounded-full bg-white"
                    style={
                      n < i
                        ? { width: "100%" }
                        : n === i
                          ? semMovimento
                            ? { width: "100%" }
                            : {
                                animation: `vitrine-barra ${DURACAO}ms linear forwards`,
                                animationPlayState: pausado ? "paused" : "running",
                              }
                          : { width: 0 }
                    }
                  />
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/** O texto e os botões de uma série da vitrine. */
function ConteudoDoSlide({ slide }: { slide: Slide }) {
  const { devocional: d, continuando, diaAtual, feitos } = slide;
  const dias = d.dias.length;
  return (
    <>
      <span
        className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]"
        style={{ borderColor: `${d.cor}66`, backgroundColor: `${d.cor}22`, color: "#fff" }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: d.cor }} />
        {continuando ? "Seu devocional" : d.selo === "Novo" ? "Novo no app" : "Devocional em destaque"}
      </span>

      <h1 className="mt-4 font-display text-[2.6rem] font-black leading-[1.02] tracking-tight text-white drop-shadow-lg md:text-7xl">
        {d.titulo}
      </h1>
      <p className="mt-3 max-w-xl font-reading text-lg leading-snug text-white/85 md:text-xl">
        {d.chamada}
      </p>

      <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/70">
        <span>{dias} dias</span>
        <span className="text-white/30">•</span>
        <span>15 minutos por dia, com oração guiada</span>
        {feitos > 0 && (
          <>
            <span className="text-white/30">•</span>
            <span className="font-semibold" style={{ color: d.cor }}>
              {feitos} de {dias} feitos
            </span>
          </>
        )}
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <Link
          href={`/devocional/${d.id}/${diaAtual}`}
          className="inline-flex items-center gap-2.5 rounded-xl bg-white px-7 py-3.5 font-display text-base font-bold text-ink-950 shadow-xl shadow-black/30 transition-transform hover:scale-[1.03] active:scale-95"
        >
          <Play size={22} className="fill-ink-950" />
          {feitos > 0 ? `Continuar · Dia ${diaAtual}` : "Começar o dia 1"}
        </Link>
        <Link
          href={`/devocional/${d.id}`}
          className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-5 py-3.5 font-display text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/25"
        >
          <ListOrdered size={18} />
          Ver os {dias} dias
        </Link>
      </div>
    </>
  );
}
