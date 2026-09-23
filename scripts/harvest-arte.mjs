/**
 * Colheita de candidatos a arte de capítulo no Wikimedia Commons.
 *
 *   npm run arte:colher
 *   sources/candidatos.json    { "gn-1": ["Arquivo.jpg", ...], ... }
 *
 * A ideia que faz isso escalar para 1189 capítulos: existem coleções grandes
 * no Commons cujos nomes de arquivo trazem a referência bíblica dentro deles,
 * tipo "Genesis cap 19 vv 24-25". Dá para ler a referência por expressão
 * regular em vez de procurar capítulo por capítulo na mão.
 *
 * O que sai daqui é candidato, não escolha final: quem escolhe é
 * `build-capitulos.mjs`, que tenta em ordem e descarta o que não presta.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { DORE } from "./fontes-dore.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SAIDA = join(ROOT, "sources", "candidatos.json");

const API = "https://commons.wikimedia.org/w/api.php";
const UA = "GenipseBible/1.0 (projeto pessoal; arte de domínio público)";

/**
 * Categorias cujos nomes de arquivo costumam trazer livro e capítulo.
 *
 * A Medhurst Picture Torah cobre Gênesis a Deuteronômio com densidade alta,
 * várias imagens por capítulo. A Bowyer é maior e mais irregular, pesa mais
 * para o Novo Testamento.
 */
const CATEGORIAS = [
  "Category:The Phillip Medhurst Picture Torah",
  "Category:Bowyer Bible",
  "Category:Illustrations from the Bowyer Bible",
];

/** Nome do livro em inglês, como aparece nos arquivos, para o slug do app. */
const LIVROS = {
  Genesis: "gn", Exodus: "ex", Leviticus: "lv", Numbers: "nm", Deuteronomy: "dt",
  Joshua: "js", Judges: "jz", Ruth: "rt", "1 Samuel": "1sm", "2 Samuel": "2sm",
  "1 Kings": "1rs", "2 Kings": "2rs", "1 Chronicles": "1cr", "2 Chronicles": "2cr",
  Ezra: "ed", Nehemiah: "ne", Esther: "et", Job: "job", Psalm: "sl", Psalms: "sl",
  Proverbs: "pv", Ecclesiastes: "ec", "Song of Solomon": "ct", Isaiah: "is",
  Jeremiah: "jr", Lamentations: "lm", Ezekiel: "ez", Daniel: "dn", Hosea: "os",
  Joel: "jl", Amos: "am", Obadiah: "ob", Jonah: "jn", Micah: "mq", Nahum: "na",
  Habakkuk: "hc", Zephaniah: "sf", Haggai: "ag", Zechariah: "zc", Malachi: "ml",
  Matthew: "mt", Mark: "mc", Luke: "lc", John: "jo", Acts: "at", Romans: "rm",
  "1 Corinthians": "1co", "2 Corinthians": "2co", Galatians: "gl",
  Ephesians: "ef", Philippians: "fp", Colossians: "cl",
  "1 Thessalonians": "1ts", "2 Thessalonians": "2ts", "1 Timothy": "1tm",
  "2 Timothy": "2tm", Titus: "tt", Philemon: "fm", Hebrews: "hb", James: "tg",
  "1 Peter": "1pe", "2 Peter": "2pe", "1 John": "1jo", "2 John": "2jo",
  "3 John": "3jo", Jude: "jd", Revelation: "ap",
};

// Os compostos primeiro, para "1 Samuel" não casar só como "Samuel" nem
// "Song of Solomon" virar outra coisa.
const NOMES = Object.keys(LIVROS).sort((a, b) => b.length - a.length);
const escapar = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/*
 * A referência, com o que vem antes e depois do número.
 *
 * Os grupos laterais são o que separa referência de numeração de prancha.
 * "Genesis cap 8" e "Genesis 1 v 16" são referências; "BOWYER BIBLE GENESIS
 * 107." é o número da gravura na série, e os dois formatos convivem no mesmo
 * nome de arquivo. Um "cap" antes ou um "v" depois identificam a referência de
 * verdade; sem nenhum dos dois, o número é apenas um palpite.
 */
const REF = new RegExp(
  "\\b(" + NOMES.map(escapar).join("|") + ")\\b(\\s+cap(?:ter)?)?\\s+(\\d{1,3})([^\\d]{0,6})",
  "gi",
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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

async function membros(categoria) {
  const out = [];
  let cont = null;
  for (let i = 0; i < 20; i++) {
    const p = {
      action: "query",
      list: "categorymembers",
      cmtitle: categoria,
      cmtype: "file",
      cmlimit: "500",
    };
    if (cont) p.cmcontinue = cont;
    const d = await api(p);
    out.push(...(d?.query?.categorymembers ?? []).map((x) => x.title.replace(/^File:/, "")));
    cont = d?.continue?.cmcontinue;
    if (!cont) break;
    await sleep(600);
  }
  return out;
}

/**
 * Lê a referência de um nome de arquivo.
 *
 * Percorre todas as ocorrências e fica com a mais confiável, porque o mesmo
 * nome pode ter a numeração da série e a referência de verdade lado a lado:
 * "BOWYER BIBLE GENESIS 005. Birds and Fishes. Genesis 1 v 20" é Gênesis 1,
 * não Gênesis 5.
 */
function lerReferencia(nome, maxCapitulo) {
  let melhor = null;
  for (const m of nome.matchAll(REF)) {
    const cru = m[3];
    if (cru.startsWith("0")) continue; // "001" é número de prancha
    const capitulo = Number(cru);
    if (!capitulo) continue;

    const slug = LIVROS[NOMES.find((n) => n.toLowerCase() === m[1].toLowerCase())];
    if (!slug) continue;

    /*
     * Fora da faixa do livro, é número de prancha.
     *
     * "BOWYER BIBLE GENESIS 107" não pode ser Gênesis 107, porque Gênesis tem
     * 50 capítulos. Descartar aqui é o que impede a entrada fantasma, e é o
     * teste que pega os casos sem zero à esquerda.
     */
    const total = maxCapitulo(slug);
    if (!total || capitulo > total) continue;

    // "cap" antes ou "v"/"vv"/":" depois marcam a referência escrita por extenso.
    const forte = Boolean(m[2]) || /^\s*(vv?\b|:)/i.test(m[4]);
    const peso = forte ? 2 : 1;
    if (!melhor || peso > melhor.peso) melhor = { slug, capitulo, peso };
  }
  return melhor;
}

/**
 * Ordena os candidatos de um capítulo do mais provável para o menos.
 *
 * Não existe jeito automático de saber qual gravura representa melhor um
 * capítulo, então o critério é a procedência: a Medhurst Torah é uma coleção
 * curada, com digitalização uniforme, e acerta mais que a Bowyer. Depois dela
 * vale o nome do pintor, quando aparece.
 */
const MESTRES = /Raphael|Titian|Rembrandt|Dor[ée]|Bloemaert|De Vos|Luyken|Hoet|Borcht|Tissot|Poussin|Rubens/i;

function ordenar(nomes) {
  return [...nomes].sort((a, b) => nota(b) - nota(a));
}

function nota(nome) {
  let n = 0;
  if (/Phillip Medhurst Picture Torah/i.test(nome)) n += 10;
  if (MESTRES.test(nome)) n += 4;
  // Nome com "title-page", "vignette" ou "artists image" é folha de rosto.
  if (/title.?page|vignette|artists image/i.test(nome)) n -= 20;
  return n;
}

async function main() {
  await mkdir(join(ROOT, "sources"), { recursive: true });

  // O índice da Bíblia é a fonte do número de capítulos de cada livro, e é ele
  // que permite descartar referência impossível.
  const indice = JSON.parse(
    await readFile(join(ROOT, "public", "biblia", "index.json"), "utf8"),
  );
  const totais = Object.fromEntries(
    indice.books.map((b) => [b.slug, b.verses.length]),
  );
  const maxCapitulo = (slug) => totais[slug];

  const vistos = new Set();
  for (const c of CATEGORIAS) {
    const f = await membros(c);
    console.log(`${c}: ${f.length}`);
    f.forEach((n) => vistos.add(n));
    await sleep(400);
  }

  const porCapitulo = new Map();
  let semRef = 0;
  for (const nome of vistos) {
    const ref = lerReferencia(nome, maxCapitulo);
    if (!ref) {
      semRef++;
      continue;
    }
    const k = `${ref.slug}-${ref.capitulo}`;
    if (!porCapitulo.has(k)) porCapitulo.set(k, []);
    porCapitulo.get(k).push(nome);
  }

  /*
   * Doré entra na frente.
   *
   * Ele é a série mais uniforme e mais bem digitalizada das três, e é a única
   * que alcança de Josué a Malaquias, onde a leitura automática de nome de
   * arquivo não chega. O que a colheita achou para o mesmo capítulo fica logo
   * atrás, como reserva.
   */
  const comDore = new Set(Object.keys(DORE));
  for (const [k, pranchas] of Object.entries(DORE)) {
    const resto = (porCapitulo.get(k) ?? []).filter((n) => !pranchas.includes(n));
    porCapitulo.set(k, [...pranchas, ...ordenar(resto)]);
  }

  // No máximo 6 por capítulo: o build tenta em ordem, e uma lista gigante só
  // faria ele bater no limite de requisições do Commons à toa.
  const saida = {};
  for (const [k, lista] of [...porCapitulo].sort()) {
    saida[k] = (comDore.has(k) ? lista : ordenar(lista)).slice(0, 6);
  }

  await writeFile(SAIDA, JSON.stringify(saida, null, 1));

  console.log(`\n${vistos.size} arquivos, ${semRef} sem referência legível.`);
  console.log(`${comDore.size} capítulos vindos do mapa de Doré.`);
  console.log(`${Object.keys(saida).length} capítulos com candidato.`);
  console.log(`Gravado em sources/candidatos.json`);
}

main().catch((e) => {
  console.error("Falhou:", e.message);
  process.exit(1);
});
