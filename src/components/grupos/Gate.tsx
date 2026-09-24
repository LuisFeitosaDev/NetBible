"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Loader2, KeyRound, UserRound, Mail } from "lucide-react";
import { supabaseConfigurado } from "@/lib/grupos/supabase";
import { meuPerfil, nomeSalvo, salvarPerfil } from "@/lib/grupos/api";
// `entrar` já é o nome do fluxo anônimo aqui dentro; o alias evita a colisão.
import { criarConta, entrar as entrarComEmail } from "@/lib/conta";
import { BotaoGoogle } from "./BotaoGoogle";
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
export function Gate({
  children,
  titulo = "Estude a Bíblia junto",
  descricao = "Entre com a sua conta para o grupo e as suas anotações seguirem você em qualquer aparelho.",
  descricaoSemConta = 'Dá para entrar só com um nome. Mas aí tudo fica preso a este aparelho, e para criar um grupo é preciso ter conta.',
  destino = "/grupos",
}: {
  children: (perfil: Perfil) => ReactNode;
  /** Ajusta o discurso da tela de entrada para quem chama de fora de Grupos
      (ex.: a parceria de leitura) sem duplicar todo o fluxo de login. */
  titulo?: string;
  descricao?: string;
  descricaoSemConta?: string;
  /** Para onde o login com Google volta depois de autenticar. */
  destino?: string;
}) {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [nome, setNome] = useState(nomeSalvo());
  const [salvando, setSalvando] = useState(false);
  const [falha, setFalha] = useState<string | null>(null);
  const [modo, setModo] = useState<"escolha" | "email">("escolha");

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
      <div className="mx-auto max-w-md px-4 pt-10 pb-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icon.png" alt="" aria-hidden className="mx-auto h-16 w-16 rounded-2xl" />
        <h1 className="mt-5 text-center font-display text-2xl font-black tracking-tight">
          {titulo}
        </h1>
        <p className="mx-auto mt-2 max-w-xs text-center text-sm leading-relaxed text-ink-400">
          {descricao}
        </p>

        <div className="mt-7 rounded-2xl border border-white/8 bg-ink-900 p-5">
          <BotaoGoogle destino={destino} aoFalhar={setFalha} />

          <div className="my-4 flex items-center gap-3">
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-600">
              ou
            </span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          {modo === "email" ? (
            <FormularioEmail nomeInicial={nome} aoFalhar={setFalha} />
          ) : (
            <button
              onClick={() => {
                setModo("email");
                setFalha(null);
              }}
              className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/12 py-3 font-display text-sm font-bold transition-colors hover:bg-white/8"
            >
              <Mail size={17} />
              Usar e-mail e senha
            </button>
          )}

          {falha && <p className="mt-3 text-[13px] leading-relaxed text-red-400">{falha}</p>}
        </div>

        {/* Entrar sem conta continua valendo para quem só vai participar. */}
        <div className="mt-4 rounded-2xl border border-white/6 bg-white/[0.02] p-5">
          <p className="flex items-center gap-2 font-display text-sm font-bold">
            <UserRound size={16} className="text-ink-400" />
            Entrar só com um nome
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-ink-400">{descricaoSemConta}</p>

          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && entrar()}
            placeholder="Seu nome ou apelido"
            maxLength={40}
            className="mt-3 w-full rounded-xl border border-white/10 bg-ink-850 px-4 py-2.5 text-[15px] outline-none transition-colors placeholder:text-ink-600 focus:border-gold-500/60"
          />
          <button
            onClick={entrar}
            disabled={nome.trim().length < 2 || salvando}
            className="mt-2.5 w-full rounded-xl bg-white/10 py-2.5 font-display text-sm font-bold transition-colors hover:bg-white/18 disabled:opacity-40"
          >
            {salvando ? "Entrando..." : "Continuar sem conta"}
          </button>
        </div>
      </div>
    );
  }

  return <>{children(perfil)}</>;
}

/** Cadastro e login por e-mail, dentro da tela de entrada dos Grupos. */
function FormularioEmail({
  nomeInicial,
  aoFalhar,
}: {
  nomeInicial: string;
  aoFalhar: (e: string | null) => void;
}) {
  const [criando, setCriando] = useState(true);
  const [nome, setNome] = useState(nomeInicial);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);

  const enviar = async () => {
    setOcupado(true);
    aoFalhar(null);
    setAviso(null);
    const r = criando
      ? await criarConta(email.trim(), senha, nome.trim())
      : await entrarComEmail(email.trim(), senha);
    if (!r.ok) aoFalhar(r.erro);
    else if (r.precisaConfirmar) {
      setAviso("Enviamos um e-mail de confirmação. Confirme para usar em outro aparelho.");
    }
    setOcupado(false);
  };

  return (
    <div>
      <div className="mb-3 flex gap-1 rounded-xl border border-white/8 bg-ink-850 p-1">
        {(
          [
            [true, "Criar conta"],
            [false, "Já tenho conta"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={label}
            onClick={() => {
              setCriando(id);
              aoFalhar(null);
              setAviso(null);
            }}
            className={`flex-1 rounded-lg py-2 text-[13px] font-semibold transition-colors ${
              criando === id ? "bg-white/12 text-white" : "text-ink-400 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {criando && (
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
            maxLength={40}
            className="w-full rounded-xl border border-white/10 bg-ink-850 px-4 py-2.5 text-[15px] outline-none placeholder:text-ink-600 focus:border-gold-500/60"
          />
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="email"
          placeholder="E-mail"
          className="w-full rounded-xl border border-white/10 bg-ink-850 px-4 py-2.5 text-[15px] outline-none placeholder:text-ink-600 focus:border-gold-500/60"
        />
        <input
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && enviar()}
          type="password"
          autoComplete={criando ? "new-password" : "current-password"}
          placeholder="Senha (mínimo 6 caracteres)"
          className="w-full rounded-xl border border-white/10 bg-ink-850 px-4 py-2.5 text-[15px] outline-none placeholder:text-ink-600 focus:border-gold-500/60"
        />
      </div>

      {aviso && <p className="mt-2.5 text-[13px] text-gold-300">{aviso}</p>}

      <button
        onClick={enviar}
        disabled={ocupado || !email.includes("@") || senha.length < 6 || (criando && nome.trim().length < 2)}
        className="mt-3 w-full rounded-xl bg-gold-400 py-3 font-display text-sm font-bold text-ink-950 transition-colors hover:bg-gold-300 disabled:opacity-40"
      >
        {ocupado ? "..." : criando ? "Criar conta" : "Entrar"}
      </button>
    </div>
  );
}

function SemSupabase() {
  // Em produção o .env.local não existe: ele é ignorado pelo Git de propósito.
  // As instruções mudam conforme onde a pessoa está vendo esta tela.
  const local =
    typeof window !== "undefined" &&
    /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname);

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

        {local ? (
          <>
            <ol className="mt-5 space-y-3 text-[14px] leading-relaxed text-ink-300">
              <li>
                <strong className="text-white">1.</strong> Crie um projeto em{" "}
                <span className="text-gold-300">supabase.com</span> (o plano free serve).
              </li>
              <li>
                <strong className="text-white">2.</strong> Em <em>SQL Editor</em>, rode{" "}
                <code className="text-gold-300">supabase/schema.sql</code> e depois{" "}
                <code className="text-gold-300">supabase/schema-conta.sql</code>.
              </li>
              <li>
                <strong className="text-white">3.</strong> Em{" "}
                <em>Authentication → Sign In / Providers</em>, ligue{" "}
                <strong className="text-white">Anonymous sign-ins</strong>.
              </li>
              <li>
                <strong className="text-white">4.</strong> Copie a URL e a chave pública de{" "}
                <em>Project Settings → API</em> para um arquivo{" "}
                <code className="text-gold-300">.env.local</code>:
              </li>
            </ol>

            <pre className="mt-4 overflow-x-auto rounded-xl bg-ink-950 p-4 text-[12px] leading-relaxed text-ink-300">
{`NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...`}
            </pre>

            <p className="mt-4 text-[13px] text-ink-400">
              Reinicie o servidor depois de criar o arquivo.
            </p>
          </>
        ) : (
          <>
            <p className="mt-5 text-[14px] leading-relaxed text-ink-300">
              Este site está publicado sem as chaves. O arquivo{" "}
              <code className="text-gold-300">.env.local</code> não sobe para o Git, então
              as variáveis precisam ser cadastradas no painel da hospedagem:
            </p>

            <pre className="mt-4 overflow-x-auto rounded-xl bg-ink-950 p-4 text-[12px] leading-relaxed text-ink-300">
{`NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY`}
            </pre>

            <p className="mt-4 text-[14px] leading-relaxed text-ink-300">
              Na Vercel: <em>Project Settings → Environment Variables</em>. Na Netlify:{" "}
              <em>Site configuration → Environment variables</em>.
            </p>

            <p className="mt-3 text-[13px] text-ink-400">
              Variável <code className="text-gold-300">NEXT_PUBLIC_</code> entra no código
              na hora do build, então é preciso <strong className="text-white">publicar de
              novo</strong> depois de cadastrar. Só salvar não basta.
            </p>
          </>
        )}

        <p className="mt-4 border-t border-white/10 pt-4 text-[13px] leading-relaxed text-ink-400">
          A chave pública é feita para ficar exposta; quem protege os dados são as policies
          de RLS que já estão no schema. Nunca use aqui a{" "}
          <code className="text-gold-300">service_role</code>.
        </p>
      </div>
    </div>
  );
}
