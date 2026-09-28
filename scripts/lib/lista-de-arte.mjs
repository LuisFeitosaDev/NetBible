/**
 * Regrava `src/lib/capitulos.generated.ts` a partir do que existe em disco.
 *
 * Cada capítulo leva a sua versão: o começo do hash do .avif. A arte é servida
 * com cache de um ano marcado como imutável, e o caminho de um capítulo não
 * muda quando a gravura é trocada ou recortada de novo. Sem a versão na URL, o
 * navegador (e o service worker, que revalida passando pelo cache HTTP) segue
 * mostrando a imagem antiga. Com ela, arte nova é URL nova.
 */
import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

export async function regenerarListaDeArte(pastaDaArte, arquivoGerado) {
  const nomes = (await readdir(pastaDaArte)).filter((n) => n.endsWith(".avif")).sort();
  const versoes = {};
  for (const nome of nomes) {
    const bytes = await readFile(join(pastaDaArte, nome));
    versoes[nome.replace(/\.avif$/, "")] = createHash("sha1").update(bytes).digest("hex").slice(0, 8);
  }

  await writeFile(
    arquivoGerado,
    `// Gerado por scripts/lib/lista-de-arte.mjs — não edite à mão.\n` +
      `/** Capítulo -> versão da arte. Muda quando a arte é regerada e fura o cache das imagens. */\n` +
      `export const VERSAO_DA_ARTE: Readonly<Record<string, string>> = ${JSON.stringify(versoes)};\n\n` +
      `export const CAPITULOS_COM_ARTE: ReadonlySet<string> = new Set(Object.keys(VERSAO_DA_ARTE));\n\n` +
      `export const temArteDeCapitulo = (slug: string, capitulo: number) =>\n` +
      `  CAPITULOS_COM_ARTE.has(\`\${slug}-\${capitulo}\`);\n\n` +
      `export const versaoDaArte = (slug: string, capitulo: number): string | undefined =>\n` +
      `  VERSAO_DA_ARTE[\`\${slug}-\${capitulo}\`];\n`,
  );
  return nomes.length;
}
