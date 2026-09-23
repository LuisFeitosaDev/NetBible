/**
 * De onde vem a arte de capítulo.
 *
 * Com 1189 capítulos em dois formatos, a arte passa de 250 MB. Isso não cabe
 * no repositório: o clone fica lento, o deploy engorda e cada imagem nova vira
 * um commit binário. Então os arquivos moram no Supabase Storage, que já está
 * contratado e já vem com CDN.
 *
 * A troca é controlada por `NEXT_PUBLIC_ARTE_CDN`. Sem a variável, o app
 * continua servindo de `public/`, que é o que mantém o projeto rodando antes
 * do primeiro envio e o que faz o desenvolvimento local funcionar offline.
 *
 * O caminho dentro do bucket é igual ao caminho local, de propósito: o mesmo
 * `capitulo/gn-1.avif` dos dois lados. Assim dá para alternar a origem sem
 * reprocessar nada, e para voltar atrás se o Storage cair.
 */

/** Base pública da arte, sem barra no fim. */
const BASE = (process.env.NEXT_PUBLIC_ARTE_CDN ?? "/capas").replace(/\/+$/, "");

export type FontesDaArte = {
  /** Preferida: perto da metade do peso do WebP nestas gravuras. */
  avif: string;
  /** Reserva, para quem não abre AVIF. */
  webp: string;
};

export function arteDeCapitulo(slug: string, capitulo: number): FontesDaArte {
  const nome = `${BASE}/capitulo/${slug}-${capitulo}`;
  return { avif: `${nome}.avif`, webp: `${nome}.webp` };
}

/** Verdadeiro quando a arte está vindo do Storage, e não de `public/`. */
export const arteRemota = BASE.startsWith("http");
