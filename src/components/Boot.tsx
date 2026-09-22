"use client";

import { useEffect } from "react";
import { iniciarSync } from "@/lib/sync";

/**
 * Liga a sincronização com a conta assim que o app abre. Sem Supabase
 * configurado ou sem sessão, não faz nada e o app segue puramente local.
 */
export function Boot() {
  useEffect(() => {
    iniciarSync();
  }, []);
  return null;
}
