"use client";

/**
 * Parceria de leitura: duas contas ligadas por um código, cada uma vendo o
 * progresso da outra.
 *
 * Reaproveita a mesma conta de Grupos (`garantirSessao`, `meuPerfil`) em vez
 * de inventar um segundo sistema de login — quem já tem nome salvo em Grupos
 * já pode entrar numa dupla sem digitar nada de novo. O que muda é só a
 * tabela: `parcerias_leitura`, criada em `supabase/schema-parceria.sql`.
 */
import { sb } from "./grupos/supabase";
import { garantirSessao, meuPerfil } from "./grupos/api";
import type { Perfil } from "./grupos/tipos";
import {
  progressoDoPlano,
  roteiroDoPlano,
  type OrdemDoPlano,
  type PlanoSalvo,
} from "./planos";
import type { BibleIndex } from "./bible";

export type Parceria = {
  parceiroId: string | null;
  parceiroNome: string | null;
  codigo: string | null;
  codigoExpiraEm: string | null;
};

function traduzir(e: unknown): Error {
  const msg = e instanceof Error ? e.message : String(e);
  const mapa: Record<string, string> = {
    ja_pareado: "Você já está em dupla. Desfaça a parceria atual antes de gerar um código novo.",
    codigo_invalido: "Esse código não existe. Confira se digitou certo.",
    codigo_proprio: "Esse é o seu próprio código — peça para a outra pessoa digitar o dela.",
    codigo_expirado: "Esse código venceu. Peça um novo para quem convidou.",
    codigo_ja_usado: "Esse código já foi usado por outra pessoa.",
    voce_ja_pareado: "Você já está em dupla com alguém. Desfaça essa parceria antes de entrar em outra.",
    "sem sessão": "Sem conexão com a conta. Tente de novo em um instante.",
  };
  return new Error(mapa[msg.trim()] ?? msg);
}

/** A própria parceria, com o nome do parceiro já resolvido. `null` peças soltas. */
export async function minhaParceria(): Promise<Parceria | null> {
  await garantirSessao();
  const { data, error } = await sb()
    .from("parcerias_leitura")
    .select("parceiro_id, codigo, codigo_expira_em")
    .maybeSingle();
  if (error) throw traduzir(error);
  if (!data) return { parceiroId: null, parceiroNome: null, codigo: null, codigoExpiraEm: null };

  let parceiroNome: string | null = null;
  if (data.parceiro_id) {
    const { data: perfil } = await sb()
      .from("profiles")
      .select("nome")
      .eq("id", data.parceiro_id)
      .maybeSingle();
    parceiroNome = perfil?.nome ?? null;
  }

  return {
    parceiroId: data.parceiro_id,
    parceiroNome,
    codigo: data.codigo,
    codigoExpiraEm: data.codigo_expira_em,
  };
}

export async function gerarCodigoDeParceria(): Promise<string> {
  await garantirSessao();
  const { data, error } = await sb().rpc("gerar_codigo_parceria");
  if (error) throw traduzir(error);
  return data as string;
}

/** Devolve o id de quem convidou, já ligado a você dos dois lados. */
export async function entrarComCodigoDeParceria(codigo: string): Promise<string> {
  await garantirSessao();
  const { data, error } = await sb().rpc("entrar_com_codigo_parceria", {
    p_codigo: codigo.trim(),
  });
  if (error) throw traduzir(error);
  return data as string;
}

export async function desfazerParceria(): Promise<void> {
  await garantirSessao();
  const { error } = await sb().rpc("desfazer_parceria_leitura");
  if (error) throw traduzir(error);
}

/** Seu próprio nome, para o parceiro reconhecer quem é quem no comparativo. */
export async function meuPerfilDeParceria(): Promise<Perfil | null> {
  return meuPerfil();
}

export type ProgressoDoParceiro = {
  nome: string;
  temPlano: boolean;
  plano?: {
    nome: string;
    ordem: OrdemDoPlano;
    dias: number;
    diaVisivel: number;
    lidos: number;
    total: number;
    percentual: number;
    concluido: boolean;
  };
  /** Lido fora de qualquer plano também conta: nem todo mundo usa plano. */
  capitulosLidos: number;
};

/**
 * Busca o progresso do parceiro. As duas tabelas (`leitura` e `planos`) já
 * liberam a leitura via RLS quando a parceria existe; se não existir, o
 * Supabase devolve linhas vazias em vez de erro, e a função aqui simplesmente
 * não acha nada — não precisa checar a parceria duas vezes.
 */
export async function progressoDoParceiro(
  parceiroId: string,
  parceiroNome: string,
  index: BibleIndex,
): Promise<ProgressoDoParceiro> {
  const c = sb();
  const [{ data: leituras }, { data: planoRemoto }] = await Promise.all([
    c.from("leitura").select("slug, concluidos").eq("perfil_id", parceiroId),
    c.from("planos").select("*").eq("perfil_id", parceiroId).maybeSingle(),
  ]);

  const capitulosLidos = (leituras ?? []).reduce(
    (soma, r) => soma + (r.concluidos?.length ?? 0),
    0,
  );

  if (!planoRemoto) {
    return { nome: parceiroNome, temPlano: false, capitulosLidos };
  }

  const plano: PlanoSalvo = {
    id: "atual",
    modelo: planoRemoto.modelo,
    nome: planoRemoto.nome,
    ordem: planoRemoto.ordem as OrdemDoPlano,
    dias: planoRemoto.dias,
    inicioEm: new Date(planoRemoto.inicio_em).getTime(),
    lidosAoComecar: planoRemoto.lidos_ao_comecar ?? 0,
    criadoEm: new Date(planoRemoto.criado_em).getTime(),
    atualizadoEm: new Date(planoRemoto.atualizado_em).getTime(),
  };

  const lidoPorLivro = new Map(
    (leituras ?? []).map((r) => [r.slug, new Set(r.concluidos ?? [])]),
  );
  const roteiro = roteiroDoPlano(plano, index);
  const p = progressoDoPlano(plano, roteiro, (slug, cap) => lidoPorLivro.get(slug)?.has(cap) ?? false);

  return {
    nome: parceiroNome,
    temPlano: true,
    capitulosLidos,
    plano: {
      nome: plano.nome,
      ordem: plano.ordem,
      dias: plano.dias,
      diaVisivel: p.diaVisivel,
      lidos: p.lidos,
      total: p.total,
      percentual: Math.round((p.lidos / p.total) * 100),
      concluido: p.concluido,
    },
  };
}
