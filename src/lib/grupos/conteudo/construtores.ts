import { TEMAS } from "./temas";
import { DOUTRINAS } from "./doutrinas";
import { PERSONAGENS } from "./personagens";
import { DEBATES } from "./debates";
import { buscarCurado, type EtapaMontada, type Material } from "./tipos";

/**
 * Transforma conteúdo curado em etapas de estudo.
 *
 * Cada construtor devolve `null` quando não existe curadoria para o que o líder
 * pediu. É esse `null` que aciona a IA: o app nunca fica sem resposta, e ao
 * mesmo tempo o conteúdo revisado sempre tem prioridade sobre o gerado.
 */

const ORACAO: EtapaMontada = {
  chave: "oracao",
  titulo: "Oração",
  icone: "🙏",
  descricao: "Orem a partir do que foi estudado, devolvendo a Deus o que o texto levantou.",
  perguntas: [],
};

const perguntas = (lista: string[], ajuda?: string) =>
  lista.map((texto) => ({ texto, ajuda }));

/* ------------------------------------------------------------- temático -- */

export function construirTematico(termo: string): EtapaMontada[] | null {
  const tema = buscarCurado(TEMAS, termo);
  if (!tema) return null;

  const etapas: EtapaMontada[] = [
    {
      chave: "abertura",
      titulo: `Tema: ${tema.nome}`,
      icone: "🎯",
      descricao: tema.resumo,
      material: tema.notas ? { notas: tema.notas } : undefined,
      perguntas: [
        {
          texto: `O que você já ouviu a igreja dizer sobre ${tema.nome.toLowerCase()}?`,
          ajuda: "Vale o que ajudou e o que atrapalhou.",
        },
      ],
    },
  ];

  // Uma etapa por categoria: é o que impede o estudo de virar lista de
  // versículos soltos, porque cada bloco carrega os seus textos com contexto.
  tema.categorias.forEach((categoria, i) => {
    etapas.push({
      chave: `bloco-${i}`,
      titulo: categoria.titulo,
      icone: "📖",
      descricao: "Leiam os textos com o contexto antes de tirar conclusão.",
      material: { textos: categoria.textos },
      perguntas: perguntas(
        tema.perguntas.slice(i, i + 1).length
          ? tema.perguntas.slice(i, i + 1)
          : ["O que estes textos acrescentam ao que já foi dito?"],
      ),
    });
  });

  etapas.push({
    chave: "discussao",
    titulo: "Discussão",
    icone: "💬",
    descricao: "As respostas ficam visíveis. Comparem e voltem ao texto quando discordarem.",
    material: tema.visoes ? { visoes: tema.visoes } : undefined,
    perguntas: perguntas(tema.perguntas.slice(tema.categorias.length)),
  });

  etapas.push({
    chave: "aplicacao",
    titulo: "Aplicação",
    icone: "❤️",
    descricao: "Do texto para a semana, com endereço.",
    perguntas: perguntas(tema.aplicacoes),
  });

  etapas.push(ORACAO);
  return etapas;
}

/* ---------------------------------------------------------- personagem -- */

export function construirPersonagem(termo: string): EtapaMontada[] | null {
  const p = buscarCurado(PERSONAGENS, termo);
  if (!p) return null;

  const ficha: Material = {
    notas: [
      `Época: ${p.epoca}`,
      `Família: ${p.familia}`,
      `Acontecimentos: ${p.acontecimentos.join("; ")}`,
    ],
  };

  return [
    {
      chave: "contexto",
      titulo: `Quem foi ${p.nome}`,
      icone: "🗺️",
      descricao: p.contexto,
      material: ficha,
      perguntas: [
        { texto: `O que você já sabia sobre ${p.nome}?`, ajuda: "Inclua o que você acha que sabe mas nunca conferiu." },
      ],
    },
    {
      chave: "textos",
      titulo: "Nos próprios textos",
      icone: "📖",
      descricao: "Leiam as passagens antes de julgar as decisões.",
      material: { textos: p.textos },
      perguntas: [{ texto: "O que o texto mostra que você não esperava?" }],
    },
    {
      chave: "decisoes",
      titulo: "Decisões",
      icone: "🔀",
      descricao: "O que essa pessoa escolheu, e em que circunstância.",
      material: { notas: p.decisoes },
      perguntas: [
        { texto: "Qual decisão você entende, mesmo discordando?" },
        { texto: "Alguma dessas escolhas se parece com alguma sua?" },
      ],
    },
    {
      chave: "luzes-sombras",
      titulo: "Virtudes e erros",
      icone: "⚖️",
      descricao:
        "A Bíblia não apresenta essa pessoa só de um jeito, e o estudo também não vai.",
      material: {
        notas: [
          `Virtudes: ${p.virtudes.join("; ") || "o texto não destaca"}`,
          `Erros: ${p.erros.join("; ") || "o texto não registra falha explícita"}`,
        ],
      },
      perguntas: [
        { texto: `Você costuma ouvir ${p.nome} descrito como herói ou como vilão? O texto sustenta isso?` },
        { texto: "O que muda ao ver virtudes e erros na mesma pessoa?" },
      ],
    },
    {
      chave: "deus",
      titulo: "Relacionamento com Deus",
      icone: "✝️",
      descricao: p.relacionamento,
      perguntas: [{ texto: "O que esse relacionamento revela sobre como Deus trata gente falha?" }],
    },
    {
      chave: "desenvolvimento",
      titulo: "O que mudou nele",
      icone: "🧩",
      descricao: p.desenvolvimento,
      material: { notas: [`Consequências: ${p.consequencias}`] },
      perguntas: [{ texto: "Em que ponto da história dessa pessoa você está hoje?" }],
    },
    {
      chave: "aplicacao",
      titulo: "Aplicação",
      icone: "❤️",
      descricao: "Da vida dela para a sua.",
      perguntas: perguntas(p.aplicacoes),
    },
    ORACAO,
  ];
}

/* ---------------------------------------------------------- comparação -- */

export function construirComparacao(a: string, b: string): EtapaMontada[] | null {
  const p1 = buscarCurado(PERSONAGENS, a);
  const p2 = buscarCurado(PERSONAGENS, b);
  if (!p1 || !p2) return null;

  const lado = (p: typeof p1) => [
    `${p.nome}: ${p.contexto}`,
    `Decisões: ${p.decisoes.join("; ")}`,
  ];

  return [
    {
      chave: "contexto",
      titulo: `${p1.nome} e ${p2.nome}`,
      icone: "⚖️",
      descricao:
        "Comparar não é ranquear. O objetivo é enxergar escolhas diferentes em circunstâncias parecidas.",
      material: { notas: [...lado(p1), ...lado(p2)] },
      perguntas: [{ texto: "O que essas duas pessoas têm em comum antes de qualquer diferença?" }],
    },
    {
      chave: "textos-a",
      titulo: `Os textos de ${p1.nome}`,
      icone: "📖",
      descricao: `Leiam ${p1.nome} por ele mesmo, antes de comparar.`,
      material: { textos: p1.textos },
      perguntas: [{ texto: `O que pesa mais na trajetória de ${p1.nome}?` }],
    },
    {
      chave: "textos-b",
      titulo: `Os textos de ${p2.nome}`,
      icone: "📖",
      descricao: `Agora ${p2.nome}, com o mesmo cuidado.`,
      material: { textos: p2.textos },
      perguntas: [{ texto: `O que pesa mais na trajetória de ${p2.nome}?` }],
    },
    {
      chave: "diante-de-deus",
      titulo: "Diante de Deus",
      icone: "✝️",
      descricao: "Como cada um respondeu quando foi confrontado.",
      material: {
        notas: [`${p1.nome}: ${p1.relacionamento}`, `${p2.nome}: ${p2.relacionamento}`],
      },
      perguntas: [
        { texto: "Onde está a diferença real entre os dois: no erro, ou no que veio depois?" },
      ],
    },
    {
      chave: "consequencias",
      titulo: "Consequências",
      icone: "🧩",
      descricao: "O que resultou de cada caminho.",
      material: {
        notas: [`${p1.nome}: ${p1.consequencias}`, `${p2.nome}: ${p2.consequencias}`],
        // Ressalva de método: sem isso a comparação vira placar.
        visoes: undefined,
      },
      perguntas: [
        { texto: "É justo dizer que um foi melhor que o outro? O texto autoriza isso?" },
      ],
    },
    {
      chave: "aplicacao",
      titulo: "Aplicação",
      icone: "❤️",
      descricao: "O que a comparação cobra de você.",
      perguntas: [
        { texto: "De qual dos dois você está mais perto hoje, e por quê?" },
        { texto: "Que passo concreto muda essa resposta na próxima semana?" },
      ],
    },
    ORACAO,
  ];
}

/* --------------------------------------------------------- doutrinário -- */

export function construirDoutrinario(termo: string): EtapaMontada[] | null {
  const d = buscarCurado(DOUTRINAS, termo);
  if (!d) return null;

  const etapas: EtapaMontada[] = [
    {
      chave: "definicao",
      titulo: d.nome,
      icone: "📘",
      descricao: d.definicao,
      perguntas: [
        { texto: `Como você explicaria ${d.nome.toLowerCase()} antes deste estudo?`, ajuda: "Vale responder mal. É o ponto de partida." },
      ],
    },
    {
      chave: "textos",
      titulo: "Os textos principais",
      icone: "📖",
      descricao: "Leiam cada um com o contexto anotado, antes de sistematizar.",
      material: { textos: d.textos },
      perguntas: [{ texto: "Qual destes textos é o mais claro, e qual é o mais difícil?" }],
    },
  ];

  if (d.consenso) {
    etapas.push({
      chave: "consenso",
      titulo: "Onde há acordo",
      icone: "🤝",
      descricao: d.consenso,
      perguntas: [{ texto: "Por que é importante começar pelo que é consenso?" }],
    });
  }

  if (d.visoes?.length) {
    etapas.push({
      chave: "visoes",
      titulo: "Onde cristãos divergem",
      icone: "⚖️",
      descricao:
        "As leituras aparecem lado a lado, com os textos que cada uma usa. O objetivo é entender, não vencer.",
      material: { visoes: d.visoes },
      perguntas: [
        { texto: "Qual leitura mais se parece com a que você aprendeu?" },
        { texto: "Qual é o melhor argumento da leitura que você NÃO segue?", ajuda: "Se você não consegue formular, provavelmente ainda não entendeu." },
      ],
    });
  }

  etapas.push({
    chave: "discussao",
    titulo: "Discussão",
    icone: "💬",
    descricao: "As respostas ficam visíveis. Discordem com respeito e voltem ao texto.",
    perguntas: perguntas(d.perguntas),
  });

  etapas.push({
    chave: "aplicacao",
    titulo: "Aplicação",
    icone: "❤️",
    descricao: "Doutrina que não muda nada ainda não foi entendida.",
    perguntas: [{ texto: d.aplicacao }],
  });

  etapas.push(ORACAO);
  return etapas;
}

/* -------------------------------------------------------------- debate -- */

export function construirDebate(termo: string): EtapaMontada[] | null {
  const d = buscarCurado(
    DEBATES.map((x) => ({ ...x, nome: x.pergunta })),
    termo,
  );
  if (!d) return null;

  return [
    {
      chave: "pergunta",
      titulo: "A pergunta",
      icone: "❓",
      descricao: `${d.pergunta}\n\n${d.contexto}`,
      material: {
        notas: [
          "Não é competição. Ninguém precisa sair convencido, e mudar de ideia não é derrota.",
        ],
      },
      perguntas: [
        { texto: "Antes de estudar: qual é a sua resposta hoje, e de onde ela veio?" },
      ],
    },
    ...d.posicoes.map((pos, i) => ({
      chave: `posicao-${i}`,
      titulo: pos.nome,
      icone: "⚖️",
      descricao: pos.resumo,
      material: {
        notas: [
          `Argumento mais forte: ${pos.forca}`,
          `Texto mais difícil para essa leitura: ${pos.dificuldade}`,
        ],
        visoes: [{ nome: pos.nome, resumo: pos.resumo, textos: pos.textos }],
      },
      perguntas: [
        {
          texto: `Explique esta posição com as suas palavras, como se você a defendesse.`,
          ajuda: "Conseguir defender o que você não acredita é o exercício central deste método.",
        },
      ],
    })),
    {
      chave: "investigacao",
      titulo: "Investigação",
      icone: "🔎",
      descricao: "Agora voltem aos textos com perguntas, não com conclusões.",
      perguntas: perguntas(d.investigacao),
    },
    {
      chave: "sintese",
      titulo: "Síntese",
      icone: "🧩",
      descricao: d.sintese,
      material: d.notas ? { notas: d.notas } : undefined,
      perguntas: [
        { texto: "O que mudou na sua resposta inicial, mesmo que pouco?" },
        { texto: "O que você ainda não sabe, e está tudo bem não saber?" },
      ],
    },
    ORACAO,
  ];
}

/** Listas para o assistente sugerir em vez de deixar o campo em branco. */
export const SUGESTOES = {
  temas: TEMAS.map((t) => t.nome),
  doutrinas: DOUTRINAS.map((d) => d.nome),
  personagens: PERSONAGENS.map((p) => p.nome),
  debates: DEBATES.map((d) => d.pergunta),
};
