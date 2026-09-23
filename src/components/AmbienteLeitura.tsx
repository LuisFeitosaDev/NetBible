"use client";

import { GROUP_THEME } from "@/lib/catalog";
import type { BookMeta } from "@/lib/bible";
import type { TemaLeitura } from "@/lib/temaLeitura";

/**
 * Fundo da tela de leitura.
 *
 * No escuro, a base é um quase-preto levemente quente, com um halo da cor do
 * grupo no topo e um rodapé mais fundo, para a página ter profundidade sem
 * ganhar contraste que atrapalhe. No claro é papel: o mesmo halo fica muito
 * mais fraco, porque uma cor saturada sobre creme fica suja, não elegante.
 *
 * A base em si (`--rl-canvas`) e o grão seguem o tema pela variável CSS
 * escopada em `[data-tema-leitura]`; só a intensidade do halo colorido, que é
 * um degradê construído em JS a partir da cor do grupo, precisa do valor de
 * `tema` diretamente para escolher o sufixo de opacidade certo.
 */
export function AmbienteLeitura({ book, tema }: { book: BookMeta; tema: TemaLeitura }) {
  const cor = GROUP_THEME[book.group];
  const claro = tema === "claro";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base quente: quase-preto no escuro, papel no claro. */}
      <div className="absolute inset-0 bg-[var(--rl-canvas)]" />

      {/* Halo da cor do grupo, entrando por cima. Bem mais discreto no claro. */}
      <div
        className="absolute inset-x-0 top-0 h-[70vh]"
        style={{
          background: claro
            ? `radial-gradient(120% 100% at 50% -20%, ${cor.from}12 0%, ${cor.to}0a 38%, transparent 72%)`
            : `radial-gradient(120% 100% at 50% -20%, ${cor.from}26 0%, ${cor.to}14 38%, transparent 72%)`,
        }}
      />

      {/* Rodapé mais fundo, para a coluna de texto não parecer flutuar no vazio. */}
      <div
        className="absolute inset-x-0 bottom-0 h-[45vh]"
        style={{
          background: claro
            ? `linear-gradient(to top, ${cor.to}0c 0%, transparent 100%)`
            : `linear-gradient(to top, ${cor.to}1a 0%, transparent 100%)`,
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
