"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Bell, X } from "lucide-react";
import { db } from "@/lib/db";
import { membrosDoGrupo } from "@/lib/grupos/api";
import { sb, supabaseConfigurado } from "@/lib/grupos/supabase";
import {
  definirNaoVistos,
  destinoDoAviso,
  eventoParaMim,
  eventosDoGrupo,
  ouvirEventos,
  somarNaoVisto,
  textoDoAviso,
  vistoEm,
} from "@/lib/grupoEventos";

type Aviso = { id: string; texto: string; destino: string };

/**
 * Os avisos do grupo de leitura, em qualquer tela do app: um balão quando
 * alguém grifa, bate a meta ou te cutuca, e uma notificação do sistema se o
 * app estiver em segundo plano (e a pessoa tiver deixado).
 */
export function AvisosDoGrupo() {
  const plano = useLiveQuery(() => db.planos.get("atual"), []);
  const grupoId = plano?.grupoId;
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;
  const [aviso, setAviso] = useState<Aviso | null>(null);

  useEffect(() => {
    if (!grupoId || !supabaseConfigurado) return;
    let vivo = true;
    let meuId: string | undefined;
    const nomes = new Map<string, string>();

    const carregarNomes = async () => {
      const membros = await membrosDoGrupo(grupoId);
      membros.forEach((m) => nomes.set(m.perfil_id, m.profiles?.nome ?? "Alguém"));
    };

    (async () => {
      meuId = (await sb().auth.getSession()).data.session?.user?.id;
      await carregarNomes();
      const desde = vistoEm();
      const eventos = await eventosDoGrupo(grupoId, 30);
      if (vivo) {
        definirNaoVistos(
          eventos.filter((e) => eventoParaMim(e, meuId) && new Date(e.criado_em).getTime() > desde)
            .length,
        );
      }
    })().catch(() => {});

    const parar = ouvirEventos(grupoId, async (e) => {
      if (!eventoParaMim(e, meuId)) return;
      if (!nomes.has(e.perfil_id)) await carregarNomes().catch(() => {});
      const texto = textoDoAviso(e, nomes.get(e.perfil_id) ?? "Alguém");

      // Na Jornada o card do grupo já mostra o evento chegando ao vivo.
      if (!pathnameRef.current.startsWith("/biblioteca")) {
        somarNaoVisto();
        setAviso({ id: e.id, texto, destino: destinoDoAviso(e) });
      }

      if (
        document.visibilityState === "hidden" &&
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
        const registro = await navigator.serviceWorker?.ready;
        void registro?.showNotification("Genipse Bible", {
          body: texto,
          icon: "/icon.png",
          tag: e.id,
          data: { url: destinoDoAviso(e) },
        });
      }
    });

    return () => {
      vivo = false;
      parar();
    };
  }, [grupoId]);

  useEffect(() => {
    if (!aviso) return;
    const t = setTimeout(() => setAviso(null), 6000);
    return () => clearTimeout(t);
  }, [aviso]);

  if (!aviso) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-[60] flex justify-center px-4 pt-[env(safe-area-inset-top)]">
      <div className="pointer-events-auto flex w-full max-w-sm animate-rise items-center gap-3 rounded-2xl border border-white/12 bg-ink-850/95 p-3 shadow-2xl shadow-black/50 backdrop-blur-xl">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold-400/15 text-gold-400">
          <Bell size={17} />
        </span>
        <Link
          href={aviso.destino}
          onClick={() => setAviso(null)}
          className="min-w-0 flex-1 text-[13px] font-semibold leading-snug text-white"
        >
          {aviso.texto}
        </Link>
        <button
          onClick={() => setAviso(null)}
          aria-label="Fechar aviso"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-400 hover:bg-white/10 hover:text-white"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
