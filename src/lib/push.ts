"use client";

/**
 * Avisos do grupo com o app fechado (Web Push).
 *
 * Sem isto o aviso só saía enquanto o app estava vivo: no celular, o sistema
 * congela o app logo depois de ele ir para o segundo plano, e aí a cutucada
 * não chegava. Com o push quem entrega é o navegador, mesmo com o app fechado.
 *
 * O caminho: cada aparelho registra a sua inscrição no Supabase; quem publica
 * no mural chama /api/avisos, e o servidor manda o push para os outros membros.
 */
import { sb, supabaseConfigurado } from "./grupos/supabase";

const CHAVE_PUBLICA = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

export const pushDisponivel = () =>
  Boolean(CHAVE_PUBLICA) &&
  supabaseConfigurado &&
  typeof window !== "undefined" &&
  "serviceWorker" in navigator &&
  "PushManager" in window &&
  "Notification" in window;

/** A chave VAPID vem em base64url; o navegador quer os bytes. */
function bytesDaChave(base64url: string) {
  const base64 = (base64url + "=".repeat((4 - (base64url.length % 4)) % 4))
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}

/**
 * Inscreve este aparelho e guarda a inscrição no Supabase. Seguro de chamar a
 * cada abertura do app: reaproveita a inscrição que já existe e só atualiza.
 */
export async function inscreverPush() {
  if (!pushDisponivel() || Notification.permission !== "granted") return false;
  // `getRegistration` antes do `ready`: em dev o service worker não é
  // registrado, e o `ready` sozinho ficaria esperando para sempre. Havendo
  // registro, o `ready` garante que ele já está ativo para aceitar a inscrição.
  if (!(await navigator.serviceWorker.getRegistration())) return false;
  const registro = await navigator.serviceWorker.ready;

  const inscricao =
    (await registro.pushManager.getSubscription()) ??
    (await registro.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: bytesDaChave(CHAVE_PUBLICA!),
    }));

  const { endpoint, keys } = inscricao.toJSON();
  if (!endpoint || !keys?.p256dh || !keys.auth) return false;

  const { error } = await sb().rpc("registrar_inscricao_push", {
    p_endpoint: endpoint,
    p_p256dh: keys.p256dh,
    p_auth: keys.auth,
  });
  if (error) throw error;
  return true;
}

/** Pede ao servidor para avisar o grupo destes eventos. Nunca atrapalha quem publicou. */
export function avisarPorPush(eventos: string[]) {
  if (!eventos.length || !supabaseConfigurado) return;
  void (async () => {
    const token = (await sb().auth.getSession()).data.session?.access_token;
    if (!token) return;
    await fetch("/api/avisos", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ eventos }),
      // Continua mesmo se a pessoa fechar o app logo depois de cutucar.
      keepalive: true,
    });
  })().catch(() => {});
}
