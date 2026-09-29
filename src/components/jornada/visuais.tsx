"use client";

import { useState, type ReactNode } from "react";

/** Anel de progresso, de 0 a 100, com o que vier no meio. */
export function AnelDeProgresso({
  valor,
  tamanho = 72,
  espessura = 7,
  cor = "var(--color-gold-400)",
  children,
}: {
  valor: number;
  tamanho?: number;
  espessura?: number;
  cor?: string;
  children?: ReactNode;
}) {
  const raio = (tamanho - espessura) / 2;
  const volta = 2 * Math.PI * raio;
  const preenchido = (Math.min(100, Math.max(0, valor)) / 100) * volta;

  return (
    <div className="relative shrink-0" style={{ width: tamanho, height: tamanho }}>
      <svg width={tamanho} height={tamanho} className="-rotate-90">
        <circle
          cx={tamanho / 2}
          cy={tamanho / 2}
          r={raio}
          fill="none"
          stroke="rgb(255 255 255 / 0.08)"
          strokeWidth={espessura}
        />
        {/* Em 0% a ponta arredondada de um traço vazio vira um ponto solto. */}
        {preenchido > 0 && (
          <circle
            cx={tamanho / 2}
            cy={tamanho / 2}
            r={raio}
            fill="none"
            stroke={cor}
            strokeWidth={espessura}
            strokeLinecap="round"
            strokeDasharray={`${preenchido} ${volta}`}
            className="transition-[stroke-dasharray] duration-700"
          />
        )}
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}

const CORES_DE_AVATAR = ["#f5c45e", "#34d399", "#60a5fa", "#f472b6", "#a78bfa", "#fb923c"];

export function corDoNome(nome: string) {
  let h = 0;
  for (const letra of nome) h = (h * 31 + letra.charCodeAt(0)) >>> 0;
  return CORES_DE_AVATAR[h % CORES_DE_AVATAR.length];
}

/** Inicial do nome dentro de um anel com o progresso da pessoa no plano. */
/**
 * A foto do Google quando existe; senão, a inicial colorida de sempre. Como
 * é uma URL de fora (lh3.googleusercontent.com), o `<img>` pode falhar — o
 * `onError` troca para a inicial na hora, em vez de deixar um ícone quebrado.
 */
export function Avatar({
  nome,
  avatarUrl,
  valor,
  tamanho = 44,
}: {
  nome: string;
  avatarUrl?: string | null;
  valor?: number;
  tamanho?: number;
}) {
  const [fotoQuebrou, setFotoQuebrou] = useState(false);
  const cor = corDoNome(nome);
  const inicial = nome.trim().charAt(0).toUpperCase() || "?";
  const mostrarFoto = Boolean(avatarUrl) && !fotoQuebrou;

  const miolo = (tamanhoDoMiolo: number) =>
    mostrarFoto ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatarUrl!}
        alt=""
        width={tamanhoDoMiolo}
        height={tamanhoDoMiolo}
        referrerPolicy="no-referrer"
        onError={() => setFotoQuebrou(true)}
        className="rounded-full object-cover"
        style={{ width: tamanhoDoMiolo, height: tamanhoDoMiolo }}
      />
    ) : (
      <span
        className="grid place-items-center rounded-full font-display font-bold text-ink-950"
        style={{
          width: tamanhoDoMiolo,
          height: tamanhoDoMiolo,
          background: cor,
          fontSize: tamanhoDoMiolo * 0.42,
        }}
      >
        {inicial}
      </span>
    );

  if (valor === undefined) return <span className="shrink-0">{miolo(tamanho)}</span>;

  return (
    <AnelDeProgresso valor={valor} tamanho={tamanho} espessura={3.5} cor={cor}>
      {miolo(tamanho - 11)}
    </AnelDeProgresso>
  );
}

export function tempoRelativo(iso: string) {
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "agora";
  if (s < 3600) return `há ${Math.floor(s / 60)} min`;
  if (s < 86400) return `há ${Math.floor(s / 3600)} h`;
  const d = Math.floor(s / 86400);
  return d === 1 ? "ontem" : `há ${d} dias`;
}

export const primeiroNome = (nome: string) => nome.trim().split(/\s+/)[0] || nome;
