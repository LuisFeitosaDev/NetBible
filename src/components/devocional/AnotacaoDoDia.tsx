"use client";

import { useEffect, useRef, useState } from "react";
import { salvarAnotacao } from "@/lib/devocionalProgresso";

/**
 * O que a pessoa escreve no "Meditar". Salva sozinho, um instante depois de
 * parar de digitar, no progresso da série, que sobe para a conta junto com
 * os dias feitos.
 */
export function AnotacaoDoDia({
  id,
  dia,
  inicial,
  className = "",
}: {
  id: string;
  dia: number;
  /** O que já está salvo; muda sozinho se vier de outro aparelho. */
  inicial?: string;
  className?: string;
}) {
  const [texto, setTexto] = useState(inicial ?? "");
  const [salvo, setSalvo] = useState(true);
  const focado = useRef(false);
  const pendente = useRef<string | null>(null);

  // Chegou anotação de outro aparelho: só troca se a pessoa não estiver escrevendo.
  useEffect(() => {
    if (!focado.current && pendente.current === null) setTexto(inicial ?? "");
  }, [inicial]);

  useEffect(() => {
    if (pendente.current === null) return;
    const t = setTimeout(() => {
      const valor = pendente.current;
      pendente.current = null;
      if (valor !== null) void salvarAnotacao(id, dia, valor).then(() => setSalvo(true));
    }, 700);
    return () => clearTimeout(t);
  }, [texto, id, dia]);

  // Fechou a tela no meio da frase: não perde o que faltava salvar.
  useEffect(
    () => () => {
      if (pendente.current !== null) void salvarAnotacao(id, dia, pendente.current);
    },
    [id, dia],
  );

  return (
    <div className={className}>
      <textarea
        value={texto}
        onChange={(e) => {
          pendente.current = e.target.value;
          setSalvo(false);
          setTexto(e.target.value);
        }}
        onFocus={() => (focado.current = true)}
        onBlur={() => (focado.current = false)}
        rows={4}
        placeholder="Escreva o que vier. Uma frase basta."
        className="w-full resize-y rounded-xl border border-[color:var(--rl-borda-2)] bg-[color:var(--rl-sutil-1)] px-4 py-3 font-reading text-[calc(16px*var(--fs,1))] leading-relaxed text-[color:var(--rl-texto)] outline-none placeholder:text-[color:var(--rl-texto-mudo)] focus:border-[color:var(--rl-borda-4)]"
      />
      <p className="mt-1.5 text-[11.5px] text-[color:var(--rl-texto-mudo)]">
        {salvo ? "Guardado no seu devocional." : "Salvando…"}
      </p>
    </div>
  );
}
