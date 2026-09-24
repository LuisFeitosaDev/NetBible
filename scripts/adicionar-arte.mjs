/**
 * Adiciona a arte de UM capítulo à mão: você escolhe a imagem, o script trata.
 *
 *   node scripts/adicionar-arte.mjs <slug> <capitulo> <arquivo-ou-url>
 *
 * Exemplos:
 *   node scripts/adicionar-arte.mjs mt 5 "C:\Users\voce\Downloads\sermao.jpg"
 *   node scripts/adicionar-arte.mjs mt 5 "https://upload.wikimedia.org/wikipedia/commons/.../Sermon.jpg"
 *
 * Opções (depois dos três argumentos, em qualquer ordem):
 *   --ancora=0.4       corte manual (fração da altura, 0 a 1), para quando o
 *                       corte automático erra e pega a roupa em vez da cena
 *   --titulo="..."     nome da obra, para o crédito
 *   --artista="..."    autor, para o crédito (padrão: "Desconhecido")
 *   --licenca="..."    licença, para o crédito (padrão: "Domínio público")
 *   --pagina="..."     URL de onde a imagem veio, para o crédito
 *
 * Faz o MESMO tratamento do harvest automático (apara borda, tira legenda
 * impressa, iguala o tom, corta para 1000x434, grava AVIF e WebP), então uma
 * foto e uma gravura do Commons saem parecidas lado a lado no leitor.
 *
 * Depois de rodar, é só:
 *   npm run arte:subir
 */
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, resolve, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";
import { faixa, gravar } from "./lib/tratamento-capitulo.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "capas", "capitulo");
const CREDITOS = join(ROOT, "public", "capas", "creditos-capitulos.json");
const GERADO = join(ROOT, "src", "lib", "capitulos.generated.ts");

function pararCom(mensagem) {
  console.error(mensagem);
  process.exit(1);
}

function lerArgumentos() {
  const brutos = process.argv.slice(2);
  const posicionais = brutos.filter((a) => !a.startsWith("--"));
  const opcoes = {};
  for (const a of brutos) {
    if (!a.startsWith("--")) continue;
    const [chave, ...resto] = a.slice(2).split("=");
    opcoes[chave] = resto.join("=").replace(/^["']|["']$/g, "");
  }

  const [slug, capituloBruto, origem] = posicionais;
  if (!slug || !capituloBruto || !origem) {
    pararCom(
      "Uso: node scripts/adicionar-arte.mjs <slug> <capitulo> <arquivo-ou-url> [--ancora=0.4] [--titulo=...] [--artista=...] [--licenca=...] [--pagina=...]\n" +
        'Exemplo: node scripts/adicionar-arte.mjs mt 5 "C:\\fotos\\sermao.jpg"',
    );
  }

  const capitulo = Number(capituloBruto);
  if (!Number.isInteger(capitulo) || capitulo < 1) {
    pararCom(`"${capituloBruto}" não é um número de capítulo válido.`);
  }

  const ancoraY = opcoes.ancora !== undefined ? Number(opcoes.ancora) : undefined;
  if (ancoraY !== undefined && (Number.isNaN(ancoraY) || ancoraY < 0 || ancoraY > 1)) {
    pararCom(`--ancora precisa estar entre 0 e 1 (recebi "${opcoes.ancora}").`);
  }

  return { slug, capitulo, origem, ancoraY, opcoes };
}

/** Confere se o livro e o capítulo existem, para não gerar arte de um lugar que não existe. */
async function confirmarLivro(slug, capitulo) {
  const indice = JSON.parse(
    await readFile(join(ROOT, "public", "biblia", "index.json"), "utf8"),
  );
  const livro = indice.books.find((b) => b.slug === slug);
  if (!livro) {
    pararCom(
      `Não achei o livro "${slug}". Use a sigla, tipo "mt", "gn", "1sm" — a mesma que aparece nos nomes dos arquivos em public/capas/capitulo/.`,
    );
  }
  if (capitulo > livro.verses.length) {
    pararCom(`${livro.name} só tem ${livro.verses.length} capítulos; ${capitulo} não existe.`);
  }
  return livro;
}

/** Arquivo local ou URL: os dois viram um Buffer. */
async function carregarOrigem(origem) {
  if (/^https?:\/\//i.test(origem)) {
    console.log(`Baixando de ${origem} ...`);
    const res = await fetch(origem, {
      headers: { "User-Agent": "GenipseBible/1.0 (projeto pessoal)" },
    });
    if (!res.ok) pararCom(`Não consegui baixar: HTTP ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  }

  const caminho = isAbsolute(origem) ? origem : resolve(process.cwd(), origem);
  if (!existsSync(caminho)) {
    pararCom(`Não achei o arquivo: ${caminho}`);
  }
  return readFile(caminho);
}

/**
 * Regrava `capitulos.generated.ts` a partir do que existe em disco, não de uma
 * lista guardada em memória. Assim o arquivo nunca desalinha do real: se um
 * dia alguém apagar ou renomear um .avif à mão, a próxima rodada (deste
 * script ou de `npm run capitulos`) corrige sozinha.
 */
async function regenerarListaDeArte() {
  const nomes = await readdir(OUT);
  const prontos = [...new Set(
    nomes.filter((n) => n.endsWith(".avif")).map((n) => n.replace(/\.avif$/, "")),
  )].sort();

  await writeFile(
    GERADO,
    `// Gerado por scripts/build-capitulos.mjs e scripts/adicionar-arte.mjs — não edite à mão.\n` +
      `export const CAPITULOS_COM_ARTE: ReadonlySet<string> = new Set(${JSON.stringify(prontos)});\n\n` +
      `export const temArteDeCapitulo = (slug: string, capitulo: number) =>\n` +
      `  CAPITULOS_COM_ARTE.has(\`\${slug}-\${capitulo}\`);\n\n` +
      `/** Reserva: o que o <img> carrega quando o navegador não abre AVIF. */\n` +
      `export const arteDoCapitulo = (slug: string, capitulo: number) =>\n` +
      `  \`/capas/capitulo/\${slug}-\${capitulo}.webp\`;\n\n` +
      `/** Preferida: perto da metade do peso da reserva. */\n` +
      `export const arteAvifDoCapitulo = (slug: string, capitulo: number) =>\n` +
      `  \`/capas/capitulo/\${slug}-\${capitulo}.avif\`;\n`,
  );
  return prontos.length;
}

async function main() {
  const { slug, capitulo, origem, ancoraY, opcoes } = lerArgumentos();
  const chave = `${slug}-${capitulo}`;

  const livro = await confirmarLivro(slug, capitulo);
  await mkdir(OUT, { recursive: true });

  const bruto = await carregarOrigem(origem);
  console.log(`Tratando ${chave} (${livro.name} ${capitulo})...`);

  let tratada;
  try {
    tratada = await faixa(bruto, ancoraY);
  } catch (e) {
    pararCom(`Não consegui tratar a imagem: ${e.message}. É mesmo uma imagem (jpg/png/webp)?`);
  }

  await gravar(OUT, chave, tratada);

  // Crédito: sem exigir nada, mas guardando o que vier. Uma foto sua não tem
  // "artista" nem "licença" no sentido do Commons, então os padrões abaixo
  // deixam isso claro em vez de inventar um nome.
  let creditos = {};
  try {
    creditos = JSON.parse(await readFile(CREDITOS, "utf8"));
  } catch {
    /* primeiro crédito do projeto */
  }
  creditos[chave] = {
    titulo: opcoes.titulo ?? origem,
    page: opcoes.pagina ?? (/^https?:\/\//i.test(origem) ? origem : undefined),
    artista: opcoes.artista ?? "Desconhecido",
    licenca: opcoes.licenca ?? "Domínio público",
  };
  await writeFile(CREDITOS, JSON.stringify(creditos, null, 1));

  const total = await regenerarListaDeArte();

  console.log(`\nPronto: ${chave}.avif e ${chave}.webp gravados em public/capas/capitulo/.`);
  console.log(`${total} capítulos com arte no total.`);
  console.log(`\nConfira em npm run dev, e se o corte saiu errado tente de novo com --ancora=0.4 (ou outro valor).`);
  console.log(`Quando estiver bom:  npm run arte:subir`);
}

main().catch((e) => {
  console.error("Falhou:", e.message);
  process.exit(1);
});
