"use client";

import { useEffect } from "react";
import { iniciarSync } from "@/lib/sync";
import { sb, supabaseConfigurado } from "@/lib/grupos/supabase";

/**
 * Liga a sincronização com a conta assim que o app abre. Sem Supabase
 * configurado ou sem sessão, não faz nada e o app segue puramente local.
 */
export function Boot() {
  useEffect(() => {
    iniciarSync();
    void preencherFotoDoGoogle();
  }, []);
  return null;
}

/**
 * Preenche a foto do perfil para quem já tinha entrado com o Google antes
 * dessa funcionalidade existir — sem isto, a pessoa ficaria com o avatar de
 * letra colorida para sempre, porque a foto só é salva no momento do login.
 * Só grava se já existir um perfil (nunca cria um do nada) e só se ainda não
 * tiver foto, então roda de verdade uma única vez por pessoa.
 */
async function preencherFotoDoGoogle() {
  if (!supabaseConfigurado) return;
  const c = sb();
  const { data } = await c.auth.getUser();
  const usuario = data.user;
  if (!usuario?.email) return; // sessão anônima: sem conta de verdade, nada a fazer

  const meta = usuario.user_metadata ?? {};
  const foto = (meta.avatar_url as string) || (meta.picture as string) || null;
  if (!foto) return;

  const { data: perfil } = await c
    .from("profiles")
    .select("avatar_url")
    .eq("id", usuario.id)
    .maybeSingle();
  if (!perfil || perfil.avatar_url) return;

  try {
    await c.rpc("definir_avatar_url", { p_avatar_url: foto });
  } catch {
    /* sem foto, sem problema */
  }
}
