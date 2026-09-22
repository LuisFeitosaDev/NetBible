"use client";

import { GROUP_THEME } from "@/lib/catalog";
import type { BookMeta } from "@/lib/bible";

/**
 * Fundo da tela de leitura.
 *
 * Preto chapado cansa a vista em texto longo e some com a identidade do livro.
 * Aqui a base é um quase-preto levemente quente, com um halo da cor do grupo
 * no topo e um rodapé mais fundo, para a página ter profundidade sem ganhar
 * contraste que atrapalhe.
 *
 * Tudo em opacidade baixa de propósito: o texto continua em #ececf2 sobre
 * fundo escuro, então a legibilidade não muda. A cor serve para o olho saber
 * que Salmos não é Marcos, não para decorar.
 */
export function AmbienteLeitura({ book }: { book: BookMeta }) {
  const tema = GROUP_THEME[book.group];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base levemente quente, em vez do preto puro. */}
      <div className="absolute inset-0 bg-[#0b0a0e]" />

      {/* Halo da cor do grupo, entrando por cima. */}
      <div
        className="absolute inset-x-0 top-0 h-[70vh]"
        style={{
          background: `radial-gradient(120% 100% at 50% -20%, ${tema.from}26 0%, ${tema.to}14 38%, transparent 72%)`,
        }}
      />

      {/* Rodapé mais fundo, para a coluna de texto não parecer flutuar no vazio. */}
      <div
        className="absolute inset-x-0 bottom-0 h-[45vh]"
        style={{
          background: `linear-gradient(to top, ${tema.to}1a 0%, transparent 100%)`,
        }}
      />

      {/* Grão fino: tira o aspecto de gradiente digital e disfarça banding. */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
