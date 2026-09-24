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
  ordemIniciante,
  roteiroDeLivros,
  type CapituloDoPlano,
} from "./planos.ordem";

/**
 * "canonica"/"cronologica"/"iniciante" cobrem a Bíblia inteira e aceitam
 * qualquer prazo — são as três ordens do assistente "Do meu jeito".
 * "proverbios"/"evangelhos" são roteiros fixos, de um livro ou grupo só, com
 * nome e prazo já combinados: não fazem sentido com "em 3 anos", então não
 * entram no assistente, só nos cartões prontos de `PLANOS_FAMOSOS`.
 * "personalizado" é o roteiro que a própria pessoa monta — quais livros, em
 * que ordem — guardado em `PlanoSalvo.livros`, não numa função fixa como as
 * outras ordens.
 */
export type OrdemDoPlano =
  | "canonica"
  | "cronologica"
  | "iniciante"
  | "proverbios"
  | "evangelhos"
  | "personalizado";

/**
 * Uma ordem de leitura oferecida na criação.
 *
 * Eram cinco modelos prontos numa galeria rolável. Viraram três ordens mais um
 * prazo livre, porque "Cronológico em 1 ano" e "Cronológico em 2 anos" nunca
 * foram dois planos: são o mesmo plano com dois números.
 */
export type TipoDeOrdem = {
  id: OrdemDoPlano;
  nome: string;
  resumo: string;
};

export const ORDENS: TipoDeOrdem[] = [
  {
    id: "iniciante",
    nome: "Comece pelo mais fácil",
    resumo:
      "Livros curtos e histórias primeiro — João, Rute, Jonas, Gênesis. Levítico, Números e os profetas ficam para o fim.",
  },
  {
    id: "cronologica",
    nome: "Cronológico",
    resumo:
      "Na ordem em que os fatos aconteceram: Jó entre os patriarcas, os profetas dentro dos reis, as cartas dentro de Atos.",
  },
  {
    id: "canonica",
    nome: "Gênesis a Apocalipse",
    resumo:
      "A Bíblia na ordem dela mesma. Começa no primeiro versículo e termina no último, sem desvio.",
  },
];

/**
 * Planos famosos: um livro (ou grupo) e um prazo que já vêm juntos, do jeito
 * que a maioria conhece esse tipo de leitura. Um Provérbios de 3 anos não
 * seria a leitura de "um capítulo por dia" que dá nome à coisa, então esses
 * dois números não se separam — por isso ficam fora do assistente, em
 * cartões prontos.
 */
export type PlanoFamoso = {
  id: string;
  nome: string;
  resumo: string;
  ordem: OrdemDoPlano;
  dias: number;
};

export const PLANOS_FAMOSOS: PlanoFamoso[] = [
  {
    id: "proverbios-31",
    nome: "Provérbios em 31 dias",
    resumo:
      "Um capítulo por dia, o número do dia do mês bate com o capítulo. O jeito mais conhecido de ler o livro.",
    ordem: "proverbios",
    dias: 31,
  },
  {
    id: "evangelhos-30",
    nome: "Evangelhos em 30 dias",
    resumo: "Mateus, Marcos, Lucas e João, na ordem em que aparecem na Bíblia, em um mês.",
    ordem: "evangelhos",
    dias: 30,
  },
];

const LIVROS_DO_ROTEIRO: Partial<Record<OrdemDoPlano, string[]>> = {
  proverbios: ["pv"],
  evangelhos: ["mt", "mc", "lc", "jo"],
};

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
  /**
   * A que dia do plano a atribuição abaixo se refere.
   *
   * Existe para a lista de hoje ficar parada enquanto o dia dura. Sem guardar
   * isso, a lista seria sempre "os próximos N não lidos" e se mexeria a cada
   * capítulo marcado, virando uma esteira que nunca termina.
   */
  diaAtribuido?: number;
  /** Os capítulos separados para esse dia, como "gn.1". */
  atribuicao?: string[];
  /** Só para `ordem: "personalizado"`: os livros escolhidos, na ordem de leitura. */
  livros?: string[];
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
  escolha: { nome: string; ordem: OrdemDoPlano; dias: number; livros?: string[] },
  lidosAoComecar = 0,
  inicioEm = inicioDoDia(),
): PlanoSalvo {
  return {
    id: "atual",
    modelo: escolha.ordem,
    nome: escolha.nome,
    ordem: escolha.ordem,
    dias: escolha.dias,
    inicioEm,
    lidosAoComecar,
    livros: escolha.livros,
    criadoEm: Date.now(),
    atualizadoEm: Date.now(),
  };
}

/**
 * Uma linha da tabela `planos` do Supabase, do jeito que a API devolve —
 * `snake_case`, datas em texto. Usada tanto por `sync.ts` (baixar o próprio
 * plano) quanto por `leituraGrupo.ts` (ler o plano de outro membro do grupo).
 */
export type LinhaPlanoRemota = {
  modelo: string;
  nome: string;
  ordem: string;
  dias: number;
  inicio_em: string;
  lidos_ao_comecar: number | null;
  livros: string[] | null;
  criado_em: string;
  atualizado_em: string;
};

export function planoDeLinhaRemota(linha: LinhaPlanoRemota): PlanoSalvo {
  return {
    id: "atual",
    modelo: linha.modelo,
    nome: linha.nome,
    ordem: linha.ordem as OrdemDoPlano,
    dias: linha.dias,
    inicioEm: new Date(linha.inicio_em).getTime(),
    lidosAoComecar: linha.lidos_ao_comecar ?? 0,
    livros: linha.livros ?? undefined,
    criadoEm: new Date(linha.criado_em).getTime(),
    atualizadoEm: new Date(linha.atualizado_em).getTime(),
  };
}

export function roteiroDoPlano(
  plano: Pick<PlanoSalvo, "ordem"> & { livros?: string[] },
  index: BibleIndex,
): CapituloDoPlano[] {
  if (plano.ordem === "personalizado") return roteiroDeLivros(index, plano.livros ?? []);
  const livros = LIVROS_DO_ROTEIRO[plano.ordem];
  if (livros) return roteiroDeLivros(index, livros);
  if (plano.ordem === "cronologica") return ordemCronologica(index);
  if (plano.ordem === "iniciante") return ordemIniciante(index);
  return ordemCanonica(index);
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
  /** Já descontados os capítulos que estavam lidos antes do plano nascer. */
  total: number;
  /** Idem: só o que foi lido DEPOIS que o plano começou. */
  lidos: number;
  /** Sem desconto — a marca real de quanto do roteiro já foi lido, sempre. */
  lidosBrutos: number;
  /** Capítulos do roteiro que faltam, em qualquer ponto dele. */
  faltam: number;
  /** Dias de plano que ainda restam, contando hoje. Nunca menos que 1. */
  diasRestantes: number;
  /** Quantos por dia daqui em diante para terminar no prazo. Recalculado. */
  ritmoNecessario: number;
  /** O ritmo com que o plano nasceu, para comparar. */
  ritmoOriginal: number;
  /** A leitura separada para hoje, já considerando o que ficou para trás. */
  hoje: CapituloDoPlano[];
  /** Quantos de `hoje` já estão lidos. */
  hojeFeitos: number;
  /** A atribuição guardada não é a de hoje: quem chama precisa gravar a nova. */
  precisaAtribuir: boolean;
  /** Chaves da atribuição de hoje, prontas para gravar. */
  atribuicaoDeHoje: string[];
  concluido: boolean;
  /** O prazo venceu e ainda falta leitura. */
  vencido: boolean;
  /** A data prometida pelo plano. Sempre existe. */
  terminaPrevisto: number;
  /**
   * Projeção pelo ritmo real desde que o plano começou. `null` enquanto não há
   * dias nem leitura suficientes para a conta significar alguma coisa.
   */
  terminaNoRitmo: number | null;
};

const chaveDe = (c: CapituloDoPlano) => `${c.slug}.${c.capitulo}`;

/**
 * Junta plano, roteiro e o que já foi lido numa única visão para a tela.
 *
 * O ponto central: a cota de hoje não é uma fatia fixa do calendário, é o que
 * falta dividido pelos dias que sobram. Quem pula um dia não fica com um bloco
 * órfão no passado e um "você está atrasado" permanente; o atraso se dilui nos
 * dias seguintes e a conta se refaz sozinha. Quem se adianta vê a cota encolher.
 *
 * `lido` é uma função e não um Set pronto porque a tabela `reading` guarda os
 * capítulos por livro; quem chama já tem esse mapa montado e não precisa
 * espalhar 1189 chaves na memória.
 */
export function progressoDoPlano(
  plano: PlanoSalvo,
  roteiro: CapituloDoPlano[],
  lido: (slug: string, capitulo: number) => boolean,
): ProgressoDoPlano {
  const total = roteiro.length;
  const dia = diaDeHoje(plano);
  const diaVisivel = Math.min(Math.max(dia, 1), plano.dias);

  const restantes: CapituloDoPlano[] = [];
  for (const c of roteiro) if (!lido(c.slug, c.capitulo)) restantes.push(c);
  const lidosBrutos = total - restantes.length;

  /*
   * O que já estava lido quando o plano nasceu não conta na porcentagem: um
   * plano recém-criado começa em 0%, não com crédito por capítulos lidos antes
   * de existir. `restantes`, `ritmoNecessario`, `hoje` e `concluido` continuam
   * usando a contagem bruta acima — esses precisam saber o que falta ler DE
   * VERDADE, e reler um capítulo que já foi lido não deveria entrar na cota
   * de ninguém.
   */
  const credito = Math.min(plano.lidosAoComecar ?? 0, total);
  const totalExibido = total - credito;
  const lidos = Math.max(0, lidosBrutos - credito);

  const diasRestantes = Math.max(1, plano.dias - diaVisivel + 1);
  const ritmoNecessario = Math.max(1, Math.ceil(restantes.length / diasRestantes));
  const ritmoOriginal = total / plano.dias;

  /*
   * A atribuição do dia fica gravada. Se ela fosse recalculada a cada pintura,
   * marcar o primeiro capítulo faria os outros pularem para frente e a lista
   * nunca esvaziaria: sempre "os próximos N não lidos". Gravada, ela é a mesma
   * do começo ao fim do dia, e os itens vão sendo riscados.
   */
  const precisaAtribuir = plano.diaAtribuido !== dia || !plano.atribuicao;
  const naOrdem = new Map(roteiro.map((c) => [chaveDe(c), c]));

  const hoje = precisaAtribuir
    ? restantes.slice(0, ritmoNecessario)
    : (plano.atribuicao ?? [])
        .map((k) => naOrdem.get(k))
        .filter((c): c is CapituloDoPlano => Boolean(c));

  const hojeFeitos = hoje.filter((c) => lido(c.slug, c.capitulo)).length;

  /*
   * A projeção só usa o que foi lido depois que o plano começou, e só aparece
   * depois de alguns dias. Com um ou dois dias de amostra ela oscila de 2027
   * para 2035 a cada capítulo, o que não informa nada e ainda assusta.
   * `lidos` já é só o que veio depois do crédito inicial, então é isso mesmo
   * que a projeção precisa.
   */
  const decorridos = Math.max(dia, 1);
  const porDia = lidos / decorridos;
  const projecao =
    decorridos >= 3 && porDia > 0 && restantes.length > 0
      ? inicioDoDia() + Math.ceil(restantes.length / porDia) * DIA
      : null;

  /*
   * Projeção absurda não é informação, é desânimo. Quem leu 2 capítulos em 60
   * dias recebe "termina em 2125", que é aritmeticamente correto e não ajuda
   * ninguém a abrir a Bíblia hoje. Passando de um prazo inteiro além do
   * combinado, a tela mostra só o ritmo necessário, que é acionável.
   */
  const terminaPrevisto = dataDeTermino(plano.dias, plano.inicioEm);
  const terminaNoRitmo =
    projecao && projecao <= terminaPrevisto + plano.dias * DIA ? projecao : null;

  return {
    dia,
    diaVisivel,
    dias: plano.dias,
    total: totalExibido,
    lidos,
    lidosBrutos,
    faltam: restantes.length,
    diasRestantes,
    ritmoNecessario,
    ritmoOriginal,
    hoje,
    hojeFeitos,
    precisaAtribuir,
    atribuicaoDeHoje: hoje.map(chaveDe),
    concluido: restantes.length === 0,
    vencido: dia > plano.dias && restantes.length > 0,
    terminaPrevisto,
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
