"use client";

import type { ReactNode } from "react";

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
export function Avatar({
  nome,
  valor,
  tamanho = 44,
}: {
  nome: string;
  valor?: number;
  tamanho?: number;
}) {
  const cor = corDoNome(nome);
  const inicial = nome.trim().charAt(0).toUpperCase() || "?";
  if (valor === undefined) {
    return (
      <span
        className="grid shrink-0 place-items-center rounded-full font-display font-bold text-ink-950"
        style={{ width: tamanho, height: tamanho, background: cor, fontSize: tamanho * 0.42 }}
      >
        {inicial}
      </span>
    );
  }
  return (
    <AnelDeProgresso valor={valor} tamanho={tamanho} espessura={3.5} cor={cor}>
      <span
        className="grid place-items-center rounded-full font-display font-bold text-ink-950"
        style={{
          width: tamanho - 11,
          height: tamanho - 11,
          background: cor,
          fontSize: tamanho * 0.36,
        }}
      >
        {inicial}
      </span>
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
