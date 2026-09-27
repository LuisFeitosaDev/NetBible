"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Bell,
  Check,
  Copy,
  Crown,
  Flame,
  Hand,
  Highlighter,
  Loader2,
  Share2,
  Trash2,
  Trophy,
  Unlink,
  UserPlus,
  Users,
} from "lucide-react";
import { desfazerVinculo, progressoDoGrupo, type ProgressoDoMembro } from "@/lib/leituraGrupo";
import {
  cutucar,
  eventosDoGrupo,
  marcarMuralComoVisto,
  ouvirEventos,
  vistoEm,
  type EventoDoGrupo,
} from "@/lib/grupoEventos";
import { salvarPlano } from "@/lib/db";
import { inicioDoDia, type PlanoSalvo, type ProgressoDoPlano } from "@/lib/planos";
import { HIGHLIGHT_COLORS } from "@/lib/catalog";
import type { Grupo } from "@/lib/grupos/tipos";
import type { BibleIndex } from "@/lib/bible";
import { ConfirmarExclusao } from "@/components/ConfirmarExclusao";
import { Avatar, primeiroNome, tempoRelativo } from "./visuais";

const COR_DO_GRIFO = new Map<string, string>(HIGHLIGHT_COLORS.map((c) => [c.id, c.hex]));

/**
 * O grupo de leitura, dentro da tela do plano: quem bateu a meta hoje, o
 * progresso de cada um, a sequência, e o mural com os grifos e as cutucadas.
 */
export function GrupoDeLeitura({
  grupo,
  souLider,
  plano,
  meuProgresso,
  index,
  aoPedirApagar,
}: {
  grupo: Grupo;
  souLider: boolean;
  plano: PlanoSalvo;
  meuProgresso: ProgressoDoPlano;
  index: BibleIndex;
  aoPedirApagar: () => void;
}) {
  const [membros, setMembros] = useState<ProgressoDoMembro[] | null>(null);
  const [eventos, setEventos] = useState<EventoDoGrupo[]>([]);
  const [convidando, setConvidando] = useState(false);
  const [confirmandoSaida, setConfirmandoSaida] = useState(false);
  const [muralAberto, setMuralAberto] = useState(false);
  const [falha, setFalha] = useState<string | null>(null);
  // O "novo" do mural compara com a visita anterior, lida uma vez ao montar.
  const [vistoAntes] = useState(() => vistoEm());

  const planoRef = useRef(plano);
  planoRef.current = plano;

  const carregar = useCallback(async () => {
    try {
      const [lista, evs] = await Promise.all([
        progressoDoGrupo(grupo, index, planoRef.current),
        eventosDoGrupo(grupo.id, 40),
      ]);
      setMembros(lista);
      setEventos(evs);
      setFalha(null);
    } catch (e) {
      setFalha(e instanceof Error ? e.message : String(e));
    }
  }, [grupo, index]);

  useEffect(() => {
    void carregar();
    marcarMuralComoVisto();

    const pararDeOuvir = ouvirEventos(grupo.id, (e) => {
      setEventos((atual) => [e, ...atual.filter((x) => x.id !== e.id)]);
      void carregar();
    });
    const aoVoltar = () => {
      if (document.visibilityState === "visible") void carregar();
    };
    document.addEventListener("visibilitychange", aoVoltar);
    // O progresso dos outros não gera evento a cada capítulo: sem isto, o
    // "2/3 hoje" de alguém só mudaria quando você reabrisse a tela.
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") void carregar();
    }, 45_000);

    return () => {
      pararDeOuvir();
      document.removeEventListener("visibilitychange", aoVoltar);
      clearInterval(timer);
    };
  }, [grupo.id, carregar]);

  // A sua linha acompanha cada toque na hora; a dos outros vem do banco.
  const lista = useMemo(
    () => membros?.map((m) => (m.souEu ? { ...m, plano: meuProgresso } : m)) ?? null,
    [membros, meuProgresso],
  );
  const nomePorId = useMemo(
    () => new Map((lista ?? []).map((m) => [m.perfilId, m.nome])),
    [lista],
  );
  const eu = lista?.find((m) => m.souEu);

  if (!lista) {
    return (
      <section className="grid place-items-center rounded-3xl border border-white/8 bg-ink-900 py-8">
        {falha ? (
          <p className="px-4 text-center text-[12.5px] text-red-300">{falha}</p>
        ) : (
          <Loader2 size={18} className="animate-spin text-ink-500" />
        )}
      </section>
    );
  }

  const comMetaHoje = lista.filter((m) => m.plano && m.plano.hoje.length > 0);
  const bateram = comMetaHoje.filter((m) => m.plano!.metaCumprida).length;
  const todoMundoBateu = comMetaHoje.length > 1 && bateram === comMetaHoje.length;

  const cutucadaPraMim = eventos.find(
    (e) =>
      e.tipo === "cutucada" &&
      e.alvo_id === eu?.perfilId &&
      new Date(e.criado_em).getTime() >= inicioDoDia(),
  );

  const muralVisivel = muralAberto ? eventos : eventos.slice(0, 4);

  return (
    <section className="overflow-hidden rounded-3xl border border-white/8 bg-ink-900">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between gap-3 px-4 pt-4">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-400/12 text-emerald-300">
            <Users size={16} />
          </span>
          <div className="min-w-0">
            <p className="font-display text-[15px] font-bold leading-tight">Seu grupo</p>
            <p className="text-[11.5px] text-ink-400">
              {lista.length} {lista.length === 1 ? "pessoa" : "pessoas"} lendo junto
            </p>
          </div>
        </div>
        <button
          onClick={() => setConvidando((v) => !v)}
          aria-expanded={convidando}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/8 px-3 py-1.5 text-[12px] font-semibold text-ink-200 transition-colors hover:bg-white/14"
        >
          <UserPlus size={13} />
          Convidar
        </button>
      </div>

      {convidando && <PainelDoCodigo codigo={grupo.codigo} />}

      {cutucadaPraMim && !eu?.plano?.metaCumprida && (
        <div className="mx-4 mt-3 flex animate-rise items-center gap-2.5 rounded-2xl bg-amber-400/12 px-3 py-2.5">
          <Hand size={18} className="shrink-0 text-amber-300" />
          <p className="text-[13px] text-amber-100">
            <strong>{primeiroNome(nomePorId.get(cutucadaPraMim.perfil_id) ?? "Alguém")}</strong>{" "}
            te cutucou. Bora ler hoje?
          </p>
        </div>
      )}

      {/* Meta do grupo hoje */}
      {comMetaHoje.length > 0 && (
        <div className="mx-4 mt-3 rounded-2xl bg-white/[0.04] p-3">
          {todoMundoBateu ? (
            <p className="flex animate-pop items-center gap-2 font-display text-[14px] font-bold text-emerald-300">
              <Trophy size={17} />
              O grupo todo bateu a meta hoje!
            </p>
          ) : (
            <p className="text-[12.5px] text-ink-300">
              <strong className="font-display text-[15px] text-white">
                {bateram} de {comMetaHoje.length}
              </strong>{" "}
              bateram a meta de hoje
            </p>
          )}
          <div className="mt-2 flex gap-1.5">
            {comMetaHoje.map((m) => (
              <span
                key={m.perfilId}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  m.plano!.metaCumprida ? "bg-emerald-400" : "bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Membros */}
      <ul className="mt-2 divide-y divide-white/5">
        {lista.map((m) => (
          <LinhaDoMembro key={m.perfilId} membro={m} grupoId={grupo.id} />
        ))}
      </ul>

      {/* Mural */}
      <div className="border-t border-white/6 px-4 pb-4 pt-3">
        <p className="mb-2 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink-500">
          Mural do grupo
        </p>
        {eventos.length === 0 ? (
          <p className="rounded-xl bg-white/[0.03] px-3 py-3 text-[12.5px] leading-relaxed text-ink-400">
            Grifou um versículo da leitura? Ele aparece aqui para o grupo. Metas
            batidas e cutucadas também.
          </p>
        ) : (
          <ul className="space-y-2">
            {muralVisivel.map((e) => (
              <ItemDoMural
                key={e.id}
                evento={e}
                nome={nomePorId.get(e.perfil_id) ?? "Alguém"}
                alvo={e.alvo_id ? (e.alvo_id === eu?.perfilId ? "você" : primeiroNome(nomePorId.get(e.alvo_id) ?? "alguém")) : null}
                novo={new Date(e.criado_em).getTime() > vistoAntes && e.perfil_id !== eu?.perfilId}
              />
            ))}
          </ul>
        )}
        {eventos.length > 4 && (
          <button
            onClick={() => setMuralAberto((v) => !v)}
            className="mt-2 text-[12px] font-semibold text-ink-400 hover:text-white"
          >
            {muralAberto ? "Mostrar menos" : `Ver tudo (${eventos.length})`}
          </button>
        )}

        <AtivarAvisos />

        <div className="mt-4 flex justify-end">
          {souLider ? (
            <button
              onClick={aoPedirApagar}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-semibold text-ink-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
            >
              <Trash2 size={13} />
              Apagar grupo
            </button>
          ) : (
            <button
              onClick={() => setConfirmandoSaida(true)}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-semibold text-ink-500 transition-colors hover:bg-white/8 hover:text-white"
            >
              <Unlink size={13} />
              Sair do grupo
            </button>
          )}
        </div>
      </div>

      {confirmandoSaida && (
        <ConfirmarExclusao
          titulo="Sair do grupo?"
          aviso="Você para de ver o grupo e o grupo para de ver você. O plano continua com você, agora sozinho, com tudo que já leu."
          rotuloConfirmar="Sair do grupo"
          aoConfirmar={async () => {
            await desfazerVinculo(grupo.id);
            await salvarPlano({ ...plano, grupoId: undefined });
          }}
          aoFechar={() => setConfirmandoSaida(false)}
        />
      )}
    </section>
  );
}

function LinhaDoMembro({ membro: m, grupoId }: { membro: ProgressoDoMembro; grupoId: string }) {
  const chave = `genipse.cutucou.${grupoId}.${m.perfilId}.${inicioDoDia()}`;
  const [cutucou, setCutucou] = useState(() => {
    try {
      return localStorage.getItem(chave) === "1";
    } catch {
      return false;
    }
  });
  const [enviando, setEnviando] = useState(false);
  const p = m.plano;
  const podeCutucar = !m.souEu && p && p.hoje.length > 0 && !p.metaCumprida && !p.concluido;

  return (
    <li className="flex items-center gap-3 px-4 py-3">
      <Avatar nome={m.nome} valor={p?.percentual ?? 0} />

      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5">
          <span className="truncate font-display text-[14.5px] font-bold">
            {m.souEu ? "Você" : primeiroNome(m.nome)}
          </span>
          {m.lider && <Crown size={12} className="shrink-0 text-gold-400" aria-label="Criou o grupo" />}
          {p && p.sequencia > 1 && (
            <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-orange-500/12 px-1.5 py-0.5 text-[10.5px] font-bold text-orange-300">
              <Flame size={11} />
              {p.sequencia}
            </span>
          )}
        </p>
        <p className="mt-0.5 text-[11.5px] text-ink-400">
          {p ? (p.concluido ? "Terminou o plano" : `${p.percentual}% do plano`) : "Entrando no plano…"}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        {p && <SeloDaMeta p={p} />}
        {podeCutucar && (
          <button
            onClick={async () => {
              if (cutucou || enviando) return;
              setEnviando(true);
              try {
                await cutucar(grupoId, m.perfilId);
                setCutucou(true);
                try {
                  localStorage.setItem(chave, "1");
                } catch {
                  /* modo privado */
                }
              } finally {
                setEnviando(false);
              }
            }}
            disabled={cutucou || enviando}
            aria-label={cutucou ? "Cutucada enviada" : `Cutucar ${primeiroNome(m.nome)}`}
            title={cutucou ? "Cutucada enviada" : "Cutucar"}
            className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${
              cutucou
                ? "bg-white/5 text-ink-600"
                : "bg-amber-400/15 text-amber-300 hover:bg-amber-400/25"
            }`}
          >
            {cutucou ? <Check size={14} /> : <Hand size={15} />}
          </button>
        )}
      </div>
    </li>
  );
}

/** O status da meta de hoje, do jeito mais visual possível: um selo. */
function SeloDaMeta({ p }: { p: ProgressoDoPlano }) {
  if (p.concluido) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-gold-400/15 px-2.5 py-1 text-[11.5px] font-bold text-gold-300">
        <Trophy size={12} />
        Fim!
      </span>
    );
  }
  if (!p.hoje.length) {
    return <span className="text-[11.5px] text-ink-500">folga hoje</span>;
  }
  if (p.metaCumprida) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[11.5px] font-bold text-emerald-300">
        <Check size={12} strokeWidth={3} />
        Meta batida
      </span>
    );
  }
  return (
    <span className="flex flex-col items-end gap-1">
      <span className="font-mono text-[12px] font-bold text-ink-200">
        {p.hojeFeitos}/{p.hoje.length}
      </span>
      <span className="flex gap-0.5">
        {p.hoje.map((c, i) => (
          <span
            key={i}
            className={`h-1.5 w-2.5 rounded-full ${i < p.hojeFeitos ? "bg-amber-300" : "bg-white/12"}`}
          />
        ))}
      </span>
    </span>
  );
}

function ItemDoMural({
  evento: e,
  nome,
  alvo,
  novo,
}: {
  evento: EventoDoGrupo;
  nome: string;
  alvo: string | null;
  novo: boolean;
}) {
  const quem = primeiroNome(nome);
  const d = e.dados;

  let icone = <UserPlus size={13} />;
  let texto = <><strong>{quem}</strong> entrou no grupo</>;
  let tom = "text-sky-300 bg-sky-400/12";

  if (e.tipo === "meta") {
    icone = <Trophy size={13} />;
    texto = <><strong>{quem}</strong> bateu a meta do dia {d.dia ?? ""}</>;
    tom = "text-emerald-300 bg-emerald-400/12";
  } else if (e.tipo === "cutucada") {
    icone = <Hand size={13} />;
    texto = <><strong>{quem}</strong> cutucou {alvo === "você" ? <strong>você</strong> : alvo}</>;
    tom = "text-amber-300 bg-amber-400/12";
  } else if (e.tipo === "grifo") {
    icone = <Highlighter size={13} />;
    texto = (
      <>
        <strong>{quem}</strong> grifou{" "}
        <Link
          href={`/livro/${d.slug}/${d.capitulo}?v=${d.versiculo}`}
          className="font-semibold text-white underline decoration-white/25 underline-offset-2 hover:decoration-white"
        >
          {d.livro} {d.capitulo}:{d.versiculo}
        </Link>
      </>
    );
    tom = "text-pink-300 bg-pink-400/12";
  }

  return (
    <li className="flex gap-2.5">
      <span className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full ${tom}`}>
        {icone}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[12.5px] leading-snug text-ink-200">
          {texto}
          {novo && (
            <span className="ml-1.5 inline-block rounded-full bg-gold-400 px-1.5 text-[9.5px] font-bold uppercase text-ink-950">
              novo
            </span>
          )}
        </p>
        {e.tipo === "grifo" && d.texto && (
          <p
            className="mt-1 line-clamp-3 border-l-2 pl-2 font-reading text-[13px] italic leading-relaxed text-ink-300"
            style={{ borderColor: COR_DO_GRIFO.get(d.cor ?? "") ?? "#facc15" }}
          >
            {d.texto}
          </p>
        )}
        <p className="mt-0.5 text-[10.5px] text-ink-600">{tempoRelativo(e.criado_em)}</p>
      </div>
    </li>
  );
}

function PainelDoCodigo({ codigo }: { codigo: string }) {
  const [copiado, setCopiado] = useState(false);
  const texto = `Bora ler a Bíblia junto? Entra com esse código no Genipse Bible (Jornada > Entrar com um código): ${codigo}`;

  return (
    <div className="mx-4 mt-3 animate-rise rounded-2xl border border-gold-500/25 bg-gold-500/[0.06] p-4 text-center">
      <p className="text-[11.5px] text-ink-400">Código do grupo</p>
      <p className="mt-1 font-mono text-2xl font-bold tracking-widest text-gold-300">{codigo}</p>
      <div className="mt-3 flex justify-center gap-2">
        {typeof navigator !== "undefined" && "share" in navigator && (
          <button
            onClick={async () => {
              try {
                await navigator.share({ text: texto });
              } catch {
                /* cancelado */
              }
            }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gold-400 px-3.5 py-2 text-[12.5px] font-bold text-ink-950 hover:bg-gold-300"
          >
            <Share2 size={13} />
            Enviar
          </button>
        )}
        <button
          onClick={async () => {
            await navigator.clipboard.writeText(texto);
            setCopiado(true);
            setTimeout(() => setCopiado(false), 1800);
          }}
          className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3.5 py-2 text-[12.5px] font-semibold hover:bg-white/16"
        >
          {copiado ? <Check size={13} /> : <Copy size={13} />}
          {copiado ? "Copiado" : "Copiar"}
        </button>
      </div>
    </div>
  );
}

/** Pede permissão uma vez para os avisos do grupo aparecerem fora do app. */
function AtivarAvisos() {
  const [permissao, setPermissao] = useState<NotificationPermission | "indisponivel">(
    "indisponivel",
  );
  useEffect(() => {
    if ("Notification" in window) setPermissao(Notification.permission);
  }, []);
  if (permissao !== "default") return null;

  return (
    <button
      onClick={async () => setPermissao(await Notification.requestPermission())}
      className="mt-3 flex w-full items-center gap-3 rounded-2xl border border-dashed border-white/12 p-3 text-left transition-colors hover:border-white/25"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gold-400/12 text-gold-400">
        <Bell size={17} />
      </span>
      <span className="min-w-0">
        <span className="block text-[13px] font-semibold text-ink-100">Receber avisos</span>
        <span className="block text-[11.5px] leading-snug text-ink-400">
          Quando o grupo grifar, bater a meta ou te cutucar
        </span>
      </span>
    </button>
  );
}
