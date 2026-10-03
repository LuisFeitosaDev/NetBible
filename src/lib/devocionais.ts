/**
 * Devocionais: séries curtas, um dia por vez, cada uma com um tema.
 *
 * Cada dia é um roteiro de uns 15 minutos: aquietar, ler, refletir, meditar,
 * orar em cinco movimentos e encerrar. O texto bíblico NÃO mora aqui: cada
 * dia guarda só a referência, e a página carrega os versículos da tradução
 * que a pessoa escolheu.
 *
 * O conteúdo é escrito à mão nos arquivos `devocionais.*.ts`, um por bloco,
 * mas o app NÃO os importa: passa de um megabyte de texto, e as páginas são
 * componentes de cliente. `scripts/build-devocionais.mjs` (rodado pelo
 * `prebuild`) gera deles um índice leve, `devocionais.indice.generated.ts`,
 * com capas, títulos e leituras, e um JSON por série em
 * `public/devocionais/`, que só baixa quando alguém abre um dia. É o mesmo
 * desenho das fichas de capítulo (`capitulos.ts`).
 *
 * As citações das reflexões são escritas na ARA e trocadas, na hora de
 * mostrar, pela mesma frase na tradução escolhida (ver `citacoesNaVersao`).
 */
import { SERIES } from "./devocionais.indice.generated";

export type Leitura = {
  slug: string;
  capitulo: number;
  de: number;
  /** Último versículo, inclusive. Sem ele, é um versículo só. */
  ate?: number;
};

/** Os cinco movimentos da oração guiada, cada um com um convite ligado ao texto do dia. */
export type GuiaDeOracao = {
  adorar: string;
  confessar: string;
  agradecer: string;
  pedir: string;
  interceder: string;
};

export type DiaDevocional = {
  titulo: string;
  leitura: Leitura;
  /** O versículo da leitura que resume o dia ("Para levar hoje"). */
  chave?: number;
  /** Parágrafos da reflexão. */
  reflexao: string[];
  /** Uma pergunta para pensar, não para responder certo. */
  pergunta: string;
  guia?: GuiaDeOracao;
  /** A oração final, para rezar em voz alta. */
  oracao: string;
  /** Um passo pequeno e concreto para o dia. */
  pratica: string;
};

export type CategoriaId =
  | "jornada"
  | "coracao"
  | "vida-com-deus"
  | "jesus"
  | "personagens"
  | "relacoes"
  | "carater";

/** Uma série como é escrita, com o texto de todos os dias. */
export type Devocional = {
  id: string;
  titulo: string;
  /** Uma linha, para os cards. */
  chamada: string;
  /** Um parágrafo, para a página da série. */
  descricao: string;
  categoria: CategoriaId;
  /** Gravura de capítulo usada como capa (mesma arte do leitor). */
  capa: { slug: string; capitulo: number; foco?: string };
  /** Tom que tinge a gravura sépia, para cada série ter a sua cor. */
  cor: string;
  /** Selo opcional no card ("Para a Páscoa"). */
  selo?: string;
  dias: DiaDevocional[];
};

/** Uma série como o app carrega de cara: sem o texto de cada dia. */
export type Serie = Omit<Devocional, "dias"> & {
  dias: Pick<DiaDevocional, "titulo" | "leitura">[];
};

/**
 * A mesma frase em cada tradução em português, pela citação escrita na ARA.
 * KJV e WEB ficam de fora: a reflexão é em português, e uma citação em
 * inglês no meio dela leria pior do que a ARA.
 */
export type Citacoes = Record<string, Partial<Record<"nvi" | "acf" | "blivre", string>>>;

/** O que `public/devocionais/<id>.json` traz. */
export type ConteudoDaSerie = { dias: DiaDevocional[]; citacoes: Citacoes };

export const CATEGORIAS: { id: CategoriaId; titulo: string; subtitulo: string }[] = [
  { id: "jornada", titulo: "Jornadas de um mês", subtitulo: "Um dia por vez, até virar hábito" },
  { id: "coracao", titulo: "Para o coração", subtitulo: "Ansiedade, medo, dor e esperança" },
  { id: "vida-com-deus", titulo: "Vida com Deus", subtitulo: "Oração, graça e gratidão" },
  { id: "jesus", titulo: "Caminhando com Jesus", subtitulo: "Do Natal à ressurreição" },
  { id: "personagens", titulo: "Gente da Bíblia", subtitulo: "Histórias de fé, queda e recomeço" },
  { id: "relacoes", titulo: "Família e amizades", subtitulo: "Amar quem está perto" },
  { id: "carater", titulo: "Caráter e sabedoria", subtitulo: "O que Deus forma em nós" },
];

/** Todos, na ordem em que aparecem nas prateleiras de cada categoria. */
export const DEVOCIONAIS: Serie[] = SERIES;

export const devocionalPorId = (id: string) => DEVOCIONAIS.find((d) => d.id === id);

/** "Filipenses 4:6-7", com o nome do livro vindo do índice da Bíblia. */
export function referencia(l: Leitura, nomeDoLivro: string) {
  const versos = l.ate && l.ate !== l.de ? `${l.de}-${l.ate}` : `${l.de}`;
  return `${nomeDoLivro} ${l.capitulo}:${versos}`;
}

/**
 * Troca cada citação da ARA (entre aspas retas, no texto-fonte) pela mesma
 * frase na tradução escolhida, e as aspas retas pelas curvas.
 *
 * Sem a frase naquela tradução, a citação fica na ARA: é melhor uma redação
 * diferente da leitura do que uma frase inventada.
 */
export function citacoesNaVersao(texto: string, versao: string, citacoes: Citacoes) {
  return texto.replace(/"([^"]*)"/g, (_, citacao: string) => {
    const trocada =
      versao === "nvi" || versao === "acf" || versao === "blivre"
        ? citacoes[citacao]?.[versao]
        : undefined;
    return `“${trocada ?? citacao}”`;
  });
}

/* ------------------------------------------------------------ progresso -- */

export type ProgressoDevocional = {
  /** Dias concluídos, começando em 1. */
  feitos: number[];
  /** O que a pessoa escreveu no "Meditar", por dia. */
  anotacoes?: Record<string, string>;
  /** Última vez que a pessoa mexeu: o "continue de onde parou" e o desempate da sincronização. */
  atualizadoEm: number;
};

export const PREFIXO_DO_PROGRESSO = "devocional:";
export const chaveDoProgresso = (id: string) => `${PREFIXO_DO_PROGRESSO}${id}`;

/** O próximo dia a fazer: o primeiro não concluído, ou o último se acabou. */
export function proximoDia(d: Serie, p?: ProgressoDevocional | null) {
  const feitos = new Set(p?.feitos ?? []);
  for (let i = 1; i <= d.dias.length; i++) if (!feitos.has(i)) return i;
  return d.dias.length;
}

export const concluido = (d: Serie, p?: ProgressoDevocional | null) =>
  (p?.feitos.length ?? 0) >= d.dias.length;

/** O destaque do dia quando a pessoa ainda não começou nada: gira por data. */
export function destaqueDoDia(data = new Date()) {
  const dia = Math.floor(
    Date.UTC(data.getFullYear(), data.getMonth(), data.getDate()) / 86_400_000,
  );
  return DEVOCIONAIS[dia % DEVOCIONAIS.length];
}
