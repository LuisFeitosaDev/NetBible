/**
 * Baixa as traduções e gera um JSON por livro em public/biblia/<versao>/<slug>.json
 * mais um public/biblia/index.json leve, que é o único arquivo carregado sempre.
 *
 * Rode com:  npm run bible
 */
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCES = join(ROOT, "sources");
const OUT = join(ROOT, "public", "biblia");

const VERSIONS = [
  {
    id: "ara",
    file: "aa.json",
    url: "https://raw.githubusercontent.com/thiagobodruk/biblia/master/json/aa.json",
    name: "Almeida Revista e Atualizada",
    short: "ARA",
    note: "Domínio público",
  },
  {
    id: "nvi",
    file: "nvi.json",
    url: "https://raw.githubusercontent.com/thiagobodruk/biblia/master/json/nvi.json",
    name: "Nova Versão Internacional",
    short: "NVI",
    note: "© Biblica — uso pessoal",
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

async function loadSource({ file, url }) {
  const path = join(SOURCES, file);
  if (!(await exists(path))) {
    process.stdout.write(`  baixando ${file}... `);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${url} respondeu ${res.status}`);
    await mkdir(SOURCES, { recursive: true });
    await writeFile(path, Buffer.from(await res.arrayBuffer()));
    console.log("ok");
  }
  // Os arquivos vêm com BOM, que quebra o JSON.parse.
  const raw = (await readFile(path, "utf8")).replace(/^﻿/, "");
  const books = JSON.parse(raw);
  if (books.length !== 66) throw new Error(`${file} tem ${books.length} livros, esperava 66`);
  return books;
}

async function main() {
  console.log("Gerando a Bíblia...");
  const loaded = [];
  for (const version of VERSIONS) {
    loaded.push({ version, books: await loadSource(version) });
  }

  // As versões precisam estar alinhadas livro a livro para a leitura paralela.
  const [base, ...rest] = loaded;
  for (const other of rest) {
    base.books.forEach((book, i) => {
      if (other.books[i].abbrev !== book.abbrev) {
        throw new Error(`${other.version.id} desalinhado em ${book.abbrev}`);
      }
    });
  }

  const index = [];

  base.books.forEach((book, i) => {
    const position = i + 1;
    const slug = SLUG_FIX[book.abbrev] ?? book.abbrev;
    const group = groupFor(position);

    index.push({
      slug,
      abbrev: book.abbrev,
      name: book.name,
      position,
      testament: group.testament,
      group: group.id,
      // Versículos por capítulo: alimenta a grade de capítulos sem baixar o livro.
      verses: book.chapters.map((c) => c.length),
      totalVerses: book.chapters.reduce((sum, c) => sum + c.length, 0),
    });
  });

  let files = 0;
  for (const { version, books } of loaded) {
    const dir = join(OUT, version.id);
    await mkdir(dir, { recursive: true });
    for (let i = 0; i < books.length; i++) {
      const meta = index[i];
      const payload = {
        slug: meta.slug,
        name: books[i].name,
        version: version.id,
        chapters: books[i].chapters,
      };
      await writeFile(join(dir, `${meta.slug}.json`), JSON.stringify(payload));
      files++;
    }
  }

  await writeFile(
    join(OUT, "index.json"),
    JSON.stringify({
      versions: VERSIONS.map(({ id, name, short, note }) => ({ id, name, short, note })),
      groups: GROUPS.map(({ id, label, testament }) => ({ id, label, testament })),
      books: index,
    }),
  );

  const totalVerses = index.reduce((s, b) => s + b.totalVerses, 0);
  console.log(`  ${files} arquivos de livro + index.json`);
  console.log(`  66 livros, ${index.reduce((s, b) => s + b.verses.length, 0)} capítulos, ${totalVerses} versículos por versão`);
}

main().catch((err) => {
  console.error("Falhou:", err.message);
  process.exit(1);
});
