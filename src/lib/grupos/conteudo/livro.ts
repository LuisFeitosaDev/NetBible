import { ABOUT } from "@/lib/about";
import type { BookMeta } from "@/lib/bible";
import type { EtapaMontada } from "../metodos";
import type { Material } from "./tipos";

/**
 * Estudo de Livro.
 *
 * Único método que não precisa de curadoria nova nem de IA: a ficha dos 66
 * livros em `lib/about.ts` já traz autor, época, destinatários, gênero,
 * contexto histórico e temas. O que falta é fatiar o livro em encontros e
 * transformar isso em etapas.
 */

export type PlanoEncontro = {
  indice: number;
  total: number;
  deCapitulo: number;
  ateCapitulo: number;
  rotulo: string;
};

/**
 * Divide o livro em faixas contíguas de tamanho parecido.
 *
 * Por capítulo, e não por perícope: a divisão em perícopes varia entre
 * tradições e não está nos dados que temos. Capítulo é uma aproximação honesta,
 * e o líder pode ajustar a faixa na hora de criar o encontro.
 */
export function planejarEncontros(livro: BookMeta, quantos: number): PlanoEncontro[] {
  const capitulos = livro.verses.length;
  const total = Math.max(1, Math.min(quantos, capitulos));
  const base = Math.floor(capitulos / total);
  const sobra = capitulos % total;

  const plano: PlanoEncontro[] = [];
  let cursor = 1;

  for (let i = 0; i < total; i++) {
    // As primeiras faixas ficam com um capítulo a mais, para não sobrar tudo na última.
    const tamanho = base + (i < sobra ? 1 : 0);
    const de = cursor;
    const ate = cursor + tamanho - 1;
    cursor = ate + 1;

    plano.push({
      indice: i + 1,
      total,
      deCapitulo: de,
      ateCapitulo: ate,
      rotulo: de === ate ? `${livro.name} ${de}` : `${livro.name} ${de}–${ate}`,
    });
  }

  return plano;
}

/** Quantos encontros fazem sentido para o tamanho do livro. */
export function encontrosSugeridos(livro: BookMeta) {
  const c = livro.verses.length;
  if (c <= 4) return [1, 2, c].filter((n, i, a) => n <= c && a.indexOf(n) === i);
  if (c <= 16) return [4, 6, 8, c].filter((n) => n <= c);
  if (c <= 30) return [6, 8, 12];
  return [8, 12, 16, 24];
}

export function montarEstudoDeLivro(
  livro: BookMeta,
  encontro: PlanoEncontro,
): EtapaMontada[] {
  const ficha = ABOUT[livro.slug];
  const temas = ficha?.temas ?? [];
  const primeiro = encontro.indice === 1;

  const panorama: Material = {
    notas: ficha
      ? [
          `Autor: ${ficha.autor}`,
          `Quando: ${ficha.quando}`,
          `Para quem: ${ficha.publico}`,
          `Gênero literário: ${ficha.genero}`,
          ...(temas.length ? [`Temas principais: ${temas.join(", ")}`] : []),
          `Plano: ${encontro.total} ${encontro.total === 1 ? "encontro" : "encontros"}, este é o ${encontro.indice}.`,
        ]
      : [`Plano: ${encontro.total} encontros, este é o ${encontro.indice}.`],
    textos: ficha
      ? [
          {
            ref: `${livro.name} ${ficha.chave.c}:${ficha.chave.v}`,
            slug: livro.slug,
            capitulo: ficha.chave.c,
            versiculos: String(ficha.chave.v),
            contexto: "Versículo-âncora do livro, útil para manter o fio ao longo dos encontros.",
          },
        ]
      : undefined,
  };

  const etapas: EtapaMontada[] = [
    {
      chave: "panorama",
      titulo: primeiro ? "Panorama do livro" : "Relembrando o panorama",
      icone: "🗺️",
      descricao:
        ficha?.contexto ??
        `Visão geral de ${livro.name} antes de entrar no texto deste encontro.`,
      material: panorama,
      perguntas: primeiro
        ? [
            {
              texto: `O que você já sabia sobre ${livro.name} antes de hoje?`,
              ajuda: "Vale o que ouviu, o que leu e também o que acha que sabe mas nunca conferiu.",
            },
            {
              texto: "Sabendo quem escreveu e para quem, o que muda na sua leitura?",
              ajuda: "Carta, poesia e lei não se leem do mesmo jeito.",
            },
          ]
        : [
            {
              texto: "O que ficou do encontro anterior?",
              ajuda: "Uma frase basta. Serve para religar o grupo ao fio do livro.",
            },
          ],
    },
    {
      chave: "leitura",
      titulo: `Leitura: ${encontro.rotulo}`,
      icone: "📖",
      descricao:
        "Leiam a passagem inteira antes de analisar. Se der, em voz alta e sem parar no meio.",
      perguntas: [],
    },
    {
      chave: "observacao",
      titulo: "Objetivo e observação",
      icone: "🔎",
      descricao: `O que este trecho de ${livro.name} diz, antes de decidir o que ele significa.`,
      perguntas: [
        {
          texto: "Do que este trecho trata, com as suas palavras?",
          ajuda: "Resuma sem interpretar. Só o que está na página.",
        },
        {
          texto: "O que se repete, contrasta ou muda ao longo da passagem?",
          ajuda: "Repetição e contraste quase sempre são o autor sublinhando algo.",
        },
      ],
    },
    {
      chave: "discussao",
      titulo: "Discussão",
      icone: "💬",
      descricao:
        "As respostas do grupo ficam visíveis. Comparem, discordem com respeito e voltem ao texto.",
      perguntas: [
        {
          texto: `Como este trecho se encaixa no argumento geral de ${livro.name}?`,
          ajuda: "Pense no que veio antes e no que vem depois, não só no trecho isolado.",
        },
        {
          texto: "Ficou alguma dúvida que o texto não responde?",
          ajuda: "Registrar a dúvida vale mais do que inventar resposta.",
        },
      ],
    },
    {
      chave: "aplicacao",
      titulo: "Aplicação",
      icone: "❤️",
      descricao: "Do texto para a vida, com endereço.",
      perguntas: [
        { texto: "O que esta passagem revela sobre Deus?" },
        {
          texto: "O que ela pede de você esta semana, concretamente?",
          ajuda: "Nome, lugar, hora. Aplicação sem endereço não acontece.",
        },
      ],
    },
    {
      chave: "sintese",
      titulo: "Síntese",
      icone: "🧩",
      descricao: "Fechando o encontro numa frase que o grupo leve embora.",
      perguntas: [
        {
          texto: `Se você tivesse que resumir ${encontro.rotulo} em uma frase, qual seria?`,
        },
      ],
    },
    {
      chave: "oracao",
      titulo: "Oração",
      icone: "🙏",
      descricao: temas.length
        ? `Orem a partir do que leram, especialmente sobre ${temas.slice(0, 2).join(" e ").toLowerCase()}.`
        : "Orem a partir do que leram, devolvendo a Deus o que o texto levantou.",
      perguntas: [],
    },
  ];

  return etapas;
}
