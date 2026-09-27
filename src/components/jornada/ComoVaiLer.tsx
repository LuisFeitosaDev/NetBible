"use client";

import { useState } from "react";
import { Check, Copy, KeyRound, Loader2, Share2, TriangleAlert, User, Users } from "lucide-react";
import { Gate } from "@/components/grupos/Gate";
import { supabaseConfigurado } from "@/lib/grupos/supabase";

export type VinculoAtual = { nome: string; souLider: boolean } | null;

/**
 * Último passo da criação do plano: sozinho, com amigos (cria o grupo e gera
 * o código) ou com o código de alguém (entra no plano que já está rolando).
 *
 * "Sozinho" não toca em conta nenhuma. O `<Gate>` só aparece para quem
 * escolhe ler com alguém.
 */
export function ComoVaiLer({
  vinculoAtual,
  aoSozinho,
  aoCriarGrupo,
  aoEntrarComCodigo,
  aoConcluir,
}: {
  vinculoAtual: VinculoAtual;
  aoSozinho: () => Promise<void>;
  aoCriarGrupo: () => Promise<string>;
  aoEntrarComCodigo: (codigo: string) => Promise<boolean>;
  aoConcluir: () => void;
}) {
  const [modo, setModo] = useState<"escolher" | "grupo" | "codigo">("escolher");
  const [ocupado, setOcupado] = useState(false);
  const [falha, setFalha] = useState<string | null>(null);

  const titulo = (
    <p className="mb-2 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink-500">
      3 · Como você vai ler
    </p>
  );

  if (modo === "escolher") {
    return (
      <section>
        {titulo}
        {vinculoAtual && (
          <p className="mb-3 flex gap-2 rounded-2xl bg-amber-400/10 p-3 text-[12.5px] leading-relaxed text-amber-100">
            <TriangleAlert size={15} className="mt-0.5 shrink-0 text-amber-300" />
            {vinculoAtual.souLider
              ? `Seu plano atual é do grupo "${vinculoAtual.nome}". Um plano novo apaga esse grupo para todo mundo.`
              : `Com um plano novo, você sai do grupo "${vinculoAtual.nome}".`}
          </p>
        )}
        {falha && (
          <p className="mb-3 rounded-lg bg-red-500/10 px-3 py-2 text-[12.5px] text-red-300">{falha}</p>
        )}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={async () => {
              setOcupado(true);
              setFalha(null);
              try {
                await aoSozinho();
              } catch (e) {
                setFalha(e instanceof Error ? e.message : String(e));
                setOcupado(false);
              }
            }}
            disabled={ocupado}
            className="flex flex-col items-center gap-2.5 rounded-3xl border border-white/8 bg-ink-900 px-3 py-5 text-center transition-colors hover:border-white/22 disabled:opacity-50"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.06] text-ink-200">
              {ocupado ? <Loader2 size={20} className="animate-spin" /> : <User size={22} />}
            </span>
            <span className="font-display text-[15px] font-bold">Sozinho</span>
            <span className="text-[11.5px] leading-snug text-ink-400">No seu ritmo, só você vê</span>
          </button>
          <button
            onClick={() => setModo("grupo")}
            disabled={ocupado || !supabaseConfigurado}
            className="flex flex-col items-center gap-2.5 rounded-3xl border border-emerald-400/25 bg-emerald-400/[0.06] px-3 py-5 text-center transition-colors hover:border-emerald-400/50 disabled:opacity-40"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-400/15 text-emerald-300">
              <Users size={22} />
            </span>
            <span className="font-display text-[15px] font-bold">Com amigos</span>
            <span className="text-[11.5px] leading-snug text-ink-400">
              Metas juntos, grifos no mural
            </span>
          </button>
        </div>
        {supabaseConfigurado && (
          <button
            onClick={() => setModo("codigo")}
            disabled={ocupado}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl py-2.5 text-[13px] font-semibold text-ink-300 transition-colors hover:bg-white/[0.04] hover:text-white"
          >
            <KeyRound size={14} />
            Tenho um código de convite
          </button>
        )}
      </section>
    );
  }

  return (
    <section>
      {titulo}
      <div className="rounded-3xl border border-white/8 bg-ink-900 p-4">
        <Gate
          titulo={modo === "grupo" ? "Leia com amigos" : "Entrar com um código"}
          descricao="Entre com a sua conta para o grupo te acompanhar em qualquer aparelho."
          descricaoSemConta="Dá para entrar só com um nome. Mas aí você fica preso a este aparelho: se limpar os dados ou trocar de celular, o grupo perde você."
          destino="/biblioteca"
        >
          {() =>
            modo === "grupo" ? (
              <CriarGrupo aoCriarGrupo={aoCriarGrupo} aoConcluir={aoConcluir} />
            ) : (
              <EntrarComCodigoNoPasso aoEntrar={aoEntrarComCodigo} aoConcluir={aoConcluir} />
            )
          }
        </Gate>
      </div>
      <button
        onClick={() => setModo("escolher")}
        className="mt-2 text-[12.5px] font-semibold text-ink-400 hover:text-white"
      >
        Voltar
      </button>
    </section>
  );
}

function CriarGrupo({
  aoCriarGrupo,
  aoConcluir,
}: {
  aoCriarGrupo: () => Promise<string>;
  aoConcluir: () => void;
}) {
  const [codigo, setCodigo] = useState<string | null>(null);
  const [ocupado, setOcupado] = useState(false);
  const [falha, setFalha] = useState<string | null>(null);
  const [copiado, setCopiado] = useState(false);

  if (!codigo) {
    return (
      <div className="space-y-3 text-center">
        {falha && (
          <p className="rounded-lg bg-red-500/10 px-3 py-2 text-[12.5px] text-red-300">{falha}</p>
        )}
        <p className="text-[13px] leading-relaxed text-ink-300">
          O plano vira o plano do grupo. Quem entrar pelo código lê a mesma coisa,
          no mesmo dia, e vocês se acompanham.
        </p>
        <button
          onClick={async () => {
            setOcupado(true);
            setFalha(null);
            try {
              setCodigo(await aoCriarGrupo());
            } catch (e) {
              setFalha(e instanceof Error ? e.message : String(e));
            } finally {
              setOcupado(false);
            }
          }}
          disabled={ocupado}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 py-3 font-display text-[14px] font-bold text-ink-950 transition-colors hover:bg-emerald-300 disabled:opacity-50"
        >
          {ocupado && <Loader2 size={15} className="animate-spin" />}
          Criar grupo e gerar código
        </button>
      </div>
    );
  }

  const texto = `Bora ler a Bíblia junto? Entra com esse código no Genipse Bible (Jornada > Entrar com um código): ${codigo}`;
  return (
    <div className="space-y-3 text-center">
      <p className="text-[12px] text-ink-400">Mande este código para quem vai ler com você</p>
      <p className="animate-pop font-mono text-3xl font-bold tracking-widest text-gold-300">{codigo}</p>
      <div className="flex justify-center gap-2">
        {"share" in navigator && (
          <button
            onClick={async () => {
              try {
                await navigator.share({ text: texto });
              } catch {
                /* cancelado */
              }
            }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gold-400 px-4 py-2 text-[13px] font-bold text-ink-950 hover:bg-gold-300"
          >
            <Share2 size={14} />
            Enviar
          </button>
        )}
        <button
          onClick={async () => {
            await navigator.clipboard.writeText(texto);
            setCopiado(true);
            setTimeout(() => setCopiado(false), 1800);
          }}
          className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-4 py-2 text-[13px] font-semibold hover:bg-white/16"
        >
          {copiado ? <Check size={14} /> : <Copy size={14} />}
          {copiado ? "Copiado" : "Copiar"}
        </button>
      </div>
      <p className="text-[11px] text-ink-500">
        Dá para ver o código de novo depois, no card do grupo, em &quot;Convidar&quot;.
      </p>
      <button
        onClick={aoConcluir}
        className="block w-full rounded-xl bg-white/10 py-2.5 text-[13px] font-bold hover:bg-white/16"
      >
        Pronto, ver meu plano
      </button>
    </div>
  );
}

function EntrarComCodigoNoPasso({
  aoEntrar,
  aoConcluir,
}: {
  aoEntrar: (codigo: string) => Promise<boolean>;
  aoConcluir: () => void;
}) {
  const [codigo, setCodigo] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [falha, setFalha] = useState<string | null>(null);

  const entrar = async () => {
    if (codigo.trim().length < 4) return;
    setOcupado(true);
    setFalha(null);
    try {
      if (await aoEntrar(codigo)) aoConcluir();
      else setFalha("Esse grupo ainda não tem um plano. Peça para quem criou fazer um novo.");
    } catch (e) {
      setFalha(e instanceof Error ? e.message : String(e));
    } finally {
      setOcupado(false);
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-[12.5px] leading-relaxed text-ink-400">
        Você entra no plano do grupo, no mesmo dia de leitura de todo mundo. O
        plano que você montou acima fica de lado.
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
