import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import webpush from "web-push";
import { concluido, devocionalPorId, proximoDia } from "@/lib/devocionais";

/**
 * O lembrete do devocional, uma vez por dia às 20h de Brasília (ver
 * `vercel.json`), só para quem ligou o lembrete e ainda não abriu o
 * devocional hoje. Quem já fez o dia não recebe nada: lembrete que chega
 * depois da tarefa feita ensina a ignorar o lembrete.
 *
 * Protegido como /api/avisos/versiculo: a Vercel manda `Authorization:
 * Bearer $CRON_SECRET`, e a mesma senha vai para o banco.
 */

export const runtime = "nodejs";
export const maxDuration = 30;

type Destino = {
  endpoint: string;
  chave_p256dh: string;
  chave_auth: string;
  /** Séries com algum dia feito, da mexida mais recente para a mais antiga. */
  series: { id: string; feitos: number[] }[];
};

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

  const banco = createClient(url, anon, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await banco.rpc("destinos_lembrete_devocional", { p_segredo: segredo });
  if (error) {
    console.error("destinos_lembrete_devocional", error.message);
    return NextResponse.json({ erro: "Falha ao buscar destinos." }, { status: 502 });
  }

  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || "mailto:avisos@genipse.app",
    publica,
    privada,
  );

  let enviados = 0;
  await Promise.all(
    ((data ?? []) as Destino[]).map(async (d) => {
      // A série em andamento mais recente. Série que saiu do app, ou que a
      // pessoa terminou, não gera lembrete.
      const andamento = d.series
        .map((s) => ({ serie: devocionalPorId(s.id), progresso: { feitos: s.feitos, atualizadoEm: 0 } }))
        .find(({ serie, progresso }) => serie && !concluido(serie, progresso));
      if (!andamento?.serie) return;

      const { serie, progresso } = andamento;
      const n = proximoDia(serie, progresso);
      const payload = JSON.stringify({
        title: serie.titulo,
        body: `Dia ${n} de ${serie.dias.length}: ${serie.dias[n - 1].titulo}. Ainda dá tempo hoje, são uns 15 minutos.`,
        // Abre direto no momento guiado, que é o que o lembrete está chamando para fazer.
        url: `/devocional/${serie.id}/${n}?momento=1`,
        tag: "lembrete-devocional",
      });

      try {
        await webpush.sendNotification(
          { endpoint: d.endpoint, keys: { p256dh: d.chave_p256dh, auth: d.chave_auth } },
          payload,
          // Vale até a meia-noite: o lembrete de hoje não serve amanhã.
          { TTL: 60 * 60 * 4, urgency: "normal" },
        );
        enviados++;
      } catch (e) {
        const status = (e as { statusCode?: number }).statusCode;
        if (status !== 404 && status !== 410) {
          console.error("push lembrete", status, (e as Error).message);
        }
      }
    }),
  );

  return NextResponse.json({ enviados });
}
