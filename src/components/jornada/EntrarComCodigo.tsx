"use client";

import { useState } from "react";
import { KeyRound, Loader2 } from "lucide-react";
import { Gate } from "@/components/grupos/Gate";
import { supabaseConfigurado } from "@/lib/grupos/supabase";
import { entrarNoGrupoComPlano } from "@/lib/leituraGrupo";
import type { BibleIndex } from "@/lib/bible";

/**
 * Entrar num grupo já existente, pelo código de quem criou.
 *
 * Fica na tela vazia da Jornada, ao lado de "Criar plano de leitura" — sem
 * isso, a única porta de entrada num grupo era criar seu próprio plano
 * primeiro, o que não faz sentido para quem só recebeu um código e quer
 * entrar direto no que já está rolando.
 */
export function EntrarComCodigo({
  index,
  lido,
}: {
  index: BibleIndex;
  lido: (slug: string, capitulo: number) => boolean;
}) {
  const [aberto, setAberto] = useState(false);

  if (!aberto) {
    return (
      <button
        onClick={() => setAberto(true)}
        className="mt-2.5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-ink-400 transition-colors hover:text-white"
      >
        <KeyRound size={13} />
        Entrar com um código
      </button>
    );
  }

  if (!supabaseConfigurado) return null;

  return (
    <div className="mt-3 rounded-2xl border border-white/8 bg-ink-900 p-4">
      <Gate
        titulo="Entrar com um código"
        descricao="Entre com a sua conta para entrar no grupo e ver o progresso de cada um em qualquer aparelho."
        descricaoSemConta="Dá para entrar só com um nome. Mas aí o grupo fica preso a este aparelho: se limpar os dados ou trocar de celular, o resto do grupo para de ver sua leitura."
        destino="/biblioteca"
      >
        {() => <Formulario index={index} lido={lido} aoFechar={() => setAberto(false)} />}
      </Gate>
      <button
        onClick={() => setAberto(false)}
        className="mt-2 text-[12px] font-semibold text-ink-500 hover:text-white"
      >
        Cancelar
      </button>
    </div>
  );
}

function Formulario({
  index,
  lido,
  aoFechar,
}: {
  index: BibleIndex;
  lido: (slug: string, capitulo: number) => boolean;
  aoFechar: () => void;
}) {
  const [codigo, setCodigo] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [falha, setFalha] = useState<string | null>(null);
  const [semPlanoAinda, setSemPlanoAinda] = useState(false);

  const entrar = async () => {
    if (codigo.trim().length < 4) return;
    setOcupado(true);
    setFalha(null);
    try {
      const { adotouPlano } = await entrarNoGrupoComPlano(codigo, index, lido);
      if (adotouPlano) {
        // O plano gravado localmente aparece sozinho: a tela do plano ouve o
        // banco (useLiveQuery) e troca da vazia para a ativa assim que grava.
        aoFechar();
      } else {
        setSemPlanoAinda(true);
      }
    } catch (e) {
      setFalha(e instanceof Error ? e.message : String(e));
    } finally {
      setOcupado(false);
    }
  };

  if (semPlanoAinda) {
    return (
      <div className="text-center">
        <p className="text-[13px] leading-relaxed text-ink-300">
          Você entrou no grupo, mas ainda ninguém criou um plano por lá. Assim
          que alguém criar, ele aparece aqui — ou crie o seu, que o grupo passa
          a te acompanhar também.
        </p>
        <button
          onClick={aoFechar}
          className="mt-3 rounded-lg bg-white/10 px-4 py-2 text-[13px] font-semibold hover:bg-white/16"
        >
          Entendi
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {falha && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-[12.5px] text-red-300">{falha}</p>
      )}
      <p className="text-[12.5px] text-ink-400">
        Digite o código que a outra pessoa te passou. Você entra no grupo e já
        começa no mesmo dia de leitura que ela.
      </p>
      <div className="flex gap-2">
        <input
          value={codigo}
          onChange={(e) => setCodigo(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === "Enter" && entrar()}
          placeholder="Código de convite"
          maxLength={20}
          autoFocus
          className="min-w-0 flex-1 rounded-lg border border-white/10 bg-ink-850 px-3 py-2.5 font-mono text-[13px] uppercase tracking-wider outline-none placeholder:text-ink-600 focus:border-gold-500/60"
        />
        <button
          onClick={entrar}
          disabled={ocupado || codigo.trim().length < 4}
          className="flex shrink-0 items-center gap-1.5 rounded-lg bg-gold-400 px-4 text-[13px] font-bold text-ink-950 hover:bg-gold-300 disabled:opacity-40"
        >
          {ocupado && <Loader2 size={13} className="animate-spin" />}
          Entrar
        </button>
      </div>
    </div>
  );
}
