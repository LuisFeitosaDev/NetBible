"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2, Lock, Sparkles } from "lucide-react";
import { Gate } from "@/components/grupos/Gate";
import { useBible } from "@/lib/store";
import { criarEstudo, grupoPorCodigo } from "@/lib/grupos/api";
import {
  contarPerguntas,
  DURACOES,
  METODOS,
  metodoPorId,
  montarEtapas,
  NIVEIS,
  PUBLICOS,
  type MetodoTemplate,
  type Nivel,
  type Publico,
} from "@/lib/grupos/metodos";
import type { Formato, Referencia } from "@/lib/grupos/tipos";

export default function NovoEstudoPage() {
  return <Gate>{() => <Assistente />}</Gate>;
}

const NOMES_EQUIPE = ["Equipe A", "Equipe B", "Equipe C", "Equipe D", "Equipe E", "Equipe F"];

function Assistente() {
  const { codigo } = useParams<{ codigo: string }>();
  const router = useRouter();
  const { index } = useBible();

  const [grupoId, setGrupoId] = useState<string | null>(null);
  const [passo, setPasso] = useState(0);

  const [metodoId, setMetodoId] = useState<string | null>(null);
  const [slug, setSlug] = useState("");
  const [capitulo, setCapitulo] = useState(1);
  const [vInicio, setVInicio] = useState<number | "">("");
  const [vFim, setVFim] = useState<number | "">("");
  const [questao, setQuestao] = useState("");
  const [tema, setTema] = useState("");

  const [publico, setPublico] = useState<Publico>("jovens");
  const [nivel, setNivel] = useState<Nivel>("intermediario");
  const [duracao, setDuracao] = useState(45);
  const [formato, setFormato] = useState<Formato>("individual");
  const [qtdEquipes, setQtdEquipes] = useState(2);

  const [salvando, setSalvando] = useState(false);
  const [falha, setFalha] = useState<string | null>(null);

  useEffect(() => {
    grupoPorCodigo(codigo).then((g) => setGrupoId(g?.id ?? null));
  }, [codigo]);

  const metodo = metodoId ? metodoPorId(metodoId) : null;
  const livro = index?.books.find((b) => b.slug === slug);
  const precisaPassagem = metodo?.requer.includes("passagem") ?? false;
  const precisaQuestao = metodo?.requer.includes("questao") ?? false;

  const referencia: Referencia | null = livro
    ? {
        slug: livro.slug,
        nome: livro.name,
        capitulo,
        versiculoInicio: vInicio === "" ? null : Number(vInicio),
        versiculoFim: vFim === "" ? null : Number(vFim),
      }
    : null;

  const titulo = useMemo(() => {
    if (precisaQuestao && questao.trim()) return questao.trim();
    if (referencia) {
      const faixa =
        referencia.versiculoInicio
          ? `:${referencia.versiculoInicio}${referencia.versiculoFim ? `-${referencia.versiculoFim}` : ""}`
          : "";
      return `${referencia.nome} ${referencia.capitulo}${faixa}`;
    }
    return metodo?.nome ?? "Estudo";
  }, [precisaQuestao, questao, referencia, metodo]);

  const conteudoOk =
    (!precisaPassagem || Boolean(livro)) && (!precisaQuestao || questao.trim().length > 4);

  const previa = metodo?.disponivel
    ? montarEtapas(metodo, { publico, nivel, duracaoMin: duracao })
    : [];
  const totalPerguntas = metodo?.disponivel
    ? contarPerguntas(metodo, { publico, nivel, duracaoMin: duracao })
    : 0;

  const criar = async () => {
    if (!grupoId || !metodo) return;
    setSalvando(true);
    setFalha(null);
    try {
      const estudo = await criarEstudo({
        grupoId,
        metodo: metodo.id,
        titulo,
        referencia,
        tema: tema.trim() || null,
        publico,
        nivel,
        duracaoMin: duracao,
        formato,
        equipes: formato === "individual" ? [] : NOMES_EQUIPE.slice(0, qtdEquipes),
      });
      router.push(`/grupos/estudo/${estudo.id}`);
    } catch (e) {
      setFalha(e instanceof Error ? e.message : "Não consegui criar o estudo.");
      setSalvando(false);
    }
  };

  const passos = ["Método", "Conteúdo", "Ajustes", "Revisar"];

  return (
    <div className="mx-auto max-w-2xl px-4 pt-6 pb-28 md:px-6">
      <Link
        href={`/grupos/${codigo}`}
        className="inline-flex items-center gap-1.5 text-[13px] text-ink-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={15} />
        Voltar ao grupo
      </Link>

      <h1 className="mt-4 font-display text-3xl font-black tracking-tight">Novo estudo</h1>

      {/* Trilha de passos */}
      <ol className="mt-5 flex items-center gap-2">
        {passos.map((p, i) => (
          <li key={p} className="flex flex-1 items-center gap-2">
            <span
              className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[12px] font-bold ${
                i < passo
                  ? "bg-gold-400 text-ink-950"
                  : i === passo
                    ? "bg-white text-ink-950"
                    : "bg-white/10 text-ink-400"
              }`}
            >
              {i < passo ? <Check size={13} /> : i + 1}
            </span>
            <span
              className={`hidden text-[13px] font-medium sm:block ${
                i === passo ? "text-white" : "text-ink-400"
              }`}
            >
              {p}
            </span>
            {i < passos.length - 1 && <span className="h-px flex-1 bg-white/10" />}
          </li>
        ))}
      </ol>

      <div className="mt-7">
        {passo === 0 && (
          <PassoMetodo selecionado={metodoId} aoEscolher={setMetodoId} />
        )}

        {passo === 1 && metodo && (
          <div className="space-y-5">
            {precisaQuestao && (
              <div>
                <label className="block text-[13px] font-semibold text-ink-300">
                  Qual é a situação ou pergunta que motivou o encontro?
                </label>
                <textarea
                  value={questao}
                  onChange={(e) => setQuestao(e.target.value)}
                  rows={2}
                  placeholder="Por que me preocupo tanto com a aprovação das pessoas?"
                  className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-ink-850 px-4 py-3 text-[15px] outline-none placeholder:text-ink-600 focus:border-gold-500/60"
                />
                <p className="mt-1.5 text-[12px] text-ink-500">
                  Começar pelo problema real é o que faz esse método funcionar.
                </p>
              </div>
            )}

            {precisaPassagem && (
              <div>
                <label className="block text-[13px] font-semibold text-ink-300">
                  Passagem bíblica
                </label>
                <div className="mt-1.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <select
                    value={slug}
                    onChange={(e) => {
                      setSlug(e.target.value);
                      setCapitulo(1);
                    }}
                    className="col-span-2 rounded-xl border border-white/10 bg-ink-850 px-3 py-3 text-[15px] outline-none focus:border-gold-500/60"
                  >
                    <option value="">Escolha o livro</option>
                    {(index?.books ?? []).map((b) => (
                      <option key={b.slug} value={b.slug}>
                        {b.name}
                      </option>
                    ))}
                  </select>

                  <select
                    value={capitulo}
                    onChange={(e) => setCapitulo(Number(e.target.value))}
                    disabled={!livro}
                    className="rounded-xl border border-white/10 bg-ink-850 px-3 py-3 text-[15px] outline-none focus:border-gold-500/60 disabled:opacity-40"
                  >
                    {(livro?.verses ?? []).map((_, i) => (
                      <option key={i} value={i + 1}>
                        Cap. {i + 1}
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={1}
                      value={vInicio}
                      onChange={(e) => setVInicio(e.target.value === "" ? "" : Number(e.target.value))}
                      placeholder="v."
                      disabled={!livro}
                      className="w-full rounded-xl border border-white/10 bg-ink-850 px-2 py-3 text-center text-[15px] outline-none placeholder:text-ink-600 focus:border-gold-500/60 disabled:opacity-40"
                    />
                    <span className="text-ink-600">a</span>
                    <input
                      type="number"
                      min={1}
                      value={vFim}
                      onChange={(e) => setVFim(e.target.value === "" ? "" : Number(e.target.value))}
                      placeholder="v."
                      disabled={!livro}
                      className="w-full rounded-xl border border-white/10 bg-ink-850 px-2 py-3 text-center text-[15px] outline-none placeholder:text-ink-600 focus:border-gold-500/60 disabled:opacity-40"
                    />
                  </div>
                </div>
                <p className="mt-1.5 text-[12px] text-ink-500">
                  Deixe os versículos em branco para estudar o capítulo inteiro.
                </p>
              </div>
            )}

            <div>
              <label className="block text-[13px] font-semibold text-ink-300">
                Tema <span className="font-normal text-ink-600">(opcional)</span>
              </label>
              <input
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                placeholder="ansiedade, identidade, perdão..."
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-ink-850 px-4 py-3 text-[15px] outline-none placeholder:text-ink-600 focus:border-gold-500/60"
              />
            </div>
          </div>
        )}

        {passo === 2 && (
          <div className="space-y-6">
            <Campo titulo="Público" nota="Muda a linguagem das perguntas, não a profundidade.">
              <Chips
                opcoes={PUBLICOS.map((p) => ({ id: p.id, label: p.label }))}
                valor={publico}
                aoEscolher={(v) => setPublico(v as Publico)}
              />
            </Campo>

            <Campo titulo="Nível">
              <div className="grid gap-2 sm:grid-cols-3">
                {NIVEIS.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => setNivel(n.id)}
                    className={`rounded-xl border p-3 text-left transition-colors ${
                      nivel === n.id
                        ? "border-gold-400 bg-gold-400/10"
                        : "border-white/10 bg-ink-850 hover:border-white/25"
                    }`}
                  >
                    <span className="block font-display text-sm font-bold">{n.label}</span>
                    <span className="mt-0.5 block text-[12px] leading-snug text-ink-400">
                      {n.nota}
                    </span>
                  </button>
                ))}
              </div>
            </Campo>

            <Campo
              titulo="Duração"
              nota={`O estudo vai ter ${totalPerguntas} ${totalPerguntas === 1 ? "pergunta" : "perguntas"} nesse tempo.`}
            >
              <Chips
                opcoes={DURACOES.map((d) => ({ id: String(d), label: `${d} min` }))}
                valor={String(duracao)}
                aoEscolher={(v) => setDuracao(Number(v))}
              />
            </Campo>

            <Campo titulo="Formato" nota="Em equipes, cada uma recebe uma pergunta diferente na mesma etapa.">
              <Chips
                opcoes={[
                  { id: "individual", label: "Individual" },
                  { id: "duplas", label: "Duplas" },
                  { id: "equipes", label: "Equipes" },
                ]}
                valor={formato}
                aoEscolher={(v) => setFormato(v as Formato)}
              />
              {formato !== "individual" && (
                <div className="mt-3">
                  <label className="block text-[12px] text-ink-400">Quantas equipes?</label>
                  <Chips
                    opcoes={[2, 3, 4, 5, 6].map((n) => ({ id: String(n), label: String(n) }))}
                    valor={String(qtdEquipes)}
                    aoEscolher={(v) => setQtdEquipes(Number(v))}
                  />
                  <p className="mt-2 text-[12px] text-ink-500">
                    Você distribui as pessoas nas equipes depois, no painel do estudo.
                  </p>
                </div>
              )}
            </Campo>
          </div>
        )}

        {passo === 3 && metodo && (
          <div>
            <div className="rounded-2xl border border-white/8 bg-ink-900 p-5">
              <p className="font-display text-xl font-bold">{titulo}</p>
              <p className="mt-1 text-[13px] text-ink-400">
                {metodo.nome} · {PUBLICOS.find((p) => p.id === publico)?.label} ·{" "}
                {NIVEIS.find((n) => n.id === nivel)?.label} · {duracao} min ·{" "}
                {formato === "individual" ? "Individual" : `${qtdEquipes} equipes`}
              </p>

              <ol className="mt-5 space-y-2.5">
                {previa.map((etapa, i) => (
                  <li key={etapa.chave} className="flex gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-sm">
                      {etapa.icone}
                    </span>
                    <div className="min-w-0 flex-1 border-b border-white/5 pb-2.5">
                      <p className="text-sm font-semibold">
                        {i + 1}. {etapa.titulo}
                      </p>
                      <p className="text-[12px] text-ink-500">
                        {etapa.perguntas.length
                          ? `${etapa.perguntas.length} ${etapa.perguntas.length === 1 ? "pergunta" : "perguntas"}`
                          : "Sem perguntas, é etapa de leitura ou oração"}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {falha && <p className="mt-3 text-[13px] text-red-400">{falha}</p>}

            <button
              onClick={criar}
              disabled={salvando || !grupoId}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gold-400 py-3.5 font-display text-sm font-bold text-ink-950 transition-colors hover:bg-gold-300 disabled:opacity-40"
            >
              {salvando ? <Loader2 size={17} className="animate-spin" /> : <Sparkles size={17} />}
              {salvando ? "Montando o estudo..." : "Criar estudo"}
            </button>
          </div>
        )}
      </div>

      {/* Navegação */}
      {passo < 3 && (
        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            onClick={() => setPasso((p) => Math.max(0, p - 1))}
            disabled={passo === 0}
            className="rounded-xl px-4 py-3 text-sm font-semibold text-ink-300 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30"
          >
            Voltar
          </button>
          <button
            onClick={() => setPasso((p) => p + 1)}
            disabled={(passo === 0 && !metodo?.disponivel) || (passo === 1 && !conteudoOk)}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-display text-sm font-bold text-ink-950 transition-transform hover:scale-[1.02] disabled:opacity-40"
          >
            Continuar
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

function PassoMetodo({
  selecionado,
  aoEscolher,
}: {
  selecionado: string | null;
  aoEscolher: (id: string) => void;
}) {
  return (
    <div className="space-y-2.5">
      {METODOS.map((m: MetodoTemplate) => (
        <button
          key={m.id}
          onClick={() => m.disponivel && aoEscolher(m.id)}
          disabled={!m.disponivel}
          className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors ${
            selecionado === m.id
              ? "border-gold-400 bg-gold-400/10"
              : m.disponivel
                ? "border-white/8 bg-ink-900 hover:border-white/25"
                : "cursor-not-allowed border-white/5 bg-ink-950/60 opacity-55"
          }`}
        >
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2 font-display text-base font-bold">
              {m.nome}
              {!m.disponivel && (
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-400">
                  <Lock size={9} />
                  Em breve
                </span>
              )}
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-ink-400">{m.resumo}</p>
          </div>
          {selecionado === m.id && <Check size={18} className="shrink-0 text-gold-400" />}
        </button>
      ))}
    </div>
  );
}

function Campo({
  titulo,
  nota,
  children,
}: {
  titulo: string;
  nota?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[13px] font-semibold text-ink-300">{titulo}</p>
      {nota && <p className="mb-2 text-[12px] text-ink-500">{nota}</p>}
      <div className={nota ? "" : "mt-2"}>{children}</div>
    </div>
  );
}

function Chips({
  opcoes,
  valor,
  aoEscolher,
}: {
  opcoes: { id: string; label: string }[];
  valor: string;
  aoEscolher: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {opcoes.map((o) => (
        <button
          key={o.id}
          onClick={() => aoEscolher(o.id)}
          className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
            valor === o.id
              ? "bg-gold-400 text-ink-950"
              : "bg-white/[0.06] text-ink-300 hover:bg-white/12"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
