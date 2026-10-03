/**
 * Devocionais: séries curtas, um dia por vez, cada uma com um tema.
 *
 * O texto bíblico NÃO mora aqui: cada dia guarda só a referência, e a página
 * carrega os versículos da tradução que a pessoa escolheu. Assim não existe
 * citação copiada à mão que possa sair diferente da Bíblia do próprio app.
 *
 * O conteúdo (reflexões, perguntas, orações) fica nos arquivos
 * `devocionais.*.ts`, um por bloco. O progresso é só do aparelho, em `prefs`
 * (ver `chaveDoProgresso`).
 */
import { DEVOCIONAIS as SERIES_CURTAS } from "./devocionais.dados";
import { TEMAS } from "./devocionais.temas";
import { PROVERBIOS_31 } from "./devocionais.proverbios";
import { TRINTA_DIAS } from "./devocionais.30dias";
import { MAIS } from "./devocionais.mais";
import { PERSONAGENS, RELACOES } from "./devocionais.personagens";

export type Leitura = {
  slug: string;
  capitulo: number;
  de: number;
  /** Último versículo, inclusive. Sem ele, é um versículo só. */
  ate?: number;
};

export type DiaDevocional = {
  titulo: string;
  leitura: Leitura;
  /** Parágrafos da reflexão. */
  reflexao: string[];
  /** Uma pergunta para pensar, não para responder certo. */
  pergunta: string;
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
export const DEVOCIONAIS: Devocional[] = [
  TRINTA_DIAS,
  PROVERBIOS_31,
  ...SERIES_CURTAS,
  ...TEMAS,
  ...MAIS,
  ...PERSONAGENS,
  ...RELACOES,
];

export const devocionalPorId = (id: string) => DEVOCIONAIS.find((d) => d.id === id);

/** "Filipenses 4:6-7", com o nome do livro vindo do índice da Bíblia. */
export function referencia(l: Leitura, nomeDoLivro: string) {
  const versos = l.ate && l.ate !== l.de ? `${l.de}-${l.ate}` : `${l.de}`;
  return `${nomeDoLivro} ${l.capitulo}:${versos}`;
}

/* ------------------------------------------------------------ progresso -- */

export type ProgressoDevocional = {
  /** Dias concluídos, começando em 1. */
  feitos: number[];
  /** Última vez que a pessoa mexeu, para o "continue de onde parou". */
  atualizadoEm: number;
};

export const chaveDoProgresso = (id: string) => `devocional:${id}`;

/** O próximo dia a fazer: o primeiro não concluído, ou o último se acabou. */
export function proximoDia(d: Devocional, p?: ProgressoDevocional | null) {
  const feitos = new Set(p?.feitos ?? []);
  for (let i = 1; i <= d.dias.length; i++) if (!feitos.has(i)) return i;
  return d.dias.length;
}

export const concluido = (d: Devocional, p?: ProgressoDevocional | null) =>
  (p?.feitos.length ?? 0) >= d.dias.length;

/** O destaque do dia quando a pessoa ainda não começou nada: gira por data. */
export function destaqueDoDia(data = new Date()) {
  const dia = Math.floor(
    Date.UTC(data.getFullYear(), data.getMonth(), data.getDate()) / 86_400_000,
  );
  return DEVOCIONAIS[dia % DEVOCIONAIS.length];
}
