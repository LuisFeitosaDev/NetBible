/**
 * Confere a configuração de autenticação do projeto sem precisar entrar numa
 * conta Google de verdade: vai até o ponto em que o navegador seria redirecionado
 * e inspeciona a URL montada.
 *
 * Rode com:  npm run teste:auth
 */
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    }),
);

const URL_SB = env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const APP = process.argv[2] ?? "https://net-bible.vercel.app";

let falhas = 0;
const ok = (n, cond, extra = "") => {
  if (!cond) falhas++;
  console.log(`${cond ? "  ok " : "  XX "}${n}${extra ? "  → " + extra : ""}`);
};

const cliente = () =>
  createClient(URL_SB, KEY, { auth: { persistSession: false, autoRefreshToken: false } });

async function main() {
  console.log(`\n# app: ${APP}`);

  // ---------------------------------------------------------------- anônimo --
  console.log("\n# login anônimo");
  const c = cliente();
  const anon = await c.auth.signInAnonymously();
  ok("cria sessão anônima", !anon.error, anon.error?.message);
  if (anon.error) return;

  // ------------------------------------------------------ redirect do Google --
  console.log("\n# login com Google");
  const login = await c.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${APP}/auth/callback?next=%2Fgrupos`,
      skipBrowserRedirect: true,
      queryParams: { prompt: "select_account" },
    },
  });
  ok("provedor responde", !login.error, login.error?.message);

  if (login.data?.url) {
    // A URL que o Supabase devolve ainda aponta para ele mesmo; seguimos o
    // redirecionamento para ver o que chega de fato no Google.
    const r = await fetch(login.data.url, { redirect: "manual" });
    const destino = r.headers.get("location") ?? "";
    ok("Supabase redireciona para o Google", destino.includes("accounts.google.com"),
       destino ? destino.slice(0, 60) + "..." : `HTTP ${r.status} ${(await r.text()).slice(0, 120)}`);

    if (destino.includes("accounts.google.com")) {
      const q = new URL(destino).searchParams;
      const clientId = q.get("client_id") ?? "";
      ok("client_id preenchido", clientId.length > 10, clientId.slice(0, 28) + "...");
      ok(
        "redirect_uri aponta para o Supabase",
        q.get("redirect_uri") === `${URL_SB}/auth/v1/callback`,
        q.get("redirect_uri") ?? "",
      );
      ok("pede escolha de conta", q.get("prompt") === "select_account");
    }
  }

  // ------------------------------------------------------------ manual linking --
  console.log("\n# vínculo da conta anônima (manual linking)");
  const vinculo = await c.auth.linkIdentity({
    provider: "google",
    options: { redirectTo: `${APP}/auth/callback`, skipBrowserRedirect: true },
  });
  const ligado = !vinculo.error;
  ok("linkIdentity disponível", ligado, vinculo.error?.message);
  if (ligado) {
    console.log("     → quem usou o app sem conta NÃO perde marcações ao entrar com Google");
  } else {
    console.log("     → sem isso, entrar com Google cria um usuário novo e o anônimo fica para trás");
  }

  // ------------------------------------------------------ URLs de retorno ------
  console.log("\n# URLs de retorno permitidas");
  const proibida = "https://exemplo-nao-permitido.com/auth/callback";
  const teste = await c.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: proibida, skipBrowserRedirect: true },
  });
  if (teste.data?.url) {
    const r = await fetch(teste.data.url, { redirect: "manual" });
    const loc = r.headers.get("location") ?? "";
    // Se o Supabase mandar para o Google mesmo com uma URL não permitida, ele
    // silenciosamente troca pelo Site URL depois. Isso não é erro, só não dá
    // para verificar a allowlist de fora; fica registrado.
    console.log(
      `  ..  allowlist não é verificável por aqui (resposta: ${loc ? "redirecionou" : "HTTP " + r.status})`,
    );
  }

  console.log(`\n${falhas === 0 ? "TUDO CERTO" : falhas + " FALHA(S)"}`);
  process.exit(falhas === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error("quebrou:", e);
  process.exit(1);
});
