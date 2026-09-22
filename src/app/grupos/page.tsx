"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  Users,
  Plus,
  LogIn,
  Crown,
  Loader2,
  ArrowRight,
  X,
  BookOpenCheck,
} from "lucide-react";
import { Gate } from "@/components/grupos/Gate";
import { criarGrupo, entrarNoGrupo, meusGrupos, previaGrupo } from "@/lib/grupos/api";
import type { Grupo, PreviaGrupo } from "@/lib/grupos/tipos";

type GrupoNaLista = Grupo & { papel: string; membros: number };

export default function GruposPage() {
  return <Gate>{() => <Conteudo />}</Gate>;
}

function Conteudo() {
  const [grupos, setGrupos] = useState<GrupoNaLista[] | null>(null);
  const [aba, setAba] = useState<"criar" | "entrar" | null>(null);

  const recarregar = useCallback(() => {
    meusGrupos().then(setGrupos).catch(console.error);
  }, []);

  useEffect(recarregar, [recarregar]);

  return (
    <div className="mx-auto max-w-3xl px-4 pt-8 md:px-6">
      <header>
        <h1 className="font-display text-3xl font-black tracking-tight md:text-4xl">Grupos</h1>
        <p className="mt-1.5 text-sm text-ink-400">
          Estudo bíblico junto: alguém cria, compartilha o código, e o grupo estuda no mesmo
          ritmo.
        </p>
      </header>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          onClick={() => setAba("criar")}
          className="group flex items-center gap-3 rounded-2xl border border-gold-500/25 bg-gold-500/8 p-5 text-left transition-colors hover:bg-gold-500/14"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-400 text-ink-950">
            <Plus size={20} />
          </span>
          <span>
            <span className="block font-display text-base font-bold">Novo grupo</span>
            <span className="block text-[13px] text-ink-400">Você vira o líder</span>
          </span>
        </button>

        <button
          onClick={() => setAba("entrar")}
          className="group flex items-center gap-3 rounded-2xl border border-white/8 bg-ink-900 p-5 text-left transition-colors hover:border-white/20"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10">
            <LogIn size={20} />
          </span>
          <span>
            <span className="block font-display text-base font-bold">Entrar em um grupo</span>
            <span className="block text-[13px] text-ink-400">Com o código do líder</span>
          </span>
        </button>
      </div>

      <section className="mt-9 pb-20">
        <h2 className="mb-3 font-display text-xs font-bold uppercase tracking-[0.16em] text-ink-400">
          Meus grupos
        </h2>

        {!grupos && (
          <div className="grid place-items-center py-14">
            <Loader2 className="animate-spin text-gold-400" />
          </div>
        )}

        {grupos?.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center">
            <Users size={30} className="mx-auto text-ink-600" />
            <p className="mt-4 font-display text-base font-bold text-ink-300">
              Você ainda não está em nenhum grupo
            </p>
            <p className="mx-auto mt-1.5 max-w-xs text-sm text-ink-400">
              Crie o seu e convide a galera, ou entre com o código de quem já criou.
            </p>
          </div>
        )}

        <div className="space-y-2.5">
          {(grupos ?? []).map((g) => (
            <Link
              key={g.id}
              href={`/grupos/${g.codigo}`}
              className="group flex items-center gap-4 rounded-2xl border border-white/6 bg-ink-900 p-4 transition-colors hover:border-white/20"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/[0.06] font-display text-lg font-black text-gold-400">
                {g.nome.charAt(0).toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 font-display text-base font-bold">
                  <span className="truncate">{g.nome}</span>
                  {g.papel === "lider" && (
                    <Crown size={14} className="shrink-0 text-gold-400" aria-label="Você é líder" />
                  )}
                </p>
                <p className="mt-0.5 text-[13px] text-ink-400">
                  {g.membros} {g.membros === 1 ? "participante" : "participantes"} ·{" "}
                  <span className="font-mono text-gold-400">{g.codigo}</span>
                </p>
              </div>
              <ArrowRight
                size={18}
                className="shrink-0 text-ink-600 transition-transform group-hover:translate-x-0.5 group-hover:text-white"
              />
            </Link>
          ))}
        </div>
      </section>

      {aba === "criar" && <CriarGrupo onFechar={() => setAba(null)} />}
      {aba === "entrar" && (
        <EntrarGrupo onFechar={() => setAba(null)} onEntrou={recarregar} />
      )}
    </div>
  );
}

function Folha({ titulo, onFechar, children }: { titulo: string; onFechar: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onFechar();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onFechar]);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 animate-fade bg-black/70 backdrop-blur-sm" onClick={onFechar} />
      <div className="relative w-full max-w-md animate-rise rounded-t-2xl border border-white/10 bg-ink-900 p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-2xl sm:rounded-2xl sm:pb-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">{titulo}</h2>
          <button
            onClick={onFechar}
            aria-label="Fechar"
            className="rounded-full p-1.5 text-ink-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function CriarGrupo({ onFechar }: { onFechar: () => void }) {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [falha, setFalha] = useState<string | null>(null);

  const criar = async () => {
    if (nome.trim().length < 2) return;
    setSalvando(true);
    setFalha(null);
    try {
      const grupo = await criarGrupo(nome.trim(), descricao.trim() || undefined);
      router.push(`/grupos/${grupo.codigo}`);
    } catch (e) {
      setFalha(e instanceof Error ? e.message : "Não consegui criar o grupo.");
      setSalvando(false);
    }
  };

  return (
    <Folha titulo="Novo grupo" onFechar={onFechar}>
      <label className="block text-[13px] font-semibold text-ink-300">Nome do grupo</label>
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Célula de quarta, Jovens da Vila..."
        maxLength={60}
        autoFocus
        className="mt-1.5 w-full rounded-xl border border-white/10 bg-ink-850 px-4 py-3 text-[15px] outline-none placeholder:text-ink-600 focus:border-gold-500/60"
      />

      <label className="mt-4 block text-[13px] font-semibold text-ink-300">
        Descrição <span className="font-normal text-ink-600">(opcional)</span>
      </label>
      <textarea
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        rows={2}
        placeholder="Quem é o grupo, quando se encontra..."
        className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-ink-850 px-4 py-3 text-[15px] outline-none placeholder:text-ink-600 focus:border-gold-500/60"
      />

      {falha && <p className="mt-3 text-[13px] text-red-400">{falha}</p>}

      <p className="mt-4 rounded-xl bg-white/[0.04] p-3 text-[13px] leading-relaxed text-ink-400">
        Ao criar, você vira o líder: é quem escolhe o método, monta as equipes e libera cada
        etapa do estudo.
      </p>

      <button
        onClick={criar}
        disabled={nome.trim().length < 2 || salvando}
        className="mt-4 w-full rounded-xl bg-gold-400 py-3 font-display text-sm font-bold text-ink-950 transition-colors hover:bg-gold-300 disabled:opacity-40"
      >
        {salvando ? "Criando..." : "Criar grupo"}
      </button>
    </Folha>
  );
}

function EntrarGrupo({ onFechar, onEntrou }: { onFechar: () => void; onEntrou: () => void }) {
  const router = useRouter();
  const [codigo, setCodigo] = useState("");
  const [previa, setPrevia] = useState<PreviaGrupo | null>(null);
  const [buscando, setBuscando] = useState(false);
  const [entrando, setEntrando] = useState(false);
  const [falha, setFalha] = useState<string | null>(null);

  // Busca sozinha quando o código fica com cara de completo.
  useEffect(() => {
    const limpo = codigo.trim().toUpperCase();
    if (limpo.length < 6 || !limpo.includes("-")) {
      setPrevia(null);
      return;
    }
    let vivo = true;
    setBuscando(true);
    setFalha(null);
    const t = setTimeout(async () => {
      try {
        const p = await previaGrupo(limpo);
        if (!vivo) return;
        setPrevia(p);
        if (!p) setFalha("Código não encontrado.");
      } catch (e) {
        if (vivo) setFalha(e instanceof Error ? e.message : "Falhou a busca.");
      } finally {
        if (vivo) setBuscando(false);
      }
    }, 350);
    return () => {
      vivo = false;
      clearTimeout(t);
    };
  }, [codigo]);

  const confirmar = async () => {
    setEntrando(true);
    setFalha(null);
    try {
      const grupo = await entrarNoGrupo(codigo.trim().toUpperCase());
      onEntrou();
      router.push(`/grupos/${grupo.codigo}`);
    } catch (e) {
      setFalha(e instanceof Error ? e.message : "Não consegui entrar.");
      setEntrando(false);
    }
  };

  return (
    <Folha titulo="Entrar em um grupo" onFechar={onFechar}>
      <label className="block text-[13px] font-semibold text-ink-300">Código do grupo</label>
      <input
        value={codigo}
        onChange={(e) => setCodigo(e.target.value.toUpperCase())}
        placeholder="GENESIS-7K42"
        autoFocus
        autoCapitalize="characters"
        autoCorrect="off"
        spellCheck={false}
        className="mt-1.5 w-full rounded-xl border border-white/10 bg-ink-850 px-4 py-3 text-center font-mono text-lg tracking-widest outline-none placeholder:text-ink-600 focus:border-gold-500/60"
      />

      {buscando && (
        <p className="mt-3 flex items-center gap-2 text-[13px] text-ink-400">
          <Loader2 size={14} className="animate-spin" /> Procurando...
        </p>
      )}

      {falha && <p className="mt-3 text-[13px] text-red-400">{falha}</p>}

      {previa && (
        <div className="mt-4 rounded-xl border border-white/8 bg-white/[0.04] p-4">
          <p className="font-display text-lg font-bold">{previa.nome}</p>
          {previa.descricao && (
            <p className="mt-0.5 text-[13px] text-ink-400">{previa.descricao}</p>
          )}
          <dl className="mt-3 space-y-1.5 text-[13px]">
            <div className="flex justify-between gap-3">
              <dt className="text-ink-400">Líder</dt>
              <dd className="font-semibold">{previa.lider}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-ink-400">Participantes</dt>
              <dd className="font-semibold">{previa.participantes}</dd>
            </div>
            {previa.estudo_titulo && (
              <div className="flex justify-between gap-3">
                <dt className="text-ink-400">Estudo</dt>
                <dd className="flex items-center gap-1.5 text-right font-semibold">
                  <BookOpenCheck size={13} className="text-gold-400" />
                  {previa.estudo_titulo}
                </dd>
              </div>
            )}
          </dl>

          <button
            onClick={confirmar}
            disabled={entrando}
            className="mt-4 w-full rounded-xl bg-gold-400 py-3 font-display text-sm font-bold text-ink-950 transition-colors hover:bg-gold-300 disabled:opacity-40"
          >
            {previa.ja_sou_membro
              ? "Abrir grupo"
              : entrando
                ? "Entrando..."
                : "Confirmar entrada"}
          </button>
        </div>
      )}
    </Folha>
  );
}
