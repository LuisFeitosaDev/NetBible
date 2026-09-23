"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, ChevronDown, Info, Scale } from "lucide-react";
import type { Material, TextoApoio, Visao } from "@/lib/grupos/conteudo/tipos";

/**
 * Material de apoio de uma etapa: textos com contexto, leituras divergentes e
 * notas. O contexto vem junto do texto, e não escondido atrás de um clique,
 * porque é justamente ele que impede a leitura de virar versículo solto.
 */
export function MaterialEtapa({ material }: { material: Material | null }) {
  if (!material) return null;
  const { textos, visoes, notas } = material;
  if (!textos?.length && !visoes?.length && !notas?.length) return null;

  return (
    <div className="mt-4 space-y-3">
      {textos?.map((t) => <CartaoTexto key={t.ref + t.capitulo} texto={t} />)}
      {visoes?.map((v) => <CartaoVisao key={v.nome} visao={v} />)}
      {notas?.length ? <Notas notas={notas} /> : null}
    </div>
  );
}

function CartaoTexto({ texto }: { texto: TextoApoio }) {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="rounded-xl border border-white/8 bg-ink-900 p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="flex items-center gap-2 font-display text-sm font-bold text-gold-400">
          <BookOpen size={15} />
          {texto.ref}
        </p>
        <Link
          href={`/livro/${texto.slug}/${texto.capitulo}${
            texto.versiculos ? `?v=${texto.versiculos.split("-")[0]}` : ""
          }`}
          className="shrink-0 text-[12px] text-ink-400 transition-colors hover:text-white"
        >
          Abrir
        </Link>
      </div>

      <p className="mt-2 text-[13px] leading-relaxed text-ink-300">{texto.contexto}</p>

      <button
        onClick={() => setAberto((v) => !v)}
        className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-ink-400 transition-colors hover:text-white"
      >
        {aberto ? "Esconder o texto" : "Ler aqui"}
        <ChevronDown size={12} className={aberto ? "rotate-180" : ""} />
      </button>

      {aberto && <TextoInline texto={texto} />}
    </div>
  );
}

function TextoInline({ texto }: { texto: TextoApoio }) {
  const [versiculos, setVersiculos] = useState<{ n: number; t: string }[] | null>(null);
  const [erro, setErro] = useState(false);

  // Carrega sob demanda: uma etapa pode ter vários textos, e baixar todos de
  // uma vez só para o caso de alguém abrir seria desperdício.
  //
  // Dentro de um efeito, e não no corpo do componente: disparar estado durante
  // o render faz o componente se re-renderizar em cadeia, e o pedido saía duas
  // vezes por conta do modo estrito.
  useEffect(() => {
    let vivo = true;
    void (async () => {
      try {
        const { loadBook } = await import("@/lib/bible");
        const { getPref } = await import("@/lib/db");
        const versao = await getPref<"ara">("version", "ara");
        const livro = await loadBook(versao, texto.slug);
        const cap = livro.chapters[texto.capitulo - 1] ?? [];
        const [de, ate] = texto.versiculos
          ? texto.versiculos.split("-").map((n) => Number(n.trim()))
          : [1, cap.length];
        if (!vivo) return;
        setVersiculos(
          cap
            .map((t, i) => ({ n: i + 1, t }))
            .filter((v) => v.n >= de && v.n <= (ate || de)),
        );
      } catch {
        if (vivo) setErro(true);
      }
    })();
    return () => {
      vivo = false;
    };
  }, [texto.slug, texto.capitulo, texto.versiculos]);

  if (erro) {
    return <p className="mt-2 text-[12px] text-ink-500">Não consegui carregar o texto.</p>;
  }

  return (
    <div className="mt-2.5 border-l-2 border-gold-500/50 pl-3 font-reading text-[15px] leading-relaxed text-ink-100/90">
      {versiculos ? (
        versiculos.map((v) => (
          <p key={v.n} className="mb-1">
            <sup className="mr-1 select-none font-sans text-[0.62em] font-bold text-gold-500">
              {v.n}
            </sup>
            {v.t}
          </p>
        ))
      ) : (
        <p className="text-[13px] text-ink-500">Carregando...</p>
      )}
    </div>
  );
}

function CartaoVisao({ visao }: { visao: Visao }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
      <p className="flex items-center gap-2 font-display text-sm font-bold">
        <Scale size={15} className="text-ink-400" />
        {visao.nome}
      </p>
      <p className="mt-1.5 text-[13px] leading-relaxed text-ink-300">{visao.resumo}</p>
      {visao.textos.length > 0 && (
        <p className="mt-2 text-[12px] text-ink-500">
          Textos usados: <span className="text-gold-400">{visao.textos.join(" · ")}</span>
        </p>
      )}
    </div>
  );
}

function Notas({ notas }: { notas: string[] }) {
  return (
    <div className="flex gap-2.5 rounded-xl border border-white/8 bg-white/[0.03] p-4">
      <Info size={15} className="mt-0.5 shrink-0 text-ink-400" />
      <ul className="space-y-1.5 text-[13px] leading-relaxed text-ink-300">
        {notas.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </div>
  );
}
