import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import webpush from "web-push";
import { versiculoDoDia } from "@/lib/versiculoDoDia";

/**
 * O versículo do dia por push, uma vez ao dia (ver `vercel.json`).
 *
 * Só a Vercel Cron chama isto. A Vercel manda `Authorization: Bearer
 * $CRON_SECRET` sozinha quando essa variável existe no projeto — e a mesma
 * senha vai como parâmetro para `destinos_versiculo_diario`, então nem quem
 * tiver a chave anon (pública por natureza) consegue disparar o envio.
 *
 * Separado de /api/avisos (o mural do grupo) de propósito: um é avisado por
 * quem publica algo, na hora; este é avisado pelo relógio, uma vez por dia.
 */

export const runtime = "nodejs";
export const maxDuration = 30;

type Destino = { endpoint: string; chave_p256dh: string; chave_auth: string };

export async function GET(req: Request) {
  const segredo = process.env.CRON_SECRET;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const publica = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privada = process.env.VAPID_PRIVATE_KEY;
  if (!segredo || !url || !anon || !publica || !privada) {
    return NextResponse.json({ erro: "Não configurado." }, { status: 503 });
  }
  if (req.headers.get("authorization") !== `Bearer ${segredo}`) {
    return NextResponse.json({ erro: "Não autorizado." }, { status: 401 });
  }

  const pick = versiculoDoDia();
  // Busca pelo próprio domínio publicado, em vez de ler o arquivo do disco:
  // é o mesmo JSON estático que o navegador usa, sem depender de o build da
  // Vercel incluir `public/biblia` no pacote da função.
  const origem = new URL(req.url).origin;
  const [indice, conteudo] = await Promise.all([
    fetch(`${origem}/biblia/index.json`, { cache: "no-store" }).then((r) => r.json()),
    fetch(`${origem}/biblia/ara/${pick.slug}.json`, { cache: "no-store" }).then((r) => r.json()),
  ]);
  const livro = (indice.books as { slug: string; name: string }[]).find((b) => b.slug === pick.slug);
  const texto: string | undefined = conteudo.chapters?.[pick.chapter - 1]?.[pick.verse - 1];
  if (!livro || !texto) {
    console.error("versículo do dia não encontrado", pick);
    return NextResponse.json({ erro: "Versículo do dia não encontrado." }, { status: 500 });
  }

  const banco = createClient(url, anon, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await banco.rpc("destinos_versiculo_diario", { p_segredo: segredo });
  if (error) {
    console.error("destinos_versiculo_diario", error.message);
    return NextResponse.json({ erro: "Falha ao buscar destinos." }, { status: 502 });
  }

  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || "mailto:avisos@genipse.app",
    publica,
    privada,
  );

  const frase = `“${texto}” — ${livro.name} ${pick.chapter}:${pick.verse}`;
  const payload = JSON.stringify({
    title: "Versículo do dia",
    // Corta frases longas: o aviso do sistema não rola, só quebra linha.
    body: frase.length > 200 ? `${frase.slice(0, 197)}...` : frase,
    url: `/livro/${pick.slug}/${pick.chapter}?v=${pick.verse}`,
    // Mesma etiqueta todo dia: o aviso de ontem que ainda não foi lido some,
    // em vez de empilhar um por dia na central de notificações.
    tag: "versiculo-do-dia",
  });

  let enviados = 0;
  await Promise.all(
    ((data ?? []) as Destino[]).map(async (d) => {
      try {
        await webpush.sendNotification(
          { endpoint: d.endpoint, keys: { p256dh: d.chave_p256dh, auth: d.chave_auth } },
          payload,
          // Baixa prioridade e validade de um dia: não é urgente, e amanhã
          // tem outro.
          { TTL: 60 * 60 * 20, urgency: "low" },
        );
        enviados++;
      } catch (e) {
        const status = (e as { statusCode?: number }).statusCode;
        if (status !== 404 && status !== 410) {
          console.error("push versículo", status, (e as Error).message);
        }
      }
    }),
  );

  return NextResponse.json({ enviados });
}
