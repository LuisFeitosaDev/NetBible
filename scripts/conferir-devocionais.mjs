/**
 * Confere os devocionais contra a Bíblia do próprio app: livro que existe,
 * capítulo e versículos dentro do limite, capa com arte, e cada citação
 * entre aspas da reflexão presente, palavra por palavra, na ARA da passagem.
 *
 *   npm run devocionais:conferir            só os problemas
 *   npm run devocionais:conferir -- --texto imprime cada passagem (ARA)
 *
 * Importa cada arquivo de conteúdo direto (e não `devocionais.ts`), porque
 * o Node só resolve imports com extensão e aqueles só importam tipos.
 */
import { readFile, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { DEVOCIONAIS as CURTAS } from "../src/lib/devocionais.dados.ts";
import { TEMAS } from "../src/lib/devocionais.temas.ts";
import { PROVERBIOS_31 } from "../src/lib/devocionais.proverbios.ts";
import { TRINTA_DIAS } from "../src/lib/devocionais.30dias.ts";
import { MAIS } from "../src/lib/devocionais.mais.ts";
import { PERSONAGENS, RELACOES } from "../src/lib/devocionais.personagens.ts";

const DEVOCIONAIS = [TRINTA_DIAS, PROVERBIOS_31, ...CURTAS, ...TEMAS, ...MAIS, ...PERSONAGENS, ...RELACOES];

/** Para comparar citação e texto: sem acento, sem pontuação, sem caixa. */
const normalizar = (s) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const indice = JSON.parse(await readFile(join(ROOT, "public/biblia/index.json"), "utf8"));
const livros = new Map(indice.books.map((b) => [b.slug, b]));
const MOSTRAR = process.argv.includes("--texto");

const cache = new Map();
async function texto(slug) {
  if (!cache.has(slug)) {
    cache.set(slug, JSON.parse(await readFile(join(ROOT, `public/biblia/ara/${slug}.json`), "utf8")));
  }
  return cache.get(slug);
}

const erros = [];
/** Citações que não estão na passagem do dia: às vezes é de propósito
 *  (um versículo vizinho, outra tradução), então é aviso, não erro. */
const avisos = [];
const ids = new Set();
let dias = 0;

for (const d of DEVOCIONAIS) {
  if (ids.has(d.id)) erros.push(`${d.id}: id repetido`);
  ids.add(d.id);
  try {
    await access(join(ROOT, `public/capas/capitulo/${d.capa.slug}-${d.capa.capitulo}.avif`));
  } catch {
    erros.push(`${d.id}: capa ${d.capa.slug}-${d.capa.capitulo} sem arte`);
  }
  if (MOSTRAR) console.log(`\n### ${d.titulo} (${d.dias.length} dias)`);

  for (const [i, dia] of d.dias.entries()) {
    dias++;
    const { slug, capitulo, de, ate = de } = dia.leitura;
    const livro = livros.get(slug);
    const onde = `${d.id} dia ${i + 1}`;
    if (!livro) { erros.push(`${onde}: livro "${slug}" não existe`); continue; }
    const versos = livro.verses[capitulo - 1];
    if (!versos) { erros.push(`${onde}: ${livro.name} não tem capítulo ${capitulo}`); continue; }
    if (de < 1 || ate < de || ate > versos) {
      erros.push(`${onde}: ${livro.name} ${capitulo} tem ${versos} versículos, pedido ${de}-${ate}`);
      continue;
    }
    const t = (await texto(slug)).chapters[capitulo - 1].slice(de - 1, ate).join(" ");
    if (MOSTRAR) {
      console.log(`\n${i + 1}. ${dia.titulo} — ${livro.name} ${capitulo}:${de}${ate !== de ? `-${ate}` : ""}\n   ${t.slice(0, 260)}${t.length > 260 ? "…" : ""}`);
    }
    const passagem = normalizar(t);
    for (const p of dia.reflexao) {
      for (const [, citacao] of p.matchAll(/"([^"]{12,})"/g)) {
        if (!passagem.includes(normalizar(citacao))) avisos.push(`${onde}: "${citacao}"`);
      }
    }
  }
}

console.log(`\n${DEVOCIONAIS.length} devocionais, ${dias} dias.`);
if (avisos.length) {
  console.log(`\n${avisos.length} citação(ões) que não estão na passagem do dia (confira):\n  ${avisos.join("\n  ")}`);
}
if (erros.length) {
  console.error(`\n${erros.length} problema(s):\n  ${erros.join("\n  ")}`);
  process.exit(1);
}
console.log("Tudo certo.");
