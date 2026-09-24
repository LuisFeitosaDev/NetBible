"use client";

import { useEffect, useState } from "react";
import {
  UserRound,
  LogOut,
  Check,
  Loader2,
  CloudOff,
  Pencil,
  RefreshCw,
  TriangleAlert,
  Smartphone,
  X,
} from "lucide-react";
import { criarConta, entrar, recuperarSenha, sair, useConta } from "@/lib/conta";
import { BotaoGoogle } from "@/components/grupos/BotaoGoogle";
import { ouvirSync, sincronizar, type EstadoSync } from "@/lib/sync";
import { supabaseConfigurado } from "@/lib/grupos/supabase";
import { meuPerfil, nomeSalvo, salvarPerfil } from "@/lib/grupos/api";

/**
 * Bloco de conta em Ajustes. É por aqui que os dados deixam de ser do aparelho
 * e passam a ser da pessoa.
 */
export function ContaCard() {
  const { usuario, anonimo, carregando } = useConta();
  const [estado, setEstado] = useState<EstadoSync>("ocioso");
  const [modo, setModo] = useState<"entrar" | "criar">("criar");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState(nomeSalvo());
  const [ocupado, setOcupado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  // O nome exibido para o grupo é um campo à parte (`profiles.nome`), não o
  // e-mail da conta. Sem isto em algum lugar, um nome que saiu errado (por
  // exemplo, o Google sem enviar o nome de verdade) não tinha como ser
  // corrigido — ficava errado para sempre.
  const [perfilNome, setPerfilNome] = useState<string | null>(null);
  const [editandoNome, setEditandoNome] = useState(false);
  const [nomeEditado, setNomeEditado] = useState("");
  const [salvandoNome, setSalvandoNome] = useState(false);

  useEffect(() => ouvirSync(setEstado), []);

  useEffect(() => {
    if (!usuario || anonimo) return;
    void meuPerfil().then((p) => setPerfilNome(p?.nome ?? null));
  }, [usuario, anonimo]);

  if (!supabaseConfigurado) {
    return (
      <p className="flex gap-2.5 text-[13px] leading-relaxed text-ink-400">
        <CloudOff size={16} className="mt-0.5 shrink-0" />
        Sem o Supabase configurado, tudo fica só neste dispositivo. Veja a aba Grupos para
        os passos.
      </p>
    );
  }

  if (carregando) {
    return <Loader2 className="animate-spin text-gold-400" size={18} />;
  }

  const submeter = async () => {
    setOcupado(true);
    setErro(null);
    setAviso(null);
    const r =
      modo === "criar"
        ? await criarConta(email.trim(), senha, nome.trim())
        : await entrar(email.trim(), senha);
    if (!r.ok) setErro(r.erro);
    else if (r.precisaConfirmar) {
      setAviso("Enviamos um e-mail de confirmação. Confirme para usar em outro aparelho.");
    }
    setSenha("");
    setOcupado(false);
  };

  if (usuario && !anonimo) {
    const salvarNomeEditado = async () => {
      const novo = nomeEditado.trim().slice(0, 40);
      if (!novo || novo === perfilNome) {
        setEditandoNome(false);
        return;
      }
      setSalvandoNome(true);
      try {
        await salvarPerfil(novo);
        setPerfilNome(novo);
        setEditandoNome(false);
      } finally {
        setSalvandoNome(false);
      }
    };

    return (
      <div>
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-400/15 text-gold-400">
            <UserRound size={20} />
          </span>
          <div className="min-w-0 flex-1">
            {editandoNome ? (
              <div className="flex items-center gap-1.5">
                <input
                  autoFocus
                  value={nomeEditado}
                  onChange={(e) => setNomeEditado(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") void salvarNomeEditado();
                    if (e.key === "Escape") setEditandoNome(false);
                  }}
                  maxLength={40}
                  className="min-w-0 flex-1 rounded-lg border border-white/10 bg-ink-850 px-2.5 py-1.5 font-display text-[15px] font-bold outline-none focus:border-gold-500/60"
                />
                <button
                  onClick={() => void salvarNomeEditado()}
                  disabled={salvandoNome}
                  aria-label="Salvar nome"
                  className="shrink-0 rounded-lg p-1.5 text-emerald-400 transition-colors hover:bg-white/10 disabled:opacity-40"
                >
                  {salvandoNome ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : (
                    <Check size={15} />
                  )}
                </button>
                <button
                  onClick={() => setEditandoNome(false)}
                  disabled={salvandoNome}
                  aria-label="Cancelar"
                  className="shrink-0 rounded-lg p-1.5 text-ink-400 transition-colors hover:bg-white/10 disabled:opacity-40"
                >
                  <X size={15} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setNomeEditado(perfilNome ?? "");
                  setEditandoNome(true);
                }}
                className="group flex min-w-0 items-center gap-1.5"
              >
                <span className="truncate font-display text-base font-bold">
                  {perfilNome ?? usuario.email}
                </span>
                <Pencil
                  size={12}
                  className="shrink-0 text-ink-500 transition-colors group-hover:text-white"
                />
              </button>
            )}
            <p className="truncate text-[12px] text-ink-500">{usuario.email}</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[13px] text-ink-400">
              {estado === "sincronizando" ? (
                <>
                  <Loader2 size={12} className="animate-spin" /> sincronizando
                </>
              ) : estado === "offline" ? (
                <>
                  <CloudOff size={12} /> offline, sobe quando voltar
                </>
              ) : estado === "erro" ? (
                <>
                  <TriangleAlert size={12} className="text-amber-400" /> erro ao sincronizar
                </>
              ) : (
                <>
                  <Check size={12} className="text-emerald-400" /> tudo sincronizado
                </>
              )}
            </p>
          </div>
          <button
            onClick={() => void sincronizar()}
            aria-label="Sincronizar agora"
            className="rounded-lg p-2 text-ink-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <RefreshCw size={16} />
          </button>
        </div>

        <p className="mt-3 text-[13px] leading-relaxed text-ink-400">
          Marcações, notas, progresso e favoritos seguem esta conta. Entre com o mesmo
          e-mail em outro aparelho e tudo aparece lá.
        </p>

        <button
          onClick={() => void sair()}
          className="mt-4 inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-ink-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut size={16} />
          Sair da conta
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="flex gap-2.5 text-[13px] leading-relaxed text-ink-400">
        <Smartphone size={16} className="mt-0.5 shrink-0 text-amber-400" />
        Suas marcações estão presas a este aparelho. Crie uma conta para elas seguirem você
        no celular e no computador.
      </p>

      <div className="mt-4">
        <BotaoGoogle rotulo="Continuar com Google" destino="/ajustes" aoFalhar={setErro} />
      </div>

      <div className="my-4 flex items-center gap-3">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-600">
          ou
        </span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <div className="flex gap-1 rounded-xl border border-white/8 bg-ink-850 p-1">
        {(
          [
            ["criar", "Criar conta"],
            ["entrar", "Já tenho conta"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            onClick={() => {
              setModo(id);
              setErro(null);
              setAviso(null);
            }}
            className={`flex-1 rounded-lg py-2 text-[13px] font-semibold transition-colors ${
              modo === id ? "bg-white/12 text-white" : "text-ink-400 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-3 space-y-2">
        {modo === "criar" && (
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
            className="w-full rounded-xl border border-white/10 bg-ink-850 px-4 py-3 text-[15px] outline-none placeholder:text-ink-600 focus:border-gold-500/60"
          />
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="email"
          placeholder="E-mail"
          className="w-full rounded-xl border border-white/10 bg-ink-850 px-4 py-3 text-[15px] outline-none placeholder:text-ink-600 focus:border-gold-500/60"
        />
        <input
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submeter()}
          type="password"
          autoComplete={modo === "criar" ? "new-password" : "current-password"}
          placeholder="Senha (mínimo 6 caracteres)"
          className="w-full rounded-xl border border-white/10 bg-ink-850 px-4 py-3 text-[15px] outline-none placeholder:text-ink-600 focus:border-gold-500/60"
        />
      </div>

      {erro && <p className="mt-2.5 text-[13px] text-red-400">{erro}</p>}
      {aviso && <p className="mt-2.5 text-[13px] text-gold-300">{aviso}</p>}

      <button
        onClick={submeter}
        disabled={ocupado || !email.includes("@") || senha.length < 6}
        className="mt-3 w-full rounded-xl bg-gold-400 py-3 font-display text-sm font-bold text-ink-950 transition-colors hover:bg-gold-300 disabled:opacity-40"
      >
        {ocupado ? "..." : modo === "criar" ? "Criar conta e sincronizar" : "Entrar"}
      </button>

      {modo === "entrar" && (
        <button
          onClick={async () => {
            if (!email.includes("@")) return setErro("Digite o e-mail primeiro.");
            const r = await recuperarSenha(email.trim());
            if (r.ok) setAviso("Enviamos um link para redefinir a senha.");
            else setErro(r.erro);
          }}
          className="mt-2 w-full text-[12px] text-ink-400 transition-colors hover:text-white"
        >
          Esqueci a senha
        </button>
      )}

      {modo === "criar" && (
        <p className="mt-3 text-[12px] leading-relaxed text-ink-500">
          O que você já marcou neste aparelho sobe para a conta nova. Nada se perde.
        </p>
      )}
    </div>
  );
}
