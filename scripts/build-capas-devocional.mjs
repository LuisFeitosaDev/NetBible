/**
 * Capas em alta resolução para os devocionais.
 *
 *   npm run devocionais:capas
 *   public/capas/devocional/<slug>-<cap>-largo.avif   2000x1100, telas largas
 *   public/capas/devocional/<slug>-<cap>-alto.avif    1200x1800, celular em pé
 *   src/lib/devocionalArte.generated.ts               quem tem capa e a versão
 *
 * Por que existe: o devocional usava a arte de capítulo do leitor, 1000x434,
 * feita para uma faixa acima do texto. No devocional ela vira fundo de tela
 * cheia, e no celular em pé o corte ampliava a gravura umas quatro vezes. Aqui
 * a gravura sai do original, nos dois formatos em que ela realmente aparece.
 *
 * Os originais vêm do Wikimedia Commons (a página de cada um está em
 * public/capas/creditos-capitulos.json) e ficam em cache em sources/devocional,
 * ou são reaproveitados de sources/capitulos quando já estão lá. O tratamento
 * é o mesmo da arte de capítulo (apara, tira legenda, iguala o tom sépia), para
 * a capa grande e a miniatura parecerem a mesma imagem.
 *
 * Só AVIF: o app cai sozinho na arte de capítulo (que tem WebP) se o navegador
 * não abrir AVIF ou se o arquivo ainda não estiver no Storage.
 *
 * Depois de gerar, envie com `npm run arte:subir` (que também envia esta pasta).
 */
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

import { DEVOCIONAIS as CURTAS } from "../src/lib/devocionais.dados.ts";
import { TEMAS } from "../src/lib/devocionais.temas.ts";
import { PROVERBIOS_31 } from "../src/lib/devocionais.proverbios.ts";
import { TRINTA_DIAS } from "../src/lib/devocionais.30dias.ts";
import { MAIS } from "../src/lib/devocionais.mais.ts";
import { PERSONAGENS, RELACOES } from "../src/lib/devocionais.personagens.ts";
import { NOVOS } from "../src/lib/devocionais.novos.ts";
import { JORNADAS } from "../src/lib/devocionais.jornadas.ts";
import { COLECAO } from "../src/lib/devocionais.colecao.ts";

const DEVOCIONAIS = [TRINTA_DIAS, PROVERBIOS_31, ...JORNADAS, ...NOVOS, ...COLECAO, ...CURTAS, ...TEMAS, ...MAIS, ...PERSONAGENS, ...RELACOES];

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "capas", "devocional");
const CACHE = join(ROOT, "sources", "devocional");
const CACHE_LEITOR = join(ROOT, "sources", "capitulos");
const GERADO = join(ROOT, "src", "lib", "devocionalArte.generated.ts");
const API = "https://commons.wikimedia.org/w/api.php";
const UA = "GenipseBible/1.0 (projeto pessoal; arte de domínio público)";

const FORMATOS = {
  largo: { width: 2000, height: 1100 },
  alto: { width: 1200, height: 1800 },
};

const WARM = { r: 214, g: 176, b: 116 };
const TARGET_MEAN = 104;
const existe = (p) => access(p).then(() => true, () => false);
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

/** O original de um capítulo: do cache, ou baixado do Commons (no máximo 2400px). */
async function original(chave, pagina) {
  for (const p of [join(CACHE_LEITOR, `${chave}.bin`), join(CACHE, `${chave}.bin`)]) {
    if (await existe(p)) return readFile(p);
  }
  const titulo = decodeURIComponent(pagina.split("/wiki/")[1] ?? "");
  if (!titulo) throw new Error("página do Commons ilegível");
  const q = new URLSearchParams({
    action: "query", format: "json", titles: titulo, prop: "imageinfo", iiprop: "url", iiurlwidth: "2400",
  });
  for (let tentativa = 1; tentativa <= 4; tentativa++) {
    try {
      const info = await fetch(`${API}?${q}`, { headers: { "User-Agent": UA } }).then((r) => r.json());
      const ii = Object.values(info.query.pages)[0]?.imageinfo?.[0];
      const url = ii?.thumburl ?? ii?.url;
      if (!url) throw new Error("sem imageinfo");
      const res = await fetch(url, { headers: { "User-Agent": UA } });
      if (res.status === 429) throw new Error("429");
      if (!res.ok) throw new Error(`${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await writeFile(join(CACHE, `${chave}.bin`), buf);
      await espera(400); // gentileza com o Commons
      return buf;
    } catch (e) {
      if (tentativa === 4) throw e;
      await espera(2000 * tentativa);
    }
  }
}

/** Apara, raspa a borda e tira o rodapé de legenda, como em tratamento-capitulo.mjs. */
async function limpar(buffer) {
  let base = buffer;
  try { base = await sharp(base).trim({ threshold: 28 }).toBuffer(); } catch { /* sem borda */ }
  try {
    const m = await sharp(base).metadata();
    const raspa = Math.max(2, Math.round(Math.min(m.width, m.height) * 0.012));
    base = await sharp(base).extract({ left: raspa, top: raspa, width: m.width - raspa * 2, height: m.height - raspa * 2 }).toBuffer();
  } catch { /* pequena demais */ }
  try {
    const m = await sharp(base).metadata();
    base = await sharp(base).extract({ left: 0, top: 0, width: m.width, height: Math.round(m.height * 0.86) }).toBuffer();
  } catch { /* segue */ }
  return base;
}

async function tratar(base, { width, height }) {
  const { channels } = await sharp(base).greyscale().normalise().stats();
  const f = Math.min(1.7, Math.max(0.45, TARGET_MEAN / Math.max(channels[0].mean, 1)));
  return sharp(base)
    .resize(width, height, { fit: "cover", position: sharp.strategy.attention })
    .modulate({ saturation: 0 })
    .normalise()
    .linear(f, 0)
    .tint(WARM)
    .avif({ quality: 50, effort: 4 })
    .toBuffer();
}

async function main() {
  await mkdir(OUT, { recursive: true });
  await mkdir(CACHE, { recursive: true });
  const creditos = JSON.parse(await readFile(join(ROOT, "public", "capas", "creditos-capitulos.json"), "utf8"));

  const chaves = new Set();
  for (const d of DEVOCIONAIS) {
    chaves.add(`${d.capa.slug}-${d.capa.capitulo}`);
    for (const dia of d.dias) chaves.add(`${dia.leitura.slug}-${dia.leitura.capitulo}`);
  }

  const versoes = {};
  const falhas = [];
  let n = 0;
  // Quatro por vez: o AVIF em alta é lento de codificar, e um de cada vez
  // levava mais de uma hora. Mais que isso e o Commons começa a responder 429.
  const fila = [...chaves].sort();
  const trabalhador = async () => {
    for (let chave = fila.shift(); chave; chave = fila.shift()) await processar(chave);
  };
  await Promise.all(Array.from({ length: 4 }, trabalhador));

  async function processar(chave) {
    n++;
    const pronto = await Promise.all(Object.keys(FORMATOS).map((f) => existe(join(OUT, `${chave}-${f}.avif`))));
    try {
      if (!pronto.every(Boolean)) {
        const pagina = creditos[chave]?.page;
        if (!pagina) throw new Error("sem crédito");
        const base = await limpar(await original(chave, pagina));
        for (const [nome, tam] of Object.entries(FORMATOS)) {
          await writeFile(join(OUT, `${chave}-${nome}.avif`), await tratar(base, tam));
        }
        process.stdout.write(`\r${n}/${chaves.size} ${chave}        `);
      }
      const h = createHash("sha1");
      for (const f of Object.keys(FORMATOS)) h.update(await readFile(join(OUT, `${chave}-${f}.avif`)));
      versoes[chave] = h.digest("hex").slice(0, 8);
    } catch (e) {
      falhas.push(`${chave}: ${e.message}`);
    }
  }

  // Ordena para o arquivo gerado não mudar só por causa da ordem de término.
  const ordenadas = Object.fromEntries(Object.keys(versoes).sort().map((k) => [k, versoes[k]]));
  await writeFile(
    GERADO,
    `// Gerado por scripts/build-capas-devocional.mjs — não edite à mão.\n` +
      `/** Capítulo -> versão da capa grande do devocional (larga e alta). */\n` +
      `export const CAPAS_DEVOCIONAL: Readonly<Record<string, string>> = ${JSON.stringify(ordenadas)};\n`,
  );
  console.log(`\n${Object.keys(versoes).length}/${chaves.size} capítulos com capa em alta.`);
  if (falhas.length) console.log(`Falharam (usam a arte de capítulo):\n  ${falhas.join("\n  ")}`);
}

main();
