"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, TriangleAlert } from "lucide-react";
import { sb, supabaseConfigurado } from "@/lib/grupos/supabase";
import { garantirPerfilDoProvedor } from "@/lib/conta";
import { sincronizar } from "@/lib/sync";

/**
 * Retorno do Google.
 *
 * O supabase-js já troca o código por sessão sozinho ao carregar a página
 * (`detectSessionInUrl`). Aqui a gente só espera isso acontecer, garante que o
 * perfil existe com o nome vindo do provedor, sincroniza e devolve a pessoa
 * para onde ela estava.
 */
export default function CallbackPage() {
  const router = useRouter();
  const [falha, setFalha] = useState<string | null>(null);

  useEffect(() => {
    if (!supabaseConfigurado) {
      setFalha("Supabase não configurado.");
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const proximo = params.get("next") || "/grupos";

    // O Google devolve o erro na query quando a pessoa cancela ou nega acesso.
    const erroProvedor = params.get("error_description") || params.get("error");
    if (erroProvedor) {
      setFalha(decodeURIComponent(erroProvedor));
      return;
    }

    let vivo = true;
    let tentativas = 0;

    const concluir = async () => {
      const { data } = await sb().auth.getSession();

      if (!data.session) {
        // A troca do código por sessão é assíncrona; damos alguns ciclos.
        if (++tentativas > 25) {
          if (vivo) setFalha("Não consegui concluir o login. Tente de novo.");
          return;
        }
        setTimeout(concluir, 200);
        return;
      }

      try {
        await garantirPerfilDoProvedor();
        await sincronizar();
      } catch (e) {
        console.error("pós-login", e);
      }
      if (vivo) router.replace(proximo);
    };

    void concluir();
    return () => {
      vivo = false;
    };
  }, [router]);

  return (
    <div className="grid min-h-[60vh] place-items-center px-6">
      {falha ? (
        <div className="max-w-sm text-center">
          <TriangleAlert size={26} className="mx-auto text-amber-400" />
          <p className="mt-3 font-display text-lg font-bold">Login não concluído</p>
          <p className="mt-1.5 text-sm text-ink-400">{falha}</p>
          <button
            onClick={() => router.replace("/grupos")}
            className="mt-5 rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/18"
          >
            Voltar para Grupos
          </button>
        </div>
      ) : (
        <div className="text-center">
          <Loader2 size={26} className="mx-auto animate-spin text-gold-400" />
          <p className="mt-3 text-sm text-ink-400">Entrando...</p>
        </div>
      )}
    </div>
  );
}
