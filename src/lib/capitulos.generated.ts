// Gerado por scripts/build-capitulos.mjs e scripts/adicionar-arte.mjs — não edite à mão.
export const CAPITULOS_COM_ARTE: ReadonlySet<string> = new Set(["1rs-10","1rs-11","1rs-13","1rs-17","1rs-18","1rs-19","1rs-20","1rs-22","1rs-3","1rs-5","1sm-10","1sm-15","1sm-17","1sm-18","1sm-19","1sm-20","1sm-24","1sm-28","1sm-31","1sm-6","2cr-20","2rs-1","2rs-11","2rs-17","2rs-19","2rs-2","2rs-25","2rs-6","2rs-9","2sm-10","2sm-18","2sm-19","2sm-2","2sm-21","2sm-24","am-1","at-9","dn-1","dn-3","dn-5","dn-6","dn-7","dt-24","dt-25","dt-3","dt-31","dt-34","dt-9","ed-1","ed-3","ed-7","ed-9","et-1","et-5","et-6","et-7","ex-10","ex-12","ex-13","ex-14","ex-15","ex-16","ex-17","ex-2","ex-20","ex-3","ex-31","ex-32","ex-34","ex-4","ex-40","ex-6","ex-7","ex-8","ex-9","ez-1","gn-1","gn-11","gn-12","gn-14","gn-16","gn-18","gn-19","gn-2","gn-21","gn-22","gn-23","gn-24","gn-25","gn-26","gn-27","gn-28","gn-29","gn-3","gn-31","gn-32","gn-33","gn-37","gn-39","gn-4","gn-41","gn-42","gn-43","gn-45","gn-46","gn-5","gn-6","gn-7","gn-8","gn-9","is-13","is-27","is-6","jn-1","jn-2","jn-3","jn-4","job-1","job-2","jr-1","jr-36","js-10","js-2","js-3","js-6","js-7","js-8","jz-11","jz-14","jz-15","jz-16","jz-19","jz-2","jz-21","jz-4","jz-7","jz-8","jz-9","lm-1","lv-1","lv-16","mq-6","mt-5","ne-2","ne-8","nm-13","nm-16","nm-19","nm-20","nm-21","nm-22","nm-23","nm-25","rt-1","rt-2","rt-3","rt-4","zc-6"]);

export const temArteDeCapitulo = (slug: string, capitulo: number) =>
  CAPITULOS_COM_ARTE.has(`${slug}-${capitulo}`);

/** Reserva: o que o <img> carrega quando o navegador não abre AVIF. */
export const arteDoCapitulo = (slug: string, capitulo: number) =>
  `/capas/capitulo/${slug}-${capitulo}.webp`;

/** Preferida: perto da metade do peso da reserva. */
export const arteAvifDoCapitulo = (slug: string, capitulo: number) =>
  `/capas/capitulo/${slug}-${capitulo}.avif`;
