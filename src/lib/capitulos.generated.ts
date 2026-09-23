// Gerado por scripts/build-capitulos.mjs — não edite à mão.
export const CAPITULOS_COM_ARTE: ReadonlySet<string> = new Set(["rt-1","rt-2","rt-3","rt-4"]);

export const temArteDeCapitulo = (slug: string, capitulo: number) =>
  CAPITULOS_COM_ARTE.has(`${slug}-${capitulo}`);

export const arteDoCapitulo = (slug: string, capitulo: number) =>
  `/capas/capitulo/${slug}-${capitulo}.webp`;
