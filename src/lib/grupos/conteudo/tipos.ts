/**
 * Material de apoio que uma etapa pode carregar.
 *
 * Os métodos fixos (indutivo, problema) só precisam de pergunta. Os que partem
 * de um assunto precisam levar junto o texto bíblico com o seu contexto, e às
 * vezes as leituras divergentes. Isso viaja dentro da etapa, para o runtime do
 * estudo não precisar saber se o conteúdo veio da curadoria ou da IA.
 */

export type TextoApoio = {
  /** Como se escreve: "Filipenses 4:6-7". */
  ref: string;
  slug: string;
  capitulo: number;
  /** "6-7" ou "6". Vazio significa o capítulo inteiro. */
  versiculos?: string;
  /**
   * O que cerca esse texto e por que ele fala do assunto.
   *
   * Campo obrigatório de propósito: é o que separa estudo temático de
   * versículo solto arrancado do contexto.
   */
  contexto: string;
};

/** Uma leitura cristã de um assunto em que há divergência honesta. */
export type Visao = {
  nome: string;
  resumo: string;
  /** Textos que essa leitura costuma usar. */
  textos: string[];
};

export type Material = {
  textos?: TextoApoio[];
  visoes?: Visao[];
  /** Avisos, ressalvas e notas de método. */
  notas?: string[];
};

/**
 * Etapa já concreta, pronta para virar linha no banco.
 *
 * Mora aqui, e não em `metodos.ts`, para os construtores de conteúdo poderem
 * usar o tipo sem criar import circular com o módulo que os importa.
 */
export type EtapaMontada = {
  chave: string;
  titulo: string;
  icone: string;
  descricao: string;
  perguntas: { texto: string; ajuda?: string }[];
  material?: Material;
};

/** O que o líder escolheu ou digitou, por método. */
export type Assunto =
  | { tipo: "tema"; valor: string }
  | { tipo: "livro"; slug: string; encontros: number; indice: number }
  | { tipo: "personagem"; valor: string }
  | { tipo: "comparacao"; a: string; b: string }
  | { tipo: "doutrina"; valor: string }
  | { tipo: "questao"; valor: string };

/** Normaliza para comparar o que o líder digitou com a curadoria. */
export const chave = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/**
 * Acha uma entrada curada pelo nome ou pelos sinônimos.
 * Casa por igualdade e, em seguida, por conter: "ansiedade" acha "ansiedade e
 * preocupação", e "medo do futuro" acha a entrada de ansiedade pelo sinônimo.
 */
export function buscarCurado<T extends { nome: string; sinonimos?: string[] }>(
  lista: T[],
  termo: string,
): T | null {
  const alvo = chave(termo);
  if (!alvo) return null;

  const todos = (item: T) => [item.nome, ...(item.sinonimos ?? [])].map(chave);

  return (
    lista.find((i) => todos(i).some((n) => n === alvo)) ??
    lista.find((i) => todos(i).some((n) => n.includes(alvo) || alvo.includes(n))) ??
    null
  );
}
