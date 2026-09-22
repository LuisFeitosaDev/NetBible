"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Loader2, KeyRound, UserRound } from "lucide-react";
import { supabaseConfigurado } from "@/lib/grupos/supabase";
import { meuPerfil, nomeSalvo, salvarPerfil } from "@/lib/grupos/api";
import type { Perfil } from "@/lib/grupos/tipos";

/**
 * Erros do Supabase chegam em inglês e sem contexto. O de login anônimo
 * desligado é o mais provável logo depois de criar o projeto, e ele tem
 * conserto de um clique, então vale explicar em vez de só repassar.
 */
function traduzirFalha(e: unknown) {
  const bruto = e instanceof Error ? e.message : String(e);
  if (/anonymous sign-ins are disabled/i.test(bruto)) {
    return (
      "O login anônimo está desligado no Supabase. Vá em Authentication → " +
      "Sign In / Providers e ligue 'Allow anonymous sign-ins'."
    );
  }
  if (/failed to fetch|networkerror/i.test(bruto)) {
    return "Sem conexão com o servidor. Verifique a internet e tente de novo.";
  }
  return bruto;
}

/**
 * Tudo em Grupos depende de duas coisas: o Supabase estar configurado e a
 * pessoa ter um nome. Este componente resolve as duas antes de liberar a tela,
 * em vez de cada página tratar isso por conta.
 */
export function Gate({ children }: { children: (perfil: Perfil) => ReactNode }) {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [nome, setNome] = useState(nomeSalvo());
  const [salvando, setSalvando] = useState(false);
  const [falha, setFalha] = useState<string | null>(null);

  useEffect(() => {
    if (!supabaseConfigurado) {
      setCarregando(false);
      return;
    }
    meuPerfil()
      .then(setPerfil)
      .catch((e) => setFalha(traduzirFalha(e)))
      .finally(() => setCarregando(false));
  }, []);

  const entrar = useCallback(async () => {
    if (nome.trim().length < 2) return;
    setSalvando(true);
    setFalha(null);
    try {
      setPerfil(await salvarPerfil(nome.trim()));
    } catch (e) {
      setFalha(traduzirFalha(e));
    } finally {
      setSalvando(false);
    }
  }, [nome]);

  if (!supabaseConfigurado) return <SemSupabase />;

  if (carregando) {
    return (
      <div className="grid place-items-center py-32">
        <Loader2 className="animate-spin text-gold-400" />
      </div>
    );
  }

  if (!perfil) {
    return (
      <div className="mx-auto max-w-md px-4 pt-16">
        <div className="rounded-2xl border border-white/8 bg-ink-900 p-6">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-400/15 text-gold-400">
            <UserRound size={20} />
          </span>
          <h1 className="mt-4 font-display text-2xl font-black tracking-tight">
            Como você quer ser chamado?
          </h1>
          <p className="mt-1.5 text-sm text-ink-400">
            É o nome que o grupo vai ver nas suas respostas. Não pedimos e-mail nem senha.
          </p>

          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && entrar()}
            placeholder="Seu nome ou apelido"
            maxLength={40}
            className="mt-5 w-full rounded-xl border border-white/10 bg-ink-850 px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-ink-600 focus:border-gold-500/60"
          />

          {falha && <p className="mt-3 text-[13px] text-red-400">{falha}</p>}

          <button
            onClick={entrar}
            disabled={nome.trim().length < 2 || salvando}
            className="mt-4 w-full rounded-xl bg-gold-400 py-3 font-display text-sm font-bold text-ink-950 transition-colors hover:bg-gold-300 disabled:opacity-40"
          >
            {salvando ? "Entrando..." : "Continuar"}
          </button>
        </div>
      </div>
    );
  }

  return <>{children(perfil)}</>;
}

function SemSupabase() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-12 md:px-6">
      <div className="rounded-2xl border border-gold-500/25 bg-gold-500/8 p-6">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-400/15 text-gold-400">
          <KeyRound size={20} />
        </span>
        <h1 className="mt-4 font-display text-2xl font-black tracking-tight">
          Falta conectar o Supabase
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-300">
          Grupos é a única parte do app que precisa de servidor: código de acesso, etapas
          liberadas pelo líder e respostas aparecendo ao vivo não funcionam só no
          dispositivo. O resto do Genipse Bible continua rodando normalmente sem isso.
        </p>

        <ol className="mt-5 space-y-3 text-[14px] leading-relaxed text-ink-300">
          <li>
            <strong className="text-white">1.</strong> Crie um projeto em{" "}
            <span className="text-gold-300">supabase.com</span> (o plano free serve).
          </li>
          <li>
            <strong className="text-white">2.</strong> Em <em>SQL Editor</em>, cole e rode o
            arquivo <code className="text-gold-300">supabase/schema.sql</code> deste repositório.
          </li>
          <li>
            <strong className="text-white">3.</strong> Em{" "}
            <em>Authentication → Sign In / Providers</em>, ligue{" "}
            <strong className="text-white">Anonymous sign-ins</strong>.
          </li>
          <li>
            <strong className="text-white">4.</strong> Copie a URL e a chave{" "}
            <em>anon public</em> de <em>Project Settings → API</em> para um arquivo{" "}
            <code className="text-gold-300">.env.local</code>:
          </li>
        </ol>

        <pre className="mt-4 overflow-x-auto rounded-xl bg-ink-950 p-4 text-[12px] leading-relaxed text-ink-300">
{`NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...`}
        </pre>

        <p className="mt-4 text-[13px] text-ink-400">
          Reinicie o servidor depois de criar o arquivo. A chave <em>anon</em> é pública por
          natureza; quem protege os dados são as policies de RLS que já estão no schema.
        </p>
      </div>
    </div>
  );
}
