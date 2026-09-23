/**
 * Planos de leitura.
 *
 * A ideia é que o plano some do caminho. Ele não guarda uma lista própria de
 * "capítulos lidos": o progresso sai da tabela `reading`, a mesma que o leitor
 * já alimenta quando alguém chega ao fim de um capítulo. Quem lê, avança, sem
 * precisar voltar aqui para confirmar nada.
 *
 * Consequência boa disso: trocar de plano não perde nada, e um capítulo lido
 * antes de começar o plano já entra contado.
 */

import type { BibleIndex } from "./bible";
import {
  ordemCanonica,
  ordemCronologica,
  type CapituloDoPlano,
} from "./planos.ordem";

export type OrdemDoPlano = "canonica" | "cronologica";

export type ModeloDePlano = {
  id: string;
  nome: string;
  /** Uma linha, o suficiente para escolher sem abrir nada. */
  resumo: string;
  ordem: OrdemDoPlano;
  dias: number;
};

export const MODELOS: ModeloDePlano[] = [
  {
    id: "cronologico-1a",
    nome: "Cronológico em 1 ano",
    resumo: "Na ordem em que os fatos aconteceram: Jó entre os patriarcas, os profetas dentro dos reis, as cartas dentro de Atos.",
    ordem: "cronologica",
    dias: 365,
  },
  {
    id: "cronologico-2a",
    nome: "Cronológico em 2 anos",
    resumo: "A mesma ordem histórica, com metade do peso por dia. Sobra tempo para parar e pensar.",
    ordem: "cronologica",
    dias: 730,
  },
  {
    id: "canonico-6m",
    nome: "Gênesis a Apocalipse em 6 meses",
    resumo: "A Bíblia na ordem dela mesma, em ritmo forte. Para quem quer a visão do todo rápido.",
    ordem: "canonica",
    dias: 182,
  },
  {
    id: "canonico-1a",
    nome: "Gênesis a Apocalipse em 1 ano",
    resumo: "O clássico. Começa no primeiro versículo e termina no último, sem desvio.",
    ordem: "canonica",
    dias: 365,
  },
  {
    id: "canonico-2a",
    nome: "Gênesis a Apocalipse em 2 anos",
    resumo: "Da capa à contracapa, devagar. Um ou dois capítulos por dia, quase sempre.",
    ordem: "canonica",
    dias: 730,
  },
];

export const modeloPorId = (id: string) => MODELOS.find((m) => m.id === id);

/** O que fica guardado. Um plano por vez, de propósito. */
export type PlanoSalvo = {
  id: "atual";
  /** Id do modelo, ou "personalizado". */
  modelo: string;
  nome: string;
  ordem: OrdemDoPlano;
  dias: number;
  /** Meia-noite local do dia 1. */
  inicioEm: number;
  /**
   * Quantos capítulos do roteiro já estavam lidos quando o plano começou.
   *
   * Sem esse ponto de partida, a previsão de término divide tudo que a pessoa
   * já leu na vida pelos dias de plano: quem começa tendo lido 298 capítulos vê
   * "no seu ritmo, termina em 3 dias". Ausente nos planos criados antes disto.
   */
  lidosAoComecar?: number;
  criadoEm: number;
  atualizadoEm?: number;
};

const DIA = 86_400_000;

/** Meia-noite local de uma data, que é a unidade em que um plano conta dias. */
export function inicioDoDia(quando: number | Date = Date.now()) {
  const d = new Date(quando);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

export function montarPlano(
  modelo: ModeloDePlano | { nome: string; ordem: OrdemDoPlano; dias: number },
  lidosAoComecar = 0,
  inicioEm = inicioDoDia(),
): PlanoSalvo {
  const id = "id" in modelo ? modelo.id : "personalizado";
  return {
    id: "atual",
    modelo: id,
    nome: modelo.nome,
    ordem: modelo.ordem,
    dias: modelo.dias,
    inicioEm,
    lidosAoComecar,
    criadoEm: Date.now(),
    atualizadoEm: Date.now(),
  };
}

export function roteiroDoPlano(
  plano: Pick<PlanoSalvo, "ordem">,
  index: BibleIndex,
): CapituloDoPlano[] {
  return plano.ordem === "cronologica"
    ? ordemCronologica(index)
    : ordemCanonica(index);
}

/**
 * Onde cada dia começa e termina dentro do roteiro.
 *
 * Divide por proporção em vez de por arredondamento fixo: com 1189 capítulos em
 * 365 dias, um `Math.ceil(1189/365) = 4` por dia terminaria a leitura no dia
 * 298 e deixaria 67 dias vazios no fim. Assim os capítulos extras se espalham.
 */
export function faixaDoDia(dia: number, total: number, dias: number) {
  const d = Math.min(Math.max(dia, 1), dias);
  return {
    de: Math.floor(((d - 1) * total) / dias),
    ate: Math.floor((d * total) / dias),
  };
}

export function capitulosDoDia(
  dia: number,
  roteiro: CapituloDoPlano[],
  dias: number,
): CapituloDoPlano[] {
  const { de, ate } = faixaDoDia(dia, roteiro.length, dias);
  return roteiro.slice(de, ate);
}

/** Em que dia do plano estamos hoje. Passa de `dias` quando o prazo venceu. */
export function diaDeHoje(plano: Pick<PlanoSalvo, "inicioEm">) {
  return Math.floor((inicioDoDia() - plano.inicioEm) / DIA) + 1;
}

export type ProgressoDoPlano = {
  /** Dia do calendário, sem limite superior. */
  dia: number;
  /** O mesmo, preso ao tamanho do plano, que é o que a tela mostra. */
  diaVisivel: number;
  dias: number;
  total: number;
  lidos: number;
  /**
   * Quantos capítulos separam do calendário, contados só até o fim de ontem.
   * Zero enquanto o dia de hoje ainda está de pé.
   */
  atrasado: number;
  /** Quantos capítulos além da leitura de hoje. Zero se não passou dela. */
  adiantado: number;
  hoje: CapituloDoPlano[];
  /** De dias anteriores, ainda não lidos. No máximo os mais recentes. */
  pendentes: CapituloDoPlano[];
  concluido: boolean;
  /** A data prometida pelo plano. Sempre existe. */
  terminaPrevisto: number;
  /**
   * Projeção pelo ritmo real desde que o plano começou. `null` enquanto não há
   * dias nem leitura suficientes para a conta significar alguma coisa.
   */
  terminaNoRitmo: number | null;
};

/**
 * Junta plano, roteiro e o que já foi lido numa única visão para a tela.
 *
 * `lido` é uma função e não um Set pronto porque a tabela `reading` guarda os
 * capítulos por livro; quem chama já tem esse mapa montado e não precisa
 * espalhar 1189 chaves na memória.
 */
export function progressoDoPlano(
  plano: PlanoSalvo,
  roteiro: CapituloDoPlano[],
  lido: (slug: string, capitulo: number) => boolean,
  limitePendentes = 30,
): ProgressoDoPlano {
  const total = roteiro.length;
  const dia = diaDeHoje(plano);
  const diaVisivel = Math.min(Math.max(dia, 1), plano.dias);

  let lidos = 0;
  for (const c of roteiro) if (lido(c.slug, c.capitulo)) lidos++;

  /*
   * Os dois lados da conta usam marcos diferentes, de propósito.
   *
   * Cobrar até o fim de hoje faria o plano abrir no dia 1 dizendo "faltam 3
   * capítulos", antes de a pessoa ter tido o dia para ler. E creditar vantagem
   * já no fim de ontem faria quem leu exatamente a cota de hoje ser saudado
   * como adiantado, o que não é verdade. Então: atraso conta até ontem,
   * vantagem só a partir de amanhã, e no meio está "em dia".
   */
  const { de: ateOntem, ate: ateHoje } = faixaDoDia(diaVisivel, total, plano.dias);
  const atrasado = Math.max(0, ateOntem - lidos);
  const adiantado = Math.max(0, lidos - ateHoje);
  const hoje = capitulosDoDia(diaVisivel, roteiro, plano.dias);

  // Atrasados, do mais antigo para o mais novo, cortando no limite para a tela
  // não virar uma lista de centenas de itens em cima de quem sumiu um mês.
  const pendentes: CapituloDoPlano[] = [];
  for (let i = 0; i < ateOntem; i++) {
    const c = roteiro[i];
    if (!lido(c.slug, c.capitulo)) pendentes.push(c);
  }

  /*
   * A projeção só usa o que foi lido depois que o plano começou, e só aparece
   * depois de alguns dias. Com um ou dois dias de amostra ela oscila de 2027
   * para 2035 a cada capítulo, o que não informa nada e ainda assusta.
   */
  const decorridos = Math.max(dia, 1);
  const noPlano = lidos - (plano.lidosAoComecar ?? 0);
  const porDia = noPlano / decorridos;
  const terminaNoRitmo =
    decorridos >= 3 && porDia > 0 && lidos < total
      ? inicioDoDia() + Math.ceil((total - lidos) / porDia) * DIA
      : null;

  return {
    dia,
    diaVisivel,
    dias: plano.dias,
    total,
    lidos,
    atrasado,
    adiantado,
    hoje,
    pendentes: pendentes.slice(-limitePendentes),
    concluido: lidos >= total,
    terminaPrevisto: dataDeTermino(plano.dias, plano.inicioEm),
    terminaNoRitmo,
  };
}

/** "3 capítulos por dia", para o cartão de escolha. */
export function ritmoDoModelo(dias: number, total = 1189) {
  const porDia = total / dias;
  if (porDia < 1.2) return "cerca de 1 capítulo por dia";
  return `cerca de ${Math.round(porDia)} capítulos por dia`;
}

export function dataDeTermino(dias: number, inicioEm = inicioDoDia()) {
  return inicioEm + (dias - 1) * DIA;
}

export const formatarData = (ms: number) =>
  new Date(ms).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

export const formatarDataCurta = (ms: number) =>
  new Date(ms).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
