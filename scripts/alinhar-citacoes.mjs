/**
 * Acha, para cada citação das reflexões (escritas na ARA), a mesma frase na
 * NVI, na ACF e na Bíblia Livre, para a reflexão falar a língua da leitura
 * que a pessoa escolheu.
 *
 *   npm run devocionais:citacoes                 alinha o que falta e confere tudo
 *   npm run devocionais:citacoes -- --pendentes arquivo.json
 *                                                 grava o que não deu para alinhar
 *
 * Como funciona: a citação é localizada palavra por palavra no capítulo da
 * ARA (primeiro no capítulo do dia, depois no livro e capítulo citados no
 * mesmo parágrafo, por último na Bíblia toda), o que dá os versículos dela.
 * Os mesmos versículos da outra tradução são alinhados com os da ARA por
 * subsequência comum (com tolerância a conjugação: "lançando" ~ "lancem"), e
 * o trecho que corresponde à citação é recortado do texto original, com a
 * pontuação dele.
 *
 * Só entra o que passa num limite de confiança; o resto fica de fora (o app
 * mostra a ARA) e vai para a lista de pendentes, para alguém resolver à mão.
 * Entradas com `"revisado": true` foram resolvidas à mão e nunca são
 * sobrescritas. Toda forma gravada, automática ou à mão, é conferida no fim:
 * tem que existir, literalmente, no texto daquela tradução.
 *
 * Saída: src/lib/devocionais.citacoes.json, que o build-devocionais.mjs lê.
 */
import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { DEVOCIONAIS as CURTAS } from "../src/lib/devocionais.dados.ts";
import { TEMAS } from "../src/lib/devocionais.temas.ts";
import { PROVERBIOS_31 } from "../src/lib/devocionais.proverbios.ts";
import { TRINTA_DIAS } from "../src/lib/devocionais.30dias.ts";
import { MAIS } from "../src/lib/devocionais.mais.ts";
import { PERSONAGENS, RELACOES } from "../src/lib/devocionais.personagens.ts";

const DEVOCIONAIS = [TRINTA_DIAS, PROVERBIOS_31, ...CURTAS, ...TEMAS, ...MAIS, ...PERSONAGENS, ...RELACOES];
const VERSOES = ["nvi", "acf", "blivre"];
/** Fração mínima das palavras da citação que precisam casar. A NVI reescreve mais. */
const LIMITE = { nvi: 0.6, acf: 0.75, blivre: 0.7 };

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SAIDA = join(ROOT, "src", "lib", "devocionais.citacoes.json");
const args = process.argv.slice(2);
const arquivoPendentes = args.includes("--pendentes") ? args[args.indexOf("--pendentes") + 1] : null;

const indice = JSON.parse(await readFile(join(ROOT, "public/biblia/index.json"), "utf8"));
const cache = new Map();
async function livro(versao, slug) {
  const k = `${versao}/${slug}`;
  if (!cache.has(k)) cache.set(k, JSON.parse(await readFile(join(ROOT, `public/biblia/${k}.json`), "utf8")));
  return cache.get(k);
}

const semAcento = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/** Palavras com a posição no texto original, para recortar com a pontuação de lá. */
function tokens(texto) {
  return [...texto.matchAll(/[\p{L}\p{N}]+/gu)].map((m) => ({
    orig: m[0],
    norm: semAcento(m[0]),
    ini: m.index,
    fim: m.index + m[0].length,
  }));
}

/** Pronomes que a NVI moderniza: "vós" vira "vocês", "vosso" vira "seu". */
const EQUIVALENTES = {
  vos: ["voces", "lhes"],
  vosso: ["seu"],
  vossa: ["sua"],
  vossos: ["seus"],
  vossas: ["suas"],
  teu: ["seu"],
  tua: ["sua"],
  teus: ["seus"],
  tuas: ["suas"],
  tu: ["voce"],
  ti: ["voce"],
  te: ["lhe", "o", "a"],
};

const LIGACAO = new Set(["e", "o", "a", "os", "as", "de", "do", "da", "que", "se", "um", "uma", "em", "no", "na", "pois", "mas", "porque"]);

function parecidas(a, b) {
  if (a === b) return true;
  if (a.length >= 4 && b.length >= 4 && a.slice(0, 4) === b.slice(0, 4)) return true;
  return EQUIVALENTES[a]?.includes(b) ?? false;
}

/** Pares (i da ARA, j da outra) pela maior subsequência comum. */
function alinhar(a, b) {
  const n = a.length;
  const m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = parecidas(a[i].norm, b[j].norm)
        ? dp[i + 1][j + 1] + 1
        : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const pares = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (parecidas(a[i].norm, b[j].norm) && dp[i][j] === dp[i + 1][j + 1] + 1) pares.push([i++, j++]);
    else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else j++;
  }
  return pares;
}

/** Livro e capítulo citados no parágrafo ("em Romanos 8", "o Salmo 23"). */
function capitulosCitados(paragrafo) {
  const achados = [];
  for (const b of indice.books) {
    const nomes = [b.name, b.slug === "sl" ? "Salmo" : null].filter(Boolean);
    for (const nome of nomes) {
      const re = new RegExp(`${nome.replace(/\s+/g, "\\s+")}\\s+(\\d+)`, "g");
      for (const m of paragrafo.matchAll(re)) achados.push({ slug: b.slug, cap: Number(m[1]) });
    }
  }
  return achados;
}

/** Onde, na ARA, está um trecho: { slug, cap, de, ate, i, j } (i..j relativos aos versículos de..ate). */
async function localizar(trecho, preferidos) {
  const alvo = tokens(trecho).map((t) => t.norm);
  if (!alvo.length) return null;

  async function noCapitulo(slug, cap) {
    const versos = (await livro("ara", slug)).chapters[cap - 1];
    if (!versos) return null;
    const lista = versos.flatMap((v, k) => tokens(v).map((t) => ({ ...t, verso: k + 1 })));
    for (let s = 0; s + alvo.length <= lista.length; s++) {
      if (alvo.every((w, k) => lista[s + k].norm === w)) {
        const de = lista[s].verso;
        const ate = lista[s + alvo.length - 1].verso;
        const antes = lista.findIndex((t) => t.verso === de);
        return { slug, cap, de, ate, i: s - antes, j: s - antes + alvo.length - 1 };
      }
    }
    return null;
  }

  for (const p of preferidos) {
    const r = await noCapitulo(p.slug, p.cap);
    if (r) return { ...r, certeza: true };
  }
  const todos = [];
  for (const b of indice.books) {
    for (let cap = 1; cap <= b.verses.length; cap++) {
      const r = await noCapitulo(b.slug, cap);
      if (r) todos.push(r);
      if (todos.length > 1) break;
    }
    if (todos.length > 1) break;
  }
  // Achado em vários lugares e nenhum indicado no texto: não dá para saber qual.
  return todos.length === 1 ? { ...todos[0], certeza: true } : todos[0] ? { ...todos[0], certeza: false } : null;
}

async function textoDosVersos(versao, slug, cap, de, ate) {
  const versos = (await livro(versao, slug)).chapters[cap - 1] ?? [];
  return versos.slice(de - 1, ate).join(" ");
}

/** A forma de um trecho da ARA na outra tradução, ou o motivo de não dar. */
async function traduzirTrecho(trecho, local, versao) {
  const ara = tokens(await textoDosVersos("ara", local.slug, local.cap, local.de, local.ate));
  const textoAlvo = await textoDosVersos(versao, local.slug, local.cap, local.de, local.ate);
  const alvo = tokens(textoAlvo);
  if (!alvo.length) return { erro: "versículo ausente na tradução" };

  const pares = alinhar(ara, alvo);
  const dentro = pares.filter(([i]) => i >= local.i && i <= local.j);
  const tamanho = local.j - local.i + 1;
  const confianca = dentro.length / tamanho;
  if (!dentro.length || confianca < LIMITE[versao]) return { erro: `confiança ${confianca.toFixed(2)}` };

  let k = dentro[0][1];
  let l = dentro[dentro.length - 1][1];
  // Ponta que não casou ("porque ele tem cuidado de vós" ~ "...cuida de
  // vocês"): só estende se a citação da ARA ia até o fim (ou desde o começo)
  // da oração, e se o que sobra da oração na outra tradução tem quase o mesmo
  // número de palavras. Fora disso ("e está seguro" ~ "e estará em alto
  // retiro"), adivinhar o tamanho cortava frase no meio: vai para revisão.
  // Palavrinha de ligação ("e", "o", "que") sobrando na ponta não conta.
  const soltas = (de, ate) => ara.slice(de, ate).filter((t) => !LIGACAO.has(t.norm)).length;
  const textoAra = await textoDosVersos("ara", local.slug, local.cap, local.de, local.ate);
  const fimDeOracao = (texto, toks, idx) =>
    idx === toks.length - 1 || /[.;:!?,]/.test(texto.slice(toks[idx].fim, toks[idx + 1].ini));
  const comecoDeOracao = (texto, toks, idx) =>
    idx === 0 || /[.;:!?,]/.test(texto.slice(toks[idx - 1].fim, toks[idx].ini));

  const sobraFim = soltas(dentro[dentro.length - 1][0] + 1, local.j + 1);
  if (sobraFim) {
    let fim = l;
    while (!fimDeOracao(textoAlvo, alvo, fim) && fim - l <= sobraFim + 1) fim++;
    const casaComAra = fimDeOracao(textoAra, ara, local.j);
    if (!casaComAra || !fimDeOracao(textoAlvo, alvo, fim) || Math.abs(fim - l - sobraFim) > 1) {
      return { erro: "ponta sem correspondência" };
    }
    l = fim;
  }
  const sobraIni = soltas(local.i, dentro[0][0]);
  if (sobraIni) {
    let ini = k;
    while (!comecoDeOracao(textoAlvo, alvo, ini) && k - ini <= sobraIni + 1) ini--;
    const casaComAra = comecoDeOracao(textoAra, ara, local.i);
    if (!casaComAra || !comecoDeOracao(textoAlvo, alvo, ini) || Math.abs(k - ini - sobraIni) > 1) {
      return { erro: "ponta sem correspondência" };
    }
    k = ini;
  }
  // Pronome colado por hífen ("livrá-lo", "disse-lhe") vai inteiro.
  while (l + 1 < alvo.length && textoAlvo.slice(alvo[l].fim, alvo[l + 1].ini) === "-") l++;
  while (k > 0 && textoAlvo.slice(alvo[k - 1].fim, alvo[k].ini) === "-") k--;
  const proporcao = (l - k + 1) / tamanho;
  if (proporcao < 0.5 || proporcao > 2) return { erro: `tamanho desproporcional (${proporcao.toFixed(2)})` };

  // Sem as aspas do próprio texto: a reflexão já põe as dela em volta.
  let forma = textoAlvo.slice(alvo[k].ini, alvo[l].fim).replace(/["“”«»]/g, "").replace(/\s+/g, " ");
  // A pontuação final é a da citação na ARA: é ela que fecha a frase da reflexão.
  forma += trecho.match(/[.!?;:,]+\s*$/)?.[0].trim() ?? "";

  // Maiúscula da posição (começo de frase), não de nome próprio, acompanha a ARA.
  const primeira = trecho.trim().match(/\p{L}/u)?.[0];
  const anterior = textoAlvo.slice(0, alvo[k].ini).trimEnd();
  const posicional = anterior === "" || /[.!?:]["“”«»)]*$/.test(anterior);
  if (primeira && posicional) {
    forma = primeira === primeira.toLowerCase()
      ? forma.charAt(0).toLowerCase() + forma.slice(1)
      : forma.charAt(0).toUpperCase() + forma.slice(1);
  } else if (primeira && primeira !== primeira.toLowerCase()) {
    forma = forma.charAt(0).toUpperCase() + forma.slice(1);
  }
  return { forma, confianca };
}

/** Citação inteira, respeitando as reticências de omissão. */
async function traduzirCitacao(citacao, preferidos) {
  const partes = citacao.split(/(\s*\[\s*(?:\.\.\.|…)\s*\]\s*|\s*\.\.\.\s*|\s*…\s*)/);
  const resultado = { ref: null };
  const pedacos = Object.fromEntries(VERSOES.map((v) => [v, []]));
  const problemas = {};
  for (const [n, parte] of partes.entries()) {
    if (n % 2 === 1 || !tokens(parte).length) {
      for (const v of VERSOES) pedacos[v].push(parte);
      continue;
    }
    const local = await localizar(parte, preferidos);
    if (!local) return { erro: "não achada na ARA" };
    resultado.ref ??= `${local.slug}.${local.cap}.${local.de}${local.ate !== local.de ? `-${local.ate}` : ""}`;
    if (!local.certeza) return { erro: `aparece em mais de um lugar (${resultado.ref}…)`, ref: resultado.ref };
    for (const v of VERSOES) {
      if (problemas[v]) continue;
      const r = await traduzirTrecho(parte, local, v);
      if (r.erro) problemas[v] = r.erro;
      else pedacos[v].push(r.forma);
    }
  }
  for (const v of VERSOES) if (!problemas[v]) resultado[v] = pedacos[v].join("");
  return { ...resultado, problemas };
}

/** Toda forma gravada precisa estar, literalmente, no texto daquela tradução. */
async function conferir(citacao, entrada) {
  const erros = [];
  if (!entrada.ref) return erros;
  const [slug, cap, versos] = entrada.ref.split(".");
  const [de, ate = de] = versos.split("-").map(Number);
  for (const v of VERSOES) {
    if (!entrada[v]) continue;
    // Um versículo de folga para cada lado: a numeração muda um pouco entre traduções.
    const texto = semAcento(await textoDosVersos(v, slug, Number(cap), Math.max(1, de - 1), ate + 1)).replace(/[^a-z0-9]+/g, " ");
    for (const pedaco of entrada[v].split(/\[\s*(?:\.\.\.|…)\s*\]|\.\.\.|…/)) {
      const alvo = semAcento(pedaco).replace(/[^a-z0-9]+/g, " ").trim();
      if (alvo && !texto.includes(alvo)) erros.push(`${v}: "${pedaco.trim()}" não está em ${entrada.ref}`);
    }
  }
  return erros;
}

async function main() {
  let salvas = {};
  try {
    salvas = JSON.parse(await readFile(SAIDA, "utf8"));
  } catch {
    /* primeira vez */
  }

  // Cada citação com o contexto de onde aparece.
  const usos = new Map();
  for (const d of DEVOCIONAIS) {
    for (const [n, dia] of d.dias.entries()) {
      const textos = [...dia.reflexao, ...Object.values(dia.guia ?? {}), dia.oracao, dia.pergunta, dia.pratica];
      for (const t of textos) {
        for (const [, c] of t.matchAll(/"([^"]*)"/g)) {
          if (!tokens(c).length) continue;
          if (!usos.has(c)) usos.set(c, { onde: `${d.id} dia ${n + 1}`, leitura: dia.leitura, paragrafo: t });
        }
      }
    }
  }

  const final = {};
  const pendentes = [];
  let novas = 0;
  for (const [citacao, uso] of usos) {
    const antiga = salvas[citacao];
    if (antiga?.revisado) {
      final[citacao] = antiga;
      continue;
    }
    const preferidos = [
      { slug: uso.leitura.slug, cap: uso.leitura.capitulo },
      ...capitulosCitados(uso.paragrafo),
    ];
    const r = await traduzirCitacao(citacao, preferidos);
    const entrada = { ref: r.ref ?? antiga?.ref ?? null };
    for (const v of VERSOES) if (r[v]) entrada[v] = r[v];
    if (VERSOES.some((v) => entrada[v])) {
      final[citacao] = entrada;
      if (!antiga) novas++;
    }
    const faltam = VERSOES.filter((v) => !entrada[v]);
    if (faltam.length) {
      const pos = uso.paragrafo.indexOf(citacao);
      pendentes.push({
        citacao,
        onde: uso.onde,
        ref: entrada.ref,
        faltam,
        motivo: r.erro ?? Object.entries(r.problemas ?? {}).map(([v, e]) => `${v}: ${e}`).join("; "),
        // O entorno da citação, para quem resolve à mão saber de que passagem se fala.
        contexto: uso.paragrafo.slice(Math.max(0, pos - 160), pos + citacao.length + 60),
      });
    }
  }

  const erros = [];
  for (const [c, e] of Object.entries(final)) erros.push(...(await conferir(c, e)).map((x) => `"${c}" → ${x}`));

  await writeFile(SAIDA, JSON.stringify(final, null, 1) + "\n");
  if (arquivoPendentes) await writeFile(arquivoPendentes, JSON.stringify(pendentes, null, 1));

  const completas = Object.values(final).filter((e) => VERSOES.every((v) => e[v])).length;
  console.log(`${usos.size} citações; ${completas} nas três traduções; ${novas} novas nesta rodada.`);
  console.log(`${pendentes.length} com alguma tradução faltando (aparecem na ARA nessas versões).`);
  if (erros.length) {
    console.error(`\n${erros.length} forma(s) que não estão no texto da tradução:\n  ${erros.join("\n  ")}`);
    process.exit(1);
  }
}

main();
