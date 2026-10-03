"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  HandHeart,
  Lightbulb,
  PartyPopper,
  Play,
  Sprout,
} from "lucide-react";
import { CapaDevocional } from "@/components/devocional/CapaDevocional";
import { AnotacaoDoDia } from "@/components/devocional/AnotacaoDoDia";
import { LembreteDevocional } from "@/components/devocional/LembreteDevocional";
import { MomentoDevocional } from "@/components/devocional/MomentoDevocional";
import {
  citacoesNaVersao,
  devocionalPorId,
  referencia,
  type GuiaDeOracao,
} from "@/lib/devocionais";
import { useConteudoDaSerie } from "@/lib/devocionalConteudo";
import { marcarDia, useProgressoDevocional } from "@/lib/devocionalProgresso";
import { loadBook } from "@/lib/bible";
import { useBible } from "@/lib/store";

const MOVIMENTOS: { id: keyof GuiaDeOracao; nome: string }[] = [
  { id: "adorar", nome: "Adorar" },
  { id: "confessar", nome: "Confessar" },
  { id: "agradecer", nome: "Agradecer" },
  { id: "pedir", nome: "Pedir" },
  { id: "interceder", nome: "Interceder" },
];

export default function DiaPage() {
  const params = useParams<{ id: string; dia: string }>();
  const d = devocionalPorId(params.id);
  const n = Number(params.dia);
  const resumo = d?.dias[n - 1];
  const conteudo = useConteudoDaSerie(params.id);
  const dia = conteudo?.dias[n - 1];
  const progresso = useProgressoDevocional(params.id);
  const { bySlug, version, index } = useBible();
  const [versiculos, setVersiculos] = useState<{ n: number; texto: string }[] | null>(null);
  const [momento, setMomento] = useState(false);

  const leitura = resumo?.leitura;
  useEffect(() => {
    if (!leitura) return;
    let vivo = true;
    setVersiculos(null);
    loadBook(version, leitura.slug)
      .then((livro) => {
        if (!vivo) return;
        const capitulo = livro.chapters[leitura.capitulo - 1] ?? [];
        const ate = leitura.ate ?? leitura.de;
        setVersiculos(
          capitulo.slice(leitura.de - 1, ate).map((texto, i) => ({ n: leitura.de + i, texto })),
        );
      })
      .catch(() => vivo && setVersiculos([]));
    return () => {
      vivo = false;
    };
  }, [version, leitura]);

  // Sempre começa do topo: sem isto, ao concluir e ir para o próximo dia a
  // página abriria rolada lá no fim, no botão de concluir.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [n]);

  // O lembrete abre o dia com `?momento=1`: a pessoa cai direto no guiado.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("momento")) setMomento(true);
  }, [n]);

  const fecharMomento = useCallback(() => {
    setMomento(false);
    const url = new URL(window.location.href);
    if (url.searchParams.has("momento")) {
      url.searchParams.delete("momento");
      window.history.replaceState(null, "", url.pathname + url.search);
    }
  }, []);

  if (!d || !resumo || !leitura) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Dia não encontrado</h1>
        <Link href="/devocional" className="mt-4 inline-block text-gold-400 hover:underline">
          Ver todos os devocionais
        </Link>
      </div>
    );
  }

  const total = d.dias.length;
  const feito = progresso?.feitos.includes(n) ?? false;
  const livro = bySlug.get(leitura.slug);
  const ref = livro ? referencia(leitura, livro.name) : "";
  const traducao = index?.versions.find((v) => v.id === version)?.short;
  const ultimo = n === total;
  const tudoFeito = (progresso?.feitos.length ?? 0) >= total;
  const chave = dia?.chave;
  const citar = (t: string) => (conteudo ? citacoesNaVersao(t, version, conteudo.citacoes) : t);

  return (
    <div className="-mt-16 pb-16">
      {/* Cabeçalho: a capa da série, mais baixa, com o dia por cima. */}
      <section className="relative flex h-[46vh] min-h-[340px] items-end overflow-hidden pt-16">
        <CapaDevocional
          devocional={d}
          arte={{ slug: leitura.slug, capitulo: leitura.capitulo }}
          prioridade
          tom={0.34}
          className="absolute inset-0"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/10" />

        <div className="relative mx-auto w-full max-w-2xl px-4 pb-6 pt-6 md:px-6">
          <Link
            href={`/devocional/${d.id}`}
            className="mb-5 inline-flex max-w-full items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-[12.5px] font-semibold text-white/90 backdrop-blur-md transition-colors hover:bg-black/60"
          >
            <ArrowLeft size={14} className="shrink-0" />
            <span className="truncate">{d.titulo}</span>
          </Link>
          <p className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-white/75">
            Dia {n} de {total}
          </p>
          <h1 className="mt-1 font-display text-3xl font-black leading-tight tracking-tight text-white md:text-5xl">
            {resumo.titulo}
          </h1>
          {/* Os dias como trilha: onde estou e o que já fiz. */}
          <div className="mt-4 flex gap-1">
            {d.dias.map((_, i) => (
              <span
                key={i}
                className="h-1 flex-1 rounded-full"
                style={{
                  backgroundColor:
                    progresso?.feitos.includes(i + 1) || i + 1 === n ? d.cor : "rgb(255 255 255 / 0.2)",
                  opacity: i + 1 === n && !progresso?.feitos.includes(n) ? 0.55 : 1,
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setMomento(true)}
            disabled={!dia}
            className="mt-5 inline-flex items-center gap-2.5 rounded-lg bg-white py-3 pl-5 pr-4 font-display text-sm font-bold text-ink-950 transition-transform hover:scale-[1.03] active:scale-95 disabled:opacity-60"
          >
            <Play size={17} className="fill-ink-950" />
            {feito ? "Fazer o momento de novo" : "Começar o momento guiado"}
            <span className="rounded-md bg-ink-950/10 px-1.5 py-0.5 text-[11px] font-bold">15 min</span>
          </button>
        </div>
      </section>

      <article className="mx-auto max-w-2xl px-4 md:px-6">
        {/* Leitura */}
        <section className="mt-6 rounded-2xl border border-white/8 bg-ink-900 p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="flex items-center gap-2 font-display text-[13px] font-bold uppercase tracking-[0.12em]" style={{ color: d.cor }}>
              <BookOpen size={15} />
              Leia
            </p>
            {traducao && <span className="text-[11px] font-semibold text-ink-400">{traducao}</span>}
          </div>
          <p className="mt-1 font-display text-lg font-bold">{ref}</p>

          <div className="mt-3 font-reading text-[17px] leading-[1.75] text-ink-100">
            {versiculos === null ? (
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-white/10" />
                <div className="h-4 w-11/12 animate-pulse rounded bg-white/10" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-white/10" />
              </div>
            ) : versiculos.length === 0 ? (
              <p className="text-[14px] text-ink-400">
                Não deu para carregar o texto agora. Abra o capítulo pelo link abaixo.
              </p>
            ) : (
              versiculos.map((v) => (
                <span
                  key={v.n}
                  className={v.n === chave ? "rounded px-0.5 box-decoration-clone" : undefined}
                  style={v.n === chave ? { backgroundColor: `${d.cor}26` } : undefined}
                >
                  <sup className="mr-1 font-sans text-[10px] font-bold text-ink-400">{v.n}</sup>
                  {v.texto}{" "}
                </span>
              ))
            )}
          </div>

          <Link
            href={`/livro/${leitura.slug}/${leitura.capitulo}?v=${leitura.de}`}
            className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink-300 transition-colors hover:text-white"
          >
            Ler o capítulo inteiro
            <ArrowRight size={14} />
          </Link>
        </section>

        {conteudo === null ? (
          <p className="mt-8 rounded-2xl border border-white/8 bg-ink-900 p-5 text-[14px] text-ink-400">
            Não deu para carregar a reflexão agora. Confira a conexão e tente de novo.
          </p>
        ) : !dia ? (
          <div className="mt-8 space-y-3">
            {[100, 96, 92, 98, 70].map((w, i) => (
              <div key={i} className="h-4 animate-pulse rounded bg-white/10" style={{ width: `${w}%` }} />
            ))}
          </div>
        ) : (
          <>
            {/* Reflexão */}
            <section className="mt-9">
              <h2 className="font-display text-[13px] font-bold uppercase tracking-[0.12em] text-ink-400">
                Reflexão
              </h2>
              <div
                className="mt-3 space-y-5 font-reading text-[17.5px] leading-[1.85] text-ink-100/95 [&>p:first-child]:first-letter:float-left [&>p:first-child]:first-letter:mr-2.5 [&>p:first-child]:first-letter:mt-1 [&>p:first-child]:first-letter:font-display [&>p:first-child]:first-letter:text-[3.4rem] [&>p:first-child]:first-letter:font-black [&>p:first-child]:first-letter:leading-[0.85] [&>p:first-child]:first-letter:text-[color:var(--cor)]"
                style={{ "--cor": d.cor } as React.CSSProperties}
              >
                {dia.reflexao.map((p, i) => (
                  <p key={i}>{citar(p)}</p>
                ))}
              </div>
            </section>

            <div className="mt-9 space-y-3">
              <Bloco icone={<Lightbulb size={17} />} titulo="Para pensar" cor={d.cor}>
                <p className="font-reading text-[16.5px] leading-relaxed text-ink-100">{citar(dia.pergunta)}</p>
                <AnotacaoDoDia
                  id={d.id}
                  dia={n}
                  inicial={progresso?.anotacoes?.[n]}
                  className="mt-3"
                />
              </Bloco>

              <Bloco icone={<HandHeart size={17} />} titulo="Oração" cor={d.cor}>
                {dia.guia && (
                  <ol className="mb-4 mt-2 space-y-3.5 border-l pl-4" style={{ borderColor: `${d.cor}44` }}>
                    {MOVIMENTOS.map((m) => (
                      <li key={m.id} className="relative">
                        <span
                          aria-hidden
                          className="absolute -left-[21px] top-[7px] h-2 w-2 rounded-full"
                          style={{ backgroundColor: d.cor }}
                        />
                        <p className="font-display text-[12px] font-bold uppercase tracking-[0.14em]" style={{ color: d.cor }}>
                          {m.nome}
                        </p>
                        <p className="mt-0.5 text-[15px] leading-relaxed text-ink-100/90">
                          {citar(dia.guia![m.id])}
                        </p>
                      </li>
                    ))}
                  </ol>
                )}
                <p className="font-reading text-[16.5px] italic leading-relaxed text-ink-100">{citar(dia.oracao)}</p>
              </Bloco>

              <Bloco icone={<Sprout size={17} />} titulo="Para hoje" cor={d.cor}>
                <p className="text-[15px] leading-relaxed text-ink-100">{citar(dia.pratica)}</p>
              </Bloco>
            </div>
          </>
        )}

        {/* Concluir e seguir */}
        <div className="mt-10">
          {!feito ? (
            <button
              onClick={() => void marcarDia(d.id, n, true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-4 font-display text-[15px] font-bold text-ink-950 transition-transform hover:scale-[1.01] active:scale-[0.99]"
              style={{ backgroundColor: d.cor }}
            >
              <Check size={18} strokeWidth={3} />
              Concluir o dia {n}
            </button>
          ) : tudoFeito && ultimo ? (
            <div className="rounded-2xl border p-6 text-center" style={{ borderColor: `${d.cor}55`, backgroundColor: `${d.cor}14` }}>
              <PartyPopper size={28} className="mx-auto" style={{ color: d.cor }} />
              <p className="mt-2 font-display text-xl font-black">Você concluiu “{d.titulo}”</p>
              <p className="mt-1 text-[14px] text-ink-300">
                {total} dias com a Palavra. Que tal começar outro?
              </p>
              <Link
                href="/devocional"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 font-display text-sm font-bold text-ink-950"
              >
                Escolher o próximo
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-ink-900 p-3 pl-4">
              <span className="flex items-center gap-2 text-[14px] font-semibold text-emerald-400">
                <Check size={17} strokeWidth={3} />
                Dia concluído
              </span>
              <button
                onClick={() => void marcarDia(d.id, n, false)}
                className="text-[12.5px] text-ink-400 transition-colors hover:text-white"
              >
                Desfazer
              </button>
            </div>
          )}

          {feito && !tudoFeito && (
            <div className="mt-3">
              <LembreteDevocional cor={d.cor} soOferecer />
            </div>
          )}

          <nav className="mt-4 flex items-center justify-between gap-3">
            {n > 1 ? (
              <Link
                href={`/devocional/${d.id}/${n - 1}`}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-[13.5px] font-semibold text-ink-300 transition-colors hover:bg-white/8 hover:text-white"
              >
                <ArrowLeft size={15} />
                Dia {n - 1}
              </Link>
            ) : (
              <span />
            )}
            {!ultimo && (
              <Link
                href={`/devocional/${d.id}/${n + 1}`}
                className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-[13.5px] font-bold transition-colors ${
                  feito ? "bg-white text-ink-950 hover:bg-white/90" : "text-ink-300 hover:bg-white/8 hover:text-white"
                }`}
              >
                Dia {n + 1}
                <ArrowRight size={15} />
              </Link>
            )}
          </nav>
        </div>
      </article>

      {momento && dia && conteudo && (
        <MomentoDevocional
          serie={d}
          n={n}
          dia={dia}
          citacoes={conteudo.citacoes}
          versao={version}
          versiculos={versiculos}
          referencia={ref}
          nomeDoLivro={livro?.name ?? ""}
          traducao={traducao}
          feito={feito}
          feitos={progresso?.feitos.length ?? 0}
          anotacao={progresso?.anotacoes?.[n]}
          aoConcluir={() => marcarDia(d.id, n, true)}
          aoFechar={fecharMomento}
        />
      )}
    </div>
  );
}

function Bloco({
  icone,
  titulo,
  cor,
  children,
}: {
  icone: React.ReactNode;
  titulo: string;
  cor: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex gap-3.5 rounded-2xl border border-white/8 bg-ink-900 p-4">
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-xl"
        style={{ backgroundColor: `${cor}22`, color: cor }}
      >
        {icone}
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-[12px] font-bold uppercase tracking-[0.12em] text-ink-400">{titulo}</h3>
        <div className="mt-1">{children}</div>
      </div>
    </section>
  );
}
