"use client";

/**
 * Progresso nos devocionais. Mora em `prefs`, só no aparelho: é leve, não
 * tem nada sensível e não precisa de conta para funcionar.
 */
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";
import { chaveDoProgresso, type ProgressoDevocional } from "./devocionais";

const PREFIXO = "devocional:";

export function useProgressoDevocional(id: string) {
  return useLiveQuery(
    async () => (await db.prefs.get(chaveDoProgresso(id)))?.value as ProgressoDevocional | undefined,
    [id],
  );
}

/** Todos os progressos, por id da série. `undefined` enquanto carrega. */
export function useProgressosDevocionais() {
  return useLiveQuery(async () => {
    const linhas = await db.prefs.where("key").startsWith(PREFIXO).toArray();
    return new Map(
      linhas.map((l) => [l.key.slice(PREFIXO.length), l.value as ProgressoDevocional]),
    );
  }, []);
}

export async function marcarDia(id: string, dia: number, feito: boolean) {
  const chave = chaveDoProgresso(id);
  const atual = (await db.prefs.get(chave))?.value as ProgressoDevocional | undefined;
  const feitos = new Set(atual?.feitos ?? []);
  if (feito) feitos.add(dia);
  else feitos.delete(dia);
  await db.prefs.put({
    key: chave,
    value: { feitos: [...feitos].sort((a, b) => a - b), atualizadoEm: Date.now() },
  });
}

/** Recomeça a série do zero (o histórico das leituras na Bíblia não muda). */
export async function recomecarDevocional(id: string) {
  await db.prefs.delete(chaveDoProgresso(id));
}
