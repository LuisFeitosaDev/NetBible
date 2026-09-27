/**
 * Planos de leitura.
 *
 * O plano guarda o PRÓPRIO progresso (`lidosNoPlano`), separado do histórico
 * da Bíblia (`reading`). Assim um plano novo sempre começa em 0%, mesmo que a
 * pessoa já tenha lido aqueles capítulos um dia — e o histórico nunca precisa
 * ser apagado para isso. Marcar um capítulo como lido durante o plano grava
 * nos dois lugares.
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
  /** Legado: o crédito de capítulos lidos antes do plano. Não é mais usado. */
  lidosAoComecar?: number;
  /**
   * Capítulos lidos DENTRO deste plano, como "rm.1". Ausente só em planos
   * criados antes desta versão, que ganham uma semente na primeira abertura.
   */
  lidosNoPlano?: string[];
  /** Dias do plano em que a meta foi batida, para a sequência. */
  diasCumpridos?: number[];
  /**
   * O que já estava lido quando a pessoa tocou em "recomeçar a contagem": fica
   * fora da divisão dos dias, para o prazo novo cobrir só o que falta.
   */
  reinicioLidos?: string[];
  /** Grupo de leitura a que este plano pertence. Ausente quando se lê sozinho. */
  grupoId?: string;
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

export type EscolhaDoPlano = {
  nome: string;
  ordem: OrdemDoPlano;
  dias: number;
  livros?: string[];
};

/** Plano novo: sempre em 0%, com `lidosNoPlano` vazio. */
export function montarPlano(
  escolha: EscolhaDoPlano,
  opcoes: { inicioEm?: number; grupoId?: string } = {},
): PlanoSalvo {
  return {
    id: "atual",
    modelo: escolha.ordem,
    nome: escolha.nome,
    ordem: escolha.ordem,
    dias: escolha.dias,
    inicioEm: opcoes.inicioEm ?? inicioDoDia(),
    lidosAoComecar: 0,
    lidosNoPlano: [],
    diasCumpridos: [],
    livros: escolha.livros,
    grupoId: opcoes.grupoId,
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
  grupo_id?: string | null;
  lidos_no_plano?: string[] | null;
  dia_atribuido?: number | null;
  atribuicao?: string[] | null;
  dias_cumpridos?: number[] | null;
  reinicio_lidos?: string[] | null;
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
    grupoId: linha.grupo_id ?? undefined,
    lidosNoPlano: linha.lidos_no_plano ?? [],
    diaAtribuido: linha.dia_atribuido ?? undefined,
    atribuicao: linha.atribuicao ?? undefined,
    diasCumpridos: linha.dias_cumpridos ?? [],
    reinicioLidos: linha.reinicio_lidos ?? undefined,
    criadoEm: new Date(linha.criado_em).getTime(),
    atualizadoEm: new Date(linha.atualizado_em).getTime(),
  };
}

export const chaveDoCapitulo = (slug: string, capitulo: number) => `${slug}.${capitulo}`;

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

export type CapituloDeHoje = CapituloDoPlano & {
  /** Veio de um dia que passou sem ser lido, redistribuído para hoje. */
  atrasado: boolean;
};

export type ProgressoDoPlano = {
  /** Dia do calendário, sem limite superior. */
  dia: number;
  /** O mesmo, preso ao tamanho do plano, que é o que a tela mostra. */
  diaVisivel: number;
  dias: number;
  total: number;
  /** Só o que foi lido DENTRO do plano. Um plano novo começa em 0. */
  lidos: number;
  percentual: number;
  /** Capítulos do roteiro que faltam, em qualquer ponto dele. */
  faltam: number;
  /** Capítulos de dias que já passaram e ainda não foram lidos. */
  atrasados: number;
  /** Quanto do atraso entra em cada dia daqui para frente. */
  extraPorDia: number;
  /** A cota "normal" de um dia, sem atraso. */
  ritmoBase: number;
  /** A leitura separada para hoje: a do dia mais a parte do atraso. */
  hoje: CapituloDeHoje[];
  /** Quantos de `hoje` já estão lidos. */
  hojeFeitos: number;
  /** Tudo de hoje lido (ou nada separado para hoje). */
  metaCumprida: boolean;
  /** Dias seguidos batendo a meta, contando hoje se já foi batida. */
  sequencia: number;
  /** Os últimos 7 dias do plano, para a faixa da semana. */
  semana: { dia: number; estado: "cumprido" | "perdido" | "hoje" | "livre" }[];
  /** A atribuição guardada não é a de hoje: quem chama precisa gravar a nova. */
  precisaAtribuir: boolean;
  /** Chaves da atribuição de hoje, prontas para gravar. */
  atribuicaoDeHoje: string[];
  concluido: boolean;
  /** O prazo venceu e ainda falta leitura. */
  vencido: boolean;
  /** A data prometida pelo plano. Sempre existe. */
  terminaPrevisto: number;
  /** Chaves lidas no plano, para a tela marcar cada linha. */
  lidosNoPlano: Set<string>;
};

const chaveDe = (c: CapituloDoPlano) => chaveDoCapitulo(c.slug, c.capitulo);

/**
 * Junta plano e roteiro numa única visão para a tela.
 *
 * Cada dia tem a sua fatia fixa do roteiro. O que fica para trás NÃO vai todo
 * para amanhã: espalha um a mais por dia nos dias seguintes. Deixou 2 de
 * hoje? Amanhã e depois ficam com a cota + 1 cada. Deixou esses também? O
 * atraso cresce e continua indo um a mais por dia; só quando ele passa do
 * número de dias que restam é que a cota sobe para + 2, + 3, e assim vai.
 *
 * A lista de hoje fica gravada (`atribuicao`) quando o dia vira: se fosse
 * recalculada a cada toque, marcar um atrasado puxaria o próximo para a lista
 * e ela nunca esvaziaria.
 */
export function progressoDoPlano(
  plano: PlanoSalvo,
  roteiro: CapituloDoPlano[],
): ProgressoDoPlano {
  const total = roteiro.length;
  const dias = plano.dias;
  const dia = diaDeHoje(plano);
  const diaVisivel = Math.min(Math.max(dia, 1), dias);

  const lidosNoPlano = new Set(plano.lidosNoPlano ?? []);
  const lido = (c: CapituloDoPlano) => lidosNoPlano.has(chaveDe(c));

  let lidos = 0;
  for (const c of roteiro) if (lido(c)) lidos++;
  const faltam = total - lidos;

  // A divisão dos dias. Depois de "recomeçar a contagem", o que já estava lido
  // sai da divisão e o prazo novo cobre só o que falta.
  const foraDaDivisao = new Set(plano.reinicioLidos ?? []);
  const divisao = foraDaDivisao.size
    ? roteiro.filter((c) => !foraDaDivisao.has(chaveDe(c)))
    : roteiro;
  const inicioDoDiaN = (d: number) => Math.floor(((d - 1) * divisao.length) / dias);
  const doDia = (d: number) =>
    d >= 1 && d <= dias ? divisao.slice(inicioDoDiaN(d), inicioDoDiaN(d + 1)) : [];

  const diaCorte = Math.min(Math.max(dia, 1), dias + 1);
  const atrasadosLista = divisao.slice(0, inicioDoDiaN(diaCorte)).filter((c) => !lido(c));
  const diasRestantes = dia <= dias ? dias - Math.max(dia, 1) + 1 : 1;
  const extraPorDia = !atrasadosLista.length
    ? 0
    : dia > dias
      ? atrasadosLista.length
      : Math.max(1, Math.ceil(atrasadosLista.length / diasRestantes));

  // Posição de cada capítulo na divisão: antes do começo da fatia de hoje é
  // atraso; depois do fim dela, é de um dia que ainda não chegou.
  const posicaoNaDivisao = new Map(divisao.map((c, i) => [chaveDe(c), i]));
  const posicao = (c: CapituloDoPlano) => posicaoNaDivisao.get(chaveDe(c)) ?? 0;
  const comecoDeHoje = dia > dias ? divisao.length : inicioDoDiaN(Math.max(dia, 1));
  const fimDeHoje = dia > dias ? divisao.length : inicioDoDiaN(Math.max(dia, 1) + 1);

  /*
   * A cota de hoje é a fatia do dia mais a parte do atraso; o QUE entra nela
   * segue a ordem do roteiro. Atrasou Romanos 1 e 2 com cota de 3? Hoje é
   * 1, 2 e 3 — nunca 1, 3 e 4, pulando o 2. Os capítulos são os próximos não
   * lidos de tudo que já devia estar lido até o fim de hoje.
   *
   * Quem está em dia ou adiantado vê a fatia de hoje, lida ou não: sem isso a
   * lista de quem leu adiantado viria vazia e a meta nunca contaria.
   */
  const fatiaDeHoje = doDia(dia);
  const cota = fatiaDeHoje.length + extraPorDia;
  const pendentes = divisao.slice(0, fimDeHoje).filter((c) => !lido(c));
  const escolhidos = pendentes.length ? pendentes.slice(0, cota) : fatiaDeHoje;
  const calculado: CapituloDeHoje[] = escolhidos.map((c) => ({
    ...c,
    atrasado: posicao(c) < comecoDeHoje,
  }));

  /*
   * A lista gravada só vale se ainda seguir essa regra: nada de dia futuro
   * (a regra antiga pegava "os próximos não lidos" da Bíblia toda) e nenhum
   * buraco — um capítulo não lido entre dois da lista significa que ela foi
   * montada fora de ordem, e é refeita.
   */
  const gravados = (plano.atribuicao ?? []).map((k) => posicaoNaDivisao.get(k));
  const semDiaFuturo = gravados.every((i) => i !== undefined && i < fimDeHoje);
  const semBuraco = (() => {
    if (!semDiaFuturo || gravados.length < 2) return semDiaFuturo;
    const naLista = new Set(plano.atribuicao);
    const de = Math.min(...(gravados as number[]));
    const ate = Math.max(...(gravados as number[]));
    return divisao
      .slice(de, ate + 1)
      .every((c) => naLista.has(chaveDe(c)) || lido(c));
  })();
  const listaGravadaValida = semDiaFuturo && semBuraco;

  const precisaAtribuir =
    plano.diaAtribuido !== dia || !plano.atribuicao || !listaGravadaValida;
  const naOrdem = new Map(roteiro.map((c) => [chaveDe(c), c]));

  const hoje: CapituloDeHoje[] = precisaAtribuir
    ? calculado
    : (plano.atribuicao ?? [])
        .map((k) => naOrdem.get(k))
        .filter((c): c is CapituloDoPlano => Boolean(c))
        .map((c) => ({ ...c, atrasado: posicao(c) < comecoDeHoje }));

  const hojeFeitos = hoje.filter(lido).length;
  const concluido = total > 0 && faltam === 0;
  const metaCumprida = hoje.length > 0 && hojeFeitos === hoje.length && dia >= 1 && dia <= dias;

  // Sequência: dias seguidos com a meta batida. Dia sem nada separado (plano
  // esparso) não quebra nem soma.
  const registrados = new Set(plano.diasCumpridos ?? []);
  if (metaCumprida) registrados.add(dia);
  // Dia passado conta como cumprido também quando todos os capítulos dele
  // estão lidos no plano: cobre os dias de antes do registro existir, e quem
  // leu tudo de um dia um pouco depois não fica com a bolinha apagada.
  const cumprido = (d: number) =>
    registrados.has(d) || (d < dia && doDia(d).length > 0 && doDia(d).every(lido));

  let sequencia = 0;
  for (let d = metaCumprida ? dia : dia - 1; d >= 1; d--) {
    if (cumprido(d)) sequencia++;
    else if (doDia(d).length === 0) continue;
    else break;
  }

  const semana: ProgressoDoPlano["semana"] = [];
  for (let d = Math.max(1, diaVisivel - 6); d <= diaVisivel; d++) {
    semana.push({
      dia: d,
      estado: cumprido(d)
        ? "cumprido"
        : d === dia
          ? "hoje"
          : doDia(d).length === 0
            ? "livre"
            : "perdido",
    });
  }

  return {
    dia,
    diaVisivel,
    dias,
    total,
    lidos,
    percentual: total ? Math.round((lidos / total) * 100) : 0,
    faltam,
    atrasados: atrasadosLista.length,
    extraPorDia,
    ritmoBase: Math.max(1, Math.round(divisao.length / dias)),
    hoje,
    hojeFeitos,
    metaCumprida,
    sequencia,
    semana,
    precisaAtribuir,
    atribuicaoDeHoje: hoje.map(chaveDe),
    concluido,
    vencido: dia > dias && faltam > 0,
    terminaPrevisto: dataDeTermino(dias, plano.inicioEm),
    lidosNoPlano,
  };
}

/**
 * Planos criados antes de existir `lidosNoPlano` ganham uma semente única: o
 * que já estava marcado como lido nos dias que o plano já percorreu. Leituras
 * antigas de capítulos lá da frente do roteiro ficam de fora — eram leituras
 * de antes do plano, não do plano.
 */
export function sementeDeLidos(
  plano: PlanoSalvo,
  roteiro: CapituloDoPlano[],
  lidoNaBiblia: (slug: string, capitulo: number) => boolean,
): string[] {
  const dia = Math.min(Math.max(diaDeHoje(plano), 1), plano.dias);
  const ate = Math.floor((dia * roteiro.length) / plano.dias);
  return roteiro
    .slice(0, ate)
    .filter((c) => lidoNaBiblia(c.slug, c.capitulo))
    .map(chaveDe);
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
