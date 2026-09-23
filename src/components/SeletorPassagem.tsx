"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Search, X } from "lucide-react";
import { GROUP_THEME } from "@/lib/catalog";
import type { BibleIndex, BookMeta } from "@/lib/bible";

const semAcento = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/**
 * Seletor de passagem do leitor: escolhe livro e capítulo sem sair da leitura.
 *
 * Antes daqui, o botão do título abria só a grade de capítulos do livro aberto,
 * então ir de 2 Tessalonicenses para Gênesis exigia voltar até a Bíblia inteira.
 *
 * No computador as duas colunas ficam lado a lado. No celular é um painel só,
 * que abre já nos capítulos, porque quem toca no título quase sempre quer outro
 * capítulo do mesmo livro; a lista de livros fica a um toque de distância.
 */
export function SeletorPassagem({
  index,
  livroAtual,
  capituloAtual,
  aoFechar,
}: {
  index: BibleIndex;
  livroAtual: BookMeta;
  capituloAtual: number;
  aoFechar: () => void;
}) {
  const router = useRouter();
  const [busca, setBusca] = useState("");
  /** Livro cujos capítulos estão à mostra, que nem sempre é o que está aberto. */
  const [alvo, setAlvo] = useState<BookMeta>(livroAtual);
  const [painel, setPainel] = useState<"livros" | "capitulos">("capitulos");
  const listaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") aoFechar();
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aoFechar]);

  /*
   * Com 66 livros a lista nasce rolada; sem isto, quem está em Apocalipse abre
   * o seletor no Pentateuco e precisa rolar tudo para se achar.
   *
   * Depende de `painel` porque no celular a coluna nasce escondida, e um
   * elemento com `display: none` não rola: precisa ser na hora em que aparece.
   */
  useEffect(() => {
    listaRef.current
      ?.querySelector("[data-alvo='sim']")
      ?.scrollIntoView({ block: "center" });
  }, [painel]);

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

  /** Com busca ativa a lista vira plana: agrupar dois resultados não ajuda. */
  const achados = useMemo(() => {
    const termo = semAcento(busca.trim());
    if (!termo) return null;
    return index.books.filter(
      (livro) =>
        semAcento(livro.name).includes(termo) || livro.slug.startsWith(termo),
    );
  }, [busca, index]);

  const escolherLivro = (livro: BookMeta) => {
    setAlvo(livro);
    setBusca("");
    setPainel("capitulos");
  };

  const irPara = (capitulo: number) => {
    aoFechar();
    router.push(`/livro/${alvo.slug}/${capitulo}`);
  };

  const tema = GROUP_THEME[alvo.group];
  const grupoDoAlvo = index.groups.find((g) => g.id === alvo.group);

  return (
    <div className="animate-fade border-t border-white/5 bg-ink-900/98 backdrop-blur-xl">
      <div className="mx-auto grid max-w-3xl sm:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
        {/* Coluna dos livros */}
        <div
          className={`${painel === "livros" ? "flex" : "hidden"} min-w-0 flex-col border-white/5 sm:flex sm:border-r`}
        >
          <div className="flex items-center gap-2 px-3 pt-3">
            <div className="relative flex-1">
              <Search
                size={14}
                className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-500"
              />
              <input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar livro"
                aria-label="Buscar livro"
                className="w-full rounded-lg border border-white/8 bg-white/[0.04] py-2 pl-8 pr-8 font-sans text-[13px] text-white placeholder:text-ink-500 focus:border-white/20 focus:outline-none"
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
            {/* No celular a coluna é um painel inteiro e precisa de saída. */}
            <button
              onClick={() => setPainel("capitulos")}
              aria-label="Voltar aos capítulos"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-ink-300 hover:bg-white/10 hover:text-white sm:hidden"
            >
              <X size={17} />
            </button>
          </div>

          <div
            ref={listaRef}
            className="max-h-[52vh] overflow-y-auto px-2 pb-3 pt-2 sm:max-h-[60vh]"
          >
            {achados ? (
              achados.length ? (
                achados.map((livro) => (
                  <LinhaLivro
                    key={livro.slug}
                    livro={livro}
                    lendo={livro.slug === livroAtual.slug}
                    aberto={livro.slug === alvo.slug}
                    aoClicar={() => escolherLivro(livro)}
                  />
                ))
              ) : (
                <p className="px-3 py-6 text-center font-sans text-[13px] text-ink-500">
                  Nenhum livro com esse nome.
                </p>
              )
            ) : (
              grupos.map((grupo) => (
                <div key={grupo.id} className="mb-1">
                  <p className="px-2.5 pb-1 pt-3 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink-500">
                    {grupo.label}
                  </p>
                  {grupo.livros.map((livro) => (
                    <LinhaLivro
                      key={livro.slug}
                      livro={livro}
                      lendo={livro.slug === livroAtual.slug}
                      aberto={livro.slug === alvo.slug}
                      aoClicar={() => escolherLivro(livro)}
                    />
                  ))}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Coluna dos capítulos */}
        <div
          className={`${painel === "capitulos" ? "flex" : "hidden"} min-w-0 flex-col sm:flex`}
        >
          <div className="flex items-center gap-2 px-3 pt-3 sm:px-4">
            <button
              onClick={() => setPainel("livros")}
              className="flex min-w-0 items-center gap-1.5 rounded-lg py-1 pr-2 text-left transition-colors hover:bg-white/8 sm:pointer-events-none sm:hover:bg-transparent"
            >
              <ChevronLeft
                size={16}
                className="shrink-0 text-ink-400 sm:hidden"
              />
              <span className="min-w-0">
                <span className="block truncate font-display text-sm font-bold text-white">
                  {alvo.name}
                </span>
                <span className="block truncate font-sans text-[11px] text-ink-500">
                  {grupoDoAlvo?.label} · {alvo.verses.length}{" "}
                  {alvo.verses.length === 1 ? "capítulo" : "capítulos"}
                </span>
              </span>
            </button>

            {/* Só no celular: no computador a coluna de livros já está à vista
                ao lado, com a busca dentro dela. */}
            <button
              onClick={() => setPainel("livros")}
              className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-white/[0.06] px-2.5 py-1.5 font-sans text-[12px] font-semibold text-ink-200 transition-colors hover:bg-white/12 sm:hidden"
            >
              Todos os livros
            </button>
          </div>

          <div className="max-h-[52vh] overflow-y-auto p-3 sm:max-h-[60vh] sm:p-4">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(52px,1fr))] gap-2">
              {Array.from({ length: alvo.verses.length }, (_, i) => i + 1).map(
                (n) => {
                  const aqui =
                    alvo.slug === livroAtual.slug && n === capituloAtual;
                  return (
                    <button
                      key={n}
                      onClick={() => irPara(n)}
                      aria-current={aqui ? "page" : undefined}
                      className={`aspect-square rounded-lg font-display text-sm font-bold transition-colors ${
                        aqui
                          ? "text-ink-950"
                          : "bg-ink-850 text-ink-100 hover:bg-ink-700"
                      }`}
                      style={aqui ? { backgroundColor: tema.accent } : undefined}
                    >
                      {n}
                    </button>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LinhaLivro({
  livro,
  lendo,
  aberto,
  aoClicar,
}: {
  livro: BookMeta;
  /** O capítulo que está na tela é deste livro. */
  lendo: boolean;
  /** É deste livro que a grade de capítulos ao lado está mostrando. */
  aberto: boolean;
  aoClicar: () => void;
}) {
  const tema = GROUP_THEME[livro.group];
  return (
    <button
      onClick={aoClicar}
      data-alvo={aberto ? "sim" : undefined}
      className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-left transition-colors ${
        aberto ? "bg-white/10" : "hover:bg-white/[0.06]"
      }`}
    >
      <span
        aria-hidden
        className="h-4 w-[3px] shrink-0 rounded-full transition-opacity"
        style={{ backgroundColor: tema.accent, opacity: aberto ? 1 : 0.4 }}
      />
      <span
        className={`min-w-0 flex-1 truncate font-sans text-[13.5px] ${
          aberto ? "font-bold text-white" : "font-medium text-ink-200"
        }`}
      >
        {livro.name}
      </span>
      {lendo && (
        <span
          aria-label="lendo agora"
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400"
        />
      )}
      <span className="shrink-0 font-mono text-[10px] text-ink-500">
        {livro.verses.length}
      </span>
    </button>
  );
}
