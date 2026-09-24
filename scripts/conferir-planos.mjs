/**
 * Confere a ordem cronológica dos planos de leitura.
 *
 *   npm run planos:conferir
 *
 * A ordem cronológica é escrita à mão em `src/lib/planos.ordem.ts`, e um erro
 * ali é invisível no app: o plano simplesmente pula Naum ou repete 2 Reis 8, e
 * ninguém descobre até estar no dia 210. Este script fecha essa porta exigindo
 * que os 1189 capítulos apareçam uma vez cada, vindos dos segmentos escritos,
 * não da rede de segurança do final do builder.
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const { CRONOLOGICO, ordemCronologica, ordemCanonica, ordemIniciante, ORDEM_INICIANTE } =
  await import(pathToFileURL(join(ROOT, "src", "lib", "planos.ordem.ts")).href);

const index = JSON.parse(
  readFileSync(join(ROOT, "public", "biblia", "index.json"), "utf8"),
);

const chave = (c) => `${c.slug}.${c.capitulo}`;
const totalDe = new Map(index.books.map((b) => [b.slug, b.verses.length]));
const esperado = new Set(ordemCanonica(index).map(chave));

let problemas = 0;
const erro = (msg) => {
  problemas++;
  console.error("  ✗ " + msg);
};

console.log(`Bíblia: ${esperado.size} capítulos em ${index.books.length} livros.`);

/* 1. Os segmentos escritos à mão, sozinhos. */
const porSegmento = new Set();
const duplicados = [];
// Mesma reserva que o builder faz: uma faixa explícita depois do "resto" tem
// prioridade sobre ele, então o bloco não conta como dono daquele capítulo.
const reservados = new Set();
for (const [slug, de, ate] of CRONOLOGICO) {
  if (de === "resto") continue;
  for (let n = de; n <= ate; n++) reservados.add(`${slug}.${n}`);
}
for (const [slug, de, ate] of CRONOLOGICO) {
  const total = totalDe.get(slug);
  if (!total) {
    erro(`segmento com livro desconhecido: "${slug}"`);
    continue;
  }
  if (de === "resto") {
    for (let n = 1; n <= total; n++) {
      if (!reservados.has(`${slug}.${n}`)) porSegmento.add(`${slug}.${n}`);
    }
    continue;
  }
  if (ate > total) erro(`${slug} ${de}-${ate}: o livro só tem ${total} capítulos`);
  if (de > ate) erro(`${slug} ${de}-${ate}: faixa invertida`);
  for (let n = de; n <= Math.min(ate, total); n++) {
    const k = `${slug}.${n}`;
    if (porSegmento.has(k)) duplicados.push(k);
    porSegmento.add(k);
  }
}
if (duplicados.length) {
  erro(`${duplicados.length} capítulos em duas faixas: ${duplicados.slice(0, 12).join(", ")}`);
}

const faltando = [...esperado].filter((k) => !porSegmento.has(k));
if (faltando.length) {
  const porLivro = new Map();
  for (const k of faltando) {
    const [l, n] = k.split(".");
    porLivro.set(l, [...(porLivro.get(l) ?? []), Number(n)]);
  }
  erro(`${faltando.length} capítulos fora de qualquer segmento:`);
  for (const [l, caps] of porLivro) {
    console.error(`      ${l}: ${caps.sort((a, b) => a - b).join(",")}`);
  }
}

/* 2. A lista final, já expandida. */
const crono = ordemCronologica(index);
if (crono.length !== esperado.size) {
  erro(`a ordem expandida tem ${crono.length} capítulos, esperava ${esperado.size}`);
}
const vistos = new Set();
const repetidos = crono.filter((c) => !vistos.has(chave(c)) ? (vistos.add(chave(c)), false) : true);
if (repetidos.length) erro(`${repetidos.length} repetidos na ordem expandida`);
const forade = crono.filter((c) => !esperado.has(chave(c)));
if (forade.length) erro(`${forade.length} capítulos que não existem: ${forade.slice(0, 8).map(chave).join(", ")}`);

/* 3. Canônica, que é derivada e deve bater sempre. */
const canonica = ordemCanonica(index);
if (canonica.length !== esperado.size) erro(`a ordem canônica tem ${canonica.length}`);

/* 4. Iniciante: livro por livro, sem rede de segurança escondendo um esquecido. */
const livros = new Set(index.books.map((b) => b.slug));
const dupLivro = ORDEM_INICIANTE.filter((s, i) => ORDEM_INICIANTE.indexOf(s) !== i);
if (dupLivro.length) erro(`ORDEM_INICIANTE repete: ${[...new Set(dupLivro)].join(", ")}`);
const desconhecido = ORDEM_INICIANTE.filter((s) => !livros.has(s));
if (desconhecido.length) erro(`ORDEM_INICIANTE cita livro inexistente: ${desconhecido.join(", ")}`);
const esquecido = [...livros].filter((s) => !ORDEM_INICIANTE.includes(s));
if (esquecido.length) erro(`ORDEM_INICIANTE esqueceu: ${esquecido.join(", ")}`);

const iniciante = ordemIniciante(index);
if (iniciante.length !== esperado.size) {
  erro(`a ordem iniciante tem ${iniciante.length} capítulos, esperava ${esperado.size}`);
}
const vistosIni = new Set();
const repetidosIni = iniciante.filter((c) =>
  !vistosIni.has(chave(c)) ? (vistosIni.add(chave(c)), false) : true,
);
if (repetidosIni.length) erro(`${repetidosIni.length} repetidos na ordem iniciante`);

if (problemas) {
  console.error(`\n${problemas} problema(s). Os planos não estão fechados.`);
  process.exit(1);
}

console.log(`Cronológica: ${crono.length} capítulos, ${CRONOLOGICO.length} segmentos, sem falha nem repetição.`);
console.log(`  começa em ${crono.slice(0, 3).map(chave).join(" → ")}`);
console.log(`  termina em ${crono.slice(-3).map(chave).join(" → ")}`);
console.log(`Iniciante: ${iniciante.length} capítulos, ${ORDEM_INICIANTE.length} livros, sem falha nem repetição.`);
console.log(`  começa em ${iniciante.slice(0, 3).map(chave).join(" → ")}`);
console.log(`  termina em ${iniciante.slice(-3).map(chave).join(" → ")}`);
console.log("Canônica: derivada do índice, 1 para 1.");
