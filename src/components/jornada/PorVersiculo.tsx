"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Highlighter, MessageSquareText, Trash2 } from "lucide-react";
import { HIGHLIGHT_COLORS, type HighlightColor } from "@/lib/catalog";
import { clearMarks, deleteNote, type Mark, type Note } from "@/lib/db";
import type { BookMeta } from "@/lib/bible";

type Filtro = "tudo" | "comentarios" | HighlightColor;

type Item =
  | { tipo: "marca"; quando: number; dado: Mark }
  | { tipo: "nota"; quando: number; dado: Note };

/**
 * A jornada vista versículo a versículo, do mais recente para o mais antigo.
 *
 * Marcações e comentários vêm na mesma corrente, e não em duas abas separadas
 * como antes: no dia em que você grifou João 3:16 e escreveu uma linha sobre
 * ele, isso foi um movimento só, e separar quebrava a memória disso.
 */
export function PorVersiculo({
  bySlug,
  marks,
  notes,
}: {
  bySlug: Map<string, BookMeta>;
  marks: Mark[];
  notes: Note[];
}) {
  const [filtro, setFiltro] = useState<Filtro>("tudo");

  const itens = useMemo<Item[]>(
    () =>
      [
        ...marks.map((m) => ({ tipo: "marca" as const, quando: m.createdAt, dado: m })),
        ...notes.map((n) => ({ tipo: "nota" as const, quando: n.updatedAt, dado: n })),
      ].sort((a, b) => b.quando - a.quando),
    [marks, notes],
  );

  const visiveis = itens.filter((i) => {
    if (filtro === "tudo") return true;
    if (filtro === "comentarios") return i.tipo === "nota";
    return i.tipo === "marca" && i.dado.color === filtro;
  });

  /* Agrupa por dia. Uma lista corrida de 300 versículos não conta história
     nenhuma; quebrada por data, ela vira um diário. */
  const porDia = useMemo(() => {
    const mapa = new Map<string, Item[]>();
    for (const item of visiveis) {
      const chave = new Date(item.quando).toDateString();
      mapa.set(chave, [...(mapa.get(chave) ?? []), item]);
    }
    return [...mapa.entries()];
  }, [visiveis]);

  const contagem = (f: Filtro) =>
    f === "tudo"
      ? itens.length
      : f === "comentarios"
        ? notes.length
        : marks.filter((m) => m.color === f).length;

  return (
    <div className="pb-16">
      <div className="flex flex-wrap items-center gap-2">
        <Pilula ativo={filtro === "tudo"} aoClicar={() => setFiltro("tudo")}>
          Tudo <Contador n={contagem("tudo")} ativo={filtro === "tudo"} />
        </Pilula>
        <Pilula
          ativo={filtro === "comentarios"}
          aoClicar={() => setFiltro("comentarios")}
        >
          <MessageSquareText size={12} />
          <Contador n={contagem("comentarios")} ativo={filtro === "comentarios"} />
        </Pilula>
        {HIGHLIGHT_COLORS.map((c) => (
          <Pilula
            key={c.id}
            ativo={filtro === c.id}
            aoClicar={() =>
              setFiltro((f) => (f === c.id ? "tudo" : (c.id as HighlightColor)))
            }
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: c.hex }}
            />
            <Contador n={contagem(c.id as HighlightColor)} ativo={filtro === c.id} />
          </Pilula>
        ))}
      </div>

      {visiveis.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-white/10 py-14 text-center">
          <Highlighter size={26} className="mx-auto text-ink-600" />
          <p className="mt-3 font-display text-[15px] font-bold text-ink-300">
            {itens.length === 0 ? "Nada marcado ainda" : "Nada com esse filtro"}
          </p>
          <p className="mx-auto mt-1.5 max-w-xs text-[13px] text-ink-500">
            {itens.length === 0
              ? "Abra um capítulo, toque num versículo e escolha uma cor."
              : "Escolha outra cor ou volte para Tudo."}
          </p>
        </div>
      ) : (
        <div className="mt-5 space-y-6">
          {porDia.map(([dia, doDia]) => (
            <div key={dia}>
              <p className="mb-2.5 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink-500">
                {rotuloDoDia(doDia[0].quando)}
              </p>
              <div className="space-y-2.5">
                {doDia.map((item) =>
                  item.tipo === "marca" ? (
                    <CartaoMarca
                      key={"m" + item.dado.ref}
                      marca={item.dado}
                      livro={bySlug.get(item.dado.slug)}
                    />
                  ) : (
                    <CartaoNota
                      key={"n" + item.dado.ref}
                      nota={item.dado}
                      livro={bySlug.get(item.dado.slug)}
                    />
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function rotuloDoDia(quando: number) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const dia = new Date(quando);
  dia.setHours(0, 0, 0, 0);
  const diferenca = Math.round((hoje.getTime() - dia.getTime()) / 86_400_000);
  if (diferenca === 0) return "Hoje";
  if (diferenca === 1) return "Ontem";
  if (diferenca < 7) return `${diferenca} dias atrás`;
  return dia.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: dia.getFullYear() === hoje.getFullYear() ? undefined : "numeric",
  });
}

function Pilula({
  ativo,
  aoClicar,
  children,
}: {
  ativo: boolean;
  aoClicar: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={aoClicar}
      aria-pressed={ativo}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
        ativo ? "bg-white text-ink-950" : "bg-white/8 text-ink-300 hover:bg-white/14"
      }`}
    >
      {children}
    </button>
  );
}

const Contador = ({ n, ativo }: { n: number; ativo: boolean }) => (
  <span className={ativo ? "text-ink-950/60" : "text-ink-500"}>{n}</span>
);

function CartaoMarca({ marca, livro }: { marca: Mark; livro?: BookMeta }) {
  const cor = HIGHLIGHT_COLORS.find((c) => c.id === marca.color);
  return (
    <div
      className="group relative rounded-xl border border-white/6 bg-ink-900 p-4 transition-colors hover:border-white/18"
      style={{ borderLeft: `3px solid ${cor?.hex ?? "#fff"}` }}
    >
      <Link
        href={`/livro/${marca.slug}/${marca.chapter}?v=${marca.verse}`}
        className="block"
      >
        <p className="mb-1.5 font-display text-[13px] font-bold text-gold-400">
          {livro?.name ?? marca.slug} {marca.chapter}:{marca.verse}
        </p>
        <p className="pr-8 font-reading text-[15px] leading-relaxed text-ink-100/90">
          {marca.text}
        </p>
      </Link>
      <Apagar rotulo="Remover marcação" aoApagar={() => clearMarks([marca.ref])} />
    </div>
  );
}

function CartaoNota({ nota, livro }: { nota: Note; livro?: BookMeta }) {
  return (
    <div className="group relative rounded-xl border border-gold-500/25 bg-gold-500/[0.05] p-4 transition-colors hover:border-gold-500/45">
      <Link
        href={`/livro/${nota.slug}/${nota.chapter}?v=${nota.verse}`}
        className="block"
      >
        <p className="mb-1.5 inline-flex items-center gap-1.5 font-display text-[13px] font-bold text-gold-400">
          <MessageSquareText size={12} />
          {livro?.name ?? nota.slug} {nota.chapter}:{nota.verse}
        </p>
        <p className="mb-2.5 border-l-2 border-white/12 pl-3 font-reading text-[13px] leading-relaxed text-ink-400">
          {nota.text}
        </p>
        <p className="whitespace-pre-wrap pr-8 text-[15px] leading-relaxed text-ink-100">
          {nota.body}
        </p>
      </Link>
      <Apagar rotulo="Excluir comentário" aoApagar={() => deleteNote(nota.ref)} />
    </div>
  );
}

function Apagar({ rotulo, aoApagar }: { rotulo: string; aoApagar: () => void }) {
  return (
    <button
      onClick={aoApagar}
      aria-label={rotulo}
      className="absolute right-3 top-3 rounded-full p-1.5 text-ink-600 opacity-0 transition-all hover:bg-white/10 hover:text-red-400 focus:opacity-100 group-hover:opacity-100"
    >
      <Trash2 size={15} />
    </button>
  );
}
