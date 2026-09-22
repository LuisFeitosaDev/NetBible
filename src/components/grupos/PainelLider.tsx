"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  Users,
  Timer,
  CheckCircle2,
  Circle,
  Lock,
  Unlock,
  Flag,
  Shuffle,
  Play,
} from "lucide-react";
import {
  definirEquipes,
  encerrarEstudo,
  iniciarEstudo,
  liberarEtapa,
  voltarEtapa,
} from "@/lib/grupos/api";
import type {
  Equipe,
  Estudo,
  Etapa,
  Membro,
  Pergunta,
  Resposta,
} from "@/lib/grupos/tipos";

/**
 * Painel do líder. Fica colapsado por padrão: durante o encontro, o líder
 * também está estudando, e a tela dele não pode virar um cockpit.
 */
export function PainelLider({
  estudo,
  etapas,
  perguntas,
  respostas,
  membros,
  equipes,
  equipeMembros,
  aoMudar,
}: {
  estudo: Estudo;
  etapas: Etapa[];
  perguntas: Pergunta[];
  respostas: Resposta[];
  membros: Membro[];
  equipes: Equipe[];
  equipeMembros: { equipe_id: string; perfil_id: string }[];
  aoMudar: () => void;
}) {
  const [aberto, setAberto] = useState(estudo.status === "rascunho");
  const [ocupado, setOcupado] = useState(false);

  const etapaAtual = etapas.find((e) => e.ordem === estudo.etapa_atual);
  const proxima = etapas.find((e) => e.ordem === estudo.etapa_atual + 1);

  const perguntasDaEtapa = perguntas.filter((p) => p.etapa_id === etapaAtual?.id);
  const idsPergunta = new Set(perguntasDaEtapa.map((p) => p.id));
  const respostasDaEtapa = respostas.filter((r) => idsPergunta.has(r.pergunta_id));
  const responderam = new Set(respostasDaEtapa.map((r) => r.perfil_id)).size;

  const restante = useRestante(estudo);

  const agir = async (fn: () => Promise<void>) => {
    setOcupado(true);
    try {
      await fn();
      aoMudar();
    } finally {
      setOcupado(false);
    }
  };

  return (
    <div className="sticky top-0 z-30 -mx-4 border-b border-white/8 bg-ink-950/95 px-4 backdrop-blur-xl md:-mx-6 md:px-6">
      <button
        onClick={() => setAberto((v) => !v)}
        className="flex w-full items-center gap-3 py-3 text-left"
      >
        <span className="rounded-md bg-gold-400 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-ink-950">
          Líder
        </span>
        <span className="flex-1 truncate text-[13px] text-ink-300">
          {estudo.status === "rascunho"
            ? "Estudo ainda não iniciado"
            : etapaAtual
              ? `${etapaAtual.icone} ${etapaAtual.titulo}`
              : "Sem etapa"}
        </span>
        <span className="flex items-center gap-3 text-[12px] text-ink-400">
          <span className="inline-flex items-center gap-1">
            <Users size={13} />
            {responderam}/{membros.length}
          </span>
          {restante && (
            <span className="inline-flex items-center gap-1">
              <Timer size={13} />
              {restante}
            </span>
          )}
        </span>
        <ChevronDown
          size={17}
          className={`shrink-0 text-ink-400 transition-transform ${aberto ? "rotate-180" : ""}`}
        />
      </button>

      {aberto && (
        <div className="pb-4">
          {estudo.status === "rascunho" && (
            <button
              onClick={() => agir(() => iniciarEstudo(estudo.id))}
              disabled={ocupado}
              className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gold-400 py-3 font-display text-sm font-bold text-ink-950 transition-colors hover:bg-gold-300 disabled:opacity-40"
            >
              <Play size={16} />
              Iniciar estudo
            </button>
          )}

          {estudo.status === "ativo" && (
            <div className="mb-4 flex gap-2">
              {proxima ? (
                <button
                  onClick={() => agir(() => liberarEtapa(estudo.id, proxima))}
                  disabled={ocupado}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gold-400 py-3 font-display text-sm font-bold text-ink-950 transition-colors hover:bg-gold-300 disabled:opacity-40"
                >
                  <Unlock size={16} />
                  Liberar: {proxima.titulo}
                </button>
              ) : (
                <button
                  onClick={() => agir(() => encerrarEstudo(estudo.id))}
                  disabled={ocupado}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-400 py-3 font-display text-sm font-bold text-ink-950 transition-colors hover:bg-emerald-300 disabled:opacity-40"
                >
                  <Flag size={16} />
                  Encerrar estudo
                </button>
              )}
            </div>
          )}

          {/* Trilha de etapas */}
          <div className="mb-4 space-y-1">
            {etapas.map((etapa) => {
              const atual = etapa.ordem === estudo.etapa_atual;
              return (
                <div
                  key={etapa.id}
                  className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] ${
                    atual ? "bg-white/10" : ""
                  }`}
                >
                  {etapa.liberada ? (
                    <CheckCircle2 size={15} className="shrink-0 text-gold-400" />
                  ) : (
                    <Circle size={15} className="shrink-0 text-ink-600" />
                  )}
                  <span className="shrink-0">{etapa.icone}</span>
                  <span className={`flex-1 truncate ${atual ? "font-semibold" : "text-ink-300"}`}>
                    {etapa.titulo}
                  </span>
                  {estudo.status === "ativo" && (
                    <div className="flex shrink-0 gap-1">
                      {!etapa.liberada && (
                        <button
                          onClick={() => agir(() => liberarEtapa(estudo.id, etapa))}
                          disabled={ocupado}
                          title="Liberar esta etapa"
                          className="rounded p-1 text-ink-400 transition-colors hover:bg-white/10 hover:text-white"
                        >
                          <Lock size={13} />
                        </button>
                      )}
                      {etapa.liberada && !atual && (
                        <button
                          onClick={() => agir(() => voltarEtapa(estudo.id, etapa.ordem))}
                          disabled={ocupado}
                          title="Voltar o grupo para esta etapa"
                          className="rounded px-1.5 py-1 text-[11px] font-semibold text-ink-400 transition-colors hover:bg-white/10 hover:text-white"
                        >
                          ir
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {equipes.length > 0 && (
            <Equipes
              equipes={equipes}
              membros={membros}
              equipeMembros={equipeMembros}
              estudoId={estudo.id}
              aoMudar={aoMudar}
            />
          )}
        </div>
      )}
    </div>
  );
}

function Equipes({
  equipes,
  membros,
  equipeMembros,
  estudoId,
  aoMudar,
}: {
  equipes: Equipe[];
  membros: Membro[];
  equipeMembros: { equipe_id: string; perfil_id: string }[];
  estudoId: string;
  aoMudar: () => void;
}) {
  const [ocupado, setOcupado] = useState(false);

  const porEquipe = useMemo(() => {
    const mapa = new Map<string, string[]>();
    equipes.forEach((e) => mapa.set(e.id, []));
    equipeMembros.forEach((em) => mapa.get(em.equipe_id)?.push(em.perfil_id));
    return mapa;
  }, [equipes, equipeMembros]);

  const semEquipe = membros.filter(
    (m) => !equipeMembros.some((em) => em.perfil_id === m.perfil_id),
  );

  const sortear = async () => {
    setOcupado(true);
    try {
      const baralho = [...membros].sort(() => Math.random() - 0.5);
      const atribuicoes = equipes.map((e) => ({ equipeId: e.id, perfis: [] as string[] }));
      baralho.forEach((m, i) => atribuicoes[i % equipes.length].perfis.push(m.perfil_id));
      await definirEquipes(estudoId, atribuicoes);
      aoMudar();
    } finally {
      setOcupado(false);
    }
  };

  const nomeDe = (id: string) =>
    membros.find((m) => m.perfil_id === id)?.profiles?.nome ?? "Participante";

  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
      <div className="mb-2.5 flex items-center justify-between">
        <p className="text-[12px] font-bold uppercase tracking-wider text-ink-400">Equipes</p>
        <button
          onClick={sortear}
          disabled={ocupado || !membros.length}
          className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-[12px] font-semibold transition-colors hover:bg-white/18 disabled:opacity-40"
        >
          <Shuffle size={12} />
          Sortear
        </button>
      </div>

      <div className="space-y-2">
        {equipes.map((e) => (
          <div key={e.id} className="flex items-start gap-2 text-[13px]">
            <span
              className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ background: e.cor }}
            />
            <span className="w-20 shrink-0 font-semibold">{e.nome}</span>
            <span className="flex-1 text-ink-400">
              {(porEquipe.get(e.id) ?? []).map(nomeDe).join(", ") || "vazia"}
            </span>
          </div>
        ))}
      </div>

      {semEquipe.length > 0 && (
        <p className="mt-2.5 text-[12px] text-amber-400/80">
          Sem equipe: {semEquipe.map((m) => m.profiles?.nome ?? "?").join(", ")}
        </p>
      )}
    </div>
  );
}

/** Tempo restante estimado, a partir de quando o líder iniciou. */
function useRestante(estudo: Estudo) {
  const [, forcar] = useState(0);

  useEffect(() => {
    if (estudo.status !== "ativo") return;
    const t = setInterval(() => forcar((n) => n + 1), 30_000);
    return () => clearInterval(t);
  }, [estudo.status]);

  if (estudo.status !== "ativo" || !estudo.iniciado_em) return null;
  const fim = new Date(estudo.iniciado_em).getTime() + estudo.duracao_min * 60_000;
  const faltam = Math.round((fim - Date.now()) / 60_000);
  if (faltam < 0) return `+${Math.abs(faltam)} min`;
  return `${faltam} min`;
}
