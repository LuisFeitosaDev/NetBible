"use client";

import { useState } from "react";
import { KeyRound, Loader2 } from "lucide-react";
import { Gate } from "@/components/grupos/Gate";
import { supabaseConfigurado } from "@/lib/grupos/supabase";
import { entrarNoGrupoComPlano } from "@/lib/leituraGrupo";

/**
 * Entrar num grupo já existente, pelo código de quem criou. Fica na tela vazia
 * da Jornada: quem só recebeu um código não precisa montar plano nenhum.
 */
export function EntrarComCodigo() {
  const [aberto, setAberto] = useState(false);

  if (!supabaseConfigurado) return null;

  if (!aberto) {
    return (
      <button
        onClick={() => setAberto(true)}
        className="mt-3 inline-flex items-center gap-2 rounded-xl border border-white/12 px-4 py-2.5 text-[13px] font-semibold text-ink-200 transition-colors hover:border-white/25 hover:text-white"
      >
        <KeyRound size={14} />
        Entrar com um código
      </button>
    );
  }

  return (
    <div className="mt-4 rounded-2xl border border-white/8 bg-ink-900 p-4 text-left">
      <Gate
        titulo="Entrar com um código"
        descricao="Entre com a sua conta para o grupo te acompanhar em qualquer aparelho."
        descricaoSemConta="Dá para entrar só com um nome. Mas aí você fica preso a este aparelho: se limpar os dados ou trocar de celular, o grupo perde você."
        destino="/biblioteca"
      >
        {() => <Formulario />}
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

function Formulario() {
  const [codigo, setCodigo] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [falha, setFalha] = useState<string | null>(null);

  const entrar = async () => {
    if (codigo.trim().length < 4) return;
    setOcupado(true);
    setFalha(null);
    try {
      // Dando certo, o plano gravado localmente troca a tela sozinho: a
      // Jornada ouve o banco local.
      const { adotouPlano } = await entrarNoGrupoComPlano(codigo);
      if (!adotouPlano) {
        setFalha("Esse grupo ainda não tem um plano. Peça para quem criou fazer um novo.");
      }
    } catch (e) {
      setFalha(e instanceof Error ? e.message : String(e));
    } finally {
      setOcupado(false);
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-[12.5px] leading-relaxed text-ink-400">
        Digite o código que te mandaram. Você entra no plano do grupo, no mesmo
        dia de leitura de todo mundo, começando do 0%.
      </p>
      {falha && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-[12.5px] text-red-300">{falha}</p>
      )}
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
