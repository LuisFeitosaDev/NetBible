"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Sem as chaves, a aba Grupos mostra a tela de configuração em vez de quebrar.
 * O resto do app (leitura, marcações, notas) continua funcionando offline.
 */
export const supabaseConfigurado = Boolean(url && anonKey);

let cliente: SupabaseClient | null = null;

export function sb(): SupabaseClient {
  if (!supabaseConfigurado) {
    throw new Error(
      "Supabase não configurado. Preencha NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY em .env.local",
    );
  }
  cliente ??= createClient(url!, anonKey!, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
  return cliente;
}
