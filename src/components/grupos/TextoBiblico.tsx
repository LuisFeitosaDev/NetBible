"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, ExternalLink } from "lucide-react";
import { loadBook } from "@/lib/bible";
import { useBible } from "@/lib/store";
import { ABOUT } from "@/lib/about";
import type { Referencia } from "@/lib/grupos/tipos";

/**
 * O texto fica dentro do estudo de propósito: mandar o participante para outra
 * aba no meio da etapa é o jeito mais fácil de perder o grupo.
 */
export function TextoBiblico({
  referencia,
  mostrarFicha = false,
}: {
  referencia: Referencia;
  mostrarFicha?: boolean;
}) {
  const { version } = useBible();
  const [versiculos, setVersiculos] = useState<{ n: number; texto: string }[] | null>(null);

  useEffect(() => {
    let vivo = true;
    setVersiculos(null);
    loadBook(version, referencia.slug)
      .then((livro) => {
        if (!vivo) return;
        const capitulo = livro.chapters[referencia.capitulo - 1] ?? [];
        const de = referencia.versiculoInicio ?? 1;
        const ate = referencia.versiculoFim ?? capitulo.length;
        setVersiculos(
          capitulo
            .map((texto, i) => ({ n: i + 1, texto }))
            .filter((v) => v.n >= de && v.n <= ate),
        );
      })
      .catch(console.error);
    return () => {
      vivo = false;
    };
  }, [version, referencia]);

  const ficha = ABOUT[referencia.slug];
  const faixa = referencia.versiculoInicio
    ? `:${referencia.versiculoInicio}${referencia.versiculoFim ? `-${referencia.versiculoFim}` : ""}`
    : "";

  return (
    <div className="rounded-2xl border border-white/8 bg-ink-900 p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 font-display text-sm font-bold text-gold-400">
          <BookOpen size={15} />
          {referencia.nome} {referencia.capitulo}
          {faixa}
        </p>
        <Link
          href={`/livro/${referencia.slug}/${referencia.capitulo}`}
          className="inline-flex items-center gap-1 text-[12px] text-ink-400 transition-colors hover:text-white"
        >
          Abrir no leitor
          <ExternalLink size={12} />
        </Link>
      </div>

      {!versiculos && (
        <div className="space-y-2.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 animate-pulse rounded bg-ink-850" style={{ width: `${72 + (i % 3) * 9}%` }} />
          ))}
        </div>
      )}

      {versiculos && (
        <div className="font-reading text-[16px] leading-[1.85] text-ink-100/90">
          {versiculos.map((v) => (
            <p key={v.n} className="mb-1">
              <sup className="mr-1.5 select-none font-sans text-[0.62em] font-bold text-gold-500">
                {v.n}
              </sup>
              {v.texto}
            </p>
          ))}
        </div>
      )}

      {mostrarFicha && ficha && (
        <details className="mt-4 border-t border-white/5 pt-3">
          <summary className="cursor-pointer text-[13px] font-semibold text-ink-300 transition-colors hover:text-white">
            Contexto do livro
          </summary>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-400">{ficha.contexto}</p>
          <p className="mt-2 text-[12px] text-ink-500">
            {ficha.autor} · {ficha.quando}
          </p>
        </details>
      )}
    </div>
  );
}
