"use client";

import { useState } from "react";
import { arteDeCapitulo, capaDeDevocional } from "@/lib/arte";
import type { Devocional } from "@/lib/devocionais";

/**
 * A capa de um devocional: a gravura de capítulo que combina com o tema,
 * tingida com a cor da série. É a mesma arte sépia do leitor — o devocional
 * parece parte do app, não um anexo.
 *
 * Sem `relative` aqui, como em `BookArt`: quem chama decide o posicionamento.
 */
export function CapaDevocional({
  devocional,
  arte,
  className = "",
  /** Força do tom da série por cima do sépia. */
  tom = 0.42,
  prioridade = false,
  alta = false,
  children,
}: {
  devocional: Pick<Devocional, "cor" | "capa">;
  /**
   * Outra gravura no lugar da capa da série. Cada dia usa a do capítulo que
   * está sendo lido, no tom da série: 31 dias de Provérbios viram 31 cenas.
   */
  arte?: Devocional["capa"];
  className?: string;
  tom?: number;
  prioridade?: boolean;
  /**
   * Telas grandes (vitrine, topo, momento guiado): usa a capa em alta, vertical
   * no celular em pé e larga no resto. Se ela não carregar (ainda não enviada
   * ao Storage, navegador sem AVIF), volta para a arte de capítulo.
   */
  alta?: boolean;
  children?: React.ReactNode;
}) {
  const { cor } = devocional;
  const capa = arte ?? devocional.capa;
  const fontes = arteDeCapitulo(capa.slug, capa.capitulo);
  const [falhou, setFalhou] = useState(false);
  const grande = alta && !falhou ? capaDeDevocional(capa.slug, capa.capitulo) : null;

  return (
    <div
      className={`overflow-hidden ${className}`}
      // O degradê da cor é o que aparece enquanto a gravura carrega.
      style={{
        backgroundImage: `radial-gradient(120% 100% at 70% 20%, ${cor}cc 0%, #14121a 70%)`,
      }}
    >
      <picture key={grande ? "alta" : "base"}>
        {grande ? (
          <>
            <source media="(orientation: portrait)" srcSet={grande.alto} type="image/avif" />
            <source srcSet={grande.largo} type="image/avif" />
          </>
        ) : (
          <source srcSet={fontes.avif} type="image/avif" />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={grande ? grande.largo : fontes.webp}
          onError={grande ? () => setFalhou(true) : undefined}
          alt=""
          aria-hidden
          loading={prioridade ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: capa.foco ?? "50% 35%" }}
        />
      </picture>

      {/* O tom da série por cima do sépia: cada devocional com a sua cor. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-color"
        style={{ backgroundColor: cor, opacity: tom }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        style={{ backgroundColor: cor, opacity: 0.35 }}
      />

      {/* Grão de papel, o mesmo das capas de livro. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {children}
    </div>
  );
}
