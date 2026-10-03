"use client";

import { useEffect, useState } from "react";
import type { ConteudoDaSerie } from "./devocionais";

/**
 * O roteiro de cada dia, baixado por série de `public/devocionais/<id>.json`
 * (gerado por scripts/build-devocionais.mjs). Quem abre um dia de "Paz na
 * ansiedade" baixa essa série, e só.
 *
 * Guarda a promessa e não o resultado: a página do dia e o momento guiado
 * pedem a mesma série quase juntos, e assim dividem um pedido só.
 */
const emMemoria = new Map<string, Promise<ConteudoDaSerie | null>>();

export function carregarSerie(id: string): Promise<ConteudoDaSerie | null> {
  let pendente = emMemoria.get(id);
  if (!pendente) {
    pendente = fetch(`/devocionais/${id}.json`)
      .then((r) => (r.ok ? (r.json() as Promise<ConteudoDaSerie>) : null))
      .catch(() => null);
    // Falhou (offline sem cache): esquece, para a próxima visita tentar de novo.
    void pendente.then((c) => c ?? emMemoria.delete(id));
    emMemoria.set(id, pendente);
  }
  return pendente;
}

/** `undefined` enquanto carrega; `null` se não deu para baixar. */
export function useConteudoDaSerie(id: string) {
  const [conteudo, setConteudo] = useState<ConteudoDaSerie | null | undefined>(undefined);
  useEffect(() => {
    let vivo = true;
    setConteudo(undefined);
    void carregarSerie(id).then((c) => vivo && setConteudo(c));
    return () => {
      vivo = false;
    };
  }, [id]);
  return conteudo;
}
