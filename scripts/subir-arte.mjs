/**
 * Envia a arte de capítulo para o Supabase Storage.
 *
 *   npm run arte:subir           envia só o que mudou
 *   npm run arte:subir -- --tudo reenvia tudo
 *
 * O bucket "arte" é criado sozinho na primeira execução, como público, porque
 * a chave que sobe arquivo é a mesma que cria bucket.
 *
 * A chave de escrita vem do ambiente, nunca de arquivo:
 *
 *   Bash:        SUPABASE_SERVICE_KEY=... npm run arte:subir
 *   PowerShell:  $env:SUPABASE_SERVICE_KEY="..."; npm run arte:subir
 *
 * Ela ignora o RLS e dá acesso total ao projeto. Não entra no `.env.local`,
 * não entra em nada com prefixo NEXT_PUBLIC_ e não entra no git. Feche o
 * terminal depois, ou limpe a variável.
 *
 * O envio é idempotente: guarda o hash de cada arquivo em
 * `sources/arte-enviada.json` e pula o que não mudou, então rodar de novo
 * depois de gerar mais capítulos só manda os novos.
 */
import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const LOCAL = join(ROOT, "public", "capas", "capitulo");
const REGISTRO = join(ROOT, "sources", "arte-enviada.json");

const BUCKET = "arte";
const TUDO = process.argv.includes("--tudo");

const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const CHAVE = process.env.SUPABASE_SERVICE_KEY;

const TIPOS = { ".avif": "image/avif", ".webp": "image/webp" };

function conferirAmbiente() {
  if (!URL_BASE) {
    console.error("Falta NEXT_PUBLIC_SUPABASE_URL. Ele está no .env.local.");
    console.error("Rode com:  node --env-file=.env.local scripts/subir-arte.mjs");
    process.exit(1);
  }
  if (!CHAVE) {
    console.error("Falta SUPABASE_SERVICE_KEY no ambiente.");
    console.error("");
    console.error("  PowerShell:  $env:SUPABASE_SERVICE_KEY=\"...\"; npm run arte:subir");
    console.error("  Bash:        SUPABASE_SERVICE_KEY=... npm run arte:subir");
    console.error("");
    console.error("Pegue em: Supabase > Project Settings > API > service_role");
    console.error("Não salve essa chave em arquivo nenhum.");
    process.exit(1);
  }
}

const hash = (b) => createHash("sha1").update(b).digest("hex").slice(0, 16);

async function lerRegistro() {
  try {
    return JSON.parse(await readFile(REGISTRO, "utf8"));
  } catch {
    return {};
  }
}

/**
 * Sobe um arquivo. `x-upsert` faz o caminho ser sobrescrito em vez de dar
 * conflito, que é o que queremos quando uma arte é regerada com outro corte.
 */
async function enviar(caminho, bytes, tipo) {
  const url = `${URL_BASE}/storage/v1/object/${BUCKET}/${caminho}`;
  for (let i = 0; i < 4; i++) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CHAVE}`,
        "Content-Type": tipo,
        "Cache-Control": "public, max-age=31536000, immutable",
        "x-upsert": "true",
      },
      body: bytes,
    });
    if (res.ok) return null;

    const texto = await res.text().catch(() => "");
    // Bucket ausente é configuração, e `garantirBucket` já deveria ter
    // resolvido. Repetir não ajuda.
    if (res.status === 400 && texto.includes("Bucket not found")) {
      return `bucket "${BUCKET}" não existe`;
    }
    if (res.status === 401 || res.status === 403) {
      return `chave recusada (${res.status}); confira a service_role`;
    }
    if (i === 3) return `HTTP ${res.status} ${texto.slice(0, 120)}`;
    await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
  }
  return "falhou";
}

/**
 * Cria o bucket se ele ainda não existir.
 *
 * A chave que sobe arquivo é a mesma que cria bucket, então mandar a pessoa
 * abrir o painel para um clique é passo manual à toa, e um passo que dá para
 * esquecer, como de fato aconteceu na primeira tentativa.
 *
 * `public: true` é intencional e é o ponto todo: são gravuras de domínio
 * público exibidas para qualquer visitante, e uma URL assinada por imagem
 * exigiria uma ida ao servidor a cada capítulo aberto.
 */
async function garantirBucket() {
  const cabecalho = {
    Authorization: `Bearer ${CHAVE}`,
    "Content-Type": "application/json",
  };

  const existe = await fetch(`${URL_BASE}/storage/v1/bucket/${BUCKET}`, {
    headers: cabecalho,
  });
  if (existe.ok) return null;
  if (existe.status === 401 || existe.status === 403) {
    return `chave recusada (${existe.status}); confira a service_role`;
  }

  const criado = await fetch(`${URL_BASE}/storage/v1/bucket`, {
    method: "POST",
    headers: cabecalho,
    body: JSON.stringify({
      id: BUCKET,
      name: BUCKET,
      public: true,
      allowed_mime_types: Object.values(TIPOS),
      // As faixas ficam abaixo de 200 KB; o teto é folga, não expectativa.
      file_size_limit: 5 * 1024 * 1024,
    }),
  });

  if (criado.ok) {
    console.log(`Bucket "${BUCKET}" criado como público.`);
    return null;
  }

  const texto = await criado.text().catch(() => "");
  // Corrida entre duas execuções simultâneas: o bucket já está lá, tudo bem.
  if (texto.includes("already exists")) return null;
  return `não consegui criar o bucket: HTTP ${criado.status} ${texto.slice(0, 160)}`;
}

async function main() {
  conferirAmbiente();

  const nomes = (await readdir(LOCAL)).filter((n) => /\.(avif|webp)$/.test(n));
  if (!nomes.length) {
    console.log("Nada em public/capas/capitulo. Rode `npm run capitulos` antes.");
    return;
  }

  const problema = await garantirBucket();
  if (problema) {
    console.error(problema);
    process.exitCode = 1;
    return;
  }

  const registro = TUDO ? {} : await lerRegistro();
  const novoRegistro = { ...registro };

  let enviados = 0;
  let pulados = 0;
  let bytesEnviados = 0;
  const falhas = [];

  console.log(`${nomes.length} arquivos locais. Bucket "${BUCKET}".`);

  for (const nome of nomes) {
    const bytes = await readFile(join(LOCAL, nome));
    const h = hash(bytes);
    const caminho = `capitulo/${nome}`;

    if (registro[caminho] === h) {
      pulados++;
      continue;
    }

    const ext = nome.slice(nome.lastIndexOf("."));
    const erro = await enviar(caminho, bytes, TIPOS[ext]);

    if (erro) {
      falhas.push(`${nome}: ${erro}`);
      // Erro de bucket ou de chave vale para todos: para na hora.
      if (erro.includes("bucket") || erro.includes("chave")) break;
      continue;
    }

    novoRegistro[caminho] = h;
    enviados++;
    bytesEnviados += bytes.length;
    if (enviados % 25 === 0) console.log(`  ${enviados} enviados...`);
  }

  await writeFile(REGISTRO, JSON.stringify(novoRegistro, null, 1));

  console.log(
    `\n${enviados} enviados (${(bytesEnviados / 1024 / 1024).toFixed(1)} MB), ` +
      `${pulados} já estavam lá, ${falhas.length} falharam.`,
  );
  if (falhas.length) {
    falhas.slice(0, 8).forEach((f) => console.log("  ! " + f));
    process.exitCode = 1;
    return;
  }

  console.log(`\nPronto. Aponte o app para o bucket com esta linha no .env.local:`);
  console.log(`  NEXT_PUBLIC_ARTE_CDN=${URL_BASE}/storage/v1/object/public/${BUCKET}`);
  console.log(`E a mesma variável nas Environment Variables da Vercel.`);
}

main().catch((e) => {
  console.error("Falhou:", e.message);
  process.exit(1);
});
