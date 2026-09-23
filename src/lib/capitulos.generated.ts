// Gerado por scripts/build-capitulos.mjs — não edite à mão.
export const CAPITULOS_COM_ARTE: ReadonlySet<string> = new Set(["et-1","et-5","et-6","et-7","jn-1","jn-2","jn-3","jn-4","rt-1","rt-2","rt-3","rt-4"]);

export const temArteDeCapitulo = (slug: string, capitulo: number) =>
  CAPITULOS_COM_ARTE.has(`${slug}-${capitulo}`);

/** Reserva: o que o <img> carrega quando o navegador não abre AVIF. */
export const arteDoCapitulo = (slug: string, capitulo: number) =>
  `/capas/capitulo/${slug}-${capitulo}.webp`;

/** Preferida: perto da metade do peso da reserva. */
export const arteAvifDoCapitulo = (slug: string, capitulo: number) =>
  `/capas/capitulo/${slug}-${capitulo}.avif`;
