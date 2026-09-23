/**
 * Arte por capítulo.
 *
 * Mesmo tratamento das capas de livro (trim, raspa de borda, tom adaptativo),
 * num formato panorâmico, porque no leitor a imagem é uma faixa acima do texto
 * e não um pôster.
 *
 *   public/capas/capitulo/<slug>-<n>.webp   1200x520
 *   src/lib/capitulos.generated.ts          lista de quem tem arte
 *
 * Piloto com Rute. Acrescentar um livro é acrescentar entradas em ARTE.
 *
 * Rode com:  npm run capitulos
 */
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CACHE = join(ROOT, "sources", "capitulos");
const OUT = join(ROOT, "public", "capas", "capitulo");

const API = "https://commons.wikimedia.org/w/api.php";
const UA = "GenipseBible/1.0 (projeto pessoal; arte de domínio público)";

const FAIXA = { width: 1200, height: 520 };

/**
 * "<slug>-<capítulo>" -> candidatos no Commons, em ordem de preferência.
 * Mesma estrutura de `build-covers.mjs`: se o primeiro falhar, tenta o próximo.
 */
const ARTE = {
  "rt-1": ["068.Naomi and Her Daughters-in-Law.jpg"],
  // Picart, em paisagem: cabe na faixa quase sem corte.
  "rt-2": [
    "Ruth, having gleaned barley in a field owned by Boaz (engraving by Picart).jpg",
    "William de Brailes - Top - Ruth Meets Boaz as she gleans (Ruth 2 -4-16) - Walters W10618R - Full Page.jpg",
  ],
  // Tissot traz a referência no próprio título: Rute 3:7-8, a cena da eira.
  "rt-3": [
    "Ruth et Booz (Ruth 7-8) • invenit James Tissot • pinxit Auguste-François Gorguet • excudit Maurice de Brunoff apud Philip de Vere • praesentat Phillip Medhurst.jpg",
    "Tissot Drawing 242 Ruth and Boaz Ruth 3 8 for Brunoff 230 Ruth et Booz.jpg",
  ],
  "rt-4": [
    "Naomi and the Child Obed (Dalziels' Bible Gallery) MET DP835620.jpg",
    "Les vieillards à la porte (Ruth 4 8-9) • invenit James Tissot • pinxit Auguste-François Gorguet • excudit Maurice de Brunoff apud Philip de Vere • praesentat Phillip Medhurst.jpg",
  ],

  // Jonas. Quatro capítulos, quatro cenas que a arte cobre inteiras: a
  // tempestade, o peixe, a pregação e a planta.
  "jn-1": [
    "Jonah and the whale (89471723).jpg",
    "Dore jonah.jpg",
  ],
  "jn-2": ["137.Jonah Is Spewed Forth by the Whale.jpg", "Dore jonah whale.jpg"],
  "jn-3": [
    "138.Jonah Preaches to the Ninevites.jpg",
    "John Martin (1789-1854) - Jonah Preaching before Nineveh - NEWHG-2000.003 - Hatton Gallery.jpg",
  ],
  // O capítulo da planta quase não tem gravura inglesa; os holandeses do século
  // XVII fizeram série inteira sobre ele ("wonderboom", a planta de Jonas).
  "jn-4": [
    "Jona zit onder de wonderboom in de buurt van Nineve, RP-P-OB-45.390.jpg",
    "Jona onder de wonderboom, RP-P-BI-7143.jpg",
    "Jona zit onder de wonderboom Geschiedenis van Jona (serietitel), RP-P-1904-3288.jpg",
  ],

  // Ester. Doré cobre os capítulos 1 e 5; o 6 e o 7 vêm da pintura, onde o
  // triunfo de Mardoqueu e a denúncia de Hamã são temas clássicos.
  "et-1": [
    "114.Queen Vashti Refuses to Obey Ahasuerus' Command.jpg",
    "Vashti refusing to come before the king.jpg",
  ],
  "et-5": ["115.Esther Before the King.jpg"],
  "et-6": [
    "Paolo Veronese - The Triumph of Mordecai - WGA24785.png",
    "Jean-François de Troy - The Triumph of Mordecai.jpg",
    "Botticelli - The Triumph of Mordecai.jpeg",
  ],
};

const WARM = { r: 214, g: 176, b: 116 };
const TARGET_MEAN = 104;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const exists = (p) => access(p).then(() => true, () => false);

async function api(params) {
  const url = new URL(API);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  url.searchParams.set("format", "json");
  for (let i = 0; i < 5; i++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    const txt = await res.text();
    if (res.ok && txt.startsWith("{")) return JSON.parse(txt);
    await sleep(2500 * (i + 1));
  }
  return null;
}

async function baixar(url) {
  for (let i = 0; i < 5; i++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    await res.arrayBuffer().catch(() => {});
    await sleep(2500 * (i + 1));
  }
  return null;
}

async function infoArquivo(nome, largura) {
  const dados = await api({
    action: "query",
    titles: `File:${nome}`,
    prop: "imageinfo",
    iiprop: "url|extmetadata",
    iiurlwidth: String(largura),
  });
  const pagina = Object.values(dados?.query?.pages ?? {})[0];
  if (!pagina || pagina.missing !== undefined) return null;
  const info = pagina.imageinfo?.[0];
  if (!info) return null;
  const limpar = (h) => (h ?? "").replace(/<[^>]*>/g, "").trim();
  return {
    url: info.thumburl ?? info.url,
    page: info.descriptionurl,
    artista: limpar(info.extmetadata?.Artist?.value) || "Desconhecido",
    licenca: limpar(info.extmetadata?.LicenseShortName?.value) || "Domínio público",
  };
}

/** Igual ao das capas: mede o brilho e corrige tudo para a mesma faixa. */
async function fator(buffer) {
  const { channels } = await sharp(buffer).greyscale().normalise().stats();
  return Math.min(1.7, Math.max(0.45, TARGET_MEAN / Math.max(channels[0].mean, 1)));
}

const tratar = (p, f) =>
  p.modulate({ saturation: 0 }).normalise().linear(f, 0).tint(WARM);

async function faixa(buffer) {
  let base = buffer;
  try {
    base = await sharp(buffer).trim({ threshold: 28 }).toBuffer();
  } catch {
    /* sem borda uniforme */
  }

  // Raspa a borda: o papel não termina numa linha limpa e sobra rebarba clara.
  try {
    const m = await sharp(base).metadata();
    const raspa = Math.max(2, Math.round(Math.min(m.width, m.height) * 0.012));
    if (m.width > raspa * 4 && m.height > raspa * 4) {
      base = await sharp(base)
        .extract({
          left: raspa,
          top: raspa,
          width: m.width - raspa * 2,
          height: m.height - raspa * 2,
        })
        .toBuffer();
    }
  } catch {
    /* pequena demais */
  }

  /*
   * Descarta o rodapé da prancha antes de escolher o corte.
   *
   * Várias gravuras trazem a legenda impressa embaixo ("THE GLEANERS.") dentro
   * da própria imagem, com a margem de papel junto. O `trim` não pega, porque
   * está dentro do quadro, e o `attention` ia direto para lá: texto é a região
   * de maior contraste da página. Cortando os 14% de baixo, a busca sobra para
   * a cena.
   */
  try {
    const m = await sharp(base).metadata();
    const util = Math.round(m.height * 0.86);
    if (util > FAIXA.height) {
      base = await sharp(base)
        .extract({ left: 0, top: 0, width: m.width, height: util })
        .toBuffer();
    }
  } catch {
    /* segue sem cortar o rodapé */
  }

  const f = await fator(base);

  /*
   * Corte pela região de maior interesse.
   *
   * Uma faixa 1200x520 tirada de uma gravura em retrato descarta a maior parte
   * da altura. Cortar pelo topo devolve só céu, e pelo centro decapita as
   * figuras; `attention` procura onde a imagem tem detalhe e acerta a cena.
   */
  return tratar(
    sharp(base).resize(FAIXA.width, FAIXA.height, {
      fit: "cover",
      position: sharp.strategy.attention,
    }),
    f,
  )
    .webp({ quality: 68, effort: 6 })
    .toBuffer();
}

async function main() {
  await mkdir(CACHE, { recursive: true });
  await mkdir(OUT, { recursive: true });

  const creditos = {};
  const prontos = [];
  const faltando = [];

  const entradas = Object.entries(ARTE);
  console.log(`Gerando arte de ${entradas.length} capítulos...`);

  for (const [chave, candidatos] of entradas) {
    const bin = join(CACHE, `${chave}.bin`);
    let buffer;

    if (await exists(bin)) {
      buffer = await readFile(bin);
      creditos[chave] = JSON.parse(await readFile(join(CACHE, `${chave}.json`), "utf8"));
    } else {
      let achou = null;
      for (const nome of candidatos) {
        const info = await infoArquivo(nome, 1600);
        if (!info) {
          console.log(`    "${nome}" não existe no Commons`);
          continue;
        }
        const bytes = await baixar(info.url);
        if (!bytes) {
          console.log(`    "${nome}" não baixou`);
          continue;
        }
        achou = {
          buffer: bytes,
          credito: { titulo: nome.replace(/\.[a-z]+$/i, ""), ...info, url: undefined },
        };
        break;
      }

      if (!achou) {
        console.log(`  ! ${chave}: sem candidato válido`);
        faltando.push(chave);
        continue;
      }

      buffer = achou.buffer;
      creditos[chave] = achou.credito;
      await writeFile(bin, buffer);
      await writeFile(join(CACHE, `${chave}.json`), JSON.stringify(achou.credito));
      await sleep(1200);
    }

    try {
      await writeFile(join(OUT, `${chave}.webp`), await faixa(buffer));
      prontos.push(chave);
      console.log(`  ok ${chave}`);
    } catch (e) {
      console.log(`  ! ${chave}: imagem inválida (${e.message})`);
      faltando.push(chave);
      delete creditos[chave];
    }
  }

  await writeFile(
    join(ROOT, "public", "capas", "creditos-capitulos.json"),
    JSON.stringify(creditos, null, 1),
  );

  await writeFile(
    join(ROOT, "src", "lib", "capitulos.generated.ts"),
    `// Gerado por scripts/build-capitulos.mjs — não edite à mão.\n` +
      `export const CAPITULOS_COM_ARTE: ReadonlySet<string> = new Set(${JSON.stringify(prontos.sort())});\n\n` +
      `export const temArteDeCapitulo = (slug: string, capitulo: number) =>\n` +
      `  CAPITULOS_COM_ARTE.has(\`\${slug}-\${capitulo}\`);\n\n` +
      `export const arteDoCapitulo = (slug: string, capitulo: number) =>\n` +
      `  \`/capas/capitulo/\${slug}-\${capitulo}.webp\`;\n`,
  );

  console.log(`\n${prontos.length} geradas, ${faltando.length} sem arte.`);
  if (faltando.length) console.log(`Sem arte: ${faltando.join(", ")}`);
}

main().catch((e) => {
  console.error("Falhou:", e.message);
  process.exit(1);
});
