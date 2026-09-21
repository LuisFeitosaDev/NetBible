/**
 * Baixa gravuras de Gustave Doré (domínio público) do Wikimedia Commons e gera
 * as capas dos livros em public/capas/.
 *
 *   poster/<slug>.webp   600x900   — os cards das prateleiras
 *   wide/<slug>.webp    1600x900   — o fundo da página do livro
 *   creditos.json                  — autor, licença e link de cada imagem
 *
 * Livro sem gravura correspondente continua usando a capa em gradiente do app.
 *
 * Rode com:  npm run capas
 */
import { mkdir, writeFile, readFile, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CACHE = join(ROOT, "sources", "capas");
const OUT = join(ROOT, "public", "capas");

const API = "https://commons.wikimedia.org/w/api.php";
const UA = "LumenBibleApp/0.1 (projeto pessoal; capas de domínio público)";

/**
 * slug do livro -> arquivo no Wikimedia Commons.
 * O conjunto numerado (001..152) é a Doré Bible Gallery; o resto são gravuras
 * avulsas do mesmo artista. Livros ausentes caem no gradiente.
 */
const COVERS = {
  // Pentateuco
  gn: "001.The Creation of Light.jpg",
  ex: "037.The Egyptians Drown in the Sea.jpg",
  lv: "038.The Giving of the Law on Mount Sinai.jpg",
  nm: "042.The Bronze Serpent.jpg",
  dt: "039.Moses Comes Down from Mount Sinai.jpg",

  // Históricos
  js: "046.The Walls of Jericho Fall Down.jpg",
  jz: "063.Samson and Delilah.jpg",
  rt: "069.Ruth and Boaz.jpg",
  "1sm": "075.Saul and the Witch of Endor.jpg",
  "2sm": "080.The Death of Absalom.jpg",
  "1rs": "084.The Judgment of Solomon.jpg",
  "2rs": "095.Elijah Ascends to Heaven in a Chariot of Fire.jpg",
  "1cr": "083.Abishai Saves David's Life.jpg",
  "2cr": "085.Cedars Are Cut Down for the Jerusalem Temple.jpg",
  ed: "105.The Rebuilding of the Temple Is Begun.jpg",
  ne: "108.Nehemiah Views the Ruins of Jerusalem's Walls.jpg",
  et: "115.Esther Before the King.jpg",

  // Poéticos
  job: "118.Job Hears of His Misfortunes.jpg",
  sl: "107.Ezra Kneels in Prayer.jpg",
  pv: "Dore Solomon Proverbs.png",
  ec: "087.King Solomon in Old Age.jpg",
  ct: "086.Solomon Receives the Queen of Sheba.jpg",

  // Profetas
  is: "120.The Prophet Isaiah.jpg",
  jr: "123.The Prophet Jeremiah.jpg",
  lm: "124.People Mourn over the Destruction of Jerusalem.jpg",
  ez: "127.Ezekiel’s Vision of the Valley of Dry Bones.jpg",
  dn: "131.Daniel in the Lions' Den.jpg",
  am: "136.The Prophet Amos.jpg",
  jn: "137.Jonah Is Spewed Forth by the Whale.jpg",
  mq: "139.Micah Exhorts the Israelites to Repent.jpg",
  zc: "140.Zechariah's Vision of Four Chariots.jpg",

  // Novo Testamento
  mt: "Dore Bible Sermon on the Mount.jpg",
  mc: "JesusCalmingtheTempestDore.jpg",
  lc: "Le retour de l'enfant prodigue, par Gustave Doré.jpg",
  jo: "Marriage at Cana engraving by Gustave Doré.jpg",
  at: "The Death of Stephen by Gustave Doré.jpg",
  rm: "Paul Addresses the Crowd After His Arrest by Gustave Doré.jpg",
  "1ts": "DoreStPaulPreachingtotheThessalonians.jpg",
  "2tm": "Gustave Doré Les Martyrs chretiens.JPG",
  hb: "Gustave Doré - Ark of the Covenant.jpg",
  "1pe": "The Christian Martyrs by G.Dore (1871).jpg",
  "2pe": "Gustave Dore - The Transfiguration.jpg",
  "1jo": "St.JohnatPatmosDore.jpg",
  ap: "Gustave Dore - Death on the Pale Horse.png",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const exists = (p) => access(p).then(() => true, () => false);

async function api(params) {
  const url = new URL(API);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  url.searchParams.set("format", "json");

  // O Commons limita taxa com folga; backoff longo e progressivo.
  for (let attempt = 0; attempt < 6; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    const text = await res.text();
    if (res.ok && text.startsWith("{")) return JSON.parse(text);
    await sleep(4000 * (attempt + 1));
  }
  throw new Error("Commons não respondeu");
}

/** O upload.wikimedia.org também devolve 429; vale o mesmo backoff da API. */
async function download(url) {
  for (let attempt = 0; attempt < 6; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    await res.arrayBuffer().catch(() => {});
    await sleep(4000 * (attempt + 1));
  }
  return null;
}

/** Metadados + URL de um thumbnail já redimensionado pelo servidor do Commons. */
async function fileInfo(name, width) {
  const data = await api({
    action: "query",
    titles: `File:${name}`,
    prop: "imageinfo",
    iiprop: "url|extmetadata",
    iiurlwidth: String(width),
  });
  const page = Object.values(data?.query?.pages ?? {})[0];
  if (!page || page.missing !== undefined) return null;
  const info = page.imageinfo?.[0];
  if (!info) return null;

  const meta = info.extmetadata ?? {};
  const strip = (html) => (html ?? "").replace(/<[^>]*>/g, "").trim();
  return {
    url: info.thumburl ?? info.url,
    page: info.descriptionurl,
    artist: strip(meta.Artist?.value) || "Gustave Doré",
    license: strip(meta.LicenseShortName?.value) || "Domínio público",
  };
}

/**
 * Gravura é preto sobre papel branco — no tema escuro isso vira um retângulo
 * estourado. Rebaixamos a faixa tonal e damos um tom quente, para a arte
 * parecer impressa em papel antigo em vez de um scan.
 */
function grade(pipeline) {
  return pipeline
    .grayscale()
    .normalise()
    // Comprime a faixa para baixo: o papel branco vira marrom escuro em vez de
    // estourar contra o tema. Sem isso, gravuras claras ficam lavadas.
    .linear(0.52, -16)
    .tint({ r: 214, g: 176, b: 116 });
}

async function render(buffer, { width, height }, destination) {
  await grade(
    sharp(buffer).resize(width, height, {
      fit: "cover",
      position: sharp.strategy.attention, // recorta onde está o assunto
    }),
  )
    // Gravura é linha fina, o pior caso para compressão. Qualidade baixa e
    // esforço alto porque a imagem sempre aparece atrás de um gradiente.
    .webp({ quality: 62, effort: 6 })
    .toFile(destination);
}

async function main() {
  await mkdir(CACHE, { recursive: true });
  await mkdir(join(OUT, "poster"), { recursive: true });
  await mkdir(join(OUT, "wide"), { recursive: true });

  const entries = Object.entries(COVERS);
  const credits = {};
  const missing = [];

  console.log(`Gerando ${entries.length} capas...`);

  for (const [slug, name] of entries) {
    const cached = join(CACHE, `${slug}.bin`);
    let buffer;

    if (await exists(cached)) {
      buffer = await readFile(cached);
      credits[slug] = JSON.parse(await readFile(join(CACHE, `${slug}.json`), "utf8"));
    } else {
      const info = await fileInfo(name, 1600);
      if (!info) {
        console.log(`  ! ${slug}: "${name}" não existe no Commons — usa gradiente`);
        missing.push(slug);
        continue;
      }
      buffer = await download(info.url);
      if (!buffer) {
        console.log(`  ! ${slug}: download falhou — usa gradiente`);
        missing.push(slug);
        continue;
      }
      credits[slug] = { titulo: name.replace(/\.[a-z]+$/i, ""), ...info, url: undefined };
      await writeFile(cached, buffer);
      await writeFile(join(CACHE, `${slug}.json`), JSON.stringify(credits[slug]));
      await sleep(1500);
    }

    try {
      await render(buffer, { width: 440, height: 660 }, join(OUT, "poster", `${slug}.webp`));
      await render(buffer, { width: 1280, height: 720 }, join(OUT, "wide", `${slug}.webp`));
      console.log(`  ok ${slug}`);
    } catch (err) {
      console.log(`  ! ${slug}: imagem inválida (${err.message}) — usa gradiente`);
      missing.push(slug);
      delete credits[slug];
    }
  }

  await writeFile(join(OUT, "creditos.json"), JSON.stringify(credits, null, 1));

  const done = Object.keys(credits).sort();
  console.log(`\n${done.length} capas geradas, ${missing.length} sem arte.`);
  if (missing.length) console.log(`Sem arte: ${missing.join(", ")}`);

  // A lista vai pro código como módulo, não como fetch: o card precisa saber
  // na hora da primeira renderização se tem arte ou se usa o gradiente.
  await writeFile(
    join(ROOT, "src", "lib", "covers.generated.ts"),
    `// Gerado por scripts/build-covers.mjs — não edite à mão.\n` +
      `export const COVER_SLUGS: ReadonlySet<string> = new Set(${JSON.stringify(done)});\n\n` +
      `export const hasCover = (slug: string) => COVER_SLUGS.has(slug);\n` +
      `export const posterUrl = (slug: string) => \`/capas/poster/\${slug}.webp\`;\n` +
      `export const wideUrl = (slug: string) => \`/capas/wide/\${slug}.webp\`;\n`,
  );
}

main().catch((err) => {
  console.error("Falhou:", err.message);
  process.exit(1);
});
