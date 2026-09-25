"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, Share2, User, Users } from "lucide-react";
import { Gate } from "@/components/grupos/Gate";
import { supabaseConfigurado } from "@/lib/grupos/supabase";
import type { Perfil } from "@/lib/grupos/tipos";
import {
  apagarPlanoDoGrupo,
  criarGrupo,
  entrarNoGrupoDeLeitura,
  excluirGrupo,
  meuGrupoDeLeitura,
  sairDoGrupo,
} from "@/lib/leituraGrupo";
import type { Grupo } from "@/lib/grupos/tipos";

/**
 * Passo "como você vai ler", dentro da criação do plano: sozinho, ou em dupla
 * ou grupo com um código.
 *
 * A conta só entra em cena se a pessoa escolher dupla/grupo — "Sozinho" segue
 * 100% offline, sem tocar em Supabase, exatamente como o app sempre funcionou.
 * É por isso que o `<Gate>` fica atrás de um segundo toque, e não na entrada
 * deste componente.
 */
export function ComoVaiLer({
  nomeDoPlano,
  aoContinuar,
  aoSalvarPlano,
}: {
  nomeDoPlano: string;
  aoContinuar: () => void;
  aoSalvarPlano?: () => Promise<void>;
}) {
  const [modo, setModo] = useState<"escolher" | "acompanhado">("escolher");

  if (modo === "escolher") {
    return (
      <section>
        <p className="mb-2 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink-500">
          3 · Como você vai ler
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={aoContinuar}
            className="flex flex-col items-center gap-2 rounded-2xl border border-white/8 bg-ink-900 p-4 text-center transition-colors hover:border-white/22"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.06] text-ink-300">
              <User size={16} />
            </span>
            <span className="font-display text-[13.5px] font-bold">Sozinho</span>
          </button>
          <button
            onClick={() => setModo("acompanhado")}
            className="flex flex-col items-center gap-2 rounded-2xl border border-white/8 bg-ink-900 p-4 text-center transition-colors hover:border-white/22"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold-400/15 text-gold-400">
              <Users size={16} />
            </span>
            <span className="font-display text-[13.5px] font-bold">Em dupla ou grupo</span>
          </button>
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-ink-500">
          Em dupla ou grupo, vocês veem quantos capítulos cada um já leu — nunca o
          que marcou ou comentou. Isso continua só seu.
        </p>
      </section>
    );
  }

  if (!supabaseConfigurado) {
    return (
      <section>
        <p className="mb-2 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink-500">
          3 · Como você vai ler
        </p>
        <p className="rounded-2xl border border-dashed border-white/10 p-4 text-center text-[13px] text-ink-400">
          Ler em dupla precisa de conta, e isso ainda não está configurado neste app.
        </p>
        <button
          onClick={() => setModo("escolher")}
          className="mt-2 text-[12.5px] font-semibold text-ink-400 hover:text-white"
        >
          Voltar
        </button>
      </section>
    );
  }

  return (
    <section>
      <p className="mb-2 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink-500">
        3 · Com quem
      </p>
      <div className="rounded-2xl border border-white/8 bg-ink-900 p-4">
        <Gate
          titulo="Leia em dupla ou grupo"
          descricao="Entre com a sua conta para convidar alguém e ver o progresso de cada um em qualquer aparelho."
          descricaoSemConta="Dá para entrar só com um nome. Mas aí o grupo fica preso a este aparelho: se limpar os dados ou trocar de celular, o resto do grupo para de ver sua leitura."
          destino="/biblioteca"
        >
          {(perfil) => (
            <ConteudoAcompanhado
              perfil={perfil}
              nomeDoPlano={nomeDoPlano}
              aoContinuar={aoContinuar}
              aoSalvarPlano={aoSalvarPlano}
            />
          )}
        </Gate>
      </div>
      <button
        onClick={() => setModo("escolher")}
        className="mt-2 text-[12.5px] font-semibold text-ink-400 hover:text-white"
      >
        Ler sozinho em vez disso
      </button>
    </section>
  );
}

function ConteudoAcompanhado({
  perfil,
  nomeDoPlano,
  aoContinuar,
  aoSalvarPlano,
}: {
  perfil: Perfil;
  nomeDoPlano: string;
  aoContinuar: () => void;
  aoSalvarPlano?: () => Promise<void>;
}) {
  const [carregando, setCarregando] = useState(true);
  const [grupo, setGrupo] = useState<Grupo | null>(null);
  const [souLider, setSouLider] = useState(false);
  const [codigoGerado, setCodigoGerado] = useState<string | null>(null);
  const [codigoDigitado, setCodigoDigitado] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [falha, setFalha] = useState<string | null>(null);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    meuGrupoDeLeitura()
      .then((m) => {
        setGrupo(m?.grupo ?? null);
        setSouLider(m?.souLider ?? false);
      })
      .catch((e) => setFalha(e instanceof Error ? e.message : String(e)))
      .finally(() => setCarregando(false));
  }, []);

  if (carregando) {
    return (
      <div className="grid place-items-center py-6">
        <Loader2 size={18} className="animate-spin text-ink-500" />
      </div>
    );
  }

  // Já está em um grupo de leitura: usa esse, não cria outro.
  if (grupo) {
    return (
      <div className="space-y-3 text-center">
        <p className="text-[13.5px] text-ink-200">
          Você já está lendo com o grupo <strong className="font-bold">{grupo.nome}</strong>.
        </p>
        <p className="font-mono text-lg font-bold tracking-widest text-gold-300">
          {grupo.codigo}
        </p>
        <div className="flex justify-center gap-2">
          <button
            onClick={async () => {
              if (aoSalvarPlano) await aoSalvarPlano();
              aoContinuar();
            }}
            className="rounded-lg bg-gold-400 px-4 py-2 text-[13px] font-bold text-ink-950 hover:bg-gold-300"
          >
            Continuar assim
          </button>
          <button
            onClick={async () => {
              setOcupado(true);
              try {
                if (souLider) await excluirGrupo(grupo.id);
                else await sairDoGrupo(grupo.id, perfil.id);
                await apagarPlanoDoGrupo();
              } catch {
                /* mesmo se falhar, deixa tentar de novo a partir do começo */
              } finally {
                setGrupo(null);
                setOcupado(false);
              }
            }}
            disabled={ocupado}
            className="rounded-lg border border-white/10 px-4 py-2 text-[13px] font-semibold text-ink-400 hover:bg-white/8"
          >
            {souLider ? "Apagar grupo" : "Sair do grupo"}
          </button>
        </div>
      </div>
    );
  }

  if (codigoGerado) {
    return (
      <div className="space-y-3 text-center">
        <p className="text-[12px] text-ink-400">Envie este código para quem vai ler com você</p>
        <p className="font-mono text-2xl font-bold tracking-widest text-gold-300">
          {codigoGerado}
        </p>
        <button
          onClick={async () => {
            const texto = `Bora ler a Bíblia junto? Entra com esse código no Genipse Bible: ${codigoGerado}`;
            if (navigator.share) {
              try {
                await navigator.share({ text: texto });
              } catch {
                /* cancelado */
              }
            } else {
              await navigator.clipboard.writeText(texto);
              setCopiado(true);
              setTimeout(() => setCopiado(false), 1800);
            }
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-[13px] font-semibold hover:bg-white/16"
        >
          {copiado ? <Check size={14} /> : <Share2 size={14} />}
          {copiado ? "Copiado" : "Compartilhar"}
        </button>
        <p className="text-[11px] text-ink-500">Quem entrar com esse código já vê seu progresso.</p>
        <button
          onClick={aoContinuar}
          className="block w-full rounded-lg bg-gold-400 py-2.5 text-[13px] font-bold text-ink-950 hover:bg-gold-300"
        >
          Continuar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {falha && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-[12.5px] text-red-300">{falha}</p>
      )}

      <button
        onClick={async () => {
          setOcupado(true);
          setFalha(null);
          try {
            const g = await criarGrupo(`Leitura: ${nomeDoPlano}`, undefined, "leitura");
            if (aoSalvarPlano) {
              await aoSalvarPlano();
            }
            setCodigoGerado(g.codigo);
          } catch (e) {
            setFalha(e instanceof Error ? e.message : String(e));
          } finally {
            setOcupado(false);
          }
        }}
        disabled={ocupado}
        className="w-full rounded-xl bg-white/[0.06] py-3 text-[13.5px] font-bold transition-colors hover:bg-white/12 disabled:opacity-50"
      >
        Criar grupo e gerar código
      </button>

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-white/8" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-ink-600">ou</span>
        <span className="h-px flex-1 bg-white/8" />
      </div>

      <div className="flex gap-2">
        <input
          value={codigoDigitado}
          onChange={(e) => setCodigoDigitado(e.target.value.toUpperCase())}
          placeholder="Código de convite"
          maxLength={20}
          className="min-w-0 flex-1 rounded-lg border border-white/10 bg-ink-850 px-3 py-2.5 font-mono text-[13px] uppercase tracking-wider outline-none placeholder:text-ink-600 focus:border-gold-500/60"
        />
        <button
          onClick={async () => {
            if (codigoDigitado.trim().length < 4) return;
            setOcupado(true);
            setFalha(null);
            try {
              const g = await entrarNoGrupoDeLeitura(codigoDigitado);
              setGrupo(g);
            } catch (e) {
              setFalha(e instanceof Error ? e.message : String(e));
            } finally {
              setOcupado(false);
            }
          }}
          disabled={ocupado || codigoDigitado.trim().length < 4}
          className="shrink-0 rounded-lg bg-white/10 px-4 text-[13px] font-semibold hover:bg-white/16 disabled:opacity-40"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
