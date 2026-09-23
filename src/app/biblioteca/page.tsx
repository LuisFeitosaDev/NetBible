"use client";

import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { CalendarCheck, LayoutGrid, List } from "lucide-react";
import { useBible } from "@/lib/store";
import { db } from "@/lib/db";
import { PainelPlano } from "@/components/jornada/PainelPlano";
import { PorLivro } from "@/components/jornada/PorLivro";
import { PorVersiculo } from "@/components/jornada/PorVersiculo";

type Aba = "plano" | "anotacoes";
type Visao = "livro" | "versiculo";

/**
 * Minha jornada.
 *
 * Era "Minha biblioteca", uma lista cronológica de marcações e outra de
 * comentários. Funcionava e não dizia nada sobre a pessoa. Aqui a mesma
 * informação aparece de duas formas, por livro e por versículo, ao lado do
 * plano de leitura, que é o que dá direção ao resto.
 *
 * O caminho continua sendo /biblioteca: mudar a URL quebraria os atalhos de
 * quem já instalou o app na tela inicial.
 */
export default function JornadaPage() {
  const { index, bySlug } = useBible();
  const [aba, setAba] = useState<Aba>("plano");
  const [visao, setVisao] = useState<Visao>("livro");

  const marks = useLiveQuery(() => db.marks.orderBy("createdAt").reverse().toArray(), []);
  const notes = useLiveQuery(() => db.notes.orderBy("updatedAt").reverse().toArray(), []);
  const reading = useLiveQuery(() => db.reading.toArray(), []);
  const plano = useLiveQuery(() => db.planos.get("atual"), []);

  const carregando = !index || !marks || !notes || !reading;

  const capitulosLidos = (reading ?? []).reduce((s, r) => s + r.done.length, 0);
  const livrosAbertos = (reading ?? []).filter((r) => r.done.length > 0).length;

  return (
    <div className="mx-auto max-w-3xl px-4 pt-8 md:px-6">
      <h1 className="font-display text-3xl font-black tracking-tight md:text-4xl">
        Minha jornada
      </h1>
      <p className="mt-1.5 text-sm text-ink-400">
        Seu caminho pela Bíblia, guardado neste dispositivo.
      </p>

      {/* Uma faixa só, e não quatro cartões: empilhados em duas linhas eles
          comiam um terço da tela do celular antes de qualquer conteúdo. */}
      <div className="mt-4 flex items-stretch overflow-hidden rounded-xl border border-white/6 bg-ink-900">
        {(
          [
            [capitulosLidos, "capítulos", true],
            [livrosAbertos, livrosAbertos === 1 ? "livro" : "livros", false],
            [marks?.length ?? 0, "marcações", false],
            [notes?.length ?? 0, "comentários", false],
          ] as const
        ).map(([valor, rotulo, destaque], i) => (
          <div
            key={rotulo}
            className={`min-w-0 flex-1 px-1.5 py-2.5 text-center ${
              i > 0 ? "border-l border-white/6" : ""
            }`}
          >
            <p
              className={`font-display text-lg font-black leading-none tracking-tight ${
                destaque ? "text-gold-400" : "text-white"
              }`}
            >
              {valor}
            </p>
            <p className="mt-1 truncate text-[10px] leading-tight text-ink-500">
              {rotulo}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-1 rounded-xl border border-white/8 bg-ink-900 p-1">
        {(
          [
            ["plano", "Plano de leitura", CalendarCheck],
            ["anotacoes", "Marcações", List],
          ] as const
        ).map(([id, rotulo, Icone]) => (
          <button
            key={id}
            onClick={() => setAba(id)}
            aria-pressed={aba === id}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-colors ${
              aba === id ? "bg-white/12 text-white" : "text-ink-400 hover:text-white"
            }`}
          >
            <Icone size={16} />
            {rotulo}
          </button>
        ))}
      </div>

      {carregando ? (
        <div className="mt-6 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-2xl bg-ink-900" />
          ))}
        </div>
      ) : aba === "plano" ? (
        <div className="mt-5">
          <PainelPlano
            plano={plano ?? null}
            index={index}
            bySlug={bySlug}
            reading={reading}
          />
        </div>
      ) : (
        <>
          <div className="mt-5 flex items-center gap-1 rounded-lg border border-white/8 bg-ink-900 p-1 sm:w-fit">
            {(
              [
                ["livro", "Por livro", LayoutGrid],
                ["versiculo", "Por versículo", List],
              ] as const
            ).map(([id, rotulo, Icone]) => (
              <button
                key={id}
                onClick={() => setVisao(id)}
                aria-pressed={visao === id}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-[12.5px] font-semibold transition-colors sm:flex-none ${
                  visao === id
                    ? "bg-white/12 text-white"
                    : "text-ink-400 hover:text-white"
                }`}
              >
                <Icone size={13} />
                {rotulo}
              </button>
            ))}
          </div>

          <div className="mt-5">
            {visao === "livro" ? (
              <PorLivro
                livros={index.books}
                marks={marks}
                notes={notes}
                reading={reading}
              />
            ) : (
              <PorVersiculo bySlug={bySlug} marks={marks} notes={notes} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
