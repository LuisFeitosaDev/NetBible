"use client";

/**
 * Leitura em dupla ou em grupo.
 *
 * O grupo É o plano: nasce junto com ele (`criar_grupo_de_leitura` grava a
 * configuração do plano dentro de `grupos.plano`) e morre junto. Quem entra
 * pelo código recebe o plano direto do grupo — mesma ordem, mesmo prazo, mesmo
 * dia 1 — e começa em 0%, com o próprio progresso.
 *
 * As regras:
 * - Um plano por pessoa, então um grupo de leitura por pessoa. Criar outro
 *   plano desfaz o vínculo com o grupo atual.
 * - Só o líder apaga o grupo, e com ele o plano de todo mundo.
 * - Quem entrou pelo código só sai. O plano fica com ele, agora sozinho.
 */
import { sb } from "./grupos/supabase";
import {
  entrarNoGrupo as entrarNoGrupoApi,
  excluirGrupo,
  garantirSessao,
  membrosDoGrupo,
  sairDoGrupo,
} from "./grupos/api";
import type { Grupo, Membro, PlanoDoGrupo } from "./grupos/tipos";
import {
  montarPlano,
  planoDeLinhaRemota,
  progressoDoPlano,
  roteiroDoPlano,
  type EscolhaDoPlano,
  type LinhaPlanoRemota,
  type PlanoSalvo,
  type ProgressoDoPlano,
} from "./planos";
import { db, getPref, salvarPlano } from "./db";
import { sincronizar } from "./sync";
import { publicarEvento } from "./grupoEventos";
import type { BibleIndex } from "./bible";

/** Olha a sessão sem criar uma: quem lê sozinho não ganha conta por abrir a Jornada. */
async function meuIdSemCriar(): Promise<string | null> {
  const { data } = await sb().auth.getSession();
  return data.session?.user?.id ?? null;
}

async function meusVinculos(id: string): Promise<{ grupoId: string; papel: string }[]> {
  const { data, error } = await sb()
    .from("membros")
    .select("grupo_id, papel, grupos!inner(tipo)")
    .eq("perfil_id", id)
    .eq("grupos.tipo", "leitura");
  if (error) throw error;
  return (data ?? []).map((l) => ({ grupoId: l.grupo_id as string, papel: l.papel as string }));
}

async function desfazer(grupoId: string, papel: string, id: string) {
  if (papel === "lider") await excluirGrupo(grupoId);
  else await sairDoGrupo(grupoId, id);
}

/** Sai do grupo — ou, sendo líder, apaga para todos. */
export async function desfazerVinculo(grupoId: string) {
  const id = await garantirSessao();
  const { data, error } = await sb()
    .from("membros")
    .select("papel")
    .eq("grupo_id", grupoId)
    .eq("perfil_id", id)
    .maybeSingle();
  if (error) throw error;
  if (data) await desfazer(grupoId, data.papel, id);
}

/**
 * Desfaz os vínculos com grupos de leitura, menos `exceto`. Também limpa as
 * sobras das versões antigas, em que dava para ficar em dois grupos sem plano.
 */
async function desfazerOutrosVinculos(exceto?: string) {
  const id = await meuIdSemCriar();
  if (!id) return;
  for (const v of await meusVinculos(id)) {
    if (v.grupoId !== exceto) await desfazer(v.grupoId, v.papel, id);
  }
}

/** Plano sozinho. Encerra o vínculo com o grupo atual, se houver. */
export async function criarPlanoSozinho(escolha: EscolhaDoPlano) {
  await desfazerOutrosVinculos();
  await salvarPlano(montarPlano(escolha));
  void sincronizar();
}

/** Cria o grupo já com o plano dentro, e o plano local passa a apontar para ele. */
export async function criarPlanoEmGrupo(escolha: EscolhaDoPlano): Promise<Grupo> {
  await garantirSessao();
  await desfazerOutrosVinculos();

  const plano = montarPlano(escolha);
  const planoDoGrupo: PlanoDoGrupo = {
    nome: plano.nome,
    ordem: plano.ordem,
    dias: plano.dias,
    livros: plano.livros,
    inicioEm: plano.inicioEm,
  };
  const { data, error } = await sb().rpc("criar_grupo_de_leitura", {
    p_nome: `Leitura: ${plano.nome}`.slice(0, 60),
    p_plano: planoDoGrupo,
  });
  if (error) {
    if (/criar_grupo_de_leitura/.test(error.message)) {
      throw new Error(
        "Falta atualizar o banco: rode supabase/schema-leitura-grupo-v2.sql no SQL Editor do Supabase.",
      );
    }
    throw new Error(error.message);
  }

  const grupo = data as Grupo;
  await salvarPlano({ ...plano, grupoId: grupo.id });
  // Sem esperar o agendamento: quem cria vai direto mandar o código, e o app
  // pode ir para segundo plano antes do timer disparar.
  await sincronizar();
  return grupo;
}

/** Grupos criados antes da v2 não têm o plano dentro: pega de algum membro. */
async function planoDeAlgumMembro(grupo: Grupo): Promise<PlanoDoGrupo | null> {
  const { data, error } = await sb().rpc("planos_do_grupo", { p_grupo_id: grupo.id });
  if (error || !data?.length) return null;
  const linhas = data as (LinhaPlanoRemota & { perfil_id: string })[];
  const linha = linhas.find((l) => l.perfil_id === grupo.lider_id) ?? linhas[0];
  const p = planoDeLinhaRemota(linha);
  return { nome: p.nome, ordem: p.ordem, dias: p.dias, livros: p.livros, inicioEm: p.inicioEm };
}

const mesmoPlano = (
  a: Pick<PlanoDoGrupo, "ordem" | "dias" | "livros">,
  b: Pick<PlanoSalvo, "ordem" | "dias" | "livros">,
) =>
  a.ordem === b.ordem &&
  a.dias === b.dias &&
  (a.livros ?? []).join(",") === (b.livros ?? []).join(",");

/**
 * Planos criados antes da v2 não guardavam a que grupo pertencem, e sem
 * `grupoId` o card do grupo não aparece. Religa o plano ao grupo de leitura
 * em que a pessoa está, se for o mesmo plano (mesma ordem, prazo e livros) que
 * o grupo ou alguém dele segue. Sendo líder de um grupo antigo sem plano
 * dentro, grava o plano no grupo para quem entrar depois.
 *
 * Nunca liga um plano solo a um grupo com outro plano: sem correspondência,
 * não faz nada.
 */
export async function religarPlanoAntigo(plano: PlanoSalvo): Promise<boolean> {
  if (plano.grupoId) return false;
  const id = await meuIdSemCriar();
  if (!id) return false;

  for (const v of await meusVinculos(id)) {
    const { data: grupo } = await sb().from("grupos").select("*").eq("id", v.grupoId).maybeSingle();
    if (!grupo) continue;

    let corresponde = grupo.plano ? mesmoPlano(grupo.plano, plano) : false;
    if (!grupo.plano) {
      const { data } = await sb().rpc("planos_do_grupo", { p_grupo_id: grupo.id });
      corresponde = ((data ?? []) as (LinhaPlanoRemota & { perfil_id: string })[]).some(
        (l) => l.perfil_id !== id && mesmoPlano(planoDeLinhaRemota(l), plano),
      );
    }
    if (!corresponde) continue;

    if (!grupo.plano && v.papel === "lider") {
      const planoDoGrupo: PlanoDoGrupo = {
        nome: plano.nome,
        ordem: plano.ordem,
        dias: plano.dias,
        livros: plano.livros,
        inicioEm: plano.inicioEm,
      };
      await sb().from("grupos").update({ plano: planoDoGrupo }).eq("id", grupo.id);
    }
    await salvarPlano({ ...plano, grupoId: grupo.id });
    return true;
  }
  return false;
}

export type ResultadoDeEntrada = { grupo: Grupo; adotouPlano: boolean };

/**
 * Entra num grupo pelo código e adota o plano dele: mesma ordem, mesmo prazo,
 * mesmo dia 1, para o "dia 15" significar a mesma leitura para todo mundo.
 * Começa em 0%, com o próprio progresso — o histórico da Bíblia não é tocado.
 */
export async function entrarNoGrupoComPlano(codigo: string): Promise<ResultadoDeEntrada> {
  await garantirSessao();
  const grupo = await entrarNoGrupoApi(codigo, "leitura");
  await desfazerOutrosVinculos(grupo.id);

  // Já é o plano deste grupo (digitou o próprio código): não zera nada.
  const local = await db.planos.get("atual");
  if (local?.grupoId === grupo.id) return { grupo, adotouPlano: true };

  const config = grupo.plano ?? (await planoDeAlgumMembro(grupo));
  if (!config) return { grupo, adotouPlano: false };

  await salvarPlano(montarPlano(config, { inicioEm: config.inicioEm, grupoId: grupo.id }));
  await sincronizar();
  void publicarEvento(grupo.id, "entrou").catch(() => {});
  return { grupo, adotouPlano: true };
}

export type GrupoDoPlano = { grupo: Grupo; souLider: boolean };

/**
 * O grupo do plano local.
 *
 * "encerrado" só quando há certeza de que ele não existe mais para mim — o
 * líder apagou. Sem sessão, sem rede ou com outra conta neste aparelho, a
 * resposta é `null` ("não sei"), e ninguém apaga plano nenhum por causa disso.
 */
export async function carregarGrupoDoPlano(
  grupoId: string,
): Promise<GrupoDoPlano | "encerrado" | null> {
  const id = await meuIdSemCriar();
  if (!id) return null;
  const dono = await getPref<string | null>("sync.perfilId", null);
  if (dono && dono !== id) return null;

  const { data, error } = await sb()
    .from("membros")
    .select("papel, grupos(*)")
    .eq("grupo_id", grupoId)
    .eq("perfil_id", id)
    .maybeSingle();
  if (error) throw error;
  if (!data) return "encerrado";
  return { grupo: data.grupos as unknown as Grupo, souLider: data.papel === "lider" };
}

export type ProgressoDoMembro = {
  perfilId: string;
  nome: string;
  souEu: boolean;
  lider: boolean;
  /** `null` quando a pessoa está no grupo mas o plano dela ainda não subiu. */
  plano: ProgressoDoPlano | null;
};

/**
 * O progresso de todo mundo no grupo, você sempre primeiro. O seu vem do
 * plano local (na hora, sem esperar sincronização); o dos outros, do banco.
 */
export async function progressoDoGrupo(
  grupo: Grupo,
  index: BibleIndex,
  meuPlano: PlanoSalvo,
): Promise<ProgressoDoMembro[]> {
  const id = await meuIdSemCriar();
  const [membros, rpc] = await Promise.all([
    membrosDoGrupo(grupo.id) as Promise<Membro[]>,
    sb().rpc("planos_do_grupo", { p_grupo_id: grupo.id }),
  ]);
  if (rpc.error) throw rpc.error;

  const planoPorPerfil = new Map(
    ((rpc.data ?? []) as (LinhaPlanoRemota & { perfil_id: string })[]).map((l) => [
      l.perfil_id,
      l,
    ]),
  );
  const roteiros = new Map<string, ReturnType<typeof roteiroDoPlano>>();
  const roteiroDe = (p: PlanoSalvo) => {
    const chave = `${p.ordem}:${(p.livros ?? []).join(",")}`;
    if (!roteiros.has(chave)) roteiros.set(chave, roteiroDoPlano(p, index));
    return roteiros.get(chave)!;
  };

  const lista = membros.map((m): ProgressoDoMembro => {
    const souEu = m.perfil_id === id;
    const linha = planoPorPerfil.get(m.perfil_id);
    const plano = souEu ? meuPlano : linha ? planoDeLinhaRemota(linha) : null;
    return {
      perfilId: m.perfil_id,
      nome: m.profiles?.nome ?? "Alguém",
      souEu,
      lider: m.papel === "lider",
      plano: plano ? progressoDoPlano(plano, roteiroDe(plano)) : null,
    };
  });

  return lista.sort((a, b) => {
    if (a.souEu !== b.souEu) return a.souEu ? -1 : 1;
    return (b.plano?.percentual ?? -1) - (a.plano?.percentual ?? -1);
  });
}
