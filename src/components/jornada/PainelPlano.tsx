"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CalendarPlus,
  Check,
  Flame,
  Info,
  RotateCcw,
  Settings2,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";
import { apagarPlano, marcarNoPlano, salvarPlano, type Reading } from "@/lib/db";
import {
  formatarData,
  formatarDataCurta,
  inicioDoDia,
  progressoDoPlano,
  roteiroDoPlano,
  sementeDeLidos,
  type CapituloDeHoje,
  type PlanoSalvo,
  type ProgressoDoPlano,
} from "@/lib/planos";
import {
  carregarGrupoDoPlano,
  criarPlanoEmGrupo,
  criarPlanoSozinho,
  desfazerVinculo,
  entrarNoGrupoComPlano,
  type GrupoDoPlano,
} from "@/lib/leituraGrupo";
import { publicarEvento } from "@/lib/grupoEventos";
import type { BibleIndex, BookMeta } from "@/lib/bible";
import { ConfirmarExclusao } from "@/components/ConfirmarExclusao";
import { CriarPlano, type AcoesDoPlano } from "./CriarPlano";
import { EntrarComCodigo } from "./EntrarComCodigo";
import { GrupoDeLeitura } from "./GrupoDeLeitura";
import { AnelDeProgresso } from "./visuais";

/**
 * O plano em andamento.
 *
 * O tom é deliberadamente sem cobrança: ficar para trás é a regra, não a
 * exceção. Em vez de acusar, o app espalha o que ficou para trás nos dias
 * seguintes, um a mais por dia, e comemora cada meta batida.
 */
export function PainelPlano({
  plano,
  index,
  bySlug,
  reading,
}: {
  plano: PlanoSalvo | null;
  index: BibleIndex;
  bySlug: Map<string, BookMeta>;
  reading: Reading[];
}) {
  const [criando, setCriando] = useState(false);
  const [confirmando, setConfirmando] = useState(false);
  const [grupo, setGrupo] = useState<GrupoDoPlano | null>(null);
  const [grupoEncerrado, setGrupoEncerrado] = useState<string | null>(null);

  const lidoNaBiblia = useMemo(() => {
    const porLivro = new Map(reading.map((r) => [r.slug, new Set(r.done)]));
    return (slug: string, capitulo: number) => porLivro.get(slug)?.has(capitulo) ?? false;
  }, [reading]);

  const roteiro = useMemo(() => (plano ? roteiroDoPlano(plano, index) : []), [plano, index]);
  const p = useMemo(() => (plano ? progressoDoPlano(plano, roteiro) : null), [plano, roteiro]);

  /*
   * Tudo que o plano precisa gravar sozinho, num efeito só (dois efeitos
   * gravando o mesmo objeto se atropelariam): a semente dos planos antigos, a
   * lista do dia quando o dia vira, e o dia da meta batida.
   */
  useEffect(() => {
    if (!plano || !p || !roteiro.length) return;

    if (plano.lidosNoPlano === undefined) {
      void salvarPlano({ ...plano, lidosNoPlano: sementeDeLidos(plano, roteiro, lidoNaBiblia) });
      return;
    }

    const mudancas: Partial<PlanoSalvo> = {};
    if (p.precisaAtribuir) {
      mudancas.diaAtribuido = p.dia;
      mudancas.atribuicao = p.atribuicaoDeHoje;
    }

    const cumpridos = new Set(plano.diasCumpridos ?? []);
    let bateuAgora = false;
    if (p.metaCumprida && !cumpridos.has(p.dia)) {
      cumpridos.add(p.dia);
      mudancas.diasCumpridos = [...cumpridos];
      bateuAgora = true;
    } else if (!p.metaCumprida && cumpridos.has(p.dia) && !p.concluido) {
      cumpridos.delete(p.dia);
      mudancas.diasCumpridos = [...cumpridos];
    }

    if (Object.keys(mudancas).length) void salvarPlano({ ...plano, ...mudancas });

    // Avisa o grupo uma vez por dia, mesmo que a pessoa desmarque e marque.
    if (bateuAgora && plano.grupoId) {
      const chave = `genipse.meta.${plano.grupoId}.${p.dia}`;
      try {
        if (localStorage.getItem(chave) !== "1") {
          localStorage.setItem(chave, "1");
          void publicarEvento(plano.grupoId, "meta", { dados: { dia: p.dia } }).catch(() => {});
        }
      } catch {
        /* modo privado */
      }
    }
  }, [plano, p, roteiro, lidoNaBiblia]);

  const grupoId = plano?.grupoId;
  const nomeDoPlano = plano?.nome;
  const carregarGrupo = useCallback(async () => {
    if (!grupoId) {
      setGrupo(null);
      return;
    }
    try {
      const r = await carregarGrupoDoPlano(grupoId);
      if (r === "encerrado") {
        // Quem criou apagou: o plano do grupo morreu para todo mundo.
        setGrupo(null);
        setGrupoEncerrado(nomeDoPlano ?? "do grupo");
        await apagarPlano();
      } else if (r) {
        setGrupo(r);
      }
    } catch {
      /* sem rede: mantém o que estava na tela */
    }
  }, [grupoId, nomeDoPlano]);

  useEffect(() => {
    void carregarGrupo();
  }, [carregarGrupo]);

  const acoes: AcoesDoPlano = {
    sozinho: (escolha) => criarPlanoSozinho(escolha),
    emGrupo: async (escolha) => (await criarPlanoEmGrupo(escolha)).codigo,
    comCodigo: async (codigo) => (await entrarNoGrupoComPlano(codigo)).adotouPlano,
  };

  if (criando) {
    return (
      <CriarPlano
        index={index}
        vinculoAtual={grupo && plano ? { nome: plano.nome, souLider: grupo.souLider } : null}
        acoes={acoes}
        aoConcluir={() => setCriando(false)}
        aoCancelar={() => setCriando(false)}
      />
    );
  }

  if (!plano || !p) {
    return (
      <div className="space-y-4 pb-16">
        {grupoEncerrado && (
          <p className="flex animate-rise gap-2.5 rounded-2xl bg-white/[0.05] p-4 text-[13px] leading-relaxed text-ink-300">
            <Info size={16} className="mt-0.5 shrink-0 text-ink-400" />
            Quem criou o grupo apagou o plano &quot;{grupoEncerrado}&quot;. Suas
            marcações e sua leitura na Bíblia continuam salvas.
          </p>
        )}
        <SemPlano aoComecar={() => setCriando(true)} />
      </div>
    );
  }

  const podeRecomecar = !plano.grupoId && p.extraPorDia >= Math.max(3, p.ritmoBase);

  const confirmacao = !plano.grupoId
    ? {
        titulo: "Apagar o plano?",
        aviso: `"${plano.nome}" sai da sua jornada. Suas marcações, comentários e a leitura na Bíblia continuam salvos.`,
        rotulo: "Apagar plano",
      }
    : grupo?.souLider
      ? {
          titulo: "Apagar o plano do grupo?",
          aviso: `"${plano.nome}" some para todo mundo do grupo e o código para de funcionar. As marcações de cada um na Bíblia continuam.`,
          rotulo: "Apagar para todos",
        }
      : {
          titulo: "Apagar seu plano?",
          aviso: `Você sai do grupo e "${plano.nome}" sai da sua jornada. O plano continua para o resto do grupo.`,
          rotulo: "Sair e apagar",
        };

  return (
    <div className="space-y-4 pb-16">
      <Resumo
        plano={plano}
        p={p}
        emGrupo={Boolean(grupo)}
        aoTrocar={() => setCriando(true)}
        aoApagar={() => setConfirmando(true)}
      />

      {!p.concluido && (
        <Hoje
          p={p}
          bySlug={bySlug}
          emGrupo={Boolean(grupo)}
          podeRecomecar={podeRecomecar}
          aoRecomecar={() =>
            salvarPlano({
              ...plano,
              inicioEm: inicioDoDia(),
              reinicioLidos: [...p.lidosNoPlano],
              diasCumpridos: [],
              diaAtribuido: undefined,
              atribuicao: undefined,
            })
          }
        />
      )}

      {grupo && (
        <GrupoDeLeitura
          grupo={grupo.grupo}
          souLider={grupo.souLider}
          plano={plano}
          meuProgresso={p}
          index={index}
          aoPedirApagar={() => setConfirmando(true)}
        />
      )}

      {confirmando && (
        <ConfirmarExclusao
          titulo={confirmacao.titulo}
          aviso={confirmacao.aviso}
          rotuloConfirmar={confirmacao.rotulo}
          aoConfirmar={async () => {
            if (plano.grupoId) await desfazerVinculo(plano.grupoId);
            await apagarPlano();
          }}
          aoFechar={() => setConfirmando(false)}
        />
      )}
    </div>
  );
}

function Resumo({
  plano,
  p,
  emGrupo,
  aoTrocar,
  aoApagar,
}: {
  plano: PlanoSalvo;
  p: ProgressoDoPlano;
  emGrupo: boolean;
  aoTrocar: () => void;
  aoApagar: () => void;
}) {
  const status = p.concluido
    ? "Plano concluído!"
    : p.vencido
      ? `O prazo terminou em ${formatarDataCurta(p.terminaPrevisto)}`
      : `Dia ${p.diaVisivel} de ${p.dias}`;

  return (
    <section className="rounded-3xl border border-white/8 bg-gradient-to-br from-ink-850 to-ink-900 p-5">
      <div className="flex items-start gap-4">
        <AnelDeProgresso
          valor={p.percentual}
          tamanho={92}
          espessura={9}
          cor={p.concluido ? "#34d399" : "var(--color-gold-400)"}
        >
          <span className="text-center leading-none">
            <span className="block font-display text-[22px] font-black">{p.percentual}%</span>
            <span className="mt-1 block font-mono text-[10px] text-ink-400">
              {p.lidos}/{p.total}
            </span>
          </span>
        </AnelDeProgresso>

        <div className="min-w-0 flex-1 pt-1">
          <p className="font-display text-[17px] font-bold leading-snug">{plano.nome}</p>
          <p className="mt-0.5 text-[13px] text-ink-300">{status}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {p.sequencia > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/15 px-2 py-0.5 text-[11.5px] font-bold text-orange-300">
                <Flame size={12} />
                {p.sequencia === 1 ? "Sequência: 1 dia" : `${p.sequencia} dias seguidos`}
              </span>
            )}
            {emGrupo && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/12 px-2 py-0.5 text-[11.5px] font-semibold text-emerald-300">
                <Users size={11} />
                Em grupo
              </span>
            )}
            {!p.concluido && !p.vencido && (
              <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[11.5px] text-ink-400">
                até {formatarDataCurta(p.terminaPrevisto)}
              </span>
            )}
          </div>
        </div>

        <div className="-mr-1 -mt-1 flex shrink-0 flex-col">
          <button
            onClick={aoTrocar}
            aria-label="Trocar de plano"
            className="grid h-9 w-9 place-items-center rounded-full text-ink-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Settings2 size={17} />
          </button>
          <button
            onClick={aoApagar}
            aria-label="Apagar plano"
            className="grid h-9 w-9 place-items-center rounded-full text-ink-400 transition-colors hover:bg-red-500/15 hover:text-red-400"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>

      {p.concluido ? (
        <p className="mt-4 flex animate-pop items-center justify-center gap-2 rounded-2xl bg-emerald-400/12 py-3 font-display text-[15px] font-bold text-emerald-300">
          <Sparkles size={17} />
          Você terminou o plano!
        </p>
      ) : (
        <Semana p={p} />
      )}
    </section>
  );
}

/** Os últimos dias do plano, bolinha por bolinha: dá para ver a sequência. */
function Semana({ p }: { p: ProgressoDoPlano }) {
  return (
    <div className="mt-5 flex justify-between gap-1">
      {p.semana.map((d) => {
        const ehHoje = d.dia === p.dia;
        return (
          <div key={d.dia} className="flex flex-1 flex-col items-center gap-1">
            <span
              className={`grid h-8 w-8 place-items-center rounded-full text-[11px] font-bold transition-colors ${
                d.estado === "cumprido"
                  ? `bg-emerald-400 text-ink-950 ${ehHoje ? "ring-2 ring-emerald-300/50 ring-offset-2 ring-offset-ink-900" : ""}`
                  : d.estado === "hoje"
                    ? "bg-gold-400/10 text-gold-300 ring-2 ring-gold-400"
                    : d.estado === "livre"
                      ? "border border-dashed border-white/15 text-ink-600"
                      : "bg-white/[0.05] text-ink-600"
              }`}
            >
              {d.estado === "cumprido" ? <Check size={14} strokeWidth={3} /> : d.dia}
            </span>
            <span className={`text-[9.5px] ${ehHoje ? "font-bold text-gold-300" : "text-ink-600"}`}>
              {ehHoje ? "hoje" : `dia ${d.dia}`}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function Hoje({
  p,
  bySlug,
  emGrupo,
  podeRecomecar,
  aoRecomecar,
}: {
  p: ProgressoDoPlano;
  bySlug: Map<string, BookMeta>;
  emGrupo: boolean;
  podeRecomecar: boolean;
  aoRecomecar: () => void;
}) {
  return (
    <section
      className={`rounded-3xl border p-4 transition-colors ${
        p.metaCumprida
          ? "border-emerald-400/30 bg-emerald-400/[0.05]"
          : "border-white/8 bg-ink-900"
      }`}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="font-display text-[15px] font-bold">Leitura de hoje</p>
        {p.hoje.length > 0 && (
          <span
            className={`rounded-full px-2.5 py-1 font-mono text-[12px] font-bold ${
              p.metaCumprida ? "bg-emerald-400 text-ink-950" : "bg-white/8 text-ink-200"
            }`}
          >
            {p.hojeFeitos}/{p.hoje.length}
          </span>
        )}
      </div>

      {p.metaCumprida && (
        <div className="mb-3 flex animate-pop items-center gap-3 rounded-2xl bg-emerald-400/12 p-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-emerald-400 text-ink-950">
            <Check size={22} strokeWidth={3} />
          </span>
          <div>
            <p className="font-display text-[15px] font-bold text-emerald-200">Meta de hoje batida!</p>
            <p className="text-[12px] text-emerald-100/70">
              {p.sequencia > 1 ? `${p.sequencia} dias seguidos. ` : ""}
              {emGrupo ? "O grupo já está sabendo." : "Amanhã tem mais."}
            </p>
          </div>
        </div>
      )}

      {!p.metaCumprida && p.atrasados > 0 && (
        <p className="mb-3 flex gap-2 rounded-2xl bg-amber-400/[0.07] p-3 text-[12.5px] leading-relaxed text-ink-300">
          <Info size={15} className="mt-0.5 shrink-0 text-amber-300" />
          <span>
            {p.atrasados === 1 ? "Ficou 1 capítulo" : `Ficaram ${p.atrasados} capítulos`} para trás.
            Sem pressa: {p.extraPorDia === 1 ? "entra 1 a mais" : `entram ${p.extraPorDia} a mais`} por
            dia até zerar.
          </span>
        </p>
      )}

      {podeRecomecar && !p.metaCumprida && (
        <div className="mb-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
          <p className="text-[12.5px] leading-relaxed text-ink-300">
            O atraso acumulou. Se preferir, recomece a contagem: o prazo de {p.dias} dias
            volta a contar de hoje, com o que você já leu guardado.
          </p>
          <button
            onClick={aoRecomecar}
            className="mt-2.5 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-[12.5px] font-semibold text-white transition-colors hover:bg-white/16"
          >
            <RotateCcw size={13} />
            Recomeçar a contagem hoje
          </button>
        </div>
      )}

      {p.hoje.length === 0 ? (
        <p className="rounded-2xl bg-white/[0.03] py-4 text-center text-[13px] text-ink-400">
          Folga hoje: nada separado para ler.
        </p>
      ) : (
        <div className="space-y-2">
          {p.hoje.map((c) => (
            <LinhaCapitulo
              key={`${c.slug}.${c.capitulo}`}
              capitulo={c}
              nome={bySlug.get(c.slug)?.name ?? c.slug}
              lido={p.lidosNoPlano.has(`${c.slug}.${c.capitulo}`)}
            />
          ))}
        </div>
      )}

      {p.vencido && (
        <p className="mt-3 text-[12px] text-ink-500">
          Faltam {p.faltam} capítulos do plano, que terminava em {formatarData(p.terminaPrevisto)}.
        </p>
      )}
    </section>
  );
}

function LinhaCapitulo({
  capitulo: c,
  nome,
  lido,
}: {
  capitulo: CapituloDeHoje;
  nome: string;
  lido: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl p-2 pr-3 transition-colors ${
        lido ? "bg-white/[0.02]" : "bg-white/[0.05]"
      }`}
    >
      <button
        onClick={() => marcarNoPlano(c.slug, c.capitulo, !lido)}
        aria-pressed={lido}
        aria-label={`${nome} ${c.capitulo}, ${lido ? "lido" : "não lido"}`}
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border-2 transition-all active:scale-90 ${
          lido
            ? "border-emerald-400 bg-emerald-400 text-ink-950"
            : "border-white/15 text-transparent hover:border-white/40"
        }`}
      >
        <Check size={20} strokeWidth={3} />
      </button>
      <Link
        href={`/livro/${c.slug}/${c.capitulo}?de=plano`}
        className={`min-w-0 flex-1 truncate font-display text-[15px] font-semibold transition-colors hover:text-white ${
          lido ? "text-ink-500 line-through decoration-ink-600" : "text-ink-100"
        }`}
      >
        {nome} {c.capitulo}
      </Link>
      {c.atrasado && !lido && (
        <span className="shrink-0 rounded-full bg-amber-400/15 px-2 py-0.5 text-[10.5px] font-bold text-amber-300">
          de antes
        </span>
      )}
    </div>
  );
}

function SemPlano({ aoComecar }: { aoComecar: () => void }) {
  return (
    <div className="rounded-3xl border border-dashed border-white/12 px-5 py-10 text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gold-400/12 text-gold-400">
        <CalendarPlus size={26} />
      </span>
      <p className="mt-4 font-display text-[18px] font-bold">Nenhum plano ativo</p>
      <p className="mx-auto mt-1.5 max-w-xs text-[13px] leading-relaxed text-ink-400">
        Escolha o que ler e em quanto tempo. Sozinho ou com amigos, batendo a meta
        do dia juntos.
      </p>
      <button
        onClick={aoComecar}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gold-400 px-5 py-3 font-display text-sm font-bold text-ink-950 transition-colors hover:bg-gold-300"
      >
        <CalendarPlus size={16} />
        Criar plano de leitura
      </button>
      <div>
        <EntrarComCodigo />
      </div>
    </div>
  );
}
