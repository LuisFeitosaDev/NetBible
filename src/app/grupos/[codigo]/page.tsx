"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  Copy,
  Check,
  Crown,
  Plus,
  Loader2,
  Share2,
  Play,
  CircleDot,
  Archive,
} from "lucide-react";
import { Gate } from "@/components/grupos/Gate";
import {
  estudosDoGrupo,
  grupoPorCodigo,
  membrosDoGrupo,
  ouvirGrupo,
} from "@/lib/grupos/api";
import { metodoPorId } from "@/lib/grupos/metodos";
import type { Estudo, Grupo, Membro, Perfil } from "@/lib/grupos/tipos";

export default function GrupoPage() {
  return <Gate>{(perfil) => <Conteudo perfil={perfil} />}</Gate>;
}

function Conteudo({ perfil }: { perfil: Perfil }) {
  const { codigo } = useParams<{ codigo: string }>();
  const [grupo, setGrupo] = useState<Grupo | null>(null);
  const [membros, setMembros] = useState<Membro[]>([]);
  const [estudos, setEstudos] = useState<Estudo[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [copiado, setCopiado] = useState(false);

  const carregar = useCallback(async () => {
    const g = await grupoPorCodigo(codigo);
    setGrupo(g);
    if (g) {
      const [m, e] = await Promise.all([membrosDoGrupo(g.id), estudosDoGrupo(g.id)]);
      setMembros(m);
      setEstudos(e);
    }
    setCarregando(false);
  }, [codigo]);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  // Participante entrando ou estudo mudando de status aparece sem recarregar.
  useEffect(() => {
    if (!grupo) return;
    return ouvirGrupo(grupo.id, () => void carregar());
  }, [grupo, carregar]);

  const souLider = membros.some((m) => m.perfil_id === perfil.id && m.papel === "lider");

  const compartilhar = async () => {
    if (!grupo) return;
    const texto = `Entre no nosso estudo bíblico no Genipse Bible com o código ${grupo.codigo}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: grupo.nome, text: texto });
        return;
      } catch {
        /* cancelado */
      }
    }
    await navigator.clipboard.writeText(grupo.codigo);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1800);
  };

  if (carregando) {
    return (
      <div className="grid place-items-center py-32">
        <Loader2 className="animate-spin text-gold-400" />
      </div>
    );
  }

  if (!grupo) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Grupo não encontrado</h1>
        <p className="mt-2 text-sm text-ink-400">
          Você pode não fazer parte dele, ou o código mudou.
        </p>
        <Link href="/grupos" className="mt-5 inline-block text-gold-400 hover:underline">
          Voltar para Grupos
        </Link>
      </div>
    );
  }

  const ativo = estudos.find((e) => e.status === "ativo");
  const rascunhos = estudos.filter((e) => e.status === "rascunho");
  const encerrados = estudos.filter((e) => e.status === "encerrado");

  return (
    <div className="mx-auto max-w-3xl px-4 pt-6 pb-24 md:px-6">
      <Link
        href="/grupos"
        className="inline-flex items-center gap-1.5 text-[13px] text-ink-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={15} />
        Grupos
      </Link>

      <header className="mt-4">
        <h1 className="font-display text-3xl font-black tracking-tight md:text-4xl">
          {grupo.nome}
        </h1>
        {grupo.descricao && <p className="mt-1.5 text-sm text-ink-400">{grupo.descricao}</p>}
      </header>

      {/* Código de acesso */}
      <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-gold-500/25 bg-gold-500/8 p-5 sm:flex-row sm:items-center">
        <div className="flex-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-gold-400">
            Código de acesso
          </p>
          <p className="mt-1 font-mono text-2xl font-bold tracking-widest">{grupo.codigo}</p>
        </div>
        <button
          onClick={compartilhar}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold-400 px-5 py-3 font-display text-sm font-bold text-ink-950 transition-colors hover:bg-gold-300"
        >
          {copiado ? <Check size={17} /> : <Share2 size={17} />}
          {copiado ? "Copiado" : "Compartilhar"}
        </button>
      </div>

      {/* Estudo em andamento */}
      {ativo && (
        <section className="mt-7">
          <h2 className="mb-3 font-display text-xs font-bold uppercase tracking-[0.16em] text-ink-400">
            Acontecendo agora
          </h2>
          <CardEstudo estudo={ativo} destaque />
        </section>
      )}

      {souLider && (
        <Link
          href={`/grupos/${grupo.codigo}/novo`}
          className="mt-5 flex items-center gap-3 rounded-2xl border border-white/8 bg-ink-900 p-4 transition-colors hover:border-white/20"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-400 text-ink-950">
            <Plus size={20} />
          </span>
          <span>
            <span className="block font-display text-base font-bold">Novo estudo</span>
            <span className="block text-[13px] text-ink-400">
              Escolha o método, o texto e o tempo
            </span>
          </span>
        </Link>
      )}

      {rascunhos.length > 0 && souLider && (
        <section className="mt-7">
          <h2 className="mb-3 font-display text-xs font-bold uppercase tracking-[0.16em] text-ink-400">
            Preparados, ainda não iniciados
          </h2>
          <div className="space-y-2.5">
            {rascunhos.map((e) => (
              <CardEstudo key={e.id} estudo={e} />
            ))}
          </div>
        </section>
      )}

      {/* Participantes */}
      <section className="mt-8">
        <h2 className="mb-3 font-display text-xs font-bold uppercase tracking-[0.16em] text-ink-400">
          Participantes ({membros.length})
        </h2>
        <div className="flex flex-wrap gap-2">
          {membros.map((m) => (
            <span
              key={m.perfil_id}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium ${
                m.papel === "lider"
                  ? "bg-gold-400/15 text-gold-300"
                  : "bg-white/[0.06] text-ink-100"
              }`}
            >
              {m.papel === "lider" && <Crown size={12} />}
              {m.profiles?.nome ?? "Participante"}
              {m.perfil_id === perfil.id && (
                <span className="text-ink-500">(você)</span>
              )}
            </span>
          ))}
        </div>
      </section>

      {encerrados.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 font-display text-xs font-bold uppercase tracking-[0.16em] text-ink-400">
            Histórico
          </h2>
          <div className="space-y-2.5">
            {encerrados.map((e) => (
              <CardEstudo key={e.id} estudo={e} />
            ))}
          </div>
        </section>
      )}

      {!ativo && !rascunhos.length && !encerrados.length && (
        <div className="mt-8 rounded-2xl border border-dashed border-white/10 py-14 text-center">
          <p className="font-display text-base font-bold text-ink-300">
            Nenhum estudo ainda
          </p>
          <p className="mx-auto mt-1.5 max-w-xs text-sm text-ink-400">
            {souLider
              ? "Crie o primeiro estudo e libere as etapas conforme o grupo avança."
              : "Assim que o líder criar um estudo, ele aparece aqui."}
          </p>
        </div>
      )}
    </div>
  );
}

function CardEstudo({ estudo, destaque = false }: { estudo: Estudo; destaque?: boolean }) {
  const metodo = metodoPorId(estudo.metodo);
  const Icone = estudo.status === "ativo" ? CircleDot : estudo.status === "encerrado" ? Archive : Play;

  return (
    <Link
      href={`/grupos/estudo/${estudo.id}`}
      className={`group flex items-center gap-4 rounded-2xl border p-4 transition-colors ${
        destaque
          ? "border-emerald-400/30 bg-emerald-400/8 hover:bg-emerald-400/14"
          : "border-white/6 bg-ink-900 hover:border-white/20"
      }`}
    >
      <span
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
          destaque ? "bg-emerald-400/20 text-emerald-300" : "bg-white/[0.06] text-ink-300"
        }`}
      >
        <Icone size={18} className={destaque ? "animate-pulse" : ""} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-base font-bold">{estudo.titulo}</p>
        <p className="mt-0.5 truncate text-[13px] text-ink-400">
          {metodo?.nome ?? estudo.metodo}
          {estudo.referencia && ` · ${estudo.referencia.nome} ${estudo.referencia.capitulo}`}
          {` · ${estudo.duracao_min} min`}
        </p>
      </div>
    </Link>
  );
}
