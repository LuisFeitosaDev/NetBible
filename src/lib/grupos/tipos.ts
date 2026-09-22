import type { MetodoId, Nivel, Publico } from "./metodos";

export type Perfil = { id: string; nome: string; criado_em: string };

export type Grupo = {
  id: string;
  codigo: string;
  nome: string;
  descricao: string | null;
  lider_id: string;
  criado_em: string;
};

export type Papel = "lider" | "participante";

export type Membro = {
  grupo_id: string;
  perfil_id: string;
  papel: Papel;
  entrou_em: string;
  profiles?: Perfil;
};

export type Referencia = {
  slug: string;
  nome: string;
  capitulo: number;
  versiculoInicio?: number | null;
  versiculoFim?: number | null;
};

export type StatusEstudo = "rascunho" | "ativo" | "encerrado";
export type Formato = "individual" | "duplas" | "equipes";

export type Estudo = {
  id: string;
  grupo_id: string;
  metodo: MetodoId;
  titulo: string;
  referencia: Referencia | null;
  tema: string | null;
  publico: Publico;
  nivel: Nivel;
  duracao_min: number;
  formato: Formato;
  etapa_atual: number;
  status: StatusEstudo;
  criado_por: string;
  iniciado_em: string | null;
  encerrado_em: string | null;
  criado_em: string;
};

export type Etapa = {
  id: string;
  estudo_id: string;
  ordem: number;
  chave: string;
  titulo: string;
  icone: string | null;
  descricao: string | null;
  liberada: boolean;
  liberada_em: string | null;
};

export type Equipe = { id: string; estudo_id: string; nome: string; cor: string };

export type Pergunta = {
  id: string;
  estudo_id: string;
  etapa_id: string;
  ordem: number;
  texto: string;
  ajuda: string | null;
  equipe_id: string | null;
};

export type Resposta = {
  id: string;
  pergunta_id: string;
  perfil_id: string;
  equipe_id: string | null;
  texto: string;
  criado_em: string;
  atualizado_em: string;
};

export type Reacao = { resposta_id: string; perfil_id: string; tipo: string };

export type Reflexao = {
  estudo_id: string;
  perfil_id: string;
  texto: string;
  compartilhada: boolean;
  atualizado_em: string;
};

export type Resumo = {
  estudo_id: string;
  texto: string;
  destaques: { rotulo: string; valor: string }[] | null;
  criado_em: string;
};

/** Retorno da RPC `previa_grupo`, usada na tela de entrar por código. */
export type PreviaGrupo = {
  id: string;
  nome: string;
  descricao: string | null;
  lider: string;
  participantes: number;
  estudo_titulo: string | null;
  estudo_status: StatusEstudo | null;
  ja_sou_membro: boolean;
};
