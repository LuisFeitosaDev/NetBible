"use client";

import { useEffect, useState } from "react";
import {
  Check,
  ChevronDown,
  Copy,
  Loader2,
  Share2,
  Unlink,
  UserPlus2,
  Users,
} from "lucide-react";
import { Gate } from "@/components/grupos/Gate";
import { supabaseConfigurado } from "@/lib/grupos/supabase";
import type { Perfil } from "@/lib/grupos/tipos";
import {
  desfazerParceria,
  entrarComCodigoDeParceria,
  gerarCodigoDeParceria,
  minhaParceria,
  progressoDoParceiro,
  type Parceria,
  type ProgressoDoParceiro,
} from "@/lib/parceria";
import { ConfirmarExclusao } from "@/components/ConfirmarExclusao";
import type { BibleIndex } from "@/lib/bible";

/**
 * Leitura em dupla: um código liga duas contas, e cada uma passa a ver quantos
 * capítulos a outra já leu — nunca o que ela marcou ou escreveu.
 *
 * Fica fechado por padrão, atrás de um acordeão, porque ler sozinho continua
 * sendo o caminho principal e não precisa pedir conta a ninguém. Só quem abre
 * "Leitura em dupla" esbarra na tela de entrada, que é a mesma de Grupos —
 * mesma conta, mesmo nome, sem duplicar o fluxo de login.
 */
export function ParceriaLeitura({
  meuProgresso,
  index,
}: {
  meuProgresso: { percentual: number; lidos: number; total: number; diaVisivel: number; dias: number } | null;
  index: BibleIndex;
}) {
  const [aberto, setAberto] = useState(false);

  if (!supabaseConfigurado) return null;

  return (
    <section className="rounded-2xl border border-white/8 bg-ink-900">
      <button
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        className="flex w-full items-center gap-3 p-4 text-left"
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-ink-300">
          <Users size={16} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-[14px] font-bold">Leitura em dupla</span>
          <span className="block text-[12px] text-ink-500">
            Convide alguém para acompanhar o progresso junto
          </span>
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-ink-500 transition-transform ${aberto ? "rotate-180" : ""}`}
        />
      </button>

      {aberto && (
        <div className="animate-fade border-t border-white/6 p-4">
          <Gate
            titulo="Leia em dupla"
            descricao="Entre com a sua conta para convidar alguém e ver o progresso um do outro em qualquer aparelho."
            descricaoSemConta="Dá para entrar só com um nome. Mas aí a parceria fica presa a este aparelho: se limpar os dados ou trocar de celular, a outra pessoa para de ver sua leitura."
            destino="/biblioteca"
          >
            {(perfil) => <ConteudoParceria perfil={perfil} meuProgresso={meuProgresso} index={index} />}
          </Gate>
        </div>
      )}
    </section>
  );
}

function ConteudoParceria({
  perfil,
  meuProgresso,
  index,
}: {
  perfil: Perfil;
  meuProgresso: { percentual: number; lidos: number; total: number; diaVisivel: number; dias: number } | null;
  index: BibleIndex;
}) {
  const [carregando, setCarregando] = useState(true);
  const [parceria, setParceria] = useState<Parceria | null>(null);
  const [progressoParceiro, setProgressoParceiro] = useState<ProgressoDoParceiro | null>(null);
  const [codigoDigitado, setCodigoDigitado] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [falha, setFalha] = useState<string | null>(null);
  const [copiado, setCopiado] = useState(false);
  const [confirmandoFim, setConfirmandoFim] = useState(false);

  const carregar = async () => {
    setCarregando(true);
    try {
      const p = await minhaParceria();
      setParceria(p);
      if (p?.parceiroId && p.parceiroNome) {
        setProgressoParceiro(await progressoDoParceiro(p.parceiroId, p.parceiroNome, index));
      } else {
        setProgressoParceiro(null);
      }
    } catch (e) {
      setFalha(e instanceof Error ? e.message : String(e));
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    void carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (carregando) {
    return (
      <div className="grid place-items-center py-8">
        <Loader2 size={18} className="animate-spin text-ink-500" />
      </div>
    );
  }

  if (parceria?.parceiroId) {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2.5">
          <CartaoProgresso rotulo="Você" percentual={meuProgresso?.percentual ?? 0} voce />
          <CartaoProgresso
            rotulo={progressoParceiro?.nome ?? parceria.parceiroNome ?? "Sua dupla"}
            percentual={progressoParceiro?.plano?.percentual ?? 0}
            semPlano={!progressoParceiro?.temPlano}
          />
        </div>

        {progressoParceiro?.temPlano && (
          <p className="text-center text-[12px] text-ink-500">
            {progressoParceiro.nome} está no dia {progressoParceiro.plano!.diaVisivel} de{" "}
            {progressoParceiro.plano!.dias}, em &ldquo;{progressoParceiro.plano!.nome}&rdquo;.
          </p>
        )}

        <button
          onClick={() => setConfirmandoFim(true)}
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-ink-500 transition-colors hover:text-red-400"
        >
          <Unlink size={12} />
          Desfazer parceria
        </button>

        {confirmandoFim && (
          <ConfirmarExclusao
            titulo="Desfazer a parceria?"
            aviso={`Você e ${progressoParceiro?.nome ?? "essa pessoa"} deixam de ver o progresso um do outro. Cada leitura continua salva como está.`}
            rotuloConfirmar="Desfazer parceria"
            aoConfirmar={async () => {
              await desfazerParceria();
              await carregar();
            }}
            aoFechar={() => setConfirmandoFim(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {falha && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-[12.5px] text-red-300">{falha}</p>
      )}

      {parceria?.codigo ? (
        <div className="rounded-xl border border-gold-500/25 bg-gold-500/[0.06] p-4 text-center">
          <p className="text-[12px] text-ink-400">Envie este código para a outra pessoa</p>
          <p className="mt-1.5 font-mono text-2xl font-bold tracking-widest text-gold-300">
            {parceria.codigo}
          </p>
          <button
            onClick={async () => {
              const texto = `Bora ler a Bíblia junto? Entra com esse código no Genipse Bible: ${parceria.codigo}`;
              if (navigator.share) {
                try {
                  await navigator.share({ text: texto });
                  return;
                } catch {
                  /* cancelado */
                }
              }
              await navigator.clipboard.writeText(texto);
              setCopiado(true);
              setTimeout(() => setCopiado(false), 1800);
            }}
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-[13px] font-semibold transition-colors hover:bg-white/16"
          >
            {copiado ? <Check size={14} /> : <Share2 size={14} />}
            {copiado ? "Copiado" : "Compartilhar"}
          </button>
          <p className="mt-2 text-[11px] text-ink-500">Vale por 7 dias, uso único.</p>
        </div>
      ) : (
        <button
          onClick={async () => {
            setOcupado(true);
            setFalha(null);
            try {
              const codigo = await gerarCodigoDeParceria();
              setParceria((p) => ({ ...(p ?? { parceiroId: null, parceiroNome: null, codigoExpiraEm: null }), codigo }));
            } catch (e) {
              setFalha(e instanceof Error ? e.message : String(e));
            } finally {
              setOcupado(false);
            }
          }}
          disabled={ocupado}
          className="flex w-full items-center gap-3 rounded-xl border border-white/8 p-3.5 text-left transition-colors hover:border-white/22 disabled:opacity-50"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gold-400/15 text-gold-400">
            <UserPlus2 size={16} />
          </span>
          <span className="min-w-0">
            <span className="block font-sans text-[13.5px] font-bold">Convidar alguém</span>
            <span className="block text-[11.5px] text-ink-500">Gera um código para compartilhar</span>
          </span>
        </button>
      )}

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-white/8" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-ink-600">ou</span>
        <span className="h-px flex-1 bg-white/8" />
      </div>

      <div>
        <p className="mb-1.5 text-[12.5px] font-semibold text-ink-300">Já tenho um código</p>
        <div className="flex gap-2">
          <input
            value={codigoDigitado}
            onChange={(e) => setCodigoDigitado(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && entrar()}
            placeholder="DUPLA-XXXXXX"
            maxLength={20}
            className="min-w-0 flex-1 rounded-lg border border-white/10 bg-ink-850 px-3 py-2.5 font-mono text-[14px] uppercase tracking-wider outline-none placeholder:text-ink-600 focus:border-gold-500/60"
          />
          <button
            onClick={entrar}
            disabled={ocupado || codigoDigitado.trim().length < 4}
            className="shrink-0 rounded-lg bg-white/10 px-4 text-[13px] font-semibold transition-colors hover:bg-white/16 disabled:opacity-40"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );

  async function entrar() {
    if (codigoDigitado.trim().length < 4) return;
    setOcupado(true);
    setFalha(null);
    try {
      await entrarComCodigoDeParceria(codigoDigitado);
      setCodigoDigitado("");
      await carregar();
    } catch (e) {
      setFalha(e instanceof Error ? e.message : String(e));
    } finally {
      setOcupado(false);
    }
  }
}

function CartaoProgresso({
  rotulo,
  percentual,
  voce,
  semPlano,
}: {
  rotulo: string;
  percentual: number;
  voce?: boolean;
  semPlano?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/6 bg-white/[0.03] p-3">
      <p className="truncate text-[11.5px] font-semibold text-ink-400">{rotulo}</p>
      {semPlano ? (
        <p className="mt-1.5 text-[12px] text-ink-500">Sem plano ainda</p>
      ) : (
        <>
          <p
            className={`mt-1 font-display text-2xl font-black tracking-tight ${voce ? "text-gold-400" : "text-white"}`}
          >
            {percentual}%
          </p>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/8">
            <div
              className={`h-full rounded-full ${voce ? "bg-gold-400" : "bg-emerald-400"}`}
              style={{ width: `${percentual}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
}
