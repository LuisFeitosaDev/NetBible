"use client";

import { useMemo, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import { GROUP_THEME } from "@/lib/catalog";
import type { BibleIndex, BookMeta } from "@/lib/bible";

const semAcento = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/**
 * Escolha de livros para o plano personalizado: quais e em que ordem.
 *
 * A ordem é a ordem em que você toca. Cada toque num livro solto ADICIONA ele
 * ao fim da lista escolhida; tocar de novo (ou no chip lá em cima) TIRA. Não
 * tem arrastar para reordenar — para trocar dois de lugar, tira e adiciona de
 * novo na ordem certa. É mais passos que um drag-and-drop, mas não precisa de
 * biblioteca nova nem de gesto que erra fácil no celular.
 */
export function EscolherLivros({
  index,
  selecionados,
  aoMudar,
}: {
  index: BibleIndex;
  selecionados: string[];
  aoMudar: (novo: string[]) => void;
}) {
  const [busca, setBusca] = useState("");

  const posicao = useMemo(() => {
    const mapa = new Map<string, number>();
    selecionados.forEach((slug, i) => mapa.set(slug, i + 1));
    return mapa;
  }, [selecionados]);

  const livroPorSlug = useMemo(
    () => new Map(index.books.map((b) => [b.slug, b])),
    [index],
  );

  const grupos = useMemo(() => {
    const porGrupo = new Map<string, BookMeta[]>();
    for (const livro of index.books) {
      const atual = porGrupo.get(livro.group);
      if (atual) atual.push(livro);
      else porGrupo.set(livro.group, [livro]);
    }
    return index.groups
      .map((g) => ({ ...g, livros: porGrupo.get(g.id) ?? [] }))
      .filter((g) => g.livros.length > 0);
  }, [index]);

  const achados = useMemo(() => {
    const termo = semAcento(busca.trim());
    if (!termo) return null;
    return index.books.filter(
      (l) => semAcento(l.name).includes(termo) || l.slug.startsWith(termo),
    );
  }, [busca, index]);

  const alternar = (slug: string) => {
    aoMudar(
      selecionados.includes(slug)
        ? selecionados.filter((s) => s !== slug)
        : [...selecionados, slug],
    );
  };

  const totalCapitulos = selecionados.reduce(
    (soma, slug) => soma + (livroPorSlug.get(slug)?.verses.length ?? 0),
    0,
  );

  return (
    <div>
      {/* A ordem escolhida, como uma trilha de chips. Fica vazia até o
          primeiro toque, e some de novo se a lista esvaziar. */}
      {selecionados.length > 0 && (
        <div className="mb-3 rounded-xl border border-white/8 bg-white/[0.03] p-3">
          <div className="mb-2 flex items-baseline justify-between">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink-500">
              Sua ordem
            </p>
            <p className="font-mono text-[10px] text-ink-500">
              {selecionados.length} {selecionados.length === 1 ? "livro" : "livros"} ·{" "}
              {totalCapitulos} cap.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {selecionados.map((slug, i) => {
              const livro = livroPorSlug.get(slug);
              if (!livro) return null;
              const tema = GROUP_THEME[livro.group];
              return (
                <button
                  key={slug}
                  onClick={() => alternar(slug)}
                  className="inline-flex items-center gap-1.5 rounded-full py-1 pl-1 pr-2.5 text-[12px] font-semibold transition-colors hover:opacity-80"
                  style={{ backgroundColor: `${tema.accent}22`, color: tema.accent }}
                >
                  <span
                    className="grid h-5 w-5 place-items-center rounded-full font-mono text-[10px] font-bold text-ink-950"
                    style={{ backgroundColor: tema.accent }}
                  >
                    {i + 1}
                  </span>
                  {livro.name}
                  <X size={11} />
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="relative mb-2">
        <Search
          size={14}
          className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-500"
        />
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar livro"
          className="w-full rounded-lg border border-white/8 bg-ink-850 py-2 pl-8 pr-8 font-sans text-[13px] outline-none placeholder:text-ink-600 focus:border-gold-500/60"
        />
        {busca && (
          <button
            onClick={() => setBusca("")}
            aria-label="Limpar busca"
            className="absolute right-1.5 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-ink-400 hover:bg-white/10 hover:text-white"
          >
            <X size={13} />
          </button>
        )}
      </div>

      <div className="max-h-[42vh] overflow-y-auto rounded-xl border border-white/6">
        {achados
          ? achados.map((l) => (
              <LinhaLivro
                key={l.slug}
                livro={l}
                posicao={posicao.get(l.slug)}
                aoTocar={() => alternar(l.slug)}
              />
            ))
          : grupos.map((g) => (
              <div key={g.id}>
                <p className="bg-ink-900 px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink-500">
                  {g.label}
                </p>
                {g.livros.map((l) => (
                  <LinhaLivro
                    key={l.slug}
                    livro={l}
                    posicao={posicao.get(l.slug)}
                    aoTocar={() => alternar(l.slug)}
                  />
                ))}
              </div>
            ))}
      </div>
    </div>
  );
}

function LinhaLivro({
  livro,
  posicao,
  aoTocar,
}: {
  livro: BookMeta;
  posicao: number | undefined;
  aoTocar: () => void;
}) {
  const tema = GROUP_THEME[livro.group];
  const escolhido = posicao !== undefined;
  return (
    <button
      onClick={aoTocar}
      aria-pressed={escolhido}
      className={`flex w-full items-center gap-2.5 border-b border-white/5 px-3 py-2.5 text-left transition-colors last:border-0 ${
        escolhido ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
      }`}
    >
      <span
        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full font-mono text-[10.5px] font-bold ${
          escolhido ? "text-ink-950" : "border border-white/14 text-transparent"
        }`}
        style={escolhido ? { backgroundColor: tema.accent } : undefined}
      >
        {posicao ?? ""}
      </span>
      <span
        className={`min-w-0 flex-1 truncate font-sans text-[13.5px] ${
          escolhido ? "font-bold text-white" : "text-ink-200"
        }`}
      >
        {livro.name}
      </span>
      <span className="shrink-0 font-mono text-[10px] text-ink-500">
        {livro.verses.length} cap.
      </span>
      {!escolhido && <Plus size={14} className="shrink-0 text-ink-600" />}
    </button>
  );
}
