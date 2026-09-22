/**
 * Teste de ponta a ponta com dois usuários anônimos, direto contra o Supabase.
 *
 * Valida as RPCs, o RLS e o modelo de dados de Grupos e da conta: o que cada
 * papel pode e, principalmente, o que NÃO pode. Cria um grupo de teste e apaga
 * no fim.
 *
 * Rode com:  npm run teste
 * Exige `Allow anonymous sign-ins` ligado no painel do Supabase.
 */
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

// Lê as chaves do .env.local, para o teste não guardar credencial no código.
const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    }),
);

const URL_SB = env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!URL_SB || !KEY) {
  console.error("Faltam NEXT_PUBLIC_SUPABASE_URL / _ANON_KEY em .env.local");
  process.exit(1);
}

const novo = () =>
  createClient(URL_SB, KEY, { auth: { persistSession: false, autoRefreshToken: false } });

let falhas = 0;
const ok = (n, cond, extra = "") => {
  if (!cond) falhas++;
  console.log(`${cond ? "  ok " : "  XX "}${n}${extra ? "  → " + extra : ""}`);
};

async function main() {
  const lider = novo();
  const part = novo();

  console.log("\n# sessão anônima");
  const a = await lider.auth.signInAnonymously();
  ok("líder entra anônimo", !a.error, a.error?.message);
  if (a.error) return;
  const b = await part.auth.signInAnonymously();
  ok("participante entra anônimo", !b.error, b.error?.message);

  const idLider = a.data.user.id;
  const idPart = b.data.user.id;

  console.log("\n# perfis");
  const p1 = await lider.rpc("salvar_perfil", { p_nome: "Luis (líder)" });
  ok("salvar_perfil líder", !p1.error, p1.error?.message);
  const p2 = await part.rpc("salvar_perfil", { p_nome: "Ana" });
  ok("salvar_perfil participante", !p2.error, p2.error?.message);

  console.log("\n# grupo");
  const g = await lider.rpc("criar_grupo", {
    p_nome: "Célula de teste",
    p_descricao: "criado por script",
  });
  ok("criar_grupo", !g.error, g.error?.message);
  if (g.error) return;
  const grupo = g.data;
  console.log(`     código gerado: ${grupo.codigo}`);
  ok("código no formato PALAVRA-XXXX", /^[A-Z]+-[A-Z0-9]{4}$/.test(grupo.codigo), grupo.codigo);

  console.log("\n# RLS antes de entrar");
  const espiada = await part.from("grupos").select("*").eq("id", grupo.id);
  ok("participante NÃO vê o grupo antes de entrar", (espiada.data ?? []).length === 0);

  const prev = await part.rpc("previa_grupo", { p_codigo: grupo.codigo });
  const previa = prev.data?.[0];
  ok("prévia por código funciona", Boolean(previa), prev.error?.message);
  ok("prévia traz o líder", previa?.lider === "Luis (líder)", previa?.lider);
  ok("prévia diz que ainda não é membro", previa?.ja_sou_membro === false);

  console.log("\n# entrada");
  const e = await part.rpc("entrar_no_grupo", { p_codigo: grupo.codigo });
  ok("entrar_no_grupo", !e.error, e.error?.message);
  const depois = await part.from("grupos").select("*").eq("id", grupo.id);
  ok("participante vê o grupo depois de entrar", (depois.data ?? []).length === 1);

  const membros = await lider.from("membros").select("*, profiles(nome)").eq("grupo_id", grupo.id);
  ok("grupo tem 2 membros", (membros.data ?? []).length === 2, String(membros.data?.length));
  ok(
    "criador é líder",
    membros.data?.find((m) => m.perfil_id === idLider)?.papel === "lider",
  );

  console.log("\n# estudo");
  const est = await lider
    .from("estudos")
    .insert({
      grupo_id: grupo.id,
      metodo: "indutivo",
      titulo: "Tiago 3:1-12",
      referencia: { slug: "tg", nome: "Tiago", capitulo: 3 },
      publico: "jovens",
      nivel: "intermediario",
      duracao_min: 45,
      formato: "individual",
      criado_por: idLider,
    })
    .select()
    .single();
  ok("líder cria estudo", !est.error, est.error?.message);
  if (est.error) return;

  const tentativa = await part
    .from("estudos")
    .insert({
      grupo_id: grupo.id,
      metodo: "indutivo",
      titulo: "não deveria passar",
      publico: "jovens",
      nivel: "iniciante",
      duracao_min: 15,
      formato: "individual",
      criado_por: idPart,
    })
    .select();
  ok("participante NÃO cria estudo (RLS)", Boolean(tentativa.error), tentativa.error?.code);

  console.log("\n# etapas e perguntas");
  const etapas = await lider
    .from("etapas")
    .insert([
      { estudo_id: est.data.id, ordem: 0, chave: "leitura", titulo: "Leitura", icone: "📖", liberada: true },
      { estudo_id: est.data.id, ordem: 1, chave: "observacao", titulo: "Observação", icone: "🔎", liberada: false },
    ])
    .select();
  ok("cria etapas", !etapas.error, etapas.error?.message);

  const obs = etapas.data?.find((x) => x.ordem === 1);
  const perg = await lider
    .from("perguntas")
    .insert({ estudo_id: est.data.id, etapa_id: obs.id, ordem: 0, texto: "O que o texto diz?" })
    .select()
    .single();
  ok("cria pergunta", !perg.error, perg.error?.message);

  console.log("\n# resposta do participante");
  const resp = await part
    .from("respostas")
    .insert({ pergunta_id: perg.data.id, perfil_id: idPart, texto: "Fala sobre a língua." })
    .select()
    .single();
  ok("participante responde", !resp.error, resp.error?.message);

  const vistas = await lider.from("respostas").select("*").eq("pergunta_id", perg.data.id);
  ok("líder vê a resposta", (vistas.data ?? []).length === 1);

  const forjada = await part
    .from("respostas")
    .insert({ pergunta_id: perg.data.id, perfil_id: idLider, texto: "me passando por outro" })
    .select();
  ok("participante NÃO responde no lugar de outro (RLS)", Boolean(forjada.error), forjada.error?.code);

  console.log("\n# liberar etapa");
  const lib = await lider.from("etapas").update({ liberada: true }).eq("id", obs.id);
  ok("líder libera etapa", !lib.error, lib.error?.message);
  const libPart = await part.from("etapas").update({ liberada: false }).eq("id", obs.id);
  const conferir = await part.from("etapas").select("liberada").eq("id", obs.id).single();
  ok("participante NÃO altera etapa (RLS)", conferir.data?.liberada === true);

  console.log("\n# reflexão individual é privada");
  const refl = await part.from("reflexoes").insert({
    estudo_id: est.data.id,
    perfil_id: idPart,
    texto: "segredo meu",
    compartilhada: false,
  });
  ok("participante salva reflexão", !refl.error, refl.error?.message);
  const bisbilhota = await lider.from("reflexoes").select("*").eq("estudo_id", est.data.id);
  ok("líder NÃO vê reflexão privada", (bisbilhota.data ?? []).length === 0);

  await part.from("reflexoes").update({ compartilhada: true }).eq("estudo_id", est.data.id).eq("perfil_id", idPart);
  const agora = await lider.from("reflexoes").select("*").eq("estudo_id", est.data.id);
  ok("líder vê reflexão depois de compartilhada", (agora.data ?? []).length === 1);

  console.log("\n# dados pessoais da conta");
  const marca = await part.from("marcacoes").insert({
    perfil_id: idPart,
    ref: "tg.3.5",
    slug: "tg",
    capitulo: 3,
    versiculo: 5,
    cor: "amarelo",
    texto: "Assim também a língua...",
    versao: "ara",
  });
  ok("participante salva marcação", !marca.error, marca.error?.message);
  const minhas = await part.from("marcacoes").select("*");
  ok("vê a própria marcação", (minhas.data ?? []).length === 1);
  const alheias = await lider.from("marcacoes").select("*");
  ok("líder NÃO vê marcação alheia (RLS)", (alheias.data ?? []).length === 0);

  console.log("\n# limpeza");
  const del = await lider.from("grupos").delete().eq("id", grupo.id);
  ok("líder apaga o grupo (cascata)", !del.error, del.error?.message);
  await part.from("marcacoes").delete().eq("perfil_id", idPart);

  console.log(`\n${falhas === 0 ? "TODOS OS TESTES PASSARAM" : falhas + " FALHA(S)"}`);
  process.exit(falhas === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error("quebrou:", e);
  process.exit(1);
});
