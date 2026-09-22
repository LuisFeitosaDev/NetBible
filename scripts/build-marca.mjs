/**
 * Gera todas as variantes da marca a partir de `Logo Genipse.png`.
 *
 *   public/icon.png            512  dourado, ícone do app
 *   public/icon-192.png        192  dourado
 *   public/icon-maskable.png   512  dourado sangrando até a borda (Android)
 *   public/favicon.png          32  G branco em fundo preto, aba do navegador
 *   public/favicon-16.png       16  idem
 *   public/favicon-48.png       48  idem
 *   public/icon-mono.png       512  G branco, fundo transparente
 *   public/icon-mono-preto.png 512  G branco em fundo preto, cantos arredondados
 *   public/logo-genipse.png    900  lockup completo
 *
 * Rode com:  npm run marca
 */
import { writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ORIGEM = join(ROOT, "Logo Genipse.png");
const OUT = join(ROOT, "public");

const PRETO = "#0a0a0c";

/** Recorte do quadrado dourado dentro do lockup, em proporções do arquivo. */
const RECORTE = { x: 0.185, y: 0.315, w: 0.175, h: 0.345 };

async function extrairIcone() {
  const m = await sharp(ORIGEM).metadata();
  return sharp(ORIGEM)
    .extract({
      left: Math.round(m.width * RECORTE.x),
      top: Math.round(m.height * RECORTE.y),
      width: Math.round(m.width * RECORTE.w),
      height: Math.round(m.height * RECORTE.h),
    })
    .png()
    .toBuffer();
}

/**
 * Isola a letra como máscara.
 *
 * O recorte interno de 12% é o pulo do gato: ele fica dentro do quadrado sem
 * pegar o canto arredondado. Sem isso, o fundo escuro dos cantos vira branco
 * quando a imagem é invertida, e a letra some no meio de quatro manchas.
 */
async function mascaraDaLetra(icone) {
  const b = await sharp(icone).metadata();
  const inset = Math.round(Math.min(b.width, b.height) * 0.12);
  const miolo = await sharp(icone)
    .extract({
      left: inset,
      top: inset,
      width: b.width - inset * 2,
      height: b.height - inset * 2,
    })
    .toBuffer();

  /*
   * Cinza, contraste forte e inversão: a letra (escura) vira branca, o dourado
   * vira preto.
   *
   * De propósito sem `threshold`. Binarizar joga fora o antialiasing do
   * original, e como o recorte nativo tem só ~250px, ampliar uma imagem
   * puramente preto-e-branco para 512 deixava a borda do G serrilhada. Com a
   * curva de contraste, a transição continua suave e vira alpha de verdade.
   */
  const invertida = await sharp(miolo)
    .greyscale()
    .normalise()
    .linear(3.2, -235)
    .negate()
    .png()
    .toBuffer();

  /*
   * Segundo passo em pipeline separado, e não encadeado: o sharp não soma duas
   * chamadas de `linear`, a última simplesmente substitui a primeira.
   *
   * O dourado do original tem degradê, e o canto mais escuro dele não chegava a
   * zero: sobrava um retângulo acinzentado no fundo. Esta curva zera o resíduo
   * sem comer a borda suave da letra.
   */
  return sharp(invertida).linear(1.6, -60).png().toBuffer();
}

/** Letra branca com fundo transparente, no tamanho pedido. */
async function letraBranca(mascara, lado) {
  const alfa = await sharp(mascara)
    .resize(lado, lado, { fit: "contain", background: "#000" })
    .greyscale()
    .raw()
    .toBuffer();

  return sharp({
    create: { width: lado, height: lado, channels: 3, background: "#ffffff" },
  })
    .joinChannel(alfa, { raw: { width: lado, height: lado, channels: 1 } })
    .png()
    .toBuffer();
}

/** Quadrado preto de cantos arredondados, para servir de fundo. */
function fundoPreto(lado, raio) {
  return Buffer.from(
    `<svg width="${lado}" height="${lado}"><rect width="${lado}" height="${lado}" rx="${raio}" fill="${PRETO}"/></svg>`,
  );
}

/**
 * Ícone monocromático. `margem` é a folga ao redor da letra: em 16px a letra
 * precisa quase encostar na borda para continuar legível, já em 512px a folga
 * é o que faz parecer um ícone de app.
 */
async function iconeMono(mascara, lado, { fundo = true, margem = 0.14, raio = 0.22 } = {}) {
  const letraLado = Math.round(lado * (1 - margem * 2));
  const letra = await letraBranca(mascara, letraLado);
  const desloc = Math.round((lado - letraLado) / 2);

  const base = fundo
    ? sharp(fundoPreto(lado, Math.round(lado * raio)))
    : sharp({
        create: { width: lado, height: lado, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
      });

  return base
    .composite([{ input: letra, top: desloc, left: desloc }])
    .png()
    .toBuffer();
}

async function main() {
  const icone = await extrairIcone();
  const mascara = await mascaraDaLetra(icone);
  const gerados = [];

  const salvar = async (nome, buffer) => {
    await writeFile(join(OUT, nome), buffer);
    gerados.push(`${nome}  ${Math.round(buffer.length / 1024)} KB`);
  };

  // ------------------------------------------------------------- dourado --
  await salvar("icon.png", await sharp(icone).resize(512, 512, { fit: "cover" }).png().toBuffer());
  await salvar("icon-192.png", await sharp(icone).resize(192, 192, { fit: "cover" }).png().toBuffer());
  await salvar(
    "icon-maskable.png",
    await sharp(icone)
      .resize(620, 620, { fit: "cover" })
      .extract({ left: 54, top: 54, width: 512, height: 512 })
      .png()
      .toBuffer(),
  );

  // -------------------------------------------- monocromático (aba/favicon) --
  // Quanto menor, menos margem: em 16px qualquer folga come a letra.
  await salvar("favicon-16.png", await iconeMono(mascara, 16, { margem: 0.06, raio: 0.15 }));
  await salvar("favicon.png", await iconeMono(mascara, 32, { margem: 0.08, raio: 0.18 }));
  await salvar("favicon-48.png", await iconeMono(mascara, 48, { margem: 0.1, raio: 0.2 }));
  await salvar("icon-mono-preto.png", await iconeMono(mascara, 512));
  await salvar("icon-mono.png", await iconeMono(mascara, 512, { fundo: false, margem: 0.08 }));

  // -------------------------------------------------------------- lockup --
  await salvar(
    "logo-genipse.png",
    await sharp(ORIGEM).trim({ threshold: 12 }).resize({ width: 900 }).png().toBuffer(),
  );

  console.log("Marca gerada:");
  gerados.forEach((g) => console.log("  " + g));
}

main().catch((e) => {
  console.error("Falhou:", e.message);
  process.exit(1);
});
