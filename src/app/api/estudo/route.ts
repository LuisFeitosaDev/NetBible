import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

/**
 * Geração de estudo por IA.
 *
 * Só é chamada quando não existe conteúdo curado para o que o líder pediu. Roda
 * no servidor porque a chave da Anthropic não pode chegar ao navegador.
 *
 * As regras teológicas da especificação viram instrução de sistema: separar
 * texto, contexto, interpretação e aplicação; não apresentar interpretação
 * controversa como consenso; e mostrar as divergências quando existirem.
 */

export const runtime = "nodejs";
export const maxDuration = 60;

const MODELO = "claude-opus-5";

const SISTEMA = `Você monta estudos bíblicos para grupos, em português do Brasil.

Regras inegociáveis:

1. Distinga sempre o que é TEXTO BÍBLICO, o que é CONTEXTO HISTÓRICO, o que é
   INTERPRETAÇÃO e o que é APLICAÇÃO. Nunca apresente os quatro como se fossem a
   mesma coisa.
2. Jamais use um versículo fora do seu contexto. Todo texto citado precisa vir
   com uma frase dizendo o que o cerca e por que ele trata do assunto.
3. Nunca apresente interpretação controversa como se fosse consenso. Quando
   cristãos leem de formas diferentes, apresente as leituras lado a lado, com os
   textos que cada uma usa, sem eleger vencedor.
4. Não invente referência bíblica. Se não tiver certeza de que um versículo diz
   o que você quer, não o use.
5. Se a Bíblia não trata diretamente do assunto pedido, diga isso numa nota e
   trabalhe por princípios, em vez de forçar um texto a dizer o que ele não diz.
6. As perguntas devem estimular investigação, não entregar a resposta. Prefira
   "Observe o versículo 5. Como isso muda a sua resposta?" a "A resposta é X".
7. Não reduza personagens bíblicos a herói ou vilão, e não crie ranking moral
   entre eles.

Escreva com linguagem direta e adulta, sem jargão de igreja e sem floreio.`;

/** O formato que o app sabe renderizar. */
const ESQUEMA = {
  type: "object",
  additionalProperties: false,
  required: ["etapas"],
  properties: {
    etapas: {
      type: "array",
      minItems: 5,
      maxItems: 9,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["chave", "titulo", "icone", "descricao", "perguntas"],
        properties: {
          chave: { type: "string", description: "identificador curto, sem espaços" },
          titulo: { type: "string" },
          icone: { type: "string", description: "um único emoji" },
          descricao: { type: "string", description: "o que o grupo faz nesta etapa" },
          perguntas: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["texto"],
              properties: {
                texto: { type: "string" },
                ajuda: { type: "string", description: "dica que não entrega a resposta" },
              },
            },
          },
          material: {
            type: "object",
            additionalProperties: false,
            properties: {
              textos: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["ref", "slug", "capitulo", "contexto"],
                  properties: {
                    ref: { type: "string", description: 'como se escreve, ex: "Filipenses 4:6-7"' },
                    slug: {
                      type: "string",
                      description:
                        'abreviação do livro usada pelo app: gn ex lv nm dt js jz rt 1sm 2sm 1rs 2rs 1cr 2cr ed ne et job sl pv ec ct is jr lm ez dn os jl am ob jn mq na hc sf ag zc ml mt mc lc jo at rm 1co 2co gl ef fp cl 1ts 2ts 1tm 2tm tt fm hb tg 1pe 2pe 1jo 2jo 3jo jd ap',
                    },
                    capitulo: { type: "integer", minimum: 1 },
                    versiculos: { type: "string", description: 'ex: "6-7" ou "6"' },
                    contexto: { type: "string" },
                  },
                },
              },
              visoes: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["nome", "resumo", "textos"],
                  properties: {
                    nome: { type: "string" },
                    resumo: { type: "string" },
                    textos: { type: "array", items: { type: "string" } },
                  },
                },
              },
              notas: { type: "array", items: { type: "string" } },
            },
          },
        },
      },
    },
  },
} as const;

type Pedido = {
  metodo?: string;
  assunto?: Record<string, unknown>;
  publico?: string;
  nivel?: string;
  duracaoMin?: number;
};

const INSTRUCAO: Record<string, (a: Record<string, unknown>) => string> = {
  tematico: (a) =>
    `Monte um ESTUDO TEMÁTICO sobre: "${a.valor}".
Organize os textos por categorias, cada categoria virando uma etapa. Apresente o
contexto de cada texto. Termine com discussão, aplicação e oração.`,
  personagem: (a) =>
    `Monte um ESTUDO DE PERSONAGEM sobre: "${a.valor}".
Cubra contexto, família, acontecimentos principais, decisões, virtudes, erros,
relacionamento com Deus, consequências e desenvolvimento. Virtudes e erros são
obrigatórios: não reduza a pessoa a herói nem a vilão.`,
  comparacao: (a) =>
    `Monte uma COMPARAÇÃO entre "${a.a}" e "${a.b}".
Considere contexto, decisões, respostas diante de Deus, erros, arrependimento e
consequências. Não crie ranking moral: o objetivo é enxergar escolhas diferentes
em circunstâncias parecidas.`,
  doutrinario: (a) =>
    `Monte um ESTUDO DOUTRINÁRIO sobre: "${a.valor}".
Apresente definição, textos principais com contexto, o que é consenso entre
cristãos e, numa etapa própria, as diferentes interpretações cristãs quando
houver, com os textos de cada uma. Não esconda divergência relevante.`,
  debate: (a) =>
    `Monte um DEBATE BÍBLICO sobre a questão: "${a.valor}".
Uma etapa por posição, cada uma com o melhor argumento dela E o texto que mais
lhe dá trabalho. Depois, uma etapa de investigação e uma de síntese. Não é
competição: ninguém precisa sair convencido.`,
};

export async function POST(req: Request) {
  const chave = process.env.ANTHROPIC_API_KEY;
  if (!chave) {
    return NextResponse.json(
      {
        erro:
          "Geração por IA não configurada. Escolha um item da lista sugerida, ou defina ANTHROPIC_API_KEY no servidor para liberar assuntos livres.",
      },
      { status: 503 },
    );
  }

  let pedido: Pedido;
  try {
    pedido = await req.json();
  } catch {
    return NextResponse.json({ erro: "Corpo inválido." }, { status: 400 });
  }

  const montar = pedido.metodo ? INSTRUCAO[pedido.metodo] : undefined;
  if (!montar || !pedido.assunto) {
    return NextResponse.json(
      { erro: "Método sem geração por IA disponível." },
      { status: 400 },
    );
  }

  const perguntas =
    (pedido.duracaoMin ?? 45) <= 15
      ? "3 a 4"
      : (pedido.duracaoMin ?? 45) <= 30
        ? "5 a 7"
        : (pedido.duracaoMin ?? 45) <= 60
          ? "8 a 12"
          : "13 a 18";

  const prompt = `${montar(pedido.assunto)}

Público: ${pedido.publico ?? "jovens"}.
Nível: ${pedido.nivel ?? "intermediario"}. No nível iniciante, explique os
conceitos; no avançado, trate gênero literário, contexto histórico e
intertextualidade.
Duração: ${pedido.duracaoMin ?? 45} minutos, o que dá cerca de ${perguntas} perguntas no total.

Entregue entre 5 e 8 etapas, terminando sempre com uma etapa de oração sem
perguntas. Etapas de leitura e oração têm a lista de perguntas vazia.`;

  try {
    const client = new Anthropic({ apiKey: chave });
    const resposta = await client.messages.create({
      model: MODELO,
      max_tokens: 16000,
      system: SISTEMA,
      thinking: { type: "adaptive" },
      output_config: {
        format: { type: "json_schema", schema: ESQUEMA },
      },
      messages: [{ role: "user", content: prompt }],
    });

    if (resposta.stop_reason === "refusal") {
      return NextResponse.json(
        { erro: "O pedido foi recusado. Tente reformular o assunto." },
        { status: 422 },
      );
    }

    const texto = resposta.content.find((b) => b.type === "text");
    if (!texto || texto.type !== "text") {
      return NextResponse.json({ erro: "A geração voltou vazia." }, { status: 502 });
    }

    // Com output_config o conteúdo já vem como JSON válido do esquema acima.
    return NextResponse.json(JSON.parse(texto.text));
  } catch (e) {
    if (e instanceof Anthropic.AuthenticationError) {
      return NextResponse.json({ erro: "Chave da Anthropic inválida." }, { status: 401 });
    }
    if (e instanceof Anthropic.RateLimitError) {
      return NextResponse.json(
        { erro: "Muitas gerações seguidas. Espere um minuto e tente de novo." },
        { status: 429 },
      );
    }
    if (e instanceof Anthropic.APIError) {
      console.error("anthropic", e.status, e.message);
      return NextResponse.json({ erro: "Falha ao gerar o estudo." }, { status: 502 });
    }
    console.error(e);
    return NextResponse.json({ erro: "Falha inesperada." }, { status: 500 });
  }
}
