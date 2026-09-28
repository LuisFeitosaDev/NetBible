/**
 * Manda um aviso avulso, por push, para todo mundo que já tem notificação
 * ligada. Feito para anúncios pontuais ("as notificações foram atualizadas"),
 * não para rotina — o mural (lib/grupoEventos.ts) e o versículo do dia
 * (api/avisos/versiculo) já cobrem o dia a dia.
 *
 *   PowerShell:
 *     $env:SUPABASE_SERVICE_KEY="..."; node --env-file=.env.local scripts/avisar-todos.mjs "Sua mensagem aqui"
 *   Bash:
 *     SUPABASE_SERVICE_KEY=... node --env-file=.env.local scripts/avisar-todos.mjs "Sua mensagem aqui"
 *
 * A chave `service_role` vem do ambiente, nunca de arquivo: ela ignora o RLS,
 * e é o único jeito de ler `push_inscricoes` de todo mundo de uma vez (a API
 * normal só deixa cada um ler a própria). Pegue em Supabase > Project
 * Settings > API > service_role. Feche o terminal depois, ou limpe a
 * variável — não a salve em lugar nenhum.
 *
 * As chaves VAPID vêm do .env.local, as mesmas que a Vercel usa para
 * assinar os pushes do resto do app.
 */
import { createClient } from "@supabase/supabase-js";
import webpush from "web-push";

const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const CHAVE = process.env.SUPABASE_SERVICE_KEY;
const VAPID_PUBLICA = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const VAPID_PRIVADA = process.env.VAPID_PRIVATE_KEY;
const VAPID_SUJEITO = process.env.VAPID_SUBJECT || "mailto:avisos@genipse.app";

const mensagem = process.argv[2];
const url = process.argv[3] || "/";

function conferirAmbiente() {
  const faltando = [];
  if (!URL_BASE) faltando.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!VAPID_PUBLICA) faltando.push("NEXT_PUBLIC_VAPID_PUBLIC_KEY");
  if (!VAPID_PRIVADA) faltando.push("VAPID_PRIVATE_KEY");
  if (faltando.length) {
    console.error(`Falta ${faltando.join(", ")} no .env.local.`);
    console.error("Rode com:  node --env-file=.env.local scripts/avisar-todos.mjs \"mensagem\"");
    process.exit(1);
  }
  if (!CHAVE) {
    console.error("Falta SUPABASE_SERVICE_KEY no ambiente.\n");
    console.error("  PowerShell:  $env:SUPABASE_SERVICE_KEY=\"...\"; node --env-file=.env.local scripts/avisar-todos.mjs \"mensagem\"");
    console.error("  Bash:        SUPABASE_SERVICE_KEY=... node --env-file=.env.local scripts/avisar-todos.mjs \"mensagem\"\n");
    console.error("Pegue em: Supabase > Project Settings > API > service_role");
    console.error("Não salve essa chave em arquivo nenhum.");
    process.exit(1);
  }
  if (!mensagem) {
    console.error('Uso: node --env-file=.env.local scripts/avisar-todos.mjs "mensagem" [url]');
    process.exit(1);
  }
}

async function main() {
  conferirAmbiente();

  const banco = createClient(URL_BASE, CHAVE, { auth: { persistSession: false } });
  const { data, error } = await banco.from("push_inscricoes").select("endpoint, chave_p256dh, chave_auth");
  if (error) {
    console.error("Falha ao buscar inscrições:", error.message);
    process.exit(1);
  }
  if (!data.length) {
    console.log("Ninguém com notificação ligada ainda.");
    return;
  }

  webpush.setVapidDetails(VAPID_SUJEITO, VAPID_PUBLICA, VAPID_PRIVADA);
  const payload = JSON.stringify({ title: "Genipse Bible", body: mensagem, url, tag: "aviso-geral" });

  let enviados = 0;
  let mortos = 0;
  await Promise.all(
    data.map(async (d) => {
      try {
        await webpush.sendNotification(
          { endpoint: d.endpoint, keys: { p256dh: d.chave_p256dh, auth: d.chave_auth } },
          payload,
          { TTL: 60 * 60 * 24 },
        );
        enviados++;
      } catch (e) {
        if (e.statusCode === 404 || e.statusCode === 410) mortos++;
        else console.error("  falha:", e.statusCode, e.message);
      }
    }),
  );

  console.log(`Enviado para ${enviados} de ${data.length} aparelhos.`);
  if (mortos) console.log(`${mortos} inscrições antigas (aparelho não usa mais o app), ignoradas.`);
}

main();
