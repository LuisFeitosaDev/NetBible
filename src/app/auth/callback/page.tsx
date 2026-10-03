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
/**
 * Login normal no Google, para a conta que já existe. `relogin` na volta evita
 * repetir isto em loop se o segundo login também falhar.
 */
async function entrarNaContaExistente(proximo: string) {
  const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(proximo)}&relogin=1`;
  // Sem `prompt`: a pessoa acabou de escolher a conta, então o Google pode
  // seguir direto em vez de mostrar a lista de novo.
  const { error } = await sb().auth.signInWithOAuth({ provider: "google", options: { redirectTo } });
  if (error) throw error;
}

function traduzirErro(mensagem: string) {
  if (/access[_ ]denied|cancel/i.test(mensagem)) return "O login foi cancelado.";
  if (/already linked to another user/i.test(mensagem)) {
    return "Esse Google já está ligado a outra conta. Saia e entre de novo com ele.";
  }
  return mensagem;
}

export default function CallbackPage() {
  const router = useRouter();
  const [falha, setFalha] = useState<string | null>(null);

  useEffect(() => {
    if (!supabaseConfigurado) {
      setFalha("Supabase não configurado.");
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const proximo = params.get("next") || "/";

    // O erro volta na query ou no fragmento (#), conforme o fluxo do Supabase.
    const fragmento = new URLSearchParams(window.location.hash.slice(1));
    fragmento.forEach((valor, chave) => {
      if (!params.has(chave)) params.set(chave, valor);
    });
    const erroProvedor = params.get("error_description") || params.get("error");
    if (erroProvedor) {
      // Quem saiu da conta volta para uma sessão anônima, e o "Entrar com
      // Google" tenta VINCULAR o Google a ela. Se esse Google já é de uma conta,
      // o vínculo falha: aí o certo é simplesmente entrar nessa conta.
      const jaTemConta =
        params.get("error_code") === "identity_already_exists" ||
        /already linked to another user/i.test(erroProvedor);
      if (jaTemConta && !params.get("relogin")) {
        void entrarNaContaExistente(proximo).catch((e) =>
          setFalha(e instanceof Error ? e.message : "Não consegui entrar na sua conta."),
        );
        return;
      }
      setFalha(traduzirErro(decodeURIComponent(erroProvedor)));
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
      {/* Enquanto refaz o login na conta existente, segue mostrando "Entrando". */}
      {falha ? (
        <div className="max-w-sm text-center">
          <TriangleAlert size={26} className="mx-auto text-amber-400" />
          <p className="mt-3 font-display text-lg font-bold">Login não concluído</p>
          <p className="mt-1.5 text-sm text-ink-400">{falha}</p>
          <button
            onClick={() => router.replace("/ajustes")}
            className="mt-5 rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/18"
          >
            Voltar para Conta
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
