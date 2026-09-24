/**
 * Tratamento da arte de capítulo: apara, tira legenda, iguala o tom, corta
 * para a faixa e grava em AVIF e WebP.
 *
 * Vive separado de `build-capitulos.mjs` porque `adicionar-arte.mjs` (a
 * ferramenta para subir uma foto escolhida à mão) precisa do mesmo tratamento,
 * e duplicar a função é como as duas acabam divergindo sem ninguém notar.
 */
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

/*
 * 1000x434, e não 1200x520.
 *
 * A faixa aparece na largura da coluna de leitura, no máximo 672px de CSS.
 * Mesmo num celular 3x, 1000px de origem já passa do que a tela resolve, e o
 * que sobra é só peso.
 */
export const FAIXA = { width: 1000, height: 434 };

const WARM = { r: 214, g: 176, b: 116 };
const TARGET_MEAN = 104;

/** Mede o brilho e corrige tudo para a mesma faixa, como nas capas de livro. */
async function fator(buffer) {
  const { channels } = await sharp(buffer).greyscale().normalise().stats();
  return Math.min(1.7, Math.max(0.45, TARGET_MEAN / Math.max(channels[0].mean, 1)));
}

const tratar = (p, f) =>
  p.modulate({ saturation: 0 }).normalise().linear(f, 0).tint(WARM);

/**
 * Recebe a imagem original e devolve o PNG já cortado para a faixa.
 *
 * `ancoraY` é a fração da altura (0 a 1) onde o corte deve ficar centrado, para
 * quando o automático erra: ele procura a região de maior detalhe, e numa
 * prancha de figura inteira isso costuma ser o bordado da roupa, não o rosto.
 * Sem `ancoraY`, o corte segue essa busca automática.
 */
export async function faixa(buffer, ancoraY) {
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

  // Descarta o rodapé: várias gravuras trazem legenda impressa dentro do
  // próprio quadro, e o `attention` ia direto para lá, que é texto.
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

  // Corte pela região de maior interesse: pelo topo sobra só céu, pelo centro
  // decapita figuras. `attention` acerta a cena na maioria das gravuras.
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

/** Grava a mesma faixa em AVIF (o que o app usa) e WebP (reserva). */
export async function gravar(outDir, chave, banda) {
  await writeFile(
    join(outDir, `${chave}.avif`),
    await sharp(banda).avif({ quality: 48, effort: 4 }).toBuffer(),
  );
  await writeFile(
    join(outDir, `${chave}.webp`),
    await sharp(banda).webp({ quality: 62, effort: 6 }).toBuffer(),
  );
}
