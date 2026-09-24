"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { sb, supabaseConfigurado } from "./grupos/supabase";
import { garantirSessao, salvarPerfil } from "./grupos/api";
import { sincronizar } from "./sync";

/**
 * Conta do usuário.
 *
 * O app começa com sessão anônima, para ninguém ter que se cadastrar só para
 * ler a Bíblia. Quando a pessoa cria uma conta de verdade, nós VINCULAMOS o
 * e-mail à sessão anônima existente, em vez de criar um usuário novo: assim o
 * id continua o mesmo e marcações, notas e grupos vêm junto, sem migração.
 */

export type Conta = {
  usuario: User | null;
  /** true enquanto a sessão for anônima, ou seja, presa a este dispositivo. */
  anonimo: boolean;
  carregando: boolean;
};

export function useConta(): Conta {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!supabaseConfigurado) {
      setCarregando(false);
      return;
    }
    const c = sb();
    c.auth.getUser().then(({ data }) => {
      setUsuario(data.user ?? null);
      setCarregando(false);
    });
    const { data: sub } = c.auth.onAuthStateChange((_e, sessao) => {
      setUsuario(sessao?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return {
    usuario,
    anonimo: Boolean(usuario) && !usuario?.email,
    carregando,
  };
}

function traduzir(mensagem: string) {
  const m = mensagem.toLowerCase();
  if (m.includes("invalid login")) return "E-mail ou senha incorretos.";
  if (m.includes("already registered") || m.includes("already been registered")) {
    return "Esse e-mail já tem conta. Use a opção de entrar.";
  }
  if (m.includes("password") && m.includes("6")) {
    return "A senha precisa de pelo menos 6 caracteres.";
  }
  if (m.includes("email address") && m.includes("invalid")) return "E-mail inválido.";
  if (m.includes("rate limit")) return "Muitas tentativas. Espere um minuto.";
  return mensagem;
}

export type ResultadoConta = { ok: true; precisaConfirmar: boolean } | { ok: false; erro: string };

/** Transforma a sessão anônima atual numa conta com e-mail e senha. */
export async function criarConta(
  email: string,
  senha: string,
  nome: string,
): Promise<ResultadoConta> {
  try {
    await garantirSessao();
    const c = sb();

    const { data, error } = await c.auth.updateUser({ email, password: senha });
    if (error) return { ok: false, erro: traduzir(error.message) };

    if (nome.trim()) await salvarPerfil(nome.trim());
    await sincronizar();

    // Se o projeto exigir confirmação, o e-mail só vale depois do clique no link.
    return { ok: true, precisaConfirmar: !data.user?.email_confirmed_at };
  } catch (e) {
    return { ok: false, erro: e instanceof Error ? traduzir(e.message) : "Falhou." };
  }
}

/**
 * Entra com Google.
 *
 * Se já existe uma sessão anônima, usamos `linkIdentity` em vez de um login
 * novo: assim o id do usuário continua o mesmo e marcações, notas e grupos
 * criados antes do cadastro vêm junto. Se o projeto estiver com "manual
 * linking" desligado, caímos no login normal, que cria um usuário novo.
 */
export async function entrarComGoogle(destino?: string): Promise<ResultadoConta> {
  try {
    const c = sb();
    const proximo = destino ?? window.location.pathname;
    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(proximo)}`;
    const options = {
      redirectTo,
      // `consent` garante o refresh token e deixa a pessoa trocar de conta.
      queryParams: { prompt: "select_account" },
    };

    const { data } = await c.auth.getUser();
    if (data.user && !data.user.email) {
      const vinculo = await c.auth.linkIdentity({ provider: "google", options });
      if (!vinculo.error) return { ok: true, precisaConfirmar: false };
      console.warn("linkIdentity indisponível, usando login normal:", vinculo.error.message);
    }

    const { error } = await c.auth.signInWithOAuth({ provider: "google", options });
    if (error) return { ok: false, erro: traduzirGoogle(error.message) };
    return { ok: true, precisaConfirmar: false };
  } catch (e) {
    return { ok: false, erro: e instanceof Error ? traduzirGoogle(e.message) : "Falhou." };
  }
}

function traduzirGoogle(mensagem: string) {
  if (/provider is not enabled/i.test(mensagem)) {
    return "O login com Google não está ligado no Supabase. Ative em Authentication → Sign In / Providers → Google.";
  }
  return traduzir(mensagem);
}

/**
 * Depois de voltar do Google, garante que o perfil existe e pega o nome que o
 * provedor mandou, para a pessoa não ter que digitar de novo.
 *
 * `full_name`/`name` é o caminho comum, mas nem todo login do Google os
 * preenche — depende do consentimento dado e de como o Supabase normaliza os
 * dados naquele momento. `given_name`/`family_name` costumam sobreviver mesmo
 * quando os outros dois faltam. Só cai para o e-mail se restar mesmo nada,
 * e mesmo assim isso não é permanente: em Ajustes dá para trocar o nome.
 */
export async function garantirPerfilDoProvedor(): Promise<string | null> {
  const c = sb();
  const { data } = await c.auth.getUser();
  const usuario = data.user;
  if (!usuario) return null;

  const { data: existente } = await c
    .from("profiles")
    .select("nome")
    .eq("id", usuario.id)
    .maybeSingle();
  if (existente?.nome) return existente.nome;

  const meta = usuario.user_metadata ?? {};
  const nomeCompostoDoGoogle = [meta.given_name, meta.family_name]
    .filter((parte): parte is string => Boolean(parte && String(parte).trim()))
    .join(" ");
  const bruto =
    (meta.full_name as string) ||
    (meta.name as string) ||
    nomeCompostoDoGoogle ||
    usuario.email?.split("@")[0] ||
    "Participante";
  // O banco limita a 40 caracteres.
  const nome = bruto.trim().slice(0, 40);
  await salvarPerfil(nome);
  return nome;
}

export async function entrar(email: string, senha: string): Promise<ResultadoConta> {
  try {
    const c = sb();
    const { error } = await c.auth.signInWithPassword({ email, password: senha });
    if (error) return { ok: false, erro: traduzir(error.message) };
    await sincronizar();
    return { ok: true, precisaConfirmar: false };
  } catch (e) {
    return { ok: false, erro: e instanceof Error ? traduzir(e.message) : "Falhou." };
  }
}

/**
 * Sai da conta e volta para uma sessão anônima nova.
 *
 * Os dados locais não são apagados de propósito: já subiram para a conta, e
 * apagar o IndexedDB aqui seria destrutivo se a sincronização estivesse
 * atrasada. Quem quiser limpar tem o botão dedicado em Ajustes.
 */
export async function sair() {
  await sb().auth.signOut();
  await garantirSessao();
}

export async function recuperarSenha(email: string): Promise<ResultadoConta> {
  try {
    const { error } = await sb().auth.resetPasswordForEmail(email, {
      redirectTo: typeof window !== "undefined" ? `${window.location.origin}/ajustes` : undefined,
    });
    if (error) return { ok: false, erro: traduzir(error.message) };
    return { ok: true, precisaConfirmar: true };
  } catch (e) {
    return { ok: false, erro: e instanceof Error ? traduzir(e.message) : "Falhou." };
  }
}
