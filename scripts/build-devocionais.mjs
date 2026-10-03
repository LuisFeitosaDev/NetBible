/**
 * Quebra os devocionais em um índice leve e um arquivo por série.
 *
 *   npm run devocionais
 *   src/lib/devocionais.indice.generated.ts   capas, títulos e leituras (vai no pacote)
 *   public/devocionais/<id>.json              o roteiro de cada dia (baixa sob demanda)
 *
 * Por que isso existe: com o roteiro completo (reflexão, oração guiada,
 * oração final), os 333 dias passam de um megabyte de texto. As páginas de
 * devocional são componentes de cliente, então importar os dados direto
 * jogaria tudo no pacote de cada uma. Assim, quem abre um dia baixa só a
 * série dele, como já acontece com as fichas de capítulo
 * (scripts/build-fichas.mjs).
 *
 * As citações de cada série vão junto, já na forma de cada tradução, vindas
 * de `src/lib/devocionais.citacoes.json` (ver scripts/alinhar-citacoes.mjs).
 *
 * A fonte continua sendo os `devocionais.*.ts`, escritos à mão. Este script
 * só converte, e roda no `prebuild`, então o JSON nunca fica atrás do
 * TypeScript. Em desenvolvimento, rode `npm run devocionais` depois de editar.
 */
import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Importa cada arquivo direto, e não `devocionais.ts`: o Node só resolve
// import com extensão, e os arquivos de conteúdo só importam tipos.
import { DEVOCIONAIS as CURTAS } from "../src/lib/devocionais.dados.ts";
import { TEMAS } from "../src/lib/devocionais.temas.ts";
import { PROVERBIOS_31 } from "../src/lib/devocionais.proverbios.ts";
import { TRINTA_DIAS } from "../src/lib/devocionais.30dias.ts";
import { MAIS } from "../src/lib/devocionais.mais.ts";
import { PERSONAGENS, RELACOES } from "../src/lib/devocionais.personagens.ts";

/** A ordem das prateleiras. `scripts/conferir-devocionais.mjs` usa a mesma. */
const DEVOCIONAIS = [TRINTA_DIAS, PROVERBIOS_31, ...CURTAS, ...TEMAS, ...MAIS, ...PERSONAGENS, ...RELACOES];

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "devocionais");
const INDICE = join(ROOT, "src", "lib", "devocionais.indice.generated.ts");

async function lerCitacoes() {
  try {
    return JSON.parse(await readFile(join(ROOT, "src", "lib", "devocionais.citacoes.json"), "utf8"));
  } catch {
    return {};
  }
}

/** Toda citação entre aspas retas de um dia: reflexão, guia, oração, pergunta e prática. */
function citacoesDoDia(dia) {
  const textos = [
    ...dia.reflexao,
    ...Object.values(dia.guia ?? {}),
    dia.oracao,
    dia.pergunta,
    dia.pratica,
  ];
  return textos.flatMap((t) => [...t.matchAll(/"([^"]*)"/g)].map((m) => m[1]));
}

async function main() {
  const todas = await lerCitacoes();

  // Recria o diretório, para uma série removida da fonte não ficar órfã aqui.
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  let bytes = 0;
  let semTraducao = 0;
  for (const d of DEVOCIONAIS) {
    const citacoes = {};
    for (const c of d.dias.flatMap(citacoesDoDia)) {
      // Só as formas: `ref` e `revisado` servem à manutenção, não ao app.
      const { nvi, acf, blivre } = todas[c] ?? {};
      if (nvi || acf || blivre) citacoes[c] = { nvi, acf, blivre };
      else semTraducao++;
    }
    const json = JSON.stringify({ dias: d.dias, citacoes });
    await writeFile(join(OUT, `${d.id}.json`), json);
    bytes += json.length;
  }

  const series = DEVOCIONAIS.map(({ dias, ...resto }) =>
    JSON.stringify({ ...resto, dias: dias.map(({ titulo, leitura }) => ({ titulo, leitura })) }),
  );
  await writeFile(
    INDICE,
    `// Gerado por scripts/build-devocionais.mjs — não edite à mão.\n` +
      `// A fonte são os src/lib/devocionais.*.ts; rode \`npm run devocionais\` depois de mudar.\n` +
      `import type { Serie } from "./devocionais";\n\n` +
      `export const SERIES: Serie[] = [\n${series.map((s) => `  ${s},`).join("\n")}\n];\n`,
  );

  const dias = DEVOCIONAIS.reduce((n, d) => n + d.dias.length, 0);
  console.log(
    `${DEVOCIONAIS.length} séries, ${dias} dias, ${(bytes / 1024).toFixed(0)} KB em public/devocionais.`,
  );
  if (semTraducao) {
    console.log(
      `${semTraducao} citação(ões) sem a forma das outras traduções: aparecem na ARA. ` +
        `Rode scripts/alinhar-citacoes.mjs.`,
    );
  }
}

main();
