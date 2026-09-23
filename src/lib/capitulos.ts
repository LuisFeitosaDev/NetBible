/**
 * Visão geral de cada capítulo, carregada por livro.
 *
 * O texto das 1189 fichas é escrito à mão em `capitulos.dados.ts`, que NÃO é
 * importado pelo app: `scripts/build-fichas.mjs` o converte em um JSON por
 * livro dentro de `public/capitulos/`, e é daí que o leitor puxa.
 *
 * O motivo é peso. `CapituloHeader` roda no cliente, então importar o módulo
 * de dados inteiro levava quase um megabyte de texto para o pacote da rota de
 * leitura. Assim, quem abre Gênesis baixa Gênesis, e mais nada, exatamente
 * como já acontece com o texto bíblico em `/biblia/<versao>/<livro>.json`.
 *
 * Regra de escrita das fichas: o resumo diz do que o capítulo trata sem
 * entregar o desfecho a quem está lendo pela primeira vez. Os marcos são o
 * esqueleto da ação, não interpretação.
 */

export type Capitulo = {
  /** Uma linha. É o que aparece fechado. */
  resumo: string;
  /** Um parágrafo curto, com o contexto que o texto pressupõe e não explica. */
  detalhe: string;
  /** O esqueleto da ação, na ordem em que acontece. */
  marcos: string[];
  /** Versículo-âncora do capítulo. */
  chave: number;
};

type FichasDoLivro = Record<number, Capitulo>;

/**
 * Cache por livro, guardando a promessa e não o resultado.
 *
 * Guardar a promessa faz com que dois capítulos abertos em sequência, antes de
 * a primeira resposta chegar, compartilhem o mesmo pedido em vez de baixarem
 * o arquivo duas vezes.
 */
const emMemoria = new Map<string, Promise<FichasDoLivro | null>>();

function buscarLivro(slug: string): Promise<FichasDoLivro | null> {
  let pendente = emMemoria.get(slug);
  if (!pendente) {
    pendente = fetch(`/capitulos/${slug}.json`)
      .then((r) => (r.ok ? (r.json() as Promise<FichasDoLivro>) : null))
      // Livro sem ficha, ou rede fora: o leitor simplesmente não mostra a
      // visão geral, que é o mesmo comportamento de antes de ela existir.
      .catch(() => null);
    emMemoria.set(slug, pendente);
  }
  return pendente;
}

/** A ficha de um capítulo, ou null se não houver. */
export async function fichaDoCapitulo(
  slug: string,
  capitulo: number,
): Promise<Capitulo | null> {
  const livro = await buscarLivro(slug);
  return livro?.[capitulo] ?? null;
}
