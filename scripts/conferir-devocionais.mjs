/**
 * Confere os devocionais contra a Bíblia do próprio app: livro que existe,
 * capítulo e versículos dentro do limite, capa com arte, o roteiro completo
 * (versículo-chave dentro da leitura, os cinco convites de oração), e cada
 * citação entre aspas retas presente, palavra por palavra, na ARA.
 *
 * Aspas retas são reservadas à citação literal da ARA: é o que permite
 * trocá-la pela mesma frase na tradução escolhida (scripts/alinhar-citacoes.mjs).
 * Fala que não é citação bíblica vai em aspas curvas. Citação fora da
 * passagem do dia é aviso (às vezes é de propósito); fora da ARA inteira é erro.
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
import { NOVOS } from "../src/lib/devocionais.novos.ts";
import { JORNADAS } from "../src/lib/devocionais.jornadas.ts";
import { COLECAO } from "../src/lib/devocionais.colecao.ts";

const DEVOCIONAIS = [TRINTA_DIAS, PROVERBIOS_31, ...JORNADAS, ...NOVOS, ...COLECAO, ...CURTAS, ...TEMAS, ...MAIS, ...PERSONAGENS, ...RELACOES];

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

/** A ARA inteira, um capítulo por entrada, para achar citação de outra passagem. */
let araInteira = null;
async function naAra(trecho) {
  if (!araInteira) {
    araInteira = [];
    for (const b of indice.books) {
      for (const [i, versos] of (await texto(b.slug)).chapters.entries()) {
        araInteira.push({ ref: `${b.name} ${i + 1}`, norm: normalizar(versos.join(" ")) });
      }
    }
  }
  return araInteira.find((c) => c.norm.includes(normalizar(trecho)))?.ref;
}

const MOVIMENTOS = ["adorar", "confessar", "agradecer", "pedir", "interceder"];

const erros = [];
/** Citações que não estão na passagem do dia: às vezes é de propósito
 *  (um versículo vizinho, outro trecho citado), então é aviso, não erro. */
const avisos = [];
/** Dias ainda sem o roteiro completo (sem versículo-chave ou sem oração guiada). */
const incompletos = [];
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
    if (dia.chave === undefined || !dia.guia) incompletos.push(onde);
    if (dia.chave !== undefined && (dia.chave < de || dia.chave > ate)) {
      erros.push(`${onde}: versículo-chave ${dia.chave} fora da leitura (${de}-${ate})`);
    }
    if (dia.guia) {
      for (const m of MOVIMENTOS) if (!dia.guia[m]?.trim()) erros.push(`${onde}: oração guiada sem "${m}"`);
    }

    const passagem = normalizar(t);
    const textos = [...dia.reflexao, ...Object.values(dia.guia ?? {}), dia.oracao, dia.pergunta, dia.pratica];
    for (const p of textos) {
      if ((p.match(/"/g) ?? []).length % 2) erros.push(`${onde}: aspas retas sem par em "${p.slice(0, 60)}…"`);
      // Todos os pares, e só então o filtro de tamanho: filtrar no regex fazia
      // uma citação curta "pular" e casar o fecho dela com a abertura da próxima.
      for (const [, citacao] of p.matchAll(/"([^"]*)"/g)) {
        if (citacao.length < 12) continue;
        for (const trecho of citacao.split(/\[\s*(?:\.\.\.|…)\s*\]|\.\.\.|…/)) {
          if (!normalizar(trecho) || passagem.includes(normalizar(trecho))) continue;
          const onde2 = await naAra(trecho);
          if (onde2) avisos.push(`${onde}: "${trecho.trim()}" (${onde2})`);
          else erros.push(`${onde}: "${trecho.trim()}" não está na ARA (citação de outra tradução ou fala? use aspas curvas)`);
        }
      }
    }
  }
}

console.log(`\n${DEVOCIONAIS.length} devocionais, ${dias} dias.`);
if (avisos.length) {
  console.log(`\n${avisos.length} citação(ões) de fora da passagem do dia (confira):\n  ${avisos.join("\n  ")}`);
}
if (incompletos.length) {
  console.log(`\n${incompletos.length} dia(s) sem o roteiro completo (versículo-chave e oração guiada).`);
}
if (erros.length) {
  console.error(`\n${erros.length} problema(s):\n  ${erros.join("\n  ")}`);
  process.exit(1);
}
console.log("Tudo certo.");
