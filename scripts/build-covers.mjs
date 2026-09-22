/**
 * Baixa obras de domínio público do Wikimedia Commons e gera as capas dos
 * livros em public/capas/.
 *
 *   poster/<slug>.webp   440x660   — os cards das prateleiras
 *   wide/<slug>.webp    1280x720   — o fundo da página do livro
 *   creditos.json                  — artista, licença e link de cada imagem
 *
 * Cada livro tem uma lista de candidatos: se o primeiro falhar (arquivo
 * renomeado no Commons, limite de taxa), o script tenta o próximo. Livro sem
 * nenhum candidato válido continua usando a capa em gradiente do app.
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
const UA = "LumenBibleApp/0.2 (projeto pessoal; capas de domínio público)";

/**
 * slug do livro -> candidatos no Commons, em ordem de preferência.
 *
 * Antigo Testamento: gravuras de Gustave Doré (Doré Bible Gallery, numeradas)
 * e aquarelas de James Tissot para os profetas menores.
 * Novo Testamento: pintura clássica, um artista por cena.
 */
const COVERS = {
  // ---------------------------------------------------------- Pentateuco
  gn: ["001.The Creation of Light.jpg"],
  ex: ["037.The Egyptians Drown in the Sea.jpg"],
  lv: ["038.The Giving of the Law on Mount Sinai.jpg"],
  nm: ["042.The Bronze Serpent.jpg"],
  dt: ["039.Moses Comes Down from Mount Sinai.jpg"],

  // ---------------------------------------------------------- Históricos
  js: ["046.The Walls of Jericho Fall Down.jpg"],
  jz: ["063.Samson and Delilah.jpg"],
  rt: ["069.Ruth and Boaz.jpg"],
  "1sm": ["075.Saul and the Witch of Endor.jpg"],
  "2sm": ["080.The Death of Absalom.jpg"],
  "1rs": ["084.The Judgment of Solomon.jpg"],
  "2rs": ["095.Elijah Ascends to Heaven in a Chariot of Fire.jpg"],
  "1cr": ["083.Abishai Saves David's Life.jpg"],
  "2cr": ["085.Cedars Are Cut Down for the Jerusalem Temple.jpg"],
  ed: ["105.The Rebuilding of the Temple Is Begun.jpg"],
  ne: ["108.Nehemiah Views the Ruins of Jerusalem's Walls.jpg"],
  et: ["115.Esther Before the King.jpg"],

  // ------------------------------------------------------------ Poéticos
  job: ["118.Job Hears of His Misfortunes.jpg"],
  sl: ["107.Ezra Kneels in Prayer.jpg"],
  pv: ["Dore Solomon Proverbs.png"],
  ec: ["087.King Solomon in Old Age.jpg"],
  ct: ["086.Solomon Receives the Queen of Sheba.jpg"],

  // ---------------------------------------------------- Profetas maiores
  is: ["120.The Prophet Isaiah.jpg"],
  jr: ["123.The Prophet Jeremiah.jpg"],
  lm: ["124.People Mourn over the Destruction of Jerusalem.jpg"],
  ez: ["127.Ezekiel’s Vision of the Valley of Dry Bones.jpg"],
  dn: ["131.Daniel in the Lions' Den.jpg"],

  // ---------------------------------------------------- Profetas menores
  // Série de James Tissot, retrato em alta resolução, estilo uniforme.
  // Preferimos a prancha finalizada em cor (Hoffbauer sobre Tissot); o esboço
  // numerado fica de reserva, porque é foto de desenho com passe-partout.
  os: [
    "Prophet Hosea in Augsburg Cathedral.jpg",
    "Tissot Drawing 404 Hosea Hosea 2 19 for Brunoff 391 Osée.jpg",
  ],
  jl: [
    "Joël (Joel 1 1) • invenit James Tissot • pinxit Charles Hoffbauer • excudit Maurice de Brunoff apud Philip de Vere • praesentat Phillip Medhurst.jpg",
    "Tissot Drawing 405 Joel Joel 1 1 for Brunoff 392 Joël.jpg",
  ],
  am: ["136.The Prophet Amos.jpg"],
  ob: [
    "Abdias (Obadiah 1 1) • invenit James Tissot • pinxit Charles Hoffbauer • excudit Maurice de Brunoff apud Philip de Vere • praesentat Phillip Medhurst.jpg",
    "Tissot Drawing 407 Obadiah Obadiah 1 1 for Brunoff 394 Abdias.jpg",
  ],
  jn: ["137.Jonah Is Spewed Forth by the Whale.jpg"],
  mq: ["139.Micah Exhorts the Israelites to Repent.jpg"],
  na: [
    "Nahum (Nahum 1 9) • invenit James Tissot • pinxit Charles Hoffbauer • excudit Maurice de Brunoff apud Philip de Vere • praesentat Phillip Medhurst.jpg",
    "Tissot Drawing 410 Nahum Nahum 1 9 for Brunoff 397 Nahum.jpg",
  ],
  hc: [
    "Habacuc (Habakkuk 1 12) • invenit James Tissot • pinxit Charles Hoffbauer • excudit Maurice de Brunoff apud Philip de Vere • praesentat Phillip Medhurst.jpg",
    "Tissot Drawing 411 Habakkuk Habakkuk 1 2 for Brunoff 398 Habacuc.jpg",
  ],
  sf: [
    "Sophonie (Zephaniah 1 1) • invenit James Tissot • pinxit Charles Hoffbauer • excudit Maurice de Brunoff apud Philip de Vere • praesentat Phillip Medhurst.jpg",
    "Tissot Drawing 412 Zephaniah Zephaniah 1 14 for Brunoff 399 Sophonie.jpg",
  ],
  ag: [
    "Aggée (Haggai 1 3-4) • invenit James Tissot • pinxit Charles Hoffbauer • excudit Maurice de Brunoff apud Philip de Vere • praesentat Phillip Medhurst.jpg",
    "Tissot Drawing 413 Haggai Haggai 1 3-4 for Brunoff 400 Aggée.jpg",
  ],
  zc: ["140.Zechariah's Vision of Four Chariots.jpg"],
  ml: [
    "Malachie (Malachi 3 1) • invenit James Tissot • pinxit Charles Hoffbauer • excudit Maurice de Brunoff apud Philip de Vere • praesentat Phillip Medhurst.jpg",
    "Tissot Drawing 415 Malachi Malachi 4 2 for Brunoff 402 Malachie.jpg",
  ],

  // ---------------------------------------------------------- Evangelhos
  mt: ["Dore Bible Sermon on the Mount.jpg"],
  mc: ["JesusCalmingtheTempestDore.jpg"],
  lc: ["Le retour de l'enfant prodigue, par Gustave Doré.jpg"],
  jo: [
    "Marriage at Cana engraving by Gustave Doré.jpg",
    "Bruiloft te Kana, RP-P-OB-27.233X.jpg",
  ],

  // ---------------------------------------------------------------- Atos
  at: [
    "Santa Maria della Salute (Venice) - Discesa dello Spirito Santo di Tiziano (1555).jpg",
    "The Death of Stephen by Gustave Doré.jpg",
  ],

  // ------------------------------------------------------ Cartas de Paulo
  // Um retrato ou cena diferente de Paulo por carta, para o grupo não repetir.
  rm: [
    "Saint Paul, Rembrandt van Rijn (and Workshop?), c. 1657.jpg",
    "Paul Addresses the Crowd After His Arrest by Gustave Doré.jpg",
  ],
  "1co": [
    "Saint Paul preaching in Athens, after Raphael MET DP872698.jpg",
    "Raphael - St Paul Preaching at Athens c.1515-6.jpg",
  ],
  "2co": [
    "Valentin de Boulogne - Saint Paul Writing His Epistles - BF.1991.4 - Museum of Fine Arts.jpg",
  ],
  gl: ["Conversion on the Way to Damascus-Caravaggio (c.1600-1).jpg"],
  ef: ["El Greco - St. Paul - Google Art Project.jpg"],
  fp: [
    "1627 Rembrandt Paulus im Gefängnis Staatsgalerie Stuttgart anagoria.JPG",
    "Rembrandt St. Paul in Prison.jpg",
  ],
  cl: ["CHRIST PANTOCRATOR-SINAI(6th Century).jpg", "ICONS, Sinai, Christ Pantocrator, 6th century.jpg"],
  "1ts": ["DoreStPaulPreachingtotheThessalonians.jpg"],
  "2ts": ["V&A - Raphael, St Paul Preaching in Athens (1515).jpg"],
  "1tm": ["Pompeo Batoni (1708-1787) - Saint Paul - 266911 - National Trust.jpg"],
  // 2 Timóteo é a última carta antes da execução; a cena é a própria morte.
  "2tm": [
    "Madonna dell'Orto (Venice) - Choir - The beheading of St. Paul.jpg",
    "Gustave Doré Les Martyrs chretiens.JPG",
  ],
  tt: ["Laurent de La Hyre's Saint Paul Shipwrecked on Malta.jpg"],
  fm: ["Probably Valentin de Boulogne - Saint Paul Writing His Epistles - Google Art Project.jpg"],

  // ------------------------------------------------------- Cartas gerais
  // Melquisedeque é a figura central de Hebreus 7, e a pintura casa melhor com
  // o resto do catálogo do que a ilustração clara da arca.
  hb: [
    "Melchizedek and Abraham - MNK XII-A-276 (334018).jpg",
    "Gustave Doré - Ark of the Covenant.jpg",
  ],
  tg: ["Steinigung des Jakobus.jpg"],
  "1pe": ["The Christian Martyrs by G.Dore (1871).jpg"],
  "2pe": ["Gustave Dore - The Transfiguration.jpg"],
  "1jo": ["El Greco - Saint John the Evangelist, Schorr collection.jpg", "St.JohnatPatmosDore.jpg"],
  "2jo": ["Zampieri St John Evangelist.jpg"],
  "3jo": ["El Greco Hl. Johannes Ev. und Hl. Franziskus ca. 1600 Uffizien Florenz-01.jpg"],
  jd: [
    "(Albi) Saint Jude Thaddée 1620 - Georges de La Tour Inv.166.jpg",
    "El Greco - St. Jude Thaddeus - Google Art Project.jpg",
  ],

  // -------------------------------------------------------- Apocalíptico
  ap: ["Gustave Dore - Death on the Pale Horse.png"],
};

// Card: sangria cheia, sem tarja.
const POSTER = { width: 440, height: 660, letterbox: false };
// Capa grande: mostra a obra inteira, e à direita, porque o título e os botões
// ocupam a esquerda da tela. Proporção panorâmica porque o herói do site é mais
// largo que 16:9, e `safeY` guarda margem vertical para o corte do object-cover
// não comer o topo e a base da pintura.
const WIDE = {
  width: 1600,
  height: 700,
  anchorX: 0.72,
  anchorY: 0.5,
  letterbox: true,
  safeY: 0.86,
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const exists = (p) => access(p).then(() => true, () => false);

async function api(params) {
  const url = new URL(API);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  url.searchParams.set("format", "json");

  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    const text = await res.text();
    if (res.ok && text.startsWith("{")) return JSON.parse(text);
    await sleep(2500 * (attempt + 1)); // o Commons limita taxa com folga
  }
  return null;
}

async function download(url) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    await res.arrayBuffer().catch(() => {});
    await sleep(2500 * (attempt + 1));
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
    artist: strip(meta.Artist?.value) || "Desconhecido",
    license: strip(meta.LicenseShortName?.value) || "Domínio público",
  };
}

const WARM = { r: 214, g: 176, b: 116 };
/** Luminância média que queremos em toda capa, para o catálogo ficar parelho. */
const TARGET_MEAN = 104;

/**
 * O acervo mistura gravura em papel branco com óleo escuro do Rembrandt. Um
 * ajuste fixo estoura uma coisa ou apaga a outra, então medimos o brilho médio
 * da obra e corrigimos cada uma para a mesma faixa.
 *
 * `modulate({saturation:0})` no lugar de `grayscale()` de propósito: grayscale
 * deixa a imagem com um canal só e o `tint` vira no-op.
 */
async function toneFactor(buffer) {
  const { channels } = await sharp(buffer).greyscale().normalise().stats();
  const mean = Math.max(channels[0].mean, 1);
  return Math.min(1.7, Math.max(0.45, TARGET_MEAN / mean));
}

const grade = (pipeline, factor) =>
  pipeline.modulate({ saturation: 0 }).normalise().linear(factor, 0).tint(WARM);

/**
 * Enquadramento.
 *
 * Quase toda reprodução do Commons vem com margem de papel ou moldura de museu,
 * o que jogava o assunto para fora do centro no corte. `trim` remove essa borda
 * primeiro.
 *
 * Depois, duas estratégias:
 *  - proporção parecida com o alvo  -> corte cheio, centralizado (fica melhor);
 *  - proporção muito diferente      -> a obra inteira, centralizada, sobre uma
 *    cópia borrada dela mesma. Nunca decepa cabeça, e preenche a moldura.
 */
async function frame(
  buffer,
  { width, height, anchorX = 0.5, anchorY = 0.4, letterbox = true, safeY = 1 },
) {
  // trim pode falhar em imagem sem borda uniforme; nesse caso seguimos sem ele.
  let base = buffer;
  try {
    base = await sharp(buffer).trim({ threshold: 28 }).toBuffer();
  } catch {
    /* sem borda para cortar */
  }

  /*
   * Raspa a borda depois do trim.
   *
   * O papel das reproduções não termina numa linha limpa: sobra de 1 a 3 pixels
   * claros que o trim não remove, porque a transição é gradual. No card isso
   * vira uma rebarba branca no topo, bem visível contra o fundo escuro.
   */
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
    /* imagem pequena demais para raspar */
  }

  const factor = await toneFactor(base);
  const meta = await sharp(base).metadata();
  const srcRatio = (meta.width ?? 1) / (meta.height ?? 1);
  const dstRatio = width / height;
  const drift = Math.abs(Math.log(srcRatio / dstRatio)); // simétrico p/ alto e largo

  // O card é pôster: sangria cheia sempre, como capa de catálogo. Obra mais
  // alta que o quadro corta pelo topo (mantém a cabeça da figura); mais larga,
  // corta pela região de maior interesse.
  const tallerThanTarget = srcRatio < dstRatio;
  if (drift <= 0.32 || !letterbox) {
    const position =
      drift <= 0.32 ? "centre" : tallerThanTarget ? "top" : sharp.strategy.attention;
    return grade(sharp(base).resize(width, height, { fit: "cover", position }), factor)
      .webp({ quality: 62, effort: 6 })
      .toBuffer();
  }

  // Proporção muito diferente do alvo: em vez de decepar o assunto, mostramos a
  // obra inteira sobre uma cópia dela mesma, borrada e escurecida.
  // Dois passos de propósito: no mesmo pipeline, o `normalise` do tratamento
  // roda depois do escurecimento e devolve o brilho todo, anulando o efeito.
  const graded = await grade(
    sharp(base).resize(width, height, { fit: "cover", position: "centre" }),
    factor,
  )
    .png()
    .toBuffer();

  const background = await sharp(graded)
    .blur(45)
    .linear(0.3, -10) // quase preto: a obra é que tem de saltar
    .png()
    .toBuffer();

  // Margem para a arte não encostar na borda nem sumir sob o gradiente do título.
  const inset = Math.round(Math.min(width, height) * 0.05);
  const art = await grade(
    sharp(base).resize(
      width - inset * 2,
      Math.round((height - inset * 2) * safeY),
      { fit: "inside" },
    ),
    factor,
  )
    .png()
    .toBuffer();

  const artMeta = await sharp(art).metadata();
  // anchorY 0.4 sobe um pouco a arte, porque o rodapé do card leva o nome do
  // livro. anchorX passa de 0.5 no formato largo, onde o título ocupa a esquerda.
  const top = Math.round((height - (artMeta.height ?? height)) * anchorY);
  const left = Math.round((width - (artMeta.width ?? width)) * anchorX);

  return sharp(background)
    .composite([{ input: art, top, left }])
    .webp({ quality: 62, effort: 6 })
    .toBuffer();
}

async function render(buffer, size, destination) {
  await writeFile(destination, await frame(buffer, size));
}

/** Percorre os candidatos até um baixar; devolve o buffer e o crédito. */
async function fetchCover(slug, candidates) {
  for (const name of candidates) {
    const info = await fileInfo(name, 1600);
    if (!info) {
      console.log(`    "${name}" não existe no Commons`);
      continue;
    }
    const buffer = await download(info.url);
    if (!buffer) {
      console.log(`    "${name}" não baixou`);
      continue;
    }
    return {
      buffer,
      credit: {
        titulo: name.replace(/\.[a-z]+$/i, ""),
        artista: info.artist,
        licenca: info.license,
        page: info.page,
      },
    };
  }
  return null;
}

async function main() {
  await mkdir(CACHE, { recursive: true });
  await mkdir(join(OUT, "poster"), { recursive: true });
  await mkdir(join(OUT, "wide"), { recursive: true });

  const entries = Object.entries(COVERS);
  const credits = {};
  const missing = [];

  console.log(`Gerando ${entries.length} capas...`);

  for (const [slug, candidates] of entries) {
    const cachedBin = join(CACHE, `${slug}.bin`);
    let buffer;

    if (await exists(cachedBin)) {
      buffer = await readFile(cachedBin);
      credits[slug] = JSON.parse(await readFile(join(CACHE, `${slug}.json`), "utf8"));
    } else {
      const got = await fetchCover(slug, candidates);
      if (!got) {
        console.log(`  ! ${slug}: sem candidato válido, usa gradiente`);
        missing.push(slug);
        continue;
      }
      buffer = got.buffer;
      credits[slug] = got.credit;
      await writeFile(cachedBin, buffer);
      await writeFile(join(CACHE, `${slug}.json`), JSON.stringify(got.credit));
      await sleep(1200);
    }

    try {
      await render(buffer, POSTER, join(OUT, "poster", `${slug}.webp`));
      await render(buffer, WIDE, join(OUT, "wide", `${slug}.webp`));
      console.log(`  ok ${slug}`);
    } catch (err) {
      console.log(`  ! ${slug}: imagem inválida (${err.message}), usa gradiente`);
      missing.push(slug);
      delete credits[slug];
    }
  }

  await writeFile(join(OUT, "creditos.json"), JSON.stringify(credits, null, 1));

  const done = Object.keys(credits).sort();

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

  console.log(`\n${done.length} capas geradas, ${missing.length} sem arte.`);
  if (missing.length) console.log(`Sem arte: ${missing.join(", ")}`);
}

main().catch((err) => {
  console.error("Falhou:", err.message);
  process.exit(1);
});
