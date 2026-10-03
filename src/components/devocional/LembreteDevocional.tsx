"use client";

import { Bell, BellOff, BellRing, Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BotaoGoogle } from "@/components/grupos/BotaoGoogle";
import { HORA_DO_LEMBRETE, useLembreteDevocional } from "@/lib/lembrete";

/**
 * O cartão do lembrete diário, na série e no fim de cada dia. Sem conta, vira
 * o convite para entrar: é o mesmo passo que leva o progresso para a conta.
 */
export function LembreteDevocional({
  cor,
  /** No fim do dia: some quando o lembrete já está ligado, para não repetir. */
  soOferecer = false,
}: {
  cor: string;
  soOferecer?: boolean;
}) {
  const { estado, ligar, desligar, salvando, erro } = useLembreteDevocional();
  const pathname = usePathname();
  const [erroGoogle, setErroGoogle] = useState<string | null>(null);

  if (estado === "oculto" || estado === "carregando") return null;
  if (soOferecer && estado === "ligado") return null;

  const ligado = estado === "ligado";
  const Icone = ligado ? BellRing : estado === "bloqueado" ? BellOff : Bell;

  return (
    <section className="rounded-2xl border border-white/8 bg-ink-900 p-4">
      <div className="flex items-start gap-3.5">
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
          style={{ backgroundColor: `${cor}22`, color: cor }}
        >
          <Icone size={18} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-[15px] font-bold">Lembrete diário</h3>
            {(estado === "ligado" || estado === "desligado") && (
              <button
                role="switch"
                aria-checked={ligado}
                aria-label="Lembrete diário do devocional"
                disabled={salvando}
                onClick={() => void (ligado ? desligar() : ligar())}
                className="relative h-6 w-11 shrink-0 rounded-full transition-colors disabled:opacity-60"
                style={{ backgroundColor: ligado ? cor : "rgb(255 255 255 / 0.15)" }}
              >
                {salvando ? (
                  <Loader2 size={14} className="absolute inset-0 m-auto animate-spin text-white" />
                ) : (
                  <span
                    className={`absolute left-0 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                      ligado ? "translate-x-[22px]" : "translate-x-0.5"
                    }`}
                  />
                )}
              </button>
            )}
          </div>

          <p className="mt-0.5 text-[13px] leading-relaxed text-ink-400">
            {estado === "ligado" &&
              `Todo dia às ${HORA_DO_LEMBRETE}, só se você ainda não tiver feito o devocional.`}
            {estado === "desligado" &&
              `Um aviso às ${HORA_DO_LEMBRETE} nos dias em que o devocional ainda não foi feito. Nunca mais de um por dia.`}
            {estado === "sem-conta" &&
              "Entre na sua conta para receber o lembrete e levar o seu progresso para qualquer aparelho."}
            {estado === "sem-suporte" &&
              "Este navegador não recebe avisos. No iPhone, adicione o app à Tela de Início (Compartilhar → Adicionar à Tela de Início) e abra por lá."}
            {estado === "bloqueado" &&
              "Os avisos deste app estão bloqueados. Libere as notificações nas configurações do navegador para receber o lembrete."}
          </p>

          {estado === "sem-conta" && (
            <div className="mt-3 max-w-xs">
              <BotaoGoogle rotulo="Entrar com Google" destino={pathname} aoFalhar={setErroGoogle} />
            </div>
          )}
          {(erro || erroGoogle) && <p className="mt-2 text-[12.5px] text-red-400">{erro ?? erroGoogle}</p>}
        </div>
      </div>
    </section>
  );
}
