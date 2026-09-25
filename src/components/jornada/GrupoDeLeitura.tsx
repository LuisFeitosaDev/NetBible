"use client";

import { useEffect, useState } from "react";
import { Trash2, Unlink, Users } from "lucide-react";
import { supabaseConfigurado } from "@/lib/grupos/supabase";
import { adotarPlanoDoGrupoSeNecessario, apagarPlanoDoGrupo, excluirGrupo, meuGrupoDeLeitura, progressoDoGrupo, sairDoGrupo } from "@/lib/leituraGrupo";
import type { Grupo } from "@/lib/grupos/tipos";
import type { ProgressoDoMembro } from "@/lib/leituraGrupo";
import type { BibleIndex } from "@/lib/bible";
import { ConfirmarExclusao } from "@/components/ConfirmarExclusao";

/**
 * Card compacto do grupo de leitura, dentro da tela do plano ativo.
 *
 * Só aparece para quem já criou ou entrou num grupo — pela `ComoVaiLer`, no
 * momento de criar o plano. Não pede conta nem mostra nada para quem lê
 * sozinho: se não há sessão, `meuGrupoDeLeitura` devolve `null` sem criar uma,
 * e este componente simplesmente não desenha nada.
 */
export function GrupoDeLeitura({ index }: { index: BibleIndex }) {
  const [carregando, setCarregando] = useState(true);
  const [grupo, setGrupo] = useState<Grupo | null>(null);
  const [souLider, setSouLider] = useState(false);
  const [membros, setMembros] = useState<ProgressoDoMembro[]>([]);
  const [confirmandoSaida, setConfirmandoSaida] = useState(false);

  const carregar = async () => {
    try {
      const meu = await meuGrupoDeLeitura();
      if (meu?.grupo) {
        await adotarPlanoDoGrupoSeNecessario(meu.grupo.id, index, () => false);
        setGrupo(meu.grupo);
        setSouLider(meu.souLider);
        const lista = await progressoDoGrupo(meu.grupo, index);
        setMembros(lista);
      } else {
        setGrupo(null);
        setMembros([]);
      }
    } catch (e) {
      console.error("[GrupoDeLeitura] erro ao carregar:", e);
      setGrupo(null);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    if (!supabaseConfigurado) {
      setCarregando(false);
      return;
    }
    void carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!supabaseConfigurado || carregando || !grupo) return null;

  const meuPerfilId = membros.find((m) => m.souEu)?.perfilId;

  return (
    <section className="rounded-2xl border border-white/8 bg-ink-900 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <p className="flex items-center gap-1.5 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink-500">
            <Users size={11} />
            {grupo.nome}
          </p>
          <span className="rounded bg-white/6 px-1.5 py-0.5 font-mono text-[11px] font-bold tracking-wider text-gold-300">
            {grupo.codigo}
          </span>
        </div>
        <button
          onClick={() => setConfirmandoSaida(true)}
          aria-label={souLider ? "Apagar grupo" : "Sair do grupo"}
          className="text-ink-600 transition-colors hover:text-red-400"
        >
          {souLider ? <Trash2 size={13} /> : <Unlink size={13} />}
        </button>
      </div>

      <div className="space-y-2.5">
        {membros.map((m) => (
          <div key={m.perfilId} className="flex items-center gap-2.5">
            <span className="w-20 shrink-0 truncate text-[12.5px] font-semibold text-ink-200">
              {m.souEu ? "Você" : m.nome}
            </span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/8">
              <div
                className={`h-full rounded-full ${m.souEu ? "bg-gold-400" : "bg-emerald-400"}`}
                style={{ width: `${m.plano?.percentual ?? 0}%` }}
              />
            </div>
            <span className="w-9 shrink-0 text-right font-mono text-[11px] text-ink-500">
              {m.plano ? `${m.plano.percentual}%` : "—"}
            </span>
          </div>
        ))}
      </div>

      {confirmandoSaida && meuPerfilId && (
        <ConfirmarExclusao
          titulo={souLider ? "Apagar o grupo?" : "Sair do grupo?"}
          aviso={
            souLider
              ? `"${grupo.nome}" é apagado para todo mundo, e o código para de funcionar. A leitura de cada um continua salva como está.`
              : `Você para de ver o progresso de ${grupo.nome}, e o grupo para de ver o seu. Sua leitura continua salva como está.`
          }
          rotuloConfirmar={souLider ? "Apagar grupo" : "Sair do grupo"}
          aoConfirmar={async () => {
            if (souLider) await excluirGrupo(grupo.id);
            else await sairDoGrupo(grupo.id, meuPerfilId);
            // Apaga o plano local junto. Sem isto, o plano órfão reaparece na
            // próxima sincronização: o grupo sumiu, mas o IndexedDB mantém o
            // plano, que volta a subir como se fosse individual.
            await apagarPlanoDoGrupo();
            setGrupo(null);
          }}
          aoFechar={() => setConfirmandoSaida(false)}
        />
      )}
    </section>
  );
}
