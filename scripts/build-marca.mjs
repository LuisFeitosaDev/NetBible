/**
 * Gera todas as variantes da marca a partir de `Logo Nova.jpeg` (o G-livro
 * dourado sobre preto).
 *
 * Ícones do app e do navegador:
 *   public/icon.png              512  ícone do app (PWA, "Adicionar à tela")
 *   public/icon-192.png          192  idem, menor
 *   public/icon-maskable.png     512  com folga para a máscara redonda do Android
 *   public/apple-touch-icon.png  180  iPhone
 *   public/favicon.png            32  aba do navegador
 *   public/favicon-16.png         16  idem
 *   public/favicon-48.png         48  idem
 *   public/icon-email.png         80  cabeçalho dos e-mails
 *
 * A marca solta, para usar em qualquer lugar:
 *   public/marca.png            dourada, fundo transparente (telas escuras)
 *   public/marca-escura.png     dourado profundo, transparente (fundos claros)
 *   public/icon-mono.png        branca, transparente
 *   public/icon-mono-preto.png  branca em quadrado preto
 *   public/logo-fundo-preto.png 1024  dourada em fundo preto
 *   public/logo-fundo-branco.png 1024 dourado profundo em fundo branco
 *
 * O lockup com "Genipse / BIBLE" e a imagem de prévia de link (og-image.png)
 * precisam da fonte Outfit, que só existe no navegador: saem do navegador.
 *
 * Rode com:  npm run marca
 */
import { writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ORIGEM = join(ROOT, "Logo Nova.jpeg");
const OUT = join(ROOT, "public");

const PRETO = "#0b0a0e";

/**
 * Recorta a marca do fundo preto do JPEG, com borda suave.
 *
 * O alpha sai do canal mais claro de cada pixel: o preto do fundo (com o
 * ruído do JPEG, até ~18) vira transparente, e qualquer dourado acima de ~70
 * vira opaco — inclusive a lombada, que é a parte mais escura do desenho. No
 * meio fica o antialiasing da borda. A cor é "despremultiplicada" (dividida
 * pelo alpha) para a borda não ficar encardida de preto quando a marca for
 * posta sobre fundo claro.
 */
async function recortarMarca() {
  const { data, info } = await sharp(ORIGEM).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: L, height: A } = info;
  const saida = Buffer.alloc(L * A * 4);
  let x0 = L, y0 = A, x1 = 0, y1 = 0;

  for (let i = 0, p = 0; i < L * A; i++, p += 3) {
    const r = data[p], g = data[p + 1], b = data[p + 2];
    const alfa = Math.min(1, Math.max(0, (Math.max(r, g, b) - 18) / 52));
    const o = i * 4;
    if (alfa > 0) {
      saida[o] = Math.min(255, Math.round(r / alfa));
      saida[o + 1] = Math.min(255, Math.round(g / alfa));
      saida[o + 2] = Math.min(255, Math.round(b / alfa));
      saida[o + 3] = Math.round(alfa * 255);
      if (alfa > 0.1) {
        const x = i % L, y = Math.floor(i / L);
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }

  const folga = 4;
  return sharp(saida, { raw: { width: L, height: A, channels: 4 } })
    .extract({
      left: Math.max(0, x0 - folga),
      top: Math.max(0, y0 - folga),
      width: Math.min(L, x1 + folga) - Math.max(0, x0 - folga),
      height: Math.min(A, y1 + folga) - Math.max(0, y0 - folga),
    })
    .png()
    .toBuffer();
}

/** Troca a cor mantendo o alpha: branco, preto, ou o dourado escurecido. */
async function recolorir(marca, cor) {
  const { data, info } = await sharp(marca).raw().toBuffer({ resolveWithObject: true });
  for (let p = 0; p < data.length; p += 4) {
    if (cor === "ambar") {
      // Dourado profundo para fundo branco. Escurecer por igual os três canais
      // puxava para o verde-oliva; tirando mais do azul e do verde, fica âmbar.
      data[p] = Math.round(data[p] * 0.86);
      data[p + 1] = Math.round(data[p + 1] * 0.64);
      data[p + 2] = Math.round(data[p + 2] * 0.3);
    } else {
      [data[p], data[p + 1], data[p + 2]] = cor;
    }
  }
  return sharp(data, { raw: info }).png().toBuffer();
}

/** A marca encaixada numa caixa de `lado` × `alturaDaMarca`, centralizada. */
async function marcaNoTamanho(marca, altura) {
  return sharp(marca).resize({ height: altura, fit: "inside" }).png().toBuffer();
}

/**
 * Fundo de ícone: quase-preto com um brilho dourado bem fraco atrás da marca.
 * É o brilho que tira a cara de "PNG num quadrado preto" e dá o acabamento.
 */
function fundoDeIcone(lado, { raio = 0, brilho = true, cor = PRETO } = {}) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${lado}" height="${lado}">
  <defs>
    <radialGradient id="b" cx="50%" cy="46%" r="55%">
      <stop offset="0%" stop-color="#f5c45e" stop-opacity="${brilho ? 0.16 : 0}"/>
      <stop offset="100%" stop-color="#f5c45e" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="f" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${cor === PRETO ? "#15121a" : cor}"/>
      <stop offset="100%" stop-color="${cor}"/>
    </linearGradient>
  </defs>
  <rect width="${lado}" height="${lado}" rx="${raio}" fill="url(#f)"/>
  <rect width="${lado}" height="${lado}" rx="${raio}" fill="url(#b)"/>
</svg>`);
}

async function icone(marca, lado, { proporcao = 0.64, raio = 0, brilho = true, cor = PRETO } = {}) {
  let m = await marcaNoTamanho(marca, Math.round(lado * proporcao));
  // Reduzida a poucos pixels a marca amolece; um pouco de nitidez devolve o traço.
  if (lado <= 48) m = await sharp(m).sharpen({ sigma: 0.6 }).png().toBuffer();
  const meta = await sharp(m).metadata();
  return sharp(fundoDeIcone(lado, { raio: Math.round(lado * raio), brilho, cor }))
    .composite([
      {
        input: m,
        left: Math.round((lado - meta.width) / 2),
        // Um tico acima do centro: o livro tem mais peso visual embaixo.
        top: Math.round((lado - meta.height) / 2 - lado * 0.01),
      },
    ])
    .png()
    .toBuffer();
}

/** Só a marca, transparente, com a altura pedida. */
async function soltaTransparente(marca, altura) {
  return sharp(await marcaNoTamanho(marca, altura)).png({ compressionLevel: 9 }).toBuffer();
}

async function main() {
  const marca = await recortarMarca();
  const escura = await recolorir(marca, "ambar");
  const branca = await recolorir(marca, [255, 255, 255]);
  const gerados = [];

  const salvar = async (nome, buffer) => {
    await writeFile(join(OUT, nome), buffer);
    gerados.push(`${nome.padEnd(24)} ${Math.round(buffer.length / 1024)} KB`);
  };

  // --------------------------------------------------- ícones do app -----
  await salvar("icon.png", await icone(marca, 512));
  await salvar("icon-192.png", await icone(marca, 192));
  await salvar("apple-touch-icon.png", await icone(marca, 180));
  // A máscara do Android pode cortar até um círculo de 80%: a marca fica
  // dentro dele com folga.
  await salvar("icon-maskable.png", await icone(marca, 512, { proporcao: 0.5 }));
  await salvar("icon-email.png", await icone(marca, 80, { proporcao: 0.66, raio: 0.22 }));

  // -------------------------------------------------------- favicon ------
  // Pequeno, a marca ocupa quase tudo: qualquer folga em 16px come o desenho.
  await salvar("favicon-16.png", await icone(marca, 16, { proporcao: 0.9, raio: 0.18, brilho: false }));
  await salvar("favicon.png", await icone(marca, 32, { proporcao: 0.86, raio: 0.2, brilho: false }));
  await salvar("favicon-48.png", await icone(marca, 48, { proporcao: 0.82, raio: 0.22 }));

  // ------------------------------------------------------ marca solta ----
  await salvar("marca.png", await soltaTransparente(marca, 512));
  await salvar("marca-escura.png", await soltaTransparente(escura, 512));
  await salvar("icon-mono.png", await soltaTransparente(branca, 512));
  await salvar(
    "icon-mono-preto.png",
    await (async () => {
      const m = await marcaNoTamanho(branca, Math.round(512 * 0.64));
      const meta = await sharp(m).metadata();
      return sharp(fundoDeIcone(512, { raio: 112, brilho: false }))
        .composite([{ input: m, left: Math.round((512 - meta.width) / 2), top: Math.round((512 - meta.height) / 2) }])
        .png()
        .toBuffer();
    })(),
  );
  await salvar("logo-fundo-preto.png", await icone(marca, 1024, { proporcao: 0.62 }));
  await salvar(
    "logo-fundo-branco.png",
    await icone(escura, 1024, { proporcao: 0.62, brilho: false, cor: "#ffffff" }),
  );

  console.log("Marca gerada:");
  gerados.forEach((g) => console.log("  " + g));
}

main().catch((e) => {
  console.error("Falhou:", e.message);
  process.exit(1);
});
