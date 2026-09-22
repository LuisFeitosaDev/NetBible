/**
 * Baixa as traduções e gera um JSON por livro em public/biblia/<versao>/<slug>.json
 * mais um public/biblia/index.json leve, que é o único arquivo carregado sempre.
 *
 * Cada tradução declara de onde vem. Hoje existem dois tipos de fonte:
 *   bodruk   — um JSON único com os 66 livros (github.com/thiagobodruk/biblia)
 *   getbible — a API do getbible.net, que serve a Bíblia inteira numa chamada
 *
 * Rode com:  npm run bible
 */
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCES = join(ROOT, "sources");
const OUT = join(ROOT, "public", "biblia");
const UA = "GenipseBible/1.0 (projeto pessoal)";

/**
 * A primeira da lista é a canônica: ela define a ordem dos livros, os nomes em
 * português e a quantidade de capítulos que as outras precisam respeitar.
 */
const VERSIONS = [
  {
    id: "ara",
    short: "ARA",
    name: "Almeida Revista e Atualizada",
    note: "Domínio público",
    idioma: "pt",
    fonte: { tipo: "bodruk", arquivo: "aa.json" },
  },
  {
    id: "nvi",
    short: "NVI",
    name: "Nova Versão Internacional",
    note: "© Biblica, uso pessoal",
    idioma: "pt",
    fonte: { tipo: "bodruk", arquivo: "nvi.json" },
  },
  {
    id: "acf",
    short: "ACF",
    name: "Almeida Corrigida Fiel",
    note: "© Sociedade Bíblica Trinitariana, uso pessoal",
    idioma: "pt",
    fonte: { tipo: "bodruk", arquivo: "acf.json" },
  },
  {
    id: "blivre",
    short: "BLIVRE",
    name: "Bíblia Livre",
    note: "CC BY 3.0 Brasil",
    idioma: "pt",
    fonte: { tipo: "getbible", slug: "livre" },
  },
  {
    id: "kjv",
    short: "KJV",
    name: "King James Version",
    note: "Domínio público",
    idioma: "en",
    fonte: { tipo: "getbible", slug: "kjv" },
  },
  {
    id: "web",
    short: "WEB",
    name: "World English Bible",
    note: "Domínio público",
    idioma: "en",
    fonte: { tipo: "getbible", slug: "web" },
  },
];

/** Abreviações da fonte que não servem como slug de URL (acento ou colisão). */
const SLUG_FIX = { "jó": "job", atos: "at" };

/**
 * Agrupamento canônico. A ordem aqui é a ordem das prateleiras na home.
 * `upTo` é o índice (1-based) do último livro do grupo na ordem bíblica.
 */
const GROUPS = [
  { id: "pentateuco", label: "Pentateuco", testament: "VT", upTo: 5 },
  { id: "historicos", label: "Históricos", testament: "VT", upTo: 17 },
  { id: "poeticos", label: "Poéticos e Sapienciais", testament: "VT", upTo: 22 },
  { id: "profetas-maiores", label: "Profetas Maiores", testament: "VT", upTo: 27 },
  { id: "profetas-menores", label: "Profetas Menores", testament: "VT", upTo: 39 },
  { id: "evangelhos", label: "Evangelhos", testament: "NT", upTo: 43 },
  { id: "atos", label: "Atos dos Apóstolos", testament: "NT", upTo: 44 },
  { id: "cartas-paulinas", label: "Cartas de Paulo", testament: "NT", upTo: 57 },
  { id: "cartas-gerais", label: "Cartas Gerais", testament: "NT", upTo: 65 },
  { id: "apocaliptico", label: "Apocalíptico", testament: "NT", upTo: 66 },
];

const groupFor = (position) => GROUPS.find((g) => position <= g.upTo);

const exists = (p) =>
  access(p).then(
    () => true,
    () => false,
  );

async function baixarComCache(nomeCache, url) {
  const caminho = join(SOURCES, nomeCache);
  if (!(await exists(caminho))) {
    process.stdout.write(`  baixando ${nomeCache}... `);
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (!res.ok) throw new Error(`${url} respondeu ${res.status}`);
    await mkdir(SOURCES, { recursive: true });
    await writeFile(caminho, Buffer.from(await res.arrayBuffer()));
    console.log("ok");
  }
  // Alguns arquivos vêm com BOM, que quebra o JSON.parse.
  return JSON.parse((await readFile(caminho, "utf8")).replace(/^﻿/, ""));
}

/* ------------------------------ adaptadores ----------------------------- */

/** Devolve { abbrev, name, chapters: string[][] }[] com 66 livros, em ordem. */
const ADAPTADORES = {
  async bodruk({ arquivo }) {
    const dados = await baixarComCache(
      arquivo,
      `https://raw.githubusercontent.com/thiagobodruk/biblia/master/json/${arquivo}`,
    );
    return dados.map((livro) => ({
      abbrev: livro.abbrev,
      name: livro.name,
      chapters: livro.chapters,
    }));
  },

  async getbible({ slug }) {
    const dados = await baixarComCache(
      `getbible-${slug}.json`,
      `https://api.getbible.net/v2/${slug}.json`,
    );
    return dados.books.map((livro) => ({
      abbrev: String(livro.nr),
      name: livro.name,
      chapters: livro.chapters.map((cap) =>
        cap.verses.map((v) => String(v.text ?? "").trim()),
      ),
    }));
  },
};

async function carregar(version) {
  const adaptador = ADAPTADORES[version.fonte.tipo];
  if (!adaptador) throw new Error(`fonte desconhecida: ${version.fonte.tipo}`);
  const livros = await adaptador(version.fonte);
  if (livros.length !== 66) {
    throw new Error(`${version.id} trouxe ${livros.length} livros, esperava 66`);
  }
  return livros;
}

async function main() {
  console.log(`Gerando ${VERSIONS.length} traduções...`);

  const carregadas = [];
  for (const version of VERSIONS) {
    carregadas.push({ version, livros: await carregar(version) });
  }

  const [canonica, ...outras] = carregadas;

  /**
   * As traduções precisam bater capítulo a capítulo para a leitura paralela
   * funcionar. Diferença de contagem de versículos é normal entre traduções
   * (numeração de salmo, versículo dividido), então isso só vira aviso.
   */
  const avisos = [];
  for (const outra of outras) {
    canonica.livros.forEach((livro, i) => {
      const par = outra.livros[i];
      if (par.chapters.length !== livro.chapters.length) {
        throw new Error(
          `${outra.version.id} desalinhado em ${livro.name}: ` +
            `${par.chapters.length} capítulos contra ${livro.chapters.length}`,
        );
      }
      livro.chapters.forEach((cap, c) => {
        if (par.chapters[c].length !== cap.length) {
          avisos.push(
            `${outra.version.id} ${livro.name} ${c + 1}: ` +
              `${par.chapters[c].length} versículos contra ${cap.length}`,
          );
        }
      });
    });
  }

  // O índice usa sempre os nomes e a contagem da tradução canônica.
  const index = canonica.livros.map((livro, i) => {
    const position = i + 1;
    const group = groupFor(position);
    return {
      slug: SLUG_FIX[livro.abbrev] ?? livro.abbrev,
      abbrev: livro.abbrev,
      name: livro.name,
      position,
      testament: group.testament,
      group: group.id,
      // Versículos por capítulo: alimenta a grade de capítulos sem baixar o livro.
      verses: livro.chapters.map((c) => c.length),
      totalVerses: livro.chapters.reduce((sum, c) => sum + c.length, 0),
    };
  });

  let arquivos = 0;
  for (const { version, livros } of carregadas) {
    const dir = join(OUT, version.id);
    await mkdir(dir, { recursive: true });
    for (let i = 0; i < livros.length; i++) {
      const meta = index[i];
      await writeFile(
        join(dir, `${meta.slug}.json`),
        JSON.stringify({
          slug: meta.slug,
          // Nome no idioma da tradução: "Genesis" na KJV, "Gênesis" na ARA.
          name: livros[i].name,
          version: version.id,
          chapters: livros[i].chapters,
        }),
      );
      arquivos++;
    }
  }

  await writeFile(
    join(OUT, "index.json"),
    JSON.stringify({
      versions: VERSIONS.map(({ id, name, short, note, idioma }) => ({
        id,
        name,
        short,
        note,
        idioma,
      })),
      groups: GROUPS.map(({ id, label, testament }) => ({ id, label, testament })),
      books: index,
    }),
  );

  const capitulos = index.reduce((s, b) => s + b.verses.length, 0);
  console.log(`\n  ${arquivos} arquivos de livro + index.json`);
  console.log(`  66 livros, ${capitulos} capítulos por tradução`);
  VERSIONS.forEach((v) => console.log(`  ${v.short.padEnd(7)} ${v.name}`));

  if (avisos.length) {
    console.log(
      `\n  ${avisos.length} capítulos com contagem de versículos diferente da ARA.`,
    );
    console.log("  Isso é esperado entre traduções; a leitura paralela lida com isso.");
    avisos.slice(0, 5).forEach((a) => console.log(`    ${a}`));
    if (avisos.length > 5) console.log(`    ...e mais ${avisos.length - 5}`);
  }
}

main().catch((err) => {
  console.error("Falhou:", err.message);
  process.exit(1);
});
