"use client";

import type { Assunto, EtapaMontada } from "./conteudo/tipos";
import type { Nivel, Publico } from "./metodos";

/**
 * Geração por IA, usada só quando não existe conteúdo curado para o que o
 * líder pediu.
 *
 * A chamada vai para uma rota do próprio servidor, nunca direto da página: a
 * chave da Anthropic não pode chegar ao navegador. Se a rota não estiver
 * configurada, a mensagem de erro diz exatamente o que fazer, em vez de
 * quebrar no meio da criação do estudo.
 */
export type PedidoIA = {
  metodo: string;
  assunto: Assunto;
  publico: Publico;
  nivel: Nivel;
  duracaoMin: number;
};

export async function gerarComIA(pedido: PedidoIA): Promise<EtapaMontada[]> {
  const res = await fetch("/api/estudo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pedido),
  });

  if (!res.ok) {
    const corpo = await res.json().catch(() => ({}));
    throw new Error(corpo?.erro ?? `Não consegui gerar o estudo (${res.status}).`);
  }

  const dados = (await res.json()) as { etapas?: EtapaMontada[] };
  if (!dados.etapas?.length) {
    throw new Error("A geração voltou vazia. Tente outro termo ou escolha um da lista.");
  }
  return dados.etapas;
}
