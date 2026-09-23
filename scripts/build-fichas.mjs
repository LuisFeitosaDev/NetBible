/**
 * Quebra as fichas de capítulo em um arquivo por livro.
 *
 *   npm run fichas
 *   public/capitulos/<slug>.json
 *
 * Por que isso existe: as 1189 fichas somam quase um megabyte de texto. Como
 * `CapituloHeader` é componente de cliente, importar o módulo inteiro jogava
 * tudo no pacote da rota de leitura, que saltou de 172 kB para 478 kB. Num app
 * que é PWA e roda no celular, isso é regressão séria.
 *
 * A saída segue o mesmo desenho do texto bíblico, que já é servido por livro
 * em `/biblia/<versao>/<livro>.json`: quem abre Gênesis baixa Gênesis, e só.
 *
 * A fonte continua sendo `src/lib/capitulos.dados.ts`, escrito à mão. Este
 * script só o converte, e é rodado pelo `prebuild`, de modo que o JSON nunca
 * fica desatualizado em relação ao TypeScript.
 */
import { mkdir, readFile, writeFile, readdir, rm } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "capitulos");

/*
 * O arquivo de dados é TypeScript e não tem dependências, só tipos e um
 * objeto literal. O Node 22 em diante consegue importá-lo removendo os tipos,
 * o que evita ter que manter um passo de compilação só para isto.
 */
const { CAPITULOS } = await import("../src/lib/capitulos.dados.ts");

async function main() {
  // Recria o diretório, para um livro removido da fonte não ficar órfão aqui.
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  const indice = JSON.parse(
    await readFile(join(ROOT, "public", "biblia", "index.json"), "utf8"),
  );
  const totais = Object.fromEntries(indice.books.map((b) => [b.slug, b.verses.length]));

  let capitulos = 0;
  let bytes = 0;
  const incompletos = [];

  for (const [slug, fichas] of Object.entries(CAPITULOS)) {
    const json = JSON.stringify(fichas);
    await writeFile(join(OUT, `${slug}.json`), json);

    const n = Object.keys(fichas).length;
    capitulos += n;
    bytes += json.length;
    if (totais[slug] && n !== totais[slug]) incompletos.push(`${slug} ${n}/${totais[slug]}`);
  }

  const arquivos = (await readdir(OUT)).length;
  console.log(
    `${arquivos} livros, ${capitulos} capítulos, ${(bytes / 1024).toFixed(0)} KB no total.`,
  );
  console.log(`Média de ${(bytes / 1024 / arquivos).toFixed(1)} KB por livro.`);
  if (incompletos.length) console.log(`Incompletos: ${incompletos.join(", ")}`);
}

main().catch((e) => {
  console.error("Falhou:", e.message);
  process.exit(1);
});
