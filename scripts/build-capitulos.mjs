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
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CACHE = join(ROOT, "sources", "capitulos");
const OUT = join(ROOT, "public", "capas", "capitulo");

const API = "https://commons.wikimedia.org/w/api.php";
const UA = "GenipseBible/1.0 (projeto pessoal; arte de domínio público)";

/*
 * 1000x434, e não 1200x520.
 *
 * A faixa aparece na largura da coluna de leitura, no máximo 672px de CSS.
 * Mesmo num celular 3x, 1000px de origem já passa do que a tela resolve, e o
 * que sobra é só peso. Baixar a qualidade não adianta quase nada aqui: a trama
 * de linhas da gravura é detalhe fino, o compressor não tem o que jogar fora.
 * Quem derruba o arquivo é a dimensão.
 */
const FAIXA = { width: 1000, height: 434 };

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

const WARM = { r: 214, g: 176, b: 116 };
const TARGET_MEAN = 104;

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

async function baixar(url) {
  for (let i = 0; i < 5; i++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    await res.arrayBuffer().catch(() => {});
    await sleep(2500 * (i + 1));
  }
  return null;
}

async function infoArquivo(nome, largura) {
  const dados = await api({
    action: "query",
    titles: `File:${nome}`,
    prop: "imageinfo",
    iiprop: "url|extmetadata",
    iiurlwidth: String(largura),
  });
  const pagina = Object.values(dados?.query?.pages ?? {})[0];
  if (!pagina || pagina.missing !== undefined) return null;
  const info = pagina.imageinfo?.[0];
  if (!info) return null;
  const limpar = (h) => (h ?? "").replace(/<[^>]*>/g, "").trim();
  return {
    url: info.thumburl ?? info.url,
    page: info.descriptionurl,
    artista: limpar(info.extmetadata?.Artist?.value) || "Desconhecido",
    licenca: limpar(info.extmetadata?.LicenseShortName?.value) || "Domínio público",
  };
}

/** Igual ao das capas: mede o brilho e corrige tudo para a mesma faixa. */
async function fator(buffer) {
  const { channels } = await sharp(buffer).greyscale().normalise().stats();
  return Math.min(1.7, Math.max(0.45, TARGET_MEAN / Math.max(channels[0].mean, 1)));
}

const tratar = (p, f) =>
  p.modulate({ saturation: 0 }).normalise().linear(f, 0).tint(WARM);

async function faixa(buffer, ancoraY) {
  let base = buffer;
  try {
    base = await sharp(buffer).trim({ threshold: 28 }).toBuffer();
  } catch {
    /* sem borda uniforme */
  }

  // Raspa a borda: o papel não termina numa linha limpa e sobra rebarba clara.
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
    /* pequena demais */
  }

  /*
   * Descarta o rodapé da prancha antes de escolher o corte.
   *
   * Várias gravuras trazem a legenda impressa embaixo ("THE GLEANERS.") dentro
   * da própria imagem, com a margem de papel junto. O `trim` não pega, porque
   * está dentro do quadro, e o `attention` ia direto para lá: texto é a região
   * de maior contraste da página. Cortando os 14% de baixo, a busca sobra para
   * a cena.
   */
  try {
    const m = await sharp(base).metadata();
    const util = Math.round(m.height * 0.86);
    if (util > FAIXA.height) {
      base = await sharp(base)
        .extract({ left: 0, top: 0, width: m.width, height: util })
        .toBuffer();
    }
  } catch {
    /* segue sem cortar o rodapé */
  }

  const f = await fator(base);

  /*
   * Corte com âncora: a faixa sai de uma altura escolhida à mão.
   *
   * Usado quando o corte automático erra. Escala a prancha até a largura da
   * faixa e fatia os 520px centrados em `ancoraY`, sem deixar sair da imagem.
   */
  if (ancoraY != null) {
    const m = await sharp(base).metadata();
    const altura = Math.round(m.height * (FAIXA.width / m.width));
    if (altura >= FAIXA.height) {
      const redim = await sharp(base).resize(FAIXA.width, altura).toBuffer();
      const topo = Math.min(
        Math.max(Math.round(altura * ancoraY - FAIXA.height / 2), 0),
        altura - FAIXA.height,
      );
      return tratar(
        sharp(redim).extract({
          left: 0,
          top: topo,
          width: FAIXA.width,
          height: FAIXA.height,
        }),
        f,
      )
        .png()
        .toBuffer();
    }
  }

  /*
   * Corte pela região de maior interesse.
   *
   * Uma faixa tirada de uma gravura em retrato descarta a maior parte da
   * altura. Cortar pelo topo devolve só céu, e pelo centro decapita as figuras;
   * `attention` procura onde a imagem tem detalhe e acerta a cena.
   */
  return tratar(
    sharp(base).resize(FAIXA.width, FAIXA.height, {
      fit: "cover",
      position: sharp.strategy.attention,
    }),
    f,
  )
    .png()
    .toBuffer();
}

/**
 * Grava a mesma faixa em AVIF e em WebP.
 *
 * O AVIF sai perto da metade do WebP nestas gravuras, e é o que quase todo
 * navegador atual recebe. O WebP fica como reserva para quem não abre AVIF,
 * e é ele que o `<img>` carrega quando o `<picture>` não acha o primeiro.
 */
async function gravar(chave, banda) {
  await writeFile(
    join(OUT, `${chave}.avif`),
    await sharp(banda).avif({ quality: 48, effort: 4 }).toBuffer(),
  );
  await writeFile(
    join(OUT, `${chave}.webp`),
    await sharp(banda).webp({ quality: 62, effort: 6 }).toBuffer(),
  );
}

async function main() {
  await mkdir(CACHE, { recursive: true });
  await mkdir(OUT, { recursive: true });

  const creditos = {};
  const prontos = [];
  const faltando = [];

  const entradas = Object.entries(ARTE);
  console.log(`Gerando arte de ${entradas.length} capítulos...`);

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
      let achou = null;
      for (const nome of candidatos) {
        const info = await infoArquivo(nome, 1600);
        if (!info) {
          console.log(`    "${nome}" não existe no Commons`);
          continue;
        }
        const bytes = await baixar(info.url);
        if (!bytes) {
          console.log(`    "${nome}" não baixou`);
          continue;
        }
        achou = {
          buffer: bytes,
          credito: { titulo: nome.replace(/\.[a-z]+$/i, ""), ...info, url: undefined },
        };
        break;
      }

      if (!achou) {
        console.log(`  ! ${chave}: sem candidato válido`);
        faltando.push(chave);
        continue;
      }

      buffer = achou.buffer;
      creditos[chave] = achou.credito;
      await writeFile(bin, buffer);
      await writeFile(join(CACHE, `${chave}.json`), JSON.stringify(achou.credito));
      await sleep(1200);
    }

    try {
      await gravar(chave, await faixa(buffer, ancoraY));
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
