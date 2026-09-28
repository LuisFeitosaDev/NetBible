import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import webpush from "web-push";
import {
  destinoDoAviso,
  etiquetaDoAviso,
  textoDoAviso,
  type DadosDoEvento,
  type TipoDeEvento,
} from "@/lib/avisoTexto";

/**
 * Manda o push dos eventos do mural para os outros membros do grupo.
 *
 * Quem chama é o app de quem publicou, logo depois de gravar o evento, com a
 * própria sessão. Não usa a chave `service_role`: a função
 * `destinos_do_aviso` do banco só devolve destinos para eventos recentes do
 * próprio autor, e marca cada um como avisado, então ninguém consegue disparar
 * o mesmo aviso duas vezes nem avisar em nome de outra pessoa.
 */

export const runtime = "nodejs";

type Destino = {
  evento_id: string;
  perfil_id: string;
  tipo: TipoDeEvento;
  dados: DadosDoEvento;
  autor: string;
  endpoint: string;
  chave_p256dh: string;
  chave_auth: string;
};

const MAX_EVENTOS = 50;

export async function POST(req: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const publica = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privada = process.env.VAPID_PRIVATE_KEY;
  if (!url || !anon || !publica || !privada) {
    return NextResponse.json({ erro: "Push não configurado." }, { status: 503 });
  }

  const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return NextResponse.json({ erro: "Sem sessão." }, { status: 401 });

  let eventos: unknown;
  try {
    ({ eventos } = await req.json());
  } catch {
    return NextResponse.json({ erro: "Corpo inválido." }, { status: 400 });
  }
  if (
    !Array.isArray(eventos) ||
    !eventos.length ||
    eventos.length > MAX_EVENTOS ||
    !eventos.every((e) => typeof e === "string")
  ) {
    return NextResponse.json({ erro: "Lista de eventos inválida." }, { status: 400 });
  }

  // O cliente fala com o banco como a pessoa que publicou: o RLS e a checagem
  // de autoria dentro da função continuam valendo.
  const banco = createClient(url, anon, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await banco.rpc("destinos_do_aviso", { p_eventos: eventos });
  if (error) {
    console.error("destinos_do_aviso", error.message);
    return NextResponse.json({ erro: "Falha ao buscar destinos." }, { status: 502 });
  }

  // Um aviso por aparelho. Vários grifos da mesma leva viram uma frase só.
  const porAparelho = new Map<string, Destino[]>();
  for (const d of (data ?? []) as Destino[]) {
    const lista = porAparelho.get(d.endpoint) ?? [];
    lista.push(d);
    porAparelho.set(d.endpoint, lista);
  }

  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || "mailto:avisos@genipse.app",
    publica,
    privada,
  );

  let enviados = 0;
  await Promise.all(
    [...porAparelho.values()].map(async (lista) => {
      const [primeiro] = lista;
      const grifos = lista.filter((d) => d.tipo === "grifo");
      const corpo =
        grifos.length > 1 && grifos.length === lista.length
          ? `${primeiro.autor.trim().split(/\s+/)[0]} grifou ${grifos.length} versículos de ${primeiro.dados.livro} ${primeiro.dados.capitulo}`
          : textoDoAviso(primeiro, primeiro.autor);
      try {
        await webpush.sendNotification(
          {
            endpoint: primeiro.endpoint,
            keys: { p256dh: primeiro.chave_p256dh, auth: primeiro.chave_auth },
          },
          JSON.stringify({
            title: "Genipse Bible",
            body: corpo,
            url: destinoDoAviso(primeiro),
            tag: etiquetaDoAviso({ id: primeiro.evento_id, perfil_id: primeiro.perfil_id, tipo: primeiro.tipo }),
          }),
          // Cutucada de ontem não serve para nada: meio dia de validade basta.
          { TTL: 60 * 60 * 12, urgency: primeiro.tipo === "cutucada" ? "high" : "normal" },
        );
        enviados++;
      } catch (e) {
        // 404/410: o aparelho desinstalou o app ou revogou a permissão. A
        // inscrição morta fica no banco e custa só uma tentativa a mais por
        // aviso; apagá-la daqui exigiria deixar um membro apagar a do outro.
        const status = (e as { statusCode?: number }).statusCode;
        if (status !== 404 && status !== 410) console.error("push", status, (e as Error).message);
      }
    }),
  );

  return NextResponse.json({ enviados });
}
