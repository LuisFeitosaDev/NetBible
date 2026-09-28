/**
 * O texto e o destino de cada aviso do mural.
 *
 * Fica fora de `grupoEventos.ts` (que é "use client") porque o servidor monta
 * a mesma frase no push que o app mostra no balão, e as duas precisam bater.
 */

export type TipoDeEvento = "grifo" | "meta" | "cutucada" | "entrou";

export type DadosDoEvento = {
  slug?: string;
  capitulo?: number;
  versiculo?: number;
  livro?: string;
  cor?: string;
  texto?: string;
  dia?: number;
};

type EventoResumido = { id: string; perfil_id: string; tipo: TipoDeEvento; dados: DadosDoEvento };

export function textoDoAviso(e: Pick<EventoResumido, "tipo" | "dados">, nome: string) {
  const quem = nome.trim().split(/\s+/)[0] || nome;
  const d = e.dados;
  if (e.tipo === "grifo") return `${quem} grifou ${d.livro} ${d.capitulo}:${d.versiculo}`;
  if (e.tipo === "meta") return `${quem} bateu a meta de hoje`;
  if (e.tipo === "cutucada") return `${quem} te cutucou: bora ler hoje?`;
  return `${quem} entrou no seu grupo de leitura`;
}

export function destinoDoAviso(e: Pick<EventoResumido, "tipo" | "dados">) {
  return e.tipo === "grifo" && e.dados.slug
    ? `/livro/${e.dados.slug}/${e.dados.capitulo}?v=${e.dados.versiculo}`
    : "/biblioteca";
}

/**
 * Etiqueta da notificação do sistema. Avisos com a mesma etiqueta se
 * substituem em vez de empilhar: vários grifos seguidos da mesma pessoa viram
 * um aviso só, e o push não duplica o aviso que o app aberto já mostrou.
 */
export function etiquetaDoAviso(e: Pick<EventoResumido, "id" | "perfil_id" | "tipo">) {
  return e.tipo === "grifo" ? `grifo-${e.perfil_id}` : e.id;
}
