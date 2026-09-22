import type { BookMeta } from "@/lib/bible";
import {
  construirComparacao,
  construirDebate,
  construirDoutrinario,
  construirPersonagem,
  construirTematico,
} from "./conteudo/construtores";
import { montarEstudoDeLivro, planejarEncontros } from "./conteudo/livro";
import type { Assunto, EtapaMontada } from "./conteudo/tipos";

/**
 * Templates dos métodos de estudo.
 *
 * É aqui que mora a inteligência do produto enquanto não há IA plugada: as
 * etapas, as perguntas, e as regras de como elas se adaptam a tempo, público e
 * nível. O runtime do estudo não sabe nada sobre método; ele só executa o que
 * este arquivo descreve.
 */

export type MetodoId =
  | "indutivo"
  | "problema"
  | "tematico"
  | "livro"
  | "perguntas"
  | "pequenos-grupos"
  | "personagem"
  | "comparacao"
  | "doutrinario"
  | "debate"
  | "personalizado";

export type Publico =
  | "criancas"
  | "adolescentes"
  | "jovens"
  | "adultos"
  | "lideres"
  | "misto";

export type Nivel = "iniciante" | "intermediario" | "avancado";

/** O que o líder precisa definir antes de o estudo existir. */
export type Requisito = "passagem" | "tema" | "livro" | "personagem" | "doutrina" | "questao";

export type PerguntaTemplate = {
  texto: string;
  /** Reformulação quando o público muda a linguagem, não o conteúdo. */
  variantes?: Partial<Record<Publico, string>>;
  /** Nível mínimo para a pergunta entrar no estudo. */
  nivel?: Nivel;
  /** Menor entra primeiro quando o tempo é curto. */
  prioridade: number;
  /** Dica curta para o participante travado. Nunca entrega a resposta. */
  ajuda?: string;
};

export type EtapaTemplate = {
  chave: string;
  titulo: string;
  icone: string;
  descricao: string;
  /** Etapas de leitura e oração não têm campo de resposta. */
  perguntas?: PerguntaTemplate[];
};

export type MetodoTemplate = {
  id: MetodoId;
  nome: string;
  resumo: string;
  requer: Requisito[];
  etapas: EtapaTemplate[];
  /** Método ainda não implementado aparece na lista, mas desabilitado. */
  disponivel: boolean;
};

const NIVEL_PESO: Record<Nivel, number> = {
  iniciante: 1,
  intermediario: 2,
  avancado: 3,
};

/** Quantas perguntas cabem, de verdade, em cada duração. */
const PERGUNTAS_POR_DURACAO: { ate: number; total: number }[] = [
  { ate: 15, total: 3 },
  { ate: 30, total: 6 },
  { ate: 45, total: 9 },
  { ate: 60, total: 12 },
  { ate: 90, total: 18 },
  { ate: Infinity, total: 24 },
];

// ---------------------------------------------------------------------------
// Estudo Indutivo
// ---------------------------------------------------------------------------

const INDUTIVO: MetodoTemplate = {
  id: "indutivo",
  nome: "Estudo Indutivo",
  resumo:
    "O método clássico: observar o que o texto diz, interpretar o que quis dizer e aplicar o que muda em você. É o melhor jeito de ensinar alguém a estudar sozinho.",
  requer: ["passagem"],
  disponivel: true,
  etapas: [
    {
      chave: "leitura",
      titulo: "Leitura",
      icone: "📖",
      descricao:
        "Leia a passagem inteira, sem parar para analisar. Se der, leia duas vezes, e uma delas em voz alta.",
    },
    {
      chave: "observacao",
      titulo: "Observação",
      icone: "🔎",
      descricao:
        "Ainda não é hora de interpretar. Aqui a pergunta é só uma: o que está escrito?",
      perguntas: [
        {
          texto: "O que o texto diz, com as suas palavras?",
          variantes: {
            criancas: "Conte com as suas palavras o que aconteceu nessa história.",
            adolescentes: "Resume aí o que o texto diz, do seu jeito.",
          },
          prioridade: 1,
          ajuda: "Resuma sem explicar nem opinar. Só o que está na página.",
        },
        {
          texto: "Quem está falando, e para quem?",
          variantes: { criancas: "Quem está falando nessa parte? Com quem essa pessoa fala?" },
          prioridade: 2,
        },
        {
          texto: "Quais palavras ou ideias se repetem?",
          prioridade: 3,
          ajuda: "Repetição quase sempre é o autor sublinhando alguma coisa.",
        },
        {
          texto: "Existem contrastes no texto?",
          variantes: { criancas: "O texto compara duas coisas diferentes? Quais?" },
          prioridade: 4,
          ajuda: "Procure por 'mas', 'porém', 'antes... agora'.",
        },
        {
          texto: "Existem ordens, promessas ou advertências?",
          prioridade: 5,
        },
        { texto: "Onde e quando essa cena acontece?", prioridade: 6 },
        {
          texto: "Existe uma progressão de ideias do começo ao fim?",
          nivel: "intermediario",
          prioridade: 7,
          ajuda: "O texto vai de onde para onde? Alguma coisa muda no caminho?",
        },
      ],
    },
    {
      chave: "interpretacao",
      titulo: "Interpretação",
      icone: "🧠",
      descricao:
        "Agora sim: o que o autor quis comunicar para quem leu isso primeiro?",
      perguntas: [
        {
          texto: "O que o autor quis comunicar com essa passagem?",
          variantes: { criancas: "O que essa história está querendo ensinar?" },
          prioridade: 1,
        },
        {
          texto: "Como os primeiros leitores entenderiam esse texto?",
          nivel: "intermediario",
          prioridade: 2,
          ajuda: "Pense em quem recebeu isso primeiro, e no que eles estavam vivendo.",
        },
        {
          texto: "Como o contexto, o que vem antes e depois, muda o sentido?",
          nivel: "intermediario",
          prioridade: 3,
        },
        {
          texto: "Existem outros textos bíblicos que conversam com este?",
          nivel: "intermediario",
          prioridade: 4,
        },
        {
          texto: "Alguma palavra-chave muda de peso no idioma original?",
          nivel: "avancado",
          prioridade: 5,
          ajuda: "Se ninguém souber, tudo bem. Registre a dúvida e pesquisem juntos.",
        },
        {
          texto: "O gênero literário do trecho pede algum cuidado de leitura?",
          nivel: "avancado",
          prioridade: 6,
          ajuda: "Poesia, parábola, lei e carta não se leem do mesmo jeito.",
        },
      ],
    },
    {
      chave: "discussao",
      titulo: "Discussão",
      icone: "💬",
      descricao:
        "As respostas do grupo ficam visíveis. Comparem, discordem com respeito e procurem o que o texto sustenta.",
      perguntas: [
        {
          texto: "Em que o grupo concordou, e onde apareceu divergência?",
          prioridade: 1,
        },
        {
          texto: "Qual resposta te fez enxergar algo que você não tinha visto?",
          prioridade: 2,
        },
      ],
    },
    {
      chave: "aplicacao",
      titulo: "Aplicação",
      icone: "❤️",
      descricao: "Do texto para a vida. Concreto, não genérico.",
      perguntas: [
        {
          texto: "O que esse texto revela sobre Deus?",
          prioridade: 1,
        },
        {
          texto: "O que ele revela sobre o ser humano?",
          variantes: { criancas: "O que essa história mostra sobre as pessoas?" },
          prioridade: 2,
        },
        {
          texto: "Existe algo aqui que você precisa crer, abandonar ou praticar?",
          variantes: {
            criancas: "O que você pode fazer essa semana por causa dessa história?",
            adolescentes: "Tem algo aqui que muda alguma coisa na sua semana?",
          },
          prioridade: 3,
        },
        {
          texto: "Onde exatamente isso encosta na sua vida hoje?",
          prioridade: 4,
          ajuda: "Nome, lugar, hora. Aplicação sem endereço não acontece.",
        },
      ],
    },
    {
      chave: "cristo",
      titulo: "Cristo",
      icone: "✝️",
      descricao:
        "Quando a ligação existe no próprio texto, vale explicitá-la. Se for forçar, é melhor deixar passar.",
      perguntas: [
        {
          texto: "Esse texto se relaciona com a pessoa ou a obra de Cristo? Como?",
          prioridade: 1,
          ajuda: "Se a conexão não estiver clara, diga isso. Forçar não ajuda ninguém.",
        },
      ],
    },
    {
      chave: "oracao",
      titulo: "Oração",
      icone: "🙏",
      descricao:
        "Orem a partir do que foi estudado, devolvendo a Deus o que o texto levantou.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Problema → Bíblia → Aplicação
// ---------------------------------------------------------------------------

const PROBLEMA: MetodoTemplate = {
  id: "problema",
  nome: "Problema → Bíblia → Aplicação",
  resumo:
    "Começa numa situação real do grupo e vai até o texto, em vez do contrário. Funciona muito bem com jovens e com quem está começando.",
  requer: ["questao", "passagem"],
  disponivel: true,
  etapas: [
    {
      chave: "problema",
      titulo: "O problema",
      icone: "🎯",
      descricao: "A situação real que motivou o encontro. Sem julgamento, sem resposta pronta.",
      perguntas: [
        {
          texto: "Como essa questão aparece na sua vida, na prática?",
          variantes: { adolescentes: "Como isso aparece no seu dia a dia?" },
          prioridade: 1,
        },
        {
          texto: "Que respostas o mundo costuma dar para esse problema?",
          prioridade: 2,
          ajuda: "Vale o que você vê nas redes, nos amigos, na própria cabeça.",
        },
      ],
    },
    {
      chave: "texto",
      titulo: "O texto bíblico",
      icone: "📖",
      descricao: "Leiam a passagem escolhida antes de qualquer conclusão.",
    },
    {
      chave: "contexto",
      titulo: "Contexto",
      icone: "🏛️",
      descricao:
        "Quem escreveu, para quem e por quê. Sem isso, o versículo vira frase solta.",
      perguntas: [
        {
          texto: "O que estava acontecendo quando esse texto foi escrito?",
          prioridade: 1,
          ajuda: "A ficha do livro, na aba de leitura, já traz boa parte disso.",
        },
        {
          texto: "O problema de hoje é o mesmo dos primeiros leitores, ou só parecido?",
          nivel: "intermediario",
          prioridade: 2,
        },
      ],
    },
    {
      chave: "interpretacao",
      titulo: "Interpretação",
      icone: "🧠",
      descricao: "O que o texto de fato afirma sobre esse assunto.",
      perguntas: [
        {
          texto: "O que o texto responde, e o que ele não responde?",
          prioridade: 1,
          ajuda: "Reconhecer o que o texto não trata evita forçar a barra.",
        },
        {
          texto: "Que diferença esse texto faz diante das respostas do mundo?",
          prioridade: 2,
        },
      ],
    },
    {
      chave: "cristo",
      titulo: "Cristo",
      icone: "✝️",
      descricao: "Onde o evangelho toca essa questão.",
      perguntas: [
        {
          texto: "O que a pessoa e a obra de Cristo mudam nesse problema?",
          prioridade: 1,
        },
      ],
    },
    {
      chave: "aplicacao",
      titulo: "Aplicação",
      icone: "❤️",
      descricao: "O que muda a partir de agora.",
      perguntas: [
        {
          texto: "O que você vai pensar ou fazer diferente por causa disso?",
          prioridade: 1,
        },
      ],
    },
    {
      chave: "desafio",
      titulo: "Desafio da semana",
      icone: "🚀",
      descricao: "Um compromisso pequeno, concreto e verificável até o próximo encontro.",
      perguntas: [
        {
          texto: "Qual o seu compromisso concreto para esta semana?",
          prioridade: 1,
          ajuda: "Pequeno e verificável vale mais do que grandioso e vago.",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Métodos ainda não implementados: aparecem na escolha, marcados como em breve.
// ---------------------------------------------------------------------------

/**
 * Método que monta as etapas a partir do que o líder escolheu, e não de uma
 * lista fixa. `etapas` fica vazio: quem constrói é `montarPorAssunto`.
 */
const dinamico = (
  id: MetodoId,
  nome: string,
  resumo: string,
  requer: Requisito[],
): MetodoTemplate => ({ id, nome, resumo, requer, etapas: [], disponivel: true });

const emBreve = (
  id: MetodoId,
  nome: string,
  resumo: string,
  requer: Requisito[],
): MetodoTemplate => ({ id, nome, resumo, requer, etapas: [], disponivel: false });

export const METODOS: MetodoTemplate[] = [
  INDUTIVO,
  PROBLEMA,
  dinamico(
    "tematico",
    "Estudo Temático",
    "Um tema, vários textos, cada um com o seu contexto. Serve para atravessar a Bíblia atrás de um assunto sem arrancar versículo do lugar.",
    ["tema"],
  ),
  dinamico(
    "livro",
    "Estudo de Livro",
    "Encontros sequenciais cobrindo um livro inteiro, com o panorama de autor, época e destinatários em cada um.",
    ["livro"],
  ),
  dinamico(
    "personagem",
    "Estudo de Personagem",
    "A trajetória de alguém pelos próprios textos, com virtudes e erros lado a lado. Ninguém vira herói nem vilão.",
    ["personagem"],
  ),
  dinamico(
    "comparacao",
    "Comparação de Personagens",
    "Dois personagens em circunstâncias parecidas e escolhas diferentes, sem ranking moral.",
    ["personagem"],
  ),
  dinamico(
    "doutrinario",
    "Estudo Doutrinário",
    "Uma doutrina com os textos, o que é consenso e onde cristãos divergem, com as leituras lado a lado.",
    ["doutrina"],
  ),
  dinamico(
    "debate",
    "Debate Bíblico",
    "Uma questão em aberto, cada posição com o seu melhor argumento e o seu texto mais difícil. Não é competição.",
    ["questao"],
  ),
  emBreve("perguntas", "Estudo por Perguntas", "O grupo traz as perguntas, o texto responde.", ["passagem"]),
  emBreve("pequenos-grupos", "Estudo em Pequenos Grupos", "Formato de célula, com equipes.", ["passagem"]),
  emBreve("personalizado", "Estudo Personalizado", "Você escreve as etapas e as perguntas.", []),
];

/** Métodos cujas etapas dependem do assunto escolhido pelo líder. */
export const METODOS_DINAMICOS: MetodoId[] = [
  "tematico",
  "livro",
  "personagem",
  "comparacao",
  "doutrinario",
  "debate",
];

export const ehDinamico = (id: string) => METODOS_DINAMICOS.includes(id as MetodoId);

export const metodoPorId = (id: string) => METODOS.find((m) => m.id === id);

export const PUBLICOS: { id: Publico; label: string }[] = [
  { id: "criancas", label: "Crianças" },
  { id: "adolescentes", label: "Adolescentes" },
  { id: "jovens", label: "Jovens" },
  { id: "adultos", label: "Adultos" },
  { id: "lideres", label: "Líderes" },
  { id: "misto", label: "Misto" },
];

export const NIVEIS: { id: Nivel; label: string; nota: string }[] = [
  { id: "iniciante", label: "Iniciante", nota: "Só o essencial, com os conceitos explicados." },
  { id: "intermediario", label: "Intermediário", nota: "Entra contexto histórico e literário." },
  { id: "avancado", label: "Avançado", nota: "Inclui idioma original, gênero e intertextualidade." },
];

export const DURACOES = [15, 30, 45, 60, 90];

/** Texto da pergunta já ajustado ao público escolhido. */
export function textoDaPergunta(pergunta: PerguntaTemplate, publico: Publico) {
  return pergunta.variantes?.[publico] ?? pergunta.texto;
}

export type { EtapaMontada, Assunto } from "./conteudo/tipos";

/**
 * Monta as etapas concretas de um estudo a partir do template.
 *
 * Duas regras, nesta ordem:
 *  1. corta o que está acima do nível escolhido;
 *  2. respeita o orçamento de perguntas da duração, servindo as etapas em
 *     rodadas, para nenhuma delas ficar vazia enquanto outra fica cheia.
 */
export function montarEtapas(
  metodo: MetodoTemplate,
  opcoes: { publico: Publico; nivel: Nivel; duracaoMin: number },
): EtapaMontada[] {
  const tetoNivel = NIVEL_PESO[opcoes.nivel];
  const orcamento =
    PERGUNTAS_POR_DURACAO.find((f) => opcoes.duracaoMin <= f.ate)?.total ?? 9;

  const elegiveis = metodo.etapas.map((etapa) =>
    (etapa.perguntas ?? [])
      .filter((p) => NIVEL_PESO[p.nivel ?? "iniciante"] <= tetoNivel)
      .sort((a, b) => a.prioridade - b.prioridade),
  );

  const escolhidas: PerguntaTemplate[][] = metodo.etapas.map(() => []);
  let restante = orcamento;
  let rodada = 0;

  // Distribui em rodadas: primeiro a pergunta mais importante de cada etapa,
  // depois a segunda, e assim por diante, até o tempo acabar.
  while (restante > 0) {
    let serviuAlguma = false;
    for (let i = 0; i < elegiveis.length && restante > 0; i++) {
      const candidata = elegiveis[i][rodada];
      if (!candidata) continue;
      escolhidas[i].push(candidata);
      restante--;
      serviuAlguma = true;
    }
    if (!serviuAlguma) break; // acabaram as perguntas antes do orçamento
    rodada++;
  }

  return metodo.etapas.map((etapa, i) => ({
    chave: etapa.chave,
    titulo: etapa.titulo,
    icone: etapa.icone,
    descricao: etapa.descricao,
    perguntas: escolhidas[i].map((p) => ({
      texto: textoDaPergunta(p, opcoes.publico),
      ajuda: p.ajuda,
    })),
  }));
}

/**
 * Monta as etapas de um método dinâmico a partir do assunto escolhido.
 *
 * Devolve `null` quando não existe curadoria para aquele assunto. Quem chama
 * trata esse `null` pedindo a geração para a IA, e é esse arranjo que sustenta
 * o modo híbrido: o revisado ganha sempre, e o gerado cobre o resto.
 */
export function montarPorAssunto(
  metodo: MetodoId,
  assunto: Assunto,
  livro?: BookMeta,
): EtapaMontada[] | null {
  switch (metodo) {
    case "tematico":
      return assunto.tipo === "tema" ? construirTematico(assunto.valor) : null;
    case "personagem":
      return assunto.tipo === "personagem" ? construirPersonagem(assunto.valor) : null;
    case "comparacao":
      return assunto.tipo === "comparacao"
        ? construirComparacao(assunto.a, assunto.b)
        : null;
    case "doutrinario":
      return assunto.tipo === "doutrina" ? construirDoutrinario(assunto.valor) : null;
    case "debate":
      return assunto.tipo === "questao" ? construirDebate(assunto.valor) : null;
    case "livro": {
      // Estudo de livro nunca cai na IA: a ficha dos 66 livros já cobre tudo.
      if (assunto.tipo !== "livro" || !livro) return null;
      const plano = planejarEncontros(livro, assunto.encontros);
      const encontro = plano[Math.min(assunto.indice ?? 1, plano.length) - 1] ?? plano[0];
      return montarEstudoDeLivro(livro, encontro);
    }
    default:
      return null;
  }
}

/** Quantas perguntas o estudo terá, para a prévia do assistente de criação. */
export function contarPerguntas(
  metodo: MetodoTemplate,
  opcoes: { publico: Publico; nivel: Nivel; duracaoMin: number },
) {
  return montarEtapas(metodo, opcoes).reduce((s, e) => s + e.perguntas.length, 0);
}
