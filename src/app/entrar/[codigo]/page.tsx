"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Loader2, TriangleAlert, Users } from "lucide-react";
import { Gate } from "@/components/grupos/Gate";
import { db } from "@/lib/db";
import { previaGrupo } from "@/lib/grupos/api";
import { entrarNoGrupoComPlano } from "@/lib/leituraGrupo";
import { planoDoNomeDoGrupo } from "@/lib/convite";
import type { PreviaGrupo } from "@/lib/grupos/tipos";

/**
 * Onde o link de convite cai: mostra quem chamou e para qual plano, e entra
 * no grupo com um toque. Sem o link, era copiar o código, abrir a Jornada e
 * achar "Entrar com um código".
 */
export default function EntrarPeloConvite() {
  const { codigo } = useParams<{ codigo: string }>();
  const codigoLimpo = decodeURIComponent(codigo ?? "").toUpperCase();

  return (
    <div className="mx-auto max-w-md px-4 pb-16 pt-6">
      <Gate
        titulo="Você foi convidado para ler junto"
        descricao="Entre com a sua conta para o grupo te acompanhar em qualquer aparelho."
        descricaoSemConta="Dá para entrar só com um nome. Mas aí você fica preso a este aparelho: se limpar os dados ou trocar de celular, o grupo perde você."
        destino={`/entrar/${encodeURIComponent(codigoLimpo)}`}
      >
        {() => <Convite codigo={codigoLimpo} />}
      </Gate>
    </div>
  );
}

function Convite({ codigo }: { codigo: string }) {
  const router = useRouter();
  const [previa, setPrevia] = useState<PreviaGrupo | "invalido" | null>(null);
  const [entrando, setEntrando] = useState(false);
  const [falha, setFalha] = useState<string | null>(null);
  // `null` = sem plano; `undefined` = ainda lendo o banco local.
  const planoAtual = useLiveQuery(async () => (await db.planos.get("atual")) ?? null, []);

  useEffect(() => {
    previaGrupo(codigo, "leitura")
      .then((p) => setPrevia(p ?? "invalido"))
      .catch(() => setPrevia("invalido"));
  }, [codigo]);

  if (previa === null || planoAtual === undefined) {
    return (
      <div className="grid place-items-center py-24">
        <Loader2 className="animate-spin text-gold-400" />
      </div>
    );
  }

  if (previa === "invalido") {
    return (
      <div className="mt-10 rounded-3xl border border-white/8 bg-ink-900 p-6 text-center">
        <p className="font-display text-lg font-bold">Esse convite não vale mais</p>
        <p className="mt-2 text-[13.5px] leading-relaxed text-ink-400">
          O código <span className="font-mono text-ink-200">{codigo}</span> não é de nenhum
          grupo de leitura. Pode ser que quem criou tenha apagado o plano. Peça um convite
          novo.
        </p>
        <Link
          href="/biblioteca"
          className="mt-5 inline-block rounded-xl bg-white/10 px-5 py-2.5 text-[13.5px] font-semibold hover:bg-white/16"
        >
          Ir para a Jornada
        </Link>
      </div>
    );
  }

  const nomeDoPlano = planoDoNomeDoGrupo(previa.nome);
  const jaEstou = previa.ja_sou_membro && planoAtual?.grupoId === previa.id;
  const trocaOPlano = planoAtual && planoAtual.grupoId !== previa.id;

  const entrar = async () => {
    setEntrando(true);
    setFalha(null);
    try {
      const { adotouPlano } = await entrarNoGrupoComPlano(codigo);
      if (!adotouPlano) {
        setFalha("Esse grupo ainda não tem um plano. Peça para quem criou fazer um novo.");
        return;
      }
      router.replace("/biblioteca");
    } catch (e) {
      setFalha(e instanceof Error ? e.message : String(e));
    } finally {
      setEntrando(false);
    }
  };

  return (
    <div className="mt-6 animate-rise rounded-3xl border border-emerald-400/20 bg-gradient-to-b from-emerald-400/[0.07] to-ink-900 p-6 text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-400/15 text-emerald-300">
        <Users size={26} />
      </span>
      <p className="mt-4 text-[13px] text-ink-400">
        <strong className="text-ink-100">{previa.lider}</strong> te chamou para ler
      </p>
      <p className="mt-1 font-display text-2xl font-black leading-tight">{nomeDoPlano}</p>
      <p className="mt-2 text-[13px] text-ink-400">
        {previa.participantes} {previa.participantes === 1 ? "pessoa já está" : "pessoas já estão"}{" "}
        lendo. Vocês leem a mesma coisa no mesmo dia e veem a meta um do outro.
      </p>

      {trocaOPlano && !jaEstou && (
        <p className="mt-4 flex gap-2 rounded-2xl bg-amber-400/10 p-3 text-left text-[12.5px] leading-relaxed text-amber-100">
          <TriangleAlert size={15} className="mt-0.5 shrink-0 text-amber-300" />
          {planoAtual.grupoId
            ? `Você está em outro grupo, com o plano "${planoAtual.nome}". Entrando aqui, você sai dele (se foi você quem criou, ele é apagado para todos).`
            : `Seu plano atual, "${planoAtual.nome}", é trocado pelo plano deste grupo.`}
        </p>
      )}

      {falha && (
        <p className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-[12.5px] text-red-300">{falha}</p>
      )}

      {jaEstou ? (
        <Link
          href="/biblioteca"
          className="mt-6 block w-full rounded-xl bg-emerald-400 py-3.5 font-display text-[15px] font-bold text-ink-950 hover:bg-emerald-300"
        >
          Você já está nesse grupo. Ver o plano
        </Link>
      ) : (
        <button
          onClick={entrar}
          disabled={entrando}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 py-3.5 font-display text-[15px] font-bold text-ink-950 transition-colors hover:bg-emerald-300 disabled:opacity-60"
        >
          {entrando && <Loader2 size={16} className="animate-spin" />}
          Entrar no grupo
        </button>
      )}
    </div>
  );
}
