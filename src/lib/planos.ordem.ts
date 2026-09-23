/**
 * Em que ordem a Bíblia é lida num plano.
 *
 * Duas ordens: a canônica, que é simplesmente Gênesis a Apocalipse, e a
 * cronológica, que recoloca cada trecho no momento em que os fatos acontecem.
 *
 * A cronológica é editorial, não automática: ninguém deduz de um arquivo que Jó
 * vive no tempo dos patriarcas ou que Gálatas foi escrita entre Atos 14 e 15.
 * Por isso ela mora aqui, escrita à mão, e é conferida por teste de cobertura:
 * os 1189 capítulos precisam aparecer uma vez cada, nem a mais nem a menos.
 *
 * O recorte é por capítulo. Planos cronológicos impressos às vezes quebram no
 * meio do capítulo para casar duas narrativas; aqui isso deixaria o leitor com
 * "Mateus 26:1-35", que é ruim de tocar no celular e pior de marcar como lido.
 */

import type { BibleIndex } from "./bible";

/** `[livro, primeiro, último]`, ou `[livro, "resto"]`. */
export type Segmento = [string, number, number] | [string, "resto"];

export type CapituloDoPlano = { slug: string; capitulo: number };

/**
 * Ordem cronológica.
 *
 * Os Salmos são o caso difícil: alguns têm um momento claro no texto, como o 51
 * depois de Bate-Seba, e outros não têm nenhum. Os identificáveis entram na hora
 * certa; o restante vai num bloco só, ao fim do reinado de Davi, que é quando o
 * saltério toma a forma que conhecemos. É o que `["sl", "resto"]` faz.
 */
export const CRONOLOGICO: Segmento[] = [
  // Origens. Jó entra aqui: não cita Lei, sacerdócio nem Israel, e a riqueza
  // dele é contada em cabeças de gado, como a dos patriarcas.
  ["gn", 1, 11],
  ["job", 1, 42],
  ["gn", 12, 50],

  // Saída do Egito e a Lei.
  ["ex", 1, 40],
  ["lv", 1, 27],
  ["nm", 1, 36],
  ["sl", 90, 90], // atribuído a Moisés, e é o único assim
  ["dt", 1, 34],

  // Conquista e juízes.
  ["js", 1, 24],
  ["jz", 1, 21],
  ["rt", 1, 4],

  // Samuel e Saul.
  ["1sm", 1, 12],
  ["1sm", 13, 20],
  ["sl", 59, 59], // a casa cercada, 1Sm 19
  ["1sm", 21, 22],
  ["sl", 34, 34],
  ["sl", 52, 52],
  ["sl", 56, 56],
  ["sl", 142, 142],
  ["1sm", 23, 24],
  ["sl", 7, 7],
  ["sl", 54, 54],
  ["sl", 57, 57],
  ["sl", 63, 63],
  ["1sm", 25, 31],

  // Davi rei. Crônicas reconta o mesmo reinado, então anda junto com Samuel.
  ["2sm", 1, 4],
  ["1cr", 1, 10],
  ["2sm", 5, 5],
  ["1cr", 11, 12],
  ["sl", 133, 133],
  ["2sm", 6, 6],
  ["1cr", 13, 16],
  ["sl", 15, 15],
  ["sl", 24, 24],
  ["sl", 68, 68],
  ["sl", 132, 132],
  ["2sm", 7, 7],
  ["1cr", 17, 17],
  ["sl", 89, 89],
  ["2sm", 8, 10],
  ["1cr", 18, 19],
  ["sl", 20, 21],
  ["sl", 60, 60],
  ["sl", 110, 110],
  ["2sm", 11, 12],
  ["1cr", 20, 20],
  ["sl", 32, 32], // o perdão
  ["sl", 51, 51], // o arrependimento
  ["2sm", 13, 14],
  ["2sm", 15, 18],
  ["sl", 3, 3], // a fuga de Absalão
  ["2sm", 19, 21],
  ["sl", 18, 18],
  ["2sm", 22, 24],
  ["1cr", 21, 29],
  ["sl", "resto"],

  // Salomão. Os três livros de sabedoria saem do reinado dele.
  ["1rs", 1, 4],
  ["2cr", 1, 1],
  ["pv", 1, 31],
  ["ec", 1, 12],
  ["ct", 1, 8],
  ["1rs", 5, 8],
  ["2cr", 2, 7],
  ["1rs", 9, 11],
  ["2cr", 8, 9],

  // Reino dividido, com cada profeta no reinado em que pregou.
  ["1rs", 12, 16],
  ["2cr", 10, 16],
  ["1rs", 17, 22],
  ["2cr", 17, 20],
  ["2rs", 1, 8],
  ["ob", 1, 1],
  ["2rs", 9, 12],
  ["2cr", 21, 24],
  ["jl", 1, 3],
  ["2rs", 13, 14],
  ["2cr", 25, 25],
  ["jn", 1, 4],
  ["am", 1, 9],
  ["os", 1, 14],
  ["2rs", 15, 17],
  ["2cr", 26, 28],
  ["is", 1, 39],
  ["mq", 1, 7],
  ["2rs", 18, 20],
  ["2cr", 29, 32],
  ["is", 40, 66],
  ["na", 1, 3],
  ["2rs", 21, 23],
  ["2cr", 33, 35],
  ["sf", 1, 3],
  ["hc", 1, 3],
  ["jr", 1, 29],
  ["2rs", 24, 25],
  ["2cr", 36, 36],
  ["jr", 30, 52],
  ["lm", 1, 5],

  // Exílio.
  ["sl", 137, 137], // junto aos rios da Babilônia
  ["ez", 1, 48],
  ["dn", 1, 12],

  // Volta e reconstrução.
  ["ed", 1, 6],
  ["sl", 126, 126], // os que voltaram, como os que sonham
  ["ag", 1, 2],
  ["zc", 1, 14],
  ["et", 1, 10],
  ["ed", 7, 10],
  ["ne", 1, 13],
  ["ml", 1, 4],

  // Evangelhos, em harmonia. Cada bloco junta as mesmas cenas contadas por
  // evangelistas diferentes, e a Paixão vem com os quatro lado a lado.
  ["lc", 1, 1],
  ["mt", 1, 1],
  ["lc", 2, 2],
  ["mt", 2, 2],
  ["mt", 3, 3],
  ["mc", 1, 1],
  ["lc", 3, 3],
  ["jo", 1, 1],
  ["jo", 2, 4],
  ["mt", 4, 4],
  ["lc", 4, 5],
  ["mt", 5, 7],
  ["mt", 8, 9],
  ["mc", 2, 3],
  ["lc", 6, 7],
  ["mt", 10, 12],
  ["mc", 4, 5],
  ["lc", 8, 9],
  ["jo", 5, 6],
  ["mt", 13, 15],
  ["mc", 6, 7],
  ["lc", 10, 11],
  ["mt", 16, 18],
  ["mc", 8, 9],
  ["lc", 12, 13],
  ["jo", 7, 10],
  ["mt", 19, 20],
  ["mc", 10, 10],
  ["lc", 14, 18],
  ["jo", 11, 11],
  ["mt", 21, 23],
  ["mc", 11, 12],
  ["lc", 19, 20],
  ["jo", 12, 12],
  ["mt", 24, 25],
  ["mc", 13, 13],
  ["lc", 21, 21],
  ["mt", 26, 27],
  ["mc", 14, 15],
  ["lc", 22, 23],
  ["jo", 13, 19],
  ["mt", 28, 28],
  ["mc", 16, 16],
  ["lc", 24, 24],
  ["jo", 20, 21],

  // A igreja. As cartas entram no ponto de Atos em que foram escritas, que é o
  // que explica por que Gálatas discute circuncisão logo antes do concílio.
  ["at", 1, 7],
  ["at", 8, 12],
  ["tg", 1, 5],
  ["at", 13, 14],
  ["gl", 1, 6],
  ["at", 15, 16],
  ["1ts", 1, 5],
  ["2ts", 1, 3],
  ["at", 17, 18],
  ["1co", 1, 16],
  ["at", 19, 19],
  ["2co", 1, 13],
  ["rm", 1, 16],
  ["at", 20, 23],
  ["at", 24, 28],
  ["ef", 1, 6],
  ["fp", 1, 4],
  ["cl", 1, 4],
  ["fm", 1, 1],
  ["1tm", 1, 6],
  ["tt", 1, 3],
  ["1pe", 1, 5],
  ["2tm", 1, 4],
  ["2pe", 1, 3],
  ["hb", 1, 13],
  ["jd", 1, 1],
  ["1jo", 1, 5],
  ["2jo", 1, 1],
  ["3jo", 1, 1],
  ["ap", 1, 22],
];

/** Gênesis a Apocalipse, na ordem em que os livros estão na Bíblia. */
export function ordemCanonica(index: BibleIndex): CapituloDoPlano[] {
  return index.books.flatMap((livro) =>
    Array.from({ length: livro.verses.length }, (_, i) => ({
      slug: livro.slug,
      capitulo: i + 1,
    })),
  );
}

/**
 * Expande os segmentos em capítulos, resolvendo `"resto"` com o que ainda não
 * apareceu. Ignora em silêncio o que não existe na edição carregada, para uma
 * tradução com numeração diferente não derrubar a página inteira.
 */
export function ordemCronologica(index: BibleIndex): CapituloDoPlano[] {
  const totalDe = new Map(index.books.map((b) => [b.slug, b.verses.length]));
  const usados = new Set<string>();
  const saida: CapituloDoPlano[] = [];

  /*
   * Capítulos com hora marcada numa faixa explícita, inclusive nas que vêm
   * depois do `"resto"`. Sem esta reserva o bloco de salmos engoliria o 137,
   * que é do exílio, e o 126, que é da volta: os dois estão escritos mais
   * abaixo e nunca chegariam lá.
   */
  const reservados = new Set<string>();
  for (const [slug, de, ate] of CRONOLOGICO) {
    if (de === "resto") continue;
    for (let n = de; n <= (ate ?? de); n++) reservados.add(`${slug}.${n}`);
  }

  const juntar = (slug: string, capitulo: number) => {
    const chave = `${slug}.${capitulo}`;
    if (usados.has(chave)) return;
    usados.add(chave);
    saida.push({ slug, capitulo });
  };

  for (const [slug, de, ate] of CRONOLOGICO) {
    const total = totalDe.get(slug);
    if (!total) continue;
    if (de === "resto") {
      for (let n = 1; n <= total; n++) {
        if (!reservados.has(`${slug}.${n}`)) juntar(slug, n);
      }
      continue;
    }
    for (let n = de; n <= Math.min(ate ?? de, total); n++) juntar(slug, n);
  }

  // Rede de segurança: se um dia um livro entrar no índice sem entrar na lista
  // acima, ele aparece no fim em vez de sumir do plano sem ninguém perceber.
  for (const livro of index.books) {
    for (let n = 1; n <= livro.verses.length; n++) juntar(livro.slug, n);
  }

  return saida;
}
