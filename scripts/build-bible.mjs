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
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { COLCHETES, REPETIDOS, FALTANDO, CORRECOES } from "./lib/correcoes-ara.mjs";

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
    // A fonte chega com defeitos de coleta; ver scripts/lib/correcoes-ara.mjs.
    corrigir: corrigirAra,
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

/* ------------------------------ tratamento ------------------------------ */

const ENTIDADES = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " };

/** A fonte da ARA traz entidades HTML no texto: "d&#x27;água". */
const decodificar = (texto) =>
  texto.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (inteira, e) => {
    if (e[0] !== "#") return ENTIDADES[e.toLowerCase()] ?? inteira;
    return String.fromCodePoint(e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : Number(e.slice(1)));
  });

/**
 * Espaços e sinais que a coleta deixou fora do lugar. Só tipografia: o que
 * exige decidir se o sinal fica ou sai está na tabela de correções.
 */
const arrumarEspacos = (texto) =>
  texto
    .replace(/\s+/g, " ")
    .trim()
    // "na terra ,da sua possessão": vírgula solta, grudada na palavra seguinte.
    .replace(/ ,(?=\p{L})/gu, " ")
    // "Que é que tens ?", "Jerusalém , que é Jebus"
    .replace(/\s+([,;:.!?])(?=\s|$)/g, "$1")
    // "terra do Egito. :", "como um pau. ." (reticências ficam)
    .replace(/(?<!\.)([.;:!?,])[,.:;]$/, "$1");

/**
 * Ordem: primeiro o que muda a numeração (versículos repetidos e perdidos),
 * para todo o resto usar a numeração certa; depois as chaves e os espaços;
 * por último a tabela, que procura o texto já nesse formato.
 */
function corrigirAra(livros) {
  const porSlug = new Map(livros.map((l) => [SLUG_FIX[l.abbrev] ?? l.abbrev, l]));
  const capitulo = (slug, cap) => {
    const versos = porSlug.get(slug)?.chapters[cap - 1];
    if (!versos) throw new Error(`correção da ARA aponta para ${slug} ${cap}, que não existe`);
    return versos;
  };
  const local = (ref) => {
    const [, slug, cap, ver] = ref.match(/^(\S+) (\d+):(\d+)$/);
    return { versos: capitulo(slug, Number(cap)), i: Number(ver) - 1 };
  };

  // Do fim para o começo, para uma remoção não mudar o número da próxima.
  const repetidos = [...REPETIDOS].sort((a, b) => b[2] - a[2]);
  for (const [slug, cap, ver] of repetidos) {
    const versos = capitulo(slug, cap);
    if (versos[ver - 1] !== versos[ver]) {
      throw new Error(`${slug} ${cap}:${ver} não é mais cópia do seguinte; tire de REPETIDOS em correcoes-ara.mjs`);
    }
    versos.splice(ver - 1, 1);
  }

  // Em ordem crescente, para cada inserção já contar com as anteriores.
  const faltando = [...FALTANDO].sort((a, b) => a[2] - b[2]);
  for (const [slug, cap, ver, texto] of faltando) {
    const versos = capitulo(slug, cap);
    if (versos.includes(texto)) {
      throw new Error(`a fonte já tem ${slug} ${cap}:${ver}; tire de FALTANDO em correcoes-ara.mjs`);
    }
    versos.splice(ver - 1, 0, texto);
  }

  // O leitor, o compartilhamento e a busca mostram o texto como está, então
  // a marca vai no próprio texto: parênteses, ou colchetes onde as cópias os usam.
  const colchetes = new Set(COLCHETES);
  for (const ref of colchetes) {
    const { versos, i } = local(ref);
    if (!/[{}]/.test(versos[i] ?? "")) throw new Error(`${ref} não tem chaves na fonte; tire de COLCHETES`);
  }
  for (const [slug, livro] of porSlug) {
    livro.chapters = livro.chapters.map((cap, c) =>
      cap.map((v, i) => {
        const [abre, fecha] = colchetes.has(`${slug} ${c + 1}:${i + 1}`) ? "[]" : "()";
        return arrumarEspacos(v.replace(/\{/g, abre).replace(/\}/g, fecha));
      }),
    );
  }

  const problemas = [];
  for (const [ref, de, para] of CORRECOES) {
    const { versos, i } = local(ref);
    const partes = versos[i]?.split(de) ?? [];
    if (partes.length !== 2) {
      problemas.push(`${ref}: "${de}" aparece ${Math.max(partes.length - 1, 0)} vez(es) em "${versos[i]}"`);
      continue;
    }
    versos[i] = partes.join(para);
  }
  if (problemas.length) {
    throw new Error(`correções da ARA que não se aplicam mais:\n  ${problemas.join("\n  ")}`);
  }
}

async function carregar(version) {
  const adaptador = ADAPTADORES[version.fonte.tipo];
  if (!adaptador) throw new Error(`fonte desconhecida: ${version.fonte.tipo}`);
  const livros = await adaptador(version.fonte);
  if (livros.length !== 66) {
    throw new Error(`${version.id} trouxe ${livros.length} livros, esperava 66`);
  }
  for (const livro of livros) livro.chapters = livro.chapters.map((cap) => cap.map(decodificar));
  version.corrigir?.(livros);
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
  /**
   * Os livros são servidos como imutáveis (next.config.mjs, public/sw.js). A
   * revisão de cada tradução vai no índice, que é sempre revalidado, e o app a
   * põe no endereço do livro: corrigir o texto muda o endereço, e quem já tinha
   * o livro em cache baixa de novo.
   */
  const revisoes = {};
  for (const { version, livros } of carregadas) {
    const dir = join(OUT, version.id);
    await mkdir(dir, { recursive: true });
    const hash = createHash("sha1");
    for (let i = 0; i < livros.length; i++) {
      const meta = index[i];
      const json = JSON.stringify({
        slug: meta.slug,
        // Nome no idioma da tradução: "Genesis" na KJV, "Gênesis" na ARA.
        name: livros[i].name,
        version: version.id,
        chapters: livros[i].chapters,
      });
      hash.update(json);
      await writeFile(join(dir, `${meta.slug}.json`), json);
      arquivos++;
    }
    revisoes[version.id] = hash.digest("hex").slice(0, 8);
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
        rev: revisoes[id],
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
