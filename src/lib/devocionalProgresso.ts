"use client";

/**
 * Progresso nos devocionais: dias feitos e o que a pessoa anotou no "Meditar".
 *
 * Mora em `prefs`, no aparelho, para funcionar sem conta e sem rede. Com
 * conta, `lib/sync.ts` leva cada série para `devocional_progresso` e traz
 * o que foi feito em outro aparelho: vence a escrita mais recente da série.
 */
import { useLiveQuery } from "dexie-react-hooks";
import { agendarSync, db } from "./db";
import {
  chaveDoProgresso,
  PREFIXO_DO_PROGRESSO,
  type ProgressoDevocional,
} from "./devocionais";

export function useProgressoDevocional(id: string) {
  return useLiveQuery(
    async () => (await db.prefs.get(chaveDoProgresso(id)))?.value as ProgressoDevocional | undefined,
    [id],
  );
}

/** Todos os progressos, por id da série. `undefined` enquanto carrega. */
export function useProgressosDevocionais() {
  return useLiveQuery(async () => {
    const linhas = await db.prefs.where("key").startsWith(PREFIXO_DO_PROGRESSO).toArray();
    return new Map(
      linhas.map((l) => [l.key.slice(PREFIXO_DO_PROGRESSO.length), l.value as ProgressoDevocional]),
    );
  }, []);
}

async function alterar(id: string, mudar: (atual: ProgressoDevocional) => ProgressoDevocional) {
  const chave = chaveDoProgresso(id);
  await db.transaction("rw", db.prefs, async () => {
    const atual = ((await db.prefs.get(chave))?.value as ProgressoDevocional | undefined) ?? {
      feitos: [],
      atualizadoEm: 0,
    };
    await db.prefs.put({ key: chave, value: { ...mudar(atual), atualizadoEm: Date.now() } });
  });
  agendarSync();
}

export function marcarDia(id: string, dia: number, feito: boolean) {
  return alterar(id, (atual) => {
    const feitos = new Set(atual.feitos);
    if (feito) feitos.add(dia);
    else feitos.delete(dia);
    return { ...atual, feitos: [...feitos].sort((a, b) => a - b) };
  });
}

export function salvarAnotacao(id: string, dia: number, texto: string) {
  return alterar(id, (atual) => {
    const anotacoes = { ...atual.anotacoes };
    if (texto.trim()) anotacoes[dia] = texto;
    else delete anotacoes[dia];
    return { ...atual, anotacoes };
  });
}

/**
 * Recomeça a série do zero. Grava a série vazia em vez de apagar, para o
 * recomeço chegar aos outros aparelhos; as anotações ficam, porque são da
 * pessoa e não do progresso.
 */
export function recomecarDevocional(id: string) {
  return alterar(id, (atual) => ({ ...atual, feitos: [] }));
}
