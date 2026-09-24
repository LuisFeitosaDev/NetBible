/**
 * Arte por capítulo.
 *
 * Mesmo tratamento das capas de livro (trim, raspa de borda, tom adaptativo),
 * num formato panorâmico, porque no leitor a imagem é uma faixa acima do texto
 * e não um pôster.
 *
 *   public/capas/capitulo/<slug>-<n>.avif   1000x434 (e .webp, reserva)
 *   src/lib/capitulos.generated.ts          lista de quem tem arte
 *
 * Piloto com Rute. Acrescentar um livro é acrescentar entradas em ARTE.
 *
 * Rode com:  npm run capitulos
 */
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { faixa, gravar } from "./lib/tratamento-capitulo.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CACHE = join(ROOT, "sources", "capitulos");
const OUT = join(ROOT, "public", "capas", "capitulo");

const API = "https://commons.wikimedia.org/w/api.php";
const UA = "GenipseBible/1.0 (projeto pessoal; arte de domínio público)";

/**
 * "<slug>-<capítulo>" -> candidatos no Commons, em ordem de preferência.
 * Mesma estrutura de `build-covers.mjs`: se o primeiro falhar, tenta o próximo.
 *
 * Uma entrada pode ser um array de nomes, e aí o corte é automático, ou um
 * objeto `{ fontes, ancoraY }`. `ancoraY` é a fração da altura onde a faixa
 * deve ficar centrada, usada quando o corte automático erra: ele procura a
 * região de maior detalhe, e em prancha de figura inteira isso costuma ser o
 * bordado da roupa, não o rosto. Ver `et-1` e `et-7`.
 */
const ARTE = {
  "rt-1": ["068.Naomi and Her Daughters-in-Law.jpg"],
  // Picart, em paisagem: cabe na faixa quase sem corte.
  "rt-2": [
    "Ruth, having gleaned barley in a field owned by Boaz (engraving by Picart).jpg",
    "William de Brailes - Top - Ruth Meets Boaz as she gleans (Ruth 2 -4-16) - Walters W10618R - Full Page.jpg",
  ],
  // Tissot traz a referência no próprio título: Rute 3:7-8, a cena da eira.
  "rt-3": [
    "Ruth et Booz (Ruth 7-8) • invenit James Tissot • pinxit Auguste-François Gorguet • excudit Maurice de Brunoff apud Philip de Vere • praesentat Phillip Medhurst.jpg",
    "Tissot Drawing 242 Ruth and Boaz Ruth 3 8 for Brunoff 230 Ruth et Booz.jpg",
  ],
  "rt-4": [
    "Naomi and the Child Obed (Dalziels' Bible Gallery) MET DP835620.jpg",
    "Les vieillards à la porte (Ruth 4 8-9) • invenit James Tissot • pinxit Auguste-François Gorguet • excudit Maurice de Brunoff apud Philip de Vere • praesentat Phillip Medhurst.jpg",
  ],

  // Jonas. Quatro capítulos, quatro cenas que a arte cobre inteiras: a
  // tempestade, o peixe, a pregação e a planta.
  //
  // Cuidado aqui: vários arquivos do Commons com nomes diferentes são a mesma
  // prancha 137 de Doré. Usá-la em dois capítulos seguidos dava a impressão de
  // que o app tinha repetido a imagem. O capítulo 1 é a tempestade, com o navio
  // e a tripulação, que só a pintura holandesa cobre bem.
  "jn-1": [
    "Jonah and the Whale RMG BHC0881.tiff",
    "Richard Westall - Jonah Cast Into the Sea (Jonah 1-15) - B1986.12.3 - Yale Center for British Art.jpg",
  ],
  "jn-2": ["137.Jonah Is Spewed Forth by the Whale.jpg", "Dore jonah whale.jpg"],
  "jn-3": [
    "138.Jonah Preaches to the Ninevites.jpg",
    "John Martin (1789-1854) - Jonah Preaching before Nineveh - NEWHG-2000.003 - Hatton Gallery.jpg",
  ],
  // O capítulo da planta quase não tem gravura inglesa; os holandeses do século
  // XVII fizeram série inteira sobre ele ("wonderboom", a planta de Jonas).
  //
  // Esta já nasce em paisagem, com Jonas reclamando à esquerda sob a planta e
  // Nínive inteira à direita. O corte para a faixa quase não tira nada, e é
  // por isso que ela vem na frente das outras: as demais são tondos com letra
  // em volta, que viram borrão quando achatados.
  "jn-4": [
    "Jona onder de boom met kalebassen Geschiedenis van Jona (serietitel), RP-P-BI-6584.jpg",
    "Jona zit onder de wonderboom in de buurt van Nineve, RP-P-OB-45.390.jpg",
  ],

  // Ester. Doré cobre os capítulos 1 e 5; o 6 e o 7 vêm da pintura, onde o
  // triunfo de Mardoqueu e a denúncia de Hamã são temas clássicos.
  // Prancha de figura inteira: o automático foi parar na saia da rainha.
  "et-1": {
    fontes: [
      "114.Queen Vashti Refuses to Obey Ahasuerus' Command.jpg",
      "Vashti refusing to come before the king.jpg",
    ],
    ancoraY: 0.34,
  },
  "et-5": ["115.Esther Before the King.jpg"],
  "et-6": [
    "116.The Triumph of Mordecai.jpg",
    "Paolo Veronese - The Triumph of Mordecai - WGA24785.png",
    "Jean-François de Troy - The Triumph of Mordecai.jpg",
  ],
  // Mesma história: a toalha da mesa tem mais detalhe que os rostos.
  "et-7": {
    fontes: [
      "117.Esther Accuses Haman.jpg",
      "The Feast of Esther - Jan Lievens - Google Cultural Institute.jpg",
    ],
    ancoraY: 0.45,
  },
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const exists = (p) => access(p).then(() => true, () => false);

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

/**
 * Baixa um arquivo, com paciência para o limite de requisições do Commons.
 *
 * Numa rodada de centenas de capítulos o servidor começa a responder 429, e a
 * espera curta só queimava as tentativas: dezenas de capítulos ficaram sem
 * arte por isso, sendo que os arquivos existiam e baixavam normalmente
 * sozinhos. Aqui o 429 ganha espera longa e progressiva, e respeita o
 * `Retry-After` quando o servidor manda um.
 */
async function baixar(url) {
  for (let i = 0; i < 6; i++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    await res.arrayBuffer().catch(() => {});

    // 404 não melhora com espera.
    if (res.status === 404) return null;

    const pedido = Number(res.headers.get("retry-after"));
    const espera = Number.isFinite(pedido) && pedido > 0
      ? pedido * 1000
      : (res.status === 429 ? 8000 : 2500) * (i + 1);
    await sleep(Math.min(espera, 45000));
  }
  return null;
}

const limparHtml = (h) => (h ?? "").replace(/<[^>]*>/g, "").trim();

/**
 * Consulta metadados de até 50 arquivos numa requisição só.
 *
 * É o que faz a coisa escalar. Antes era uma ida ao Commons por candidato,
 * mais um download só para medir o tamanho e quase sempre descartar. Com 929
 * capítulos e vários candidatos em cada, isso era uma tarde inteira de espera
 * e rate limit. Aqui vêm as dimensões originais junto, então a porteira de
 * resolução é decidida antes de baixar qualquer coisa.
 *
 * O limite de 50 títulos por consulta é da própria API.
 */
async function infoEmLote(nomes, largura) {
  const mapa = new Map();
  for (let i = 0; i < nomes.length; i += 50) {
    const fatia = nomes.slice(i, i + 50);
    const dados = await api({
      action: "query",
      titles: fatia.map((n) => `File:${n}`).join("|"),
      prop: "imageinfo",
      iiprop: "url|size|extmetadata",
      iiurlwidth: String(largura),
    });

    /*
     * A API normaliza títulos e devolve as páginas fora de ordem, com a chave
     * sendo o pageid. Por isso o casamento é feito pelo título devolvido, e
     * não pela posição na fatia que foi enviada.
     */
    for (const pagina of Object.values(dados?.query?.pages ?? {})) {
      if (pagina.missing !== undefined) continue;
      const info = pagina.imageinfo?.[0];
      if (!info) continue;
      mapa.set(pagina.title.replace(/^File:/, ""), {
        url: info.thumburl ?? info.url,
        page: info.descriptionurl,
        largura: info.width,
        altura: info.height,
        artista: limparHtml(info.extmetadata?.Artist?.value) || "Desconhecido",
        licenca: limparHtml(info.extmetadata?.LicenseShortName?.value) || "Domínio público",
      });
    }
    await sleep(500);
  }
  return mapa;
}

// `faixa()` e `gravar()` (apara, tira legenda, iguala o tom, corta, grava em
// AVIF/WebP) moraram aqui e agora vivem em `lib/tratamento-capitulo.mjs`,
// porque `adicionar-arte.mjs` (a ferramenta manual) precisa do mesmo tratamento.

/**
 * Livros que entram nesta rodada.
 *
 * A lista existe para o trabalho ser incremental: acrescentar um livro aqui e
 * rodar de novo só busca o que falta, porque o que já foi baixado fica em
 * `sources/capitulos/`. Sem isso, cada rodada bateria de novo em centenas de
 * arquivos do Commons e levaria o rate limit.
 *
 * `"*"` libera tudo que houver em `sources/candidatos.json`.
 */
// A Bíblia inteira. Os capítulos sem candidato simplesmente não geram nada, e
// o leitor cai no cabeçalho antigo, sem imagem.
const LIVROS = ["*"];

/**
 * Junta a curadoria manual com o que a colheita achou.
 *
 * `ARTE` ganha sempre: é onde ficam os capítulos em que o automático errou, e
 * as entradas com âncora de corte. Para o resto vale a ordem que
 * `harvest-arte.mjs` deixou pronta.
 */
async function montarEntradas() {
  let colhidos = {};
  try {
    colhidos = JSON.parse(await readFile(join(ROOT, "sources", "candidatos.json"), "utf8"));
  } catch {
    console.log("Sem sources/candidatos.json; rode `npm run arte:colher` para ampliar.");
  }

  const tudo = LIVROS.includes("*");
  const querido = (chave) => tudo || LIVROS.includes(chave.replace(/-\d+$/, ""));

  const entradas = new Map();
  for (const [chave, fontes] of Object.entries(colhidos)) {
    if (querido(chave)) entradas.set(chave, fontes);
  }
  for (const [chave, entrada] of Object.entries(ARTE)) {
    if (querido(chave)) entradas.set(chave, entrada);
  }

  // Ordena por livro e capítulo, para o log sair legível.
  return [...entradas].sort(([a], [b]) => {
    const [la, ca] = [a.replace(/-\d+$/, ""), Number(a.match(/-(\d+)$/)[1])];
    const [lb, cb] = [b.replace(/-\d+$/, ""), Number(b.match(/-(\d+)$/)[1])];
    return la === lb ? ca - cb : la.localeCompare(lb);
  });
}

async function main() {
  await mkdir(CACHE, { recursive: true });
  await mkdir(OUT, { recursive: true });

  const creditos = {};
  const prontos = [];
  const faltando = [];

  const entradas = await montarEntradas();
  console.log(`${entradas.length} capítulos na fila.`);

  const pendentes = [];
  for (const [chave, entrada] of entradas) {
    if (!(await exists(join(CACHE, `${chave}.bin`)))) pendentes.push([chave, entrada]);
  }

  /*
   * Uma única varredura de metadados para tudo o que falta.
   *
   * O conjunto elimina o nome repetido, que é comum porque a mesma prancha
   * costuma ser candidata de dois capítulos vizinhos.
   */
  let info = new Map();
  if (pendentes.length) {
    const nomes = new Set();
    for (const [, entrada] of pendentes) {
      for (const n of Array.isArray(entrada) ? entrada : entrada.fontes) nomes.add(n);
    }
    console.log(`Consultando ${nomes.size} arquivos no Commons em lotes de 50...`);
    info = await infoEmLote([...nomes], 1600);
    console.log(`  ${info.size} existem.`);
  }

  for (const [chave, entrada] of entradas) {
    // Aceita tanto a lista simples quanto `{ fontes, ancoraY }`.
    const candidatos = Array.isArray(entrada) ? entrada : entrada.fontes;
    const ancoraY = Array.isArray(entrada) ? undefined : entrada.ancoraY;

    const bin = join(CACHE, `${chave}.bin`);
    let buffer;

    if (await exists(bin)) {
      buffer = await readFile(bin);
      creditos[chave] = JSON.parse(await readFile(join(CACHE, `${chave}.json`), "utf8"));
    } else {
      /*
       * Porteira de qualidade, agora antes do download.
       *
       * A faixa final tem 1000px de largura e ainda passa por corte, então um
       * original de 700px viraria borrão esticado. Como as dimensões vieram
       * no lote, dá para descartar sem gastar uma transferência.
       */
      const bons = candidatos
        .map((nome) => ({ nome, meta: info.get(nome) }))
        .filter(({ meta }) => meta && meta.largura >= 1000 && meta.altura >= 500);

      if (!bons.length) {
        console.log(`  ! ${chave}: nenhum candidato serve`);
        faltando.push(chave);
        continue;
      }

      let achou = null;
      for (const { nome, meta } of bons) {
        const bytes = await baixar(meta.url);
        if (!bytes) {
          console.log(`    "${nome}" não baixou`);
          continue;
        }
        achou = {
          buffer: bytes,
          credito: {
            titulo: nome.replace(/\.[a-z]+$/i, ""),
            page: meta.page,
            artista: meta.artista,
            licenca: meta.licenca,
          },
        };
        break;
      }

      if (!achou) {
        console.log(`  ! ${chave}: nenhum candidato baixou`);
        faltando.push(chave);
        continue;
      }

      buffer = achou.buffer;
      creditos[chave] = achou.credito;
      await writeFile(bin, buffer);
      await writeFile(join(CACHE, `${chave}.json`), JSON.stringify(achou.credito));
      await sleep(400);
    }

    try {
      await gravar(OUT, chave, await faixa(buffer, ancoraY));
      prontos.push(chave);
      console.log(`  ok ${chave}`);
    } catch (e) {
      console.log(`  ! ${chave}: imagem inválida (${e.message})`);
      faltando.push(chave);
      delete creditos[chave];
    }
  }

  await writeFile(
    join(ROOT, "public", "capas", "creditos-capitulos.json"),
    JSON.stringify(creditos, null, 1),
  );

  await writeFile(
    join(ROOT, "src", "lib", "capitulos.generated.ts"),
    `// Gerado por scripts/build-capitulos.mjs — não edite à mão.\n` +
      `export const CAPITULOS_COM_ARTE: ReadonlySet<string> = new Set(${JSON.stringify(prontos.sort())});\n\n` +
      `export const temArteDeCapitulo = (slug: string, capitulo: number) =>\n` +
      `  CAPITULOS_COM_ARTE.has(\`\${slug}-\${capitulo}\`);\n\n` +
      `/** Reserva: o que o <img> carrega quando o navegador não abre AVIF. */\n` +
      `export const arteDoCapitulo = (slug: string, capitulo: number) =>\n` +
      `  \`/capas/capitulo/\${slug}-\${capitulo}.webp\`;\n\n` +
      `/** Preferida: perto da metade do peso da reserva. */\n` +
      `export const arteAvifDoCapitulo = (slug: string, capitulo: number) =>\n` +
      `  \`/capas/capitulo/\${slug}-\${capitulo}.avif\`;\n`,
  );

  console.log(`\n${prontos.length} geradas, ${faltando.length} sem arte.`);
  if (faltando.length) console.log(`Sem arte: ${faltando.join(", ")}`);
}

main().catch((e) => {
  console.error("Falhou:", e.message);
  process.exit(1);
});
