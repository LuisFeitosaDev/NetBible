"use client";

/**
 * Transição entre rotas.
 *
 * `template.tsx` remonta a cada navegação, diferente de `layout.tsx`, que é o
 * que faz a animação tocar de novo sem nenhum estado nosso.
 *
 * Só opacidade aqui, nunca transform: um transform neste nível viraria bloco de
 * contenção e quebraria o fundo `fixed` da leitura e o cabeçalho `sticky`. O
 * deslocamento lateral fica por conta do leitor, aplicado só na coluna de texto.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="rota-entra">{children}</div>;
}
