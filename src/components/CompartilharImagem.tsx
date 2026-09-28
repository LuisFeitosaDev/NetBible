"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  AlignCenter,
  AlignLeft,
  Download,
  Loader2,
  Minus,
  Plus,
  Share2,
  X,
} from "lucide-react";
import { arteDeCapitulo } from "@/lib/arte";
import { temArteDeCapitulo } from "@/lib/capitulos.generated";
import { FONTES_DE_LEITURA, type FonteLeitura } from "@/lib/temaLeitura";

/**
 * Transforma um versículo numa imagem para Stories ou WhatsApp.
 *
 * Desenha num <canvas> na resolução final (1080 de largura) e mostra o mesmo
 * canvas reduzido como prévia: o que a pessoa vê é exatamente o que sai. O
 * arquivo vai pelo menu de compartilhar do celular, que é onde aparecem
 * Instagram e WhatsApp; onde não houver, baixa o PNG.
 */

type Formato = "stories" | "quadrado";
type Alinhamento = "esquerda" | "centro";

type Fundo =
  | { tipo: "degrade"; cores: string[] }
  | { tipo: "liso"; cor: string }
  | { tipo: "arte" };

type Modelo = {
  id: string;
  nome: string;
  fundo: Fundo;
  texto: string;
  destaque: string;
  fonte: FonteLeitura;
  /** Cor da amostra no seletor. */
  amostra: string;
};

const MODELOS: Modelo[] = [
  {
    id: "noite",
    nome: "Noite",
    fundo: { tipo: "degrade", cores: ["#0b0a0e", "#16121d", "#2b200d"] },
    texto: "#f3ede0",
    destaque: "#f5c45e",
    fonte: "lora",
    amostra: "linear-gradient(160deg,#0b0a0e,#2b200d)",
  },
  {
    id: "arte",
    nome: "Arte",
    fundo: { tipo: "arte" },
    texto: "#f6f1e7",
    destaque: "#f5c45e",
    fonte: "lora",
    amostra: "linear-gradient(180deg,#6b5a3a,#0b0a0e)",
  },
  {
    id: "papel",
    nome: "Papel",
    fundo: { tipo: "liso", cor: "#efdfb9" },
    texto: "#2b1f0c",
    destaque: "#9a5f10",
    fonte: "literata",
    amostra: "#efdfb9",
  },
  {
    id: "aurora",
    nome: "Aurora",
    fundo: { tipo: "degrade", cores: ["#2b1055", "#7b2d6b", "#e8743b"] },
    texto: "#fff7ef",
    destaque: "#ffd98a",
    fonte: "lora",
    amostra: "linear-gradient(160deg,#2b1055,#e8743b)",
  },
  {
    id: "mar",
    nome: "Mar",
    fundo: { tipo: "degrade", cores: ["#08192b", "#12456a", "#1e7f8c"] },
    texto: "#effaff",
    destaque: "#9be7ff",
    fonte: "atkinson",
    amostra: "linear-gradient(160deg,#08192b,#1e7f8c)",
  },
  {
    id: "oliveira",
    nome: "Oliveira",
    fundo: { tipo: "degrade", cores: ["#0e2016", "#1f4a2e", "#5a7a3a"] },
    texto: "#f4f1e6",
    destaque: "#d8e8a0",
    fonte: "literata",
    amostra: "linear-gradient(160deg,#0e2016,#5a7a3a)",
  },
  {
    id: "claro",
    nome: "Claro",
    fundo: { tipo: "liso", cor: "#fbf8f1" },
    texto: "#1b1712",
    destaque: "#b0772a",
    fonte: "inter",
    amostra: "#fbf8f1",
  },
];

const TAMANHOS: Record<Formato, { l: number; a: number }> = {
  stories: { l: 1080, a: 1920 },
  quadrado: { l: 1080, a: 1080 },
};

const CHAVE_PREFERENCIA = "genipse.imagem.preferencia";

/** Nome real da fonte carregada pelo next/font, lido da variável CSS. */
function familiaDe(variavel: string, reserva: string) {
  const valor = getComputedStyle(document.documentElement).getPropertyValue(variavel).trim();
  return valor ? `${valor}, ${reserva}` : reserva;
}

const VARIAVEL_DA_FONTE: Record<FonteLeitura, [string, string]> = {
  lora: ["--font-lora", "Georgia, serif"],
  literata: ["--font-literata", "Georgia, serif"],
  atkinson: ["--font-atkinson", "system-ui, sans-serif"],
  inter: ["--font-inter", "system-ui, sans-serif"],
};

const comParametro = (url: string, parametro: string) =>
  `${url}${url.includes("?") ? "&" : "?"}${parametro}`;

function carregarImagem(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    // Sem isto, uma arte vinda do Storage "suja" o canvas e o PNG não sai.
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/** Quebra o texto em linhas que cabem em `largura`. */
function quebrarLinhas(ctx: CanvasRenderingContext2D, texto: string, largura: number) {
  const palavras = texto.split(/\s+/).filter(Boolean);
  const linhas: string[] = [];
  let atual = "";
  for (const p of palavras) {
    const tentativa = atual ? `${atual} ${p}` : p;
    if (ctx.measureText(tentativa).width <= largura || !atual) atual = tentativa;
    else {
      linhas.push(atual);
      atual = p;
    }
  }
  if (atual) linhas.push(atual);
  return linhas;
}

type Imagens = {
  arte: HTMLImageElement | null;
  logo: HTMLImageElement | null;
  logoEscuro: HTMLImageElement | null;
};

type Opcoes = {
  formato: Formato;
  modelo: Modelo;
  fonte: FonteLeitura;
  alinhamento: Alinhamento;
  escala: number;
};

function desenhar(
  canvas: HTMLCanvasElement,
  o: Opcoes,
  conteudo: { texto: string; referencia: string },
  imagens: Imagens,
) {
  const { l: L, a: A } = TAMANHOS[o.formato];
  canvas.width = L;
  canvas.height = A;
  const ctx = canvas.getContext("2d")!;
  const m = o.modelo;

  // ---- fundo
  let topoDoTexto = 0;
  if (m.fundo.tipo === "liso") {
    ctx.fillStyle = m.fundo.cor;
    ctx.fillRect(0, 0, L, A);
  } else if (m.fundo.tipo === "degrade") {
    const g = ctx.createLinearGradient(0, 0, L * 0.35, A);
    const cores = m.fundo.cores;
    cores.forEach((c, i) => g.addColorStop(i / (cores.length - 1), c));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, L, A);
    const brilho = ctx.createRadialGradient(L * 0.5, A * 0.18, 0, L * 0.5, A * 0.18, L * 0.9);
    brilho.addColorStop(0, "rgba(255,255,255,0.08)");
    brilho.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = brilho;
    ctx.fillRect(0, 0, L, A);
  } else {
    ctx.fillStyle = "#0b0a0e";
    ctx.fillRect(0, 0, L, A);
    if (imagens.arte) {
      // A arte é uma faixa larga: vai inteira no topo e se dissolve no fundo,
      // em vez de esticada (e borrada) pela tela toda.
      const altura = Math.round((L / imagens.arte.width) * imagens.arte.height * 1.25);
      const largura = Math.round((altura / imagens.arte.height) * imagens.arte.width);
      ctx.drawImage(imagens.arte, (L - largura) / 2, 0, largura, altura);
      const fade = ctx.createLinearGradient(0, altura * 0.35, 0, altura);
      fade.addColorStop(0, "rgba(11,10,14,0)");
      fade.addColorStop(1, "rgba(11,10,14,1)");
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, L, altura + 2);
      topoDoTexto = altura * 0.72;
    }
  }

  // ---- medidas
  const margem = Math.round(L * 0.1);
  const larguraDoTexto = L - margem * 2;
  const rodape = Math.round(A * (o.formato === "stories" ? 0.1 : 0.12));
  const areaTopo = Math.max(topoDoTexto, A * (o.formato === "stories" ? 0.12 : 0.1));
  const areaAltura = A - rodape - areaTopo;

  const familiaDoTexto = familiaDe(...VARIAVEL_DA_FONTE[o.fonte]);
  const familiaDaMarca = familiaDe("--font-outfit", "system-ui, sans-serif");
  const centro = o.alinhamento === "centro";
  const x = centro ? L / 2 : margem;
  ctx.textAlign = centro ? "center" : "left";
  ctx.textBaseline = "alphabetic";

  const tamanhoDaReferencia = Math.round(L * 0.034);
  const aspas = Math.round(L * 0.16);

  // ---- tamanho do texto: o maior que couber, vezes o ajuste da pessoa
  const maximo = (o.formato === "stories" ? 76 : 62) * o.escala;
  let tamanho = maximo;
  let linhas: string[] = [];
  let entrelinha = 0;
  const alturaReservada = aspas * 0.55 + tamanhoDaReferencia * 3;
  for (; tamanho >= 30; tamanho -= 2) {
    ctx.font = `500 ${tamanho}px ${familiaDoTexto}`;
    linhas = quebrarLinhas(ctx, conteudo.texto, larguraDoTexto);
    entrelinha = tamanho * 1.38;
    if (linhas.length * entrelinha + alturaReservada <= areaAltura) break;
  }
  // Passagem longa demais até no mínimo: corta com reticências.
  const cabem = Math.max(1, Math.floor((areaAltura - alturaReservada) / entrelinha));
  if (linhas.length > cabem) {
    linhas = linhas.slice(0, cabem);
    linhas[cabem - 1] = `${linhas[cabem - 1].replace(/[\s,.;:]+$/, "")}…`;
  }

  const alturaDoBloco = aspas * 0.55 + linhas.length * entrelinha + tamanhoDaReferencia * 3;
  let y = areaTopo + (areaAltura - alturaDoBloco) / 2;

  // ---- aspas decorativas
  ctx.fillStyle = m.destaque;
  ctx.globalAlpha = 0.9;
  ctx.font = `700 ${aspas}px ${familiaDe("--font-lora", "Georgia, serif")}`;
  ctx.fillText("“", x, y + aspas * 0.72);
  ctx.globalAlpha = 1;
  y += aspas * 0.55;

  // ---- versículo
  ctx.fillStyle = m.texto;
  ctx.font = `500 ${tamanho}px ${familiaDoTexto}`;
  for (const linha of linhas) {
    y += entrelinha;
    ctx.fillText(linha, x, y - entrelinha * 0.28);
  }

  // ---- referência
  y += tamanhoDaReferencia * 1.9;
  ctx.fillStyle = m.destaque;
  ctx.font = `700 ${tamanhoDaReferencia}px ${familiaDaMarca}`;
  if ("letterSpacing" in ctx) (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = "3px";
  ctx.fillText(conteudo.referencia.toUpperCase(), x, y);
  if ("letterSpacing" in ctx) (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = "0px";

  // ---- assinatura: a marca (G-livro) + "Genipse Bible"
  const tamanhoDaMarca = Math.round(L * 0.03);
  const logo = fundoClaro(m) ? imagens.logoEscuro : imagens.logo;
  const alturaDoLogo = Math.round(tamanhoDaMarca * 1.9);
  const larguraDoLogo = logo ? Math.round((alturaDoLogo / logo.height) * logo.width) : 0;
  const texto = "Genipse Bible";
  ctx.font = `700 ${tamanhoDaMarca}px ${familiaDaMarca}`;
  const espaco = logo ? tamanhoDaMarca * 0.55 : 0;
  const larguraDaMarca = larguraDoLogo + espaco + ctx.measureText(texto).width;
  const yMarca = A - rodape / 2;
  const xMarca = centro ? (L - larguraDaMarca) / 2 : margem;
  ctx.globalAlpha = 0.9;
  if (logo) ctx.drawImage(logo, xMarca, yMarca - alturaDoLogo / 2, larguraDoLogo, alturaDoLogo);
  ctx.fillStyle = m.texto;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(texto, xMarca + larguraDoLogo + espaco, yMarca + 1);
  ctx.globalAlpha = 1;
}

/** Papel e Claro pedem a marca em dourado profundo; o dourado claro some. */
const fundoClaro = (m: Modelo) => m.id === "papel" || m.id === "claro";

export function CompartilharImagem({
  texto,
  referencia,
  slug,
  capitulo,
  nomeDoArquivo,
  aoFechar,
}: {
  texto: string;
  /** "Romanos 7:1 · NVI" */
  referencia: string;
  slug: string;
  capitulo: number;
  nomeDoArquivo: string;
  aoFechar: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const temArte = temArteDeCapitulo(slug, capitulo);
  const modelos = useMemo(() => MODELOS.filter((m) => m.id !== "arte" || temArte), [temArte]);

  const [opcoes, setOpcoes] = useState<Opcoes>(() => {
    let salvo: Partial<{ formato: Formato; modelo: string; fonte: FonteLeitura; alinhamento: Alinhamento }> = {};
    try {
      salvo = JSON.parse(localStorage.getItem(CHAVE_PREFERENCIA) ?? "{}");
    } catch {
      /* primeira vez ou modo privado */
    }
    const modelo = modelos.find((m) => m.id === salvo.modelo) ?? modelos[0];
    return {
      formato: salvo.formato ?? "stories",
      modelo,
      fonte: salvo.fonte ?? modelo.fonte,
      alinhamento: salvo.alinhamento ?? "centro",
      escala: 1,
    };
  });
  const [imagens, setImagens] = useState<Imagens>({ arte: null, logo: null, logoEscuro: null });
  const [pronto, setPronto] = useState(false);
  const [ocupado, setOcupado] = useState(false);
  const [falha, setFalha] = useState<string | null>(null);

  // Imagens e fontes antes do primeiro desenho: canvas não espera fonte chegar.
  useEffect(() => {
    let vivo = true;
    (async () => {
      const [logo, logoEscuro, arte] = await Promise.all([
        carregarImagem("/marca.png"),
        carregarImagem("/marca-escura.png"),
        // `canvas=1`: endereço à parte da arte que o leitor já exibiu. Aquela
        // pode estar no cache do service worker sem permissão de CORS, e o
        // canvas se recusaria a exportar. A URL já pode trazer `?v=`.
        temArte
          ? carregarImagem(comParametro(arteDeCapitulo(slug, capitulo).webp, "canvas=1"))
          : Promise.resolve(null),
      ]);
      await Promise.all(
        [
          ...FONTES_DE_LEITURA.map((f) => familiaDe(...VARIAVEL_DA_FONTE[f.id])),
          familiaDe("--font-outfit", "system-ui"),
        ].flatMap((familia) => [
          document.fonts.load(`500 40px ${familia}`).catch(() => []),
          document.fonts.load(`700 40px ${familia}`).catch(() => []),
        ]),
      );
      if (!vivo) return;
      setImagens({ logo, logoEscuro, arte });
      setPronto(true);
    })();
    return () => {
      vivo = false;
    };
  }, [slug, capitulo, temArte]);

  useEffect(() => {
    if (!pronto || !canvasRef.current) return;
    desenhar(canvasRef.current, opcoes, { texto, referencia }, imagens);
    try {
      localStorage.setItem(
        CHAVE_PREFERENCIA,
        JSON.stringify({
          formato: opcoes.formato,
          modelo: opcoes.modelo.id,
          fonte: opcoes.fonte,
          alinhamento: opcoes.alinhamento,
        }),
      );
    } catch {
      /* modo privado */
    }
  }, [pronto, opcoes, texto, referencia, imagens]);

  // Fecha no Esc e trava a rolagem da leitura por trás.
  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => e.key === "Escape" && aoFechar();
    window.addEventListener("keydown", aoTeclar);
    const antes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", aoTeclar);
      document.body.style.overflow = antes;
    };
  }, [aoFechar]);

  const gerarArquivo = useCallback(
    () =>
      new Promise<File>((resolve, reject) => {
        const canvas = canvasRef.current;
        if (!canvas) return reject(new Error("Prévia não carregou."));
        try {
          canvas.toBlob((blob) => {
            if (!blob) return reject(new Error("Não consegui gerar a imagem."));
            resolve(new File([blob], `${nomeDoArquivo}.png`, { type: "image/png" }));
          }, "image/png");
        } catch {
          // Arte de outra origem sem permissão de CORS "suja" o canvas.
          reject(new Error("Esse fundo não pode ser exportado. Escolha outro modelo."));
        }
      }),
    [nomeDoArquivo],
  );

  const baixar = (arquivo: File) => {
    const url = URL.createObjectURL(arquivo);
    const a = document.createElement("a");
    a.href = url;
    a.download = arquivo.name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };

  const compartilhar = async () => {
    setOcupado(true);
    setFalha(null);
    try {
      const arquivo = await gerarArquivo();
      if (navigator.canShare?.({ files: [arquivo] })) {
        try {
          await navigator.share({ files: [arquivo] });
        } catch {
          /* cancelado */
        }
      } else {
        baixar(arquivo);
      }
    } catch (e) {
      setFalha(e instanceof Error ? e.message : String(e));
    } finally {
      setOcupado(false);
    }
  };

  const salvar = async () => {
    setFalha(null);
    try {
      baixar(await gerarArquivo());
    } catch (e) {
      setFalha(e instanceof Error ? e.message : String(e));
    }
  };

  const mudar = (parcial: Partial<Opcoes>) => setOpcoes((o) => ({ ...o, ...parcial }));

  // Portal para o body: fora do `data-tema-leitura`, a tela de criação fica
  // escura mesmo com a leitura em fundo claro ou papel.
  return createPortal(
    <div className="fixed inset-0 z-[70] flex flex-col bg-ink-950/97 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 pb-2 pt-[calc(0.75rem+env(safe-area-inset-top))]">
        <button
          onClick={aoFechar}
          aria-label="Fechar"
          className="grid h-10 w-10 place-items-center rounded-full text-ink-300 hover:bg-white/10 hover:text-white"
        >
          <X size={20} />
        </button>
        <p className="font-display text-[15px] font-bold">Criar imagem</p>
        <span className="w-10" />
      </div>

      {/* Prévia: o próprio canvas final, reduzido. */}
      <div className="flex min-h-0 flex-1 items-center justify-center px-6 py-2">
        {!pronto && <Loader2 className="absolute animate-spin text-gold-400" />}
        <canvas
          ref={canvasRef}
          className={`max-h-full max-w-full rounded-2xl shadow-2xl shadow-black/60 transition-opacity ${
            pronto ? "opacity-100" : "opacity-0"
          }`}
          style={{ aspectRatio: opcoes.formato === "stories" ? "9 / 16" : "1 / 1" }}
        />
      </div>

      <div className="space-y-3 border-t border-white/8 bg-ink-900/90 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3">
        {/* Modelos */}
        <div className="-mx-4 flex gap-2.5 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {modelos.map((m) => (
            <button
              key={m.id}
              onClick={() => mudar({ modelo: m, fonte: m.fonte })}
              aria-pressed={opcoes.modelo.id === m.id}
              className="flex shrink-0 flex-col items-center gap-1"
            >
              <span
                className={`grid h-12 w-12 place-items-center rounded-xl font-reading text-[15px] font-semibold ring-offset-2 ring-offset-ink-900 transition-shadow ${
                  opcoes.modelo.id === m.id ? "ring-2 ring-gold-400" : "ring-1 ring-white/15"
                }`}
                style={{ background: m.amostra, color: m.texto }}
              >
                Aa
              </span>
              <span
                className={`text-[10.5px] font-semibold ${
                  opcoes.modelo.id === m.id ? "text-gold-300" : "text-ink-400"
                }`}
              >
                {m.nome}
              </span>
            </button>
          ))}
        </div>

        {/* Fonte */}
        <div className="-mx-4 flex gap-1.5 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FONTES_DE_LEITURA.map((f) => (
            <button
              key={f.id}
              onClick={() => mudar({ fonte: f.id })}
              aria-pressed={opcoes.fonte === f.id}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] transition-colors ${
                opcoes.fonte === f.id
                  ? "bg-white text-ink-950"
                  : "bg-white/8 text-ink-200 hover:bg-white/14"
              }`}
              style={{ fontFamily: f.familia }}
            >
              {f.rotulo}
            </button>
          ))}
        </div>

        {/* Formato, alinhamento e tamanho */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-full bg-white/8 p-0.5">
            {(
              [
                ["stories", "Stories"],
                ["quadrado", "Quadrado"],
              ] as const
            ).map(([id, rotulo]) => (
              <button
                key={id}
                onClick={() => mudar({ formato: id })}
                aria-pressed={opcoes.formato === id}
                className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                  opcoes.formato === id ? "bg-white text-ink-950" : "text-ink-300"
                }`}
              >
                {rotulo}
              </button>
            ))}
          </div>
          <button
            onClick={() =>
              mudar({ alinhamento: opcoes.alinhamento === "centro" ? "esquerda" : "centro" })
            }
            aria-label={opcoes.alinhamento === "centro" ? "Alinhar à esquerda" : "Centralizar"}
            className="grid h-8 w-8 place-items-center rounded-full bg-white/8 text-ink-200 hover:bg-white/14"
          >
            {opcoes.alinhamento === "centro" ? <AlignCenter size={15} /> : <AlignLeft size={15} />}
          </button>
          <div className="ml-auto flex items-center gap-1">
            <button
              onClick={() => mudar({ escala: Math.max(0.6, +(opcoes.escala - 0.1).toFixed(1)) })}
              aria-label="Texto menor"
              className="grid h-8 w-8 place-items-center rounded-full bg-white/8 text-ink-200 hover:bg-white/14"
            >
              <Minus size={14} />
            </button>
            <button
              onClick={() => mudar({ escala: Math.min(1.4, +(opcoes.escala + 0.1).toFixed(1)) })}
              aria-label="Texto maior"
              className="grid h-8 w-8 place-items-center rounded-full bg-white/8 text-ink-200 hover:bg-white/14"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {falha && <p className="text-[12.5px] text-red-300">{falha}</p>}

        <div className="flex gap-2">
          <button
            onClick={salvar}
            disabled={!pronto}
            aria-label="Salvar imagem"
            className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/10 text-ink-100 hover:bg-white/16 disabled:opacity-40"
          >
            <Download size={18} />
          </button>
          <button
            onClick={compartilhar}
            disabled={!pronto || ocupado}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-gold-400 font-display text-[15px] font-bold text-ink-950 hover:bg-gold-300 disabled:opacity-50"
          >
            {ocupado ? <Loader2 size={17} className="animate-spin" /> : <Share2 size={17} />}
            Compartilhar imagem
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
