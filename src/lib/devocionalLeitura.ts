"use client";

import { useEffect, useState } from "react";
import { getPref, setPref } from "./db";
import {
  FONTES_DE_LEITURA,
  type FonteLeitura,
  type TemaLeitura,
} from "./temaLeitura";

/**
 * Como a pessoa prefere ler os devocionais: fundo, tamanho e fonte. Fica
 * separado das preferências do leitor da Bíblia porque o padrão é outro
 * (texto um degrau menor, que no devocional é longo) e porque ninguém espera
 * que mudar um mude o outro. Guardado no aparelho, em `prefs`.
 */

export type LeituraDevocional = { tema: TemaLeitura; tamanho: number; fonte: FonteLeitura };

/** Multiplicadores do tamanho do texto. O 1 é o tamanho original da página. */
export const ESCALAS = [0.82, 0.9, 1, 1.1, 1.22, 1.36];

const CHAVE = "devocional.leitura";
const PADRAO: LeituraDevocional = { tema: "escuro", tamanho: 1, fonte: "lora" };

let atual: LeituraDevocional | null = null;
const ouvintes = new Set<(l: LeituraDevocional) => void>();

export function useLeituraDevocional() {
  const [leitura, setLeitura] = useState<LeituraDevocional>(atual ?? PADRAO);

  useEffect(() => {
    ouvintes.add(setLeitura);
    if (!atual) {
      void getPref<LeituraDevocional>(CHAVE, PADRAO).then((salva) => {
        atual = { ...PADRAO, ...salva };
        ouvintes.forEach((fn) => fn(atual!));
      });
    }
    return () => {
      ouvintes.delete(setLeitura);
    };
  }, []);

  const mudar = (parcial: Partial<LeituraDevocional>) => {
    atual = { ...(atual ?? PADRAO), ...parcial };
    ouvintes.forEach((fn) => fn(atual!));
    void setPref(CHAVE, atual);
  };

  const familia = FONTES_DE_LEITURA.find((f) => f.id === leitura.fonte)?.familia;
  /** Variáveis para pôr no container: a fonte das classes `font-reading` e a escala `--fs`. */
  const estilo = {
    "--fs": String(ESCALAS[leitura.tamanho] ?? 1),
    ...(familia ? { "--font-reading": familia } : {}),
  } as React.CSSProperties;

  return { leitura, mudar, estilo };
}
