"use client";

import { GROUP_THEME } from "@/lib/catalog";
import type { BookMeta } from "@/lib/bible";

/**
 * Os 66 livros como um mosaico, cada um enchendo conforme é lido.
 *
 * É a única tela do app que mostra a Bíblia inteira de uma vez. Uma lista de
 * 66 linhas diria a mesma coisa e não diria nada: aqui dá para ver num relance
 * que o Pentateuco está cheio e os profetas estão vazios, que é exatamente a
 * pergunta que alguém faz ao abrir a própria jornada.
 *
 * A altura da cor é a fração de capítulos lidos. O ponto claro no canto marca
 * que há marcação ou comentário ali dentro.
 */
export function MapaDaLeitura({
  livros,
  lidosPorLivro,
  comAnotacao,
  selecionado,
  aoEscolher,
}: {
  livros: BookMeta[];
  lidosPorLivro: Map<string, number>;
  comAnotacao: Set<string>;
  selecionado: string | null;
  aoEscolher: (slug: string) => void;
}) {
  const testamentos = [
    { id: "VT" as const, rotulo: "Antigo Testamento" },
    { id: "NT" as const, rotulo: "Novo Testamento" },
  ];

  return (
    <div className="space-y-4">
      {testamentos.map(({ id, rotulo }) => {
        const doTestamento = livros.filter((l) => l.testament === id);
        if (!doTestamento.length) return null;
        const totalCaps = doTestamento.reduce((s, l) => s + l.verses.length, 0);
        const lidosCaps = doTestamento.reduce(
          (s, l) => s + (lidosPorLivro.get(l.slug) ?? 0),
          0,
        );

        return (
          <div key={id}>
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink-500">
                {rotulo}
              </p>
              <p className="font-mono text-[10px] text-ink-500">
                {lidosCaps}/{totalCaps}
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(34px,1fr))] gap-1.5">
              {doTestamento.map((livro) => {
                const lidos = lidosPorLivro.get(livro.slug) ?? 0;
                const fracao = lidos / livro.verses.length;
                const tema = GROUP_THEME[livro.group];
                const ativo = selecionado === livro.slug;

                return (
                  <button
                    key={livro.slug}
                    onClick={() => aoEscolher(livro.slug)}
                    title={`${livro.name} · ${lidos} de ${livro.verses.length}`}
                    aria-label={`${livro.name}, ${lidos} de ${livro.verses.length} capítulos lidos`}
                    aria-pressed={ativo}
                    className={`relative aspect-square overflow-hidden rounded-[5px] border transition-all ${
                      ativo
                        ? "scale-105 border-white/70"
                        : "border-white/8 hover:border-white/30"
                    }`}
                    style={{ backgroundColor: "rgba(255,255,255,0.035)" }}
                  >
                    {/* A cor sobe do chão, como um copo enchendo. */}
                    {fracao > 0 && (
                      <span
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 transition-[height]"
                        style={{
                          height: `${Math.max(fracao * 100, 9)}%`,
                          background: `linear-gradient(to top, ${tema.from}, ${tema.accent})`,
                          opacity: fracao >= 1 ? 0.95 : 0.6,
                        }}
                      />
                    )}
                    <span
                      className={`relative font-mono text-[9px] font-bold leading-none ${
                        fracao > 0.55 ? "text-ink-950" : "text-ink-400"
                      }`}
                    >
                      {livro.abbrev}
                    </span>
                    {comAnotacao.has(livro.slug) && (
                      <span
                        aria-hidden
                        className="absolute right-[3px] top-[3px] h-1 w-1 rounded-full bg-white"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
