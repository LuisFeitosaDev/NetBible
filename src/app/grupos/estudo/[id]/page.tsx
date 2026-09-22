"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Loader2,
  Send,
  Check,
  Heart,
  Lightbulb,
  Lock,
  Sparkles,
  UserRound,
  Clock,
} from "lucide-react";
import { Gate } from "@/components/grupos/Gate";
import { PainelLider } from "@/components/grupos/PainelLider";
import { TextoBiblico } from "@/components/grupos/TextoBiblico";
import {
  alternarReacao,
  carregarEstudo,
  carregarResumo,
  enviarResposta,
  membrosDasEquipes,
  membrosDoGrupo,
  minhaReflexao,
  ouvirEstudo,
  reacoesDoEstudo,
  respostasDoEstudo,
  salvarReflexao,
  salvarResumo,
  type EstudoCompleto,
} from "@/lib/grupos/api";
import { metodoPorId } from "@/lib/grupos/metodos";
import type {
  Membro,
  Perfil,
  Pergunta,
  Reacao,
  Reflexao,
  Resposta,
  Resumo,
} from "@/lib/grupos/tipos";

export default function EstudoPage() {
  return <Gate>{(perfil) => <Conteudo perfil={perfil} />}</Gate>;
}

type Dados = EstudoCompleto & {
  membros: Membro[];
  respostas: Resposta[];
  reacoes: Reacao[];
  equipeMembros: { equipe_id: string; perfil_id: string }[];
};

function Conteudo({ perfil }: { perfil: Perfil }) {
  const { id } = useParams<{ id: string }>();
  const [dados, setDados] = useState<Dados | null>(null);
  const [resumo, setResumo] = useState<Resumo | null>(null);
  const [reflexao, setReflexao] = useState<Reflexao | null>(null);
  const [falha, setFalha] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    try {
      const base = await carregarEstudo(id);
      const [membros, respostas, equipeMembros] = await Promise.all([
        membrosDoGrupo(base.estudo.grupo_id),
        respostasDoEstudo(id),
        membrosDasEquipes(id),
      ]);
      const reacoes = await reacoesDoEstudo(respostas.map((r) => r.id));
      setDados({ ...base, membros, respostas, reacoes, equipeMembros });
      if (base.estudo.status === "encerrado") setResumo(await carregarResumo(id));
    } catch (e) {
      setFalha(e instanceof Error ? e.message : "Não consegui abrir o estudo.");
    }
  }, [id]);

  useEffect(() => {
    void carregar();
    void minhaReflexao(id).then(setReflexao);
  }, [carregar, id]);

  useEffect(() => ouvirEstudo(id, () => void carregar()), [id, carregar]);

  if (falha) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Estudo indisponível</h1>
        <p className="mt-2 text-sm text-ink-400">{falha}</p>
        <Link href="/grupos" className="mt-5 inline-block text-gold-400 hover:underline">
          Voltar para Grupos
        </Link>
      </div>
    );
  }

  if (!dados) {
    return (
      <div className="grid place-items-center py-32">
        <Loader2 className="animate-spin text-gold-400" />
      </div>
    );
  }

  const { estudo, etapas, perguntas, equipes, minhaEquipe, membros, respostas, reacoes } = dados;
  const souLider = membros.some((m) => m.perfil_id === perfil.id && m.papel === "lider");
  const metodo = metodoPorId(estudo.metodo);

  const etapaAtual = etapas.find((e) => e.ordem === estudo.etapa_atual) ?? etapas[0];
  const liberada = etapaAtual?.liberada || souLider;

  // O participante só vê a pergunta da equipe dele. Pergunta sem equipe é de todos.
  const minhasPerguntas = perguntas.filter(
    (p) =>
      p.etapa_id === etapaAtual?.id &&
      (p.equipe_id === null || souLider || p.equipe_id === minhaEquipe),
  );

  const nomeDe = (perfilId: string) =>
    membros.find((m) => m.perfil_id === perfilId)?.profiles?.nome ?? "Participante";
  const equipeDe = (equipeId: string | null) => equipes.find((e) => e.id === equipeId);

  return (
    <div className="mx-auto max-w-2xl px-4 pb-28 md:px-6">
      {souLider && (
        <PainelLider
          estudo={estudo}
          etapas={etapas}
          perguntas={perguntas}
          respostas={respostas}
          membros={membros}
          equipes={equipes}
          equipeMembros={dados.equipeMembros}
          aoMudar={carregar}
        />
      )}

      <div className="pt-5">
        <Link
          href={`/grupos`}
          className="inline-flex items-center gap-1.5 text-[13px] text-ink-400 transition-colors hover:text-white"
        >
          <ArrowLeft size={15} />
          Grupos
        </Link>

        <header className="mt-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-gold-400">
            {metodo?.nome ?? estudo.metodo}
          </p>
          <h1 className="mt-1 font-display text-2xl font-black tracking-tight md:text-3xl">
            {estudo.titulo}
          </h1>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-ink-400">
            <span className="inline-flex items-center gap-1">
              <UserRound size={13} />
              {membros.length}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock size={13} />
              {estudo.duracao_min} min
            </span>
            {minhaEquipe && (
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[12px] font-semibold"
                style={{
                  background: `${equipeDe(minhaEquipe)?.cor}22`,
                  color: equipeDe(minhaEquipe)?.cor,
                }}
              >
                {equipeDe(minhaEquipe)?.nome}
              </span>
            )}
          </p>
        </header>
      </div>

      {estudo.status === "rascunho" && !souLider && (
        <Aviso icone={<Lock size={18} />} titulo="O estudo ainda não começou">
          Quando o líder iniciar, esta tela abre sozinha. Pode deixar aberta.
        </Aviso>
      )}

      {estudo.status === "encerrado" ? (
        <Encerramento
          dados={dados}
          souLider={souLider}
          resumo={resumo}
          reflexao={reflexao}
          nomeDe={nomeDe}
          aoSalvarReflexao={async (texto, compartilhar) => {
            await salvarReflexao(estudo.id, texto, compartilhar);
            setReflexao(await minhaReflexao(estudo.id));
          }}
          aoSalvarResumo={async (texto, destaques) => {
            await salvarResumo(estudo.id, texto, destaques);
            setResumo(await carregarResumo(estudo.id));
          }}
        />
      ) : (
        estudo.status === "ativo" &&
        etapaAtual && (
          <section className="mt-6">
            {/* Trilha compacta para o participante saber onde está */}
            <div className="mb-5 flex items-center gap-1.5">
              {etapas.map((e) => (
                <span
                  key={e.id}
                  title={e.titulo}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    e.ordem < estudo.etapa_atual
                      ? "bg-gold-500/50"
                      : e.ordem === estudo.etapa_atual
                        ? "bg-gold-400"
                        : "bg-white/10"
                  }`}
                />
              ))}
            </div>

            <div className="rounded-2xl border border-white/8 bg-ink-900 p-5">
              <p className="text-3xl">{etapaAtual.icone}</p>
              <h2 className="mt-2 font-display text-xl font-bold">
                Etapa {etapaAtual.ordem + 1}: {etapaAtual.titulo}
              </h2>
              {etapaAtual.descricao && (
                <p className="mt-1.5 text-[14px] leading-relaxed text-ink-300">
                  {etapaAtual.descricao}
                </p>
              )}
            </div>

            {!liberada && (
              <Aviso icone={<Lock size={18} />} titulo="Aguardando o líder">
                Esta etapa ainda não foi liberada.
              </Aviso>
            )}

            {liberada && estudo.referencia && (
              <div className="mt-4">
                <TextoBiblico
                  referencia={estudo.referencia}
                  mostrarFicha={["contexto", "interpretacao"].includes(etapaAtual.chave)}
                />
              </div>
            )}

            {liberada &&
              minhasPerguntas.map((pergunta) => (
                <BlocoPergunta
                  key={pergunta.id}
                  pergunta={pergunta}
                  perfilId={perfil.id}
                  souLider={souLider}
                  minhaEquipe={minhaEquipe}
                  respostas={respostas.filter((r) => r.pergunta_id === pergunta.id)}
                  reacoes={reacoes}
                  nomeDe={nomeDe}
                  equipeDe={equipeDe}
                  aoResponder={carregar}
                />
              ))}

            {liberada && !minhasPerguntas.length && (
              <Aviso icone={<Sparkles size={18} />} titulo="Sem pergunta nesta etapa">
                É um momento de leitura ou oração. Fiquem juntos nisso antes de seguir.
              </Aviso>
            )}
          </section>
        )
      )}
    </div>
  );
}

function Aviso({
  icone,
  titulo,
  children,
}: {
  icone: React.ReactNode;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4 flex gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
      <span className="mt-0.5 shrink-0 text-ink-400">{icone}</span>
      <div>
        <p className="font-display text-sm font-bold">{titulo}</p>
        <p className="mt-0.5 text-[13px] leading-relaxed text-ink-400">{children}</p>
      </div>
    </div>
  );
}

function BlocoPergunta({
  pergunta,
  perfilId,
  souLider,
  minhaEquipe,
  respostas,
  reacoes,
  nomeDe,
  equipeDe,
  aoResponder,
}: {
  pergunta: Pergunta;
  perfilId: string;
  souLider: boolean;
  minhaEquipe: string | null;
  respostas: Resposta[];
  reacoes: Reacao[];
  nomeDe: (id: string) => string;
  equipeDe: (id: string | null) => { nome: string; cor: string } | undefined;
  aoResponder: () => void;
}) {
  const minha = respostas.find((r) => r.perfil_id === perfilId);
  const [texto, setTexto] = useState(minha?.texto ?? "");
  const [enviando, setEnviando] = useState(false);
  const [editando, setEditando] = useState(!minha);
  const [verAjuda, setVerAjuda] = useState(false);

  useEffect(() => {
    setTexto(minha?.texto ?? "");
    setEditando(!minha);
  }, [minha?.texto, minha]);

  // Só vê as respostas do grupo quem já respondeu. Evita o efeito cola e faz o
  // participante pensar antes de ler os outros.
  const podeVer = Boolean(minha) || souLider;
  const dosOutros = respostas.filter((r) => r.perfil_id !== perfilId);

  const enviar = async () => {
    if (texto.trim().length < 2) return;
    setEnviando(true);
    try {
      await enviarResposta(pergunta.id, texto, minhaEquipe);
      setEditando(false);
      aoResponder();
    } finally {
      setEnviando(false);
    }
  };

  const equipe = equipeDe(pergunta.equipe_id);

  return (
    <div className="mt-4 rounded-2xl border border-white/8 bg-ink-900 p-5">
      {equipe && (
        <span
          className="mb-2 inline-block rounded-full px-2.5 py-1 text-[11px] font-bold"
          style={{ background: `${equipe.cor}22`, color: equipe.cor }}
        >
          {equipe.nome}
        </span>
      )}

      <p className="font-display text-[17px] font-bold leading-snug">{pergunta.texto}</p>

      {pergunta.ajuda && (
        <div className="mt-2">
          <button
            onClick={() => setVerAjuda((v) => !v)}
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-ink-400 transition-colors hover:text-gold-400"
          >
            <Lightbulb size={13} />
            {verAjuda ? "Esconder dica" : "Preciso de uma dica"}
          </button>
          {verAjuda && (
            <p className="mt-1.5 rounded-lg border-l-2 border-gold-500/60 bg-gold-500/8 px-3 py-2 text-[13px] leading-relaxed text-ink-300">
              {pergunta.ajuda}
            </p>
          )}
        </div>
      )}

      {editando ? (
        <div className="mt-3">
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            rows={3}
            placeholder="Escreva a sua resposta..."
            className="w-full resize-none rounded-xl border border-white/10 bg-ink-850 p-3.5 text-[15px] leading-relaxed outline-none placeholder:text-ink-600 focus:border-gold-500/60"
          />
          <button
            onClick={enviar}
            disabled={texto.trim().length < 2 || enviando}
            className="mt-2 inline-flex items-center gap-2 rounded-xl bg-gold-400 px-5 py-2.5 font-display text-sm font-bold text-ink-950 transition-colors hover:bg-gold-300 disabled:opacity-40"
          >
            {enviando ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
            {minha ? "Atualizar" : "Enviar resposta"}
          </button>
        </div>
      ) : (
        <div className="mt-3 rounded-xl border-l-2 border-gold-500 bg-gold-500/8 p-3.5">
          <p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gold-400">
            <Check size={12} />
            Sua resposta
          </p>
          <p className="whitespace-pre-wrap text-[15px] leading-relaxed">{minha?.texto}</p>
          <button
            onClick={() => setEditando(true)}
            className="mt-2 text-[12px] font-semibold text-ink-400 transition-colors hover:text-white"
          >
            Editar
          </button>
        </div>
      )}

      {dosOutros.length > 0 && (
        <div className="mt-4 border-t border-white/5 pt-3">
          {!podeVer ? (
            <p className="text-[13px] text-ink-500">
              {dosOutros.length}{" "}
              {dosOutros.length === 1 ? "pessoa já respondeu" : "pessoas já responderam"}.
              Responda para ver.
            </p>
          ) : (
            <>
              <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-ink-400">
                Respostas do grupo
              </p>
              <div className="space-y-2.5">
                {dosOutros.map((r) => {
                  const curtidas = reacoes.filter((x) => x.resposta_id === r.id);
                  const euCurti = curtidas.some((x) => x.perfil_id === perfilId);
                  return (
                    <div key={r.id} className="rounded-xl bg-white/[0.04] p-3">
                      <p className="mb-1 text-[12px] font-semibold text-ink-400">
                        {nomeDe(r.perfil_id)}
                      </p>
                      <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-ink-100">
                        {r.texto}
                      </p>
                      <button
                        onClick={async () => {
                          await alternarReacao(r.id, euCurti);
                          aoResponder();
                        }}
                        className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold transition-colors ${
                          euCurti
                            ? "bg-rose-400/15 text-rose-300"
                            : "text-ink-500 hover:bg-white/8 hover:text-ink-300"
                        }`}
                      >
                        <Heart size={12} className={euCurti ? "fill-rose-300" : ""} />
                        {curtidas.length || ""}
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function Encerramento({
  dados,
  souLider,
  resumo,
  reflexao,
  nomeDe,
  aoSalvarReflexao,
  aoSalvarResumo,
}: {
  dados: Dados;
  souLider: boolean;
  resumo: Resumo | null;
  reflexao: Reflexao | null;
  nomeDe: (id: string) => string;
  aoSalvarReflexao: (texto: string, compartilhar: boolean) => Promise<void>;
  aoSalvarResumo: (
    texto: string,
    destaques: { rotulo: string; valor: string }[],
  ) => Promise<void>;
}) {
  const { estudo, etapas, perguntas, respostas, membros } = dados;
  const [conclusao, setConclusao] = useState(resumo?.texto ?? "");
  const [minhaReflexaoTexto, setMinhaReflexaoTexto] = useState(reflexao?.texto ?? "");
  const [compartilhar, setCompartilhar] = useState(reflexao?.compartilhada ?? false);
  const [salvando, setSalvando] = useState<"resumo" | "reflexao" | null>(null);

  useEffect(() => {
    setConclusao(resumo?.texto ?? "");
  }, [resumo?.texto]);
  useEffect(() => {
    setMinhaReflexaoTexto(reflexao?.texto ?? "");
    setCompartilhar(reflexao?.compartilhada ?? false);
  }, [reflexao]);

  const destaques = useMemo(
    () => [
      { rotulo: "Participantes", valor: String(membros.length) },
      { rotulo: "Respostas", valor: String(respostas.length) },
      {
        rotulo: "Participação",
        valor: `${
          membros.length
            ? Math.round((new Set(respostas.map((r) => r.perfil_id)).size / membros.length) * 100)
            : 0
        }%`,
      },
    ],
    [membros.length, respostas],
  );

  return (
    <div className="mt-6 space-y-5">
      <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/8 p-5">
        <p className="font-display text-lg font-bold">Estudo encerrado</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {destaques.map((d) => (
            <div key={d.rotulo} className="rounded-xl bg-black/20 p-3 text-center">
              <p className="font-display text-xl font-black text-emerald-300">{d.valor}</p>
              <p className="text-[11px] text-ink-400">{d.rotulo}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tudo que o grupo respondeu, etapa por etapa */}
      <div className="rounded-2xl border border-white/8 bg-ink-900 p-5">
        <h2 className="font-display text-lg font-bold">O que o grupo respondeu</h2>
        <div className="mt-4 space-y-5">
          {etapas.map((etapa) => {
            const doEtapa = perguntas.filter((p) => p.etapa_id === etapa.id);
            if (!doEtapa.length) return null;
            return (
              <div key={etapa.id}>
                <p className="mb-2 text-[12px] font-bold uppercase tracking-wider text-gold-400">
                  {etapa.icone} {etapa.titulo}
                </p>
                <div className="space-y-3">
                  {doEtapa.map((p) => {
                    const rs = respostas.filter((r) => r.pergunta_id === p.id);
                    return (
                      <div key={p.id} className="border-l-2 border-white/10 pl-3">
                        <p className="text-[14px] font-semibold">{p.texto}</p>
                        {rs.length ? (
                          <ul className="mt-1.5 space-y-1.5">
                            {rs.map((r) => (
                              <li key={r.id} className="text-[13px] leading-relaxed text-ink-300">
                                <span className="text-ink-500">{nomeDe(r.perfil_id)}: </span>
                                {r.texto}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-1 text-[12px] text-ink-600">Sem respostas.</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Conclusão do grupo, escrita pelo líder */}
      <div className="rounded-2xl border border-white/8 bg-ink-900 p-5">
        <h2 className="font-display text-lg font-bold">Conclusão do grupo</h2>
        {souLider ? (
          <>
            <textarea
              value={conclusao}
              onChange={(e) => setConclusao(e.target.value)}
              rows={5}
              placeholder="O que o grupo concluiu, onde houve divergência, e qual o desafio da semana."
              className="mt-3 w-full resize-none rounded-xl border border-white/10 bg-ink-850 p-3.5 text-[15px] leading-relaxed outline-none placeholder:text-ink-600 focus:border-gold-500/60"
            />
            <button
              onClick={async () => {
                setSalvando("resumo");
                try {
                  await aoSalvarResumo(conclusao, destaques);
                } finally {
                  setSalvando(null);
                }
              }}
              disabled={salvando === "resumo"}
              className="mt-2 rounded-xl bg-gold-400 px-5 py-2.5 font-display text-sm font-bold text-ink-950 transition-colors hover:bg-gold-300 disabled:opacity-40"
            >
              {salvando === "resumo" ? "Salvando..." : "Salvar conclusão"}
            </button>
          </>
        ) : resumo?.texto ? (
          <p className="mt-2 whitespace-pre-wrap text-[15px] leading-relaxed text-ink-100">
            {resumo.texto}
          </p>
        ) : (
          <p className="mt-2 text-[13px] text-ink-400">
            O líder ainda não escreveu a conclusão.
          </p>
        )}
      </div>

      {/* Reflexão individual, privada por padrão */}
      <div className="rounded-2xl border border-white/8 bg-ink-900 p-5">
        <h2 className="font-display text-lg font-bold">
          Qual foi a principal coisa que Deus falou com você?
        </h2>
        <p className="mt-1 text-[13px] text-ink-400">
          Esta resposta é privada. Só aparece para o grupo se você marcar abaixo.
        </p>
        <textarea
          value={minhaReflexaoTexto}
          onChange={(e) => setMinhaReflexaoTexto(e.target.value)}
          rows={4}
          className="mt-3 w-full resize-none rounded-xl border border-white/10 bg-ink-850 p-3.5 text-[15px] leading-relaxed outline-none focus:border-gold-500/60"
        />
        <label className="mt-2.5 flex items-center gap-2.5 text-[13px] text-ink-300">
          <input
            type="checkbox"
            checked={compartilhar}
            onChange={(e) => setCompartilhar(e.target.checked)}
            className="h-4 w-4 accent-[#f5c45e]"
          />
          Compartilhar com o grupo
        </label>
        <button
          onClick={async () => {
            setSalvando("reflexao");
            try {
              await aoSalvarReflexao(minhaReflexaoTexto, compartilhar);
            } finally {
              setSalvando(null);
            }
          }}
          disabled={minhaReflexaoTexto.trim().length < 2 || salvando === "reflexao"}
          className="mt-3 rounded-xl bg-white/10 px-5 py-2.5 font-display text-sm font-bold transition-colors hover:bg-white/18 disabled:opacity-40"
        >
          {salvando === "reflexao" ? "Salvando..." : "Salvar reflexão"}
        </button>
      </div>

      <Link
        href={`/grupos/${""}`}
        className="block rounded-xl bg-white/[0.06] py-3 text-center font-display text-sm font-bold transition-colors hover:bg-white/12"
        onClick={(e) => {
          e.preventDefault();
          history.back();
        }}
      >
        Voltar ao grupo
      </Link>
    </div>
  );
}
