import Link from "next/link";

/** Contato do responsável pelo app, usado nas páginas de privacidade e termos. */
export const CONTATO = "luis.santos.10112002@gmail.com";
export const ATUALIZADO_EM = "28 de setembro de 2026";

/** Moldura das páginas legais: título, data e o texto em seções. */
export function PaginaLegal({
  titulo,
  resumo,
  children,
}: {
  titulo: string;
  resumo: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-2xl px-4 pb-24 pt-8 md:px-6">
      <h1 className="font-display text-3xl font-black tracking-tight md:text-4xl">{titulo}</h1>
      <p className="mt-2 text-[13px] text-ink-400">Atualizado em {ATUALIZADO_EM}</p>
      <p className="mt-5 text-[15px] leading-relaxed text-ink-100">{resumo}</p>
      <div className="mt-2">{children}</div>
      <p className="mt-10 border-t border-white/6 pt-5 text-[13px] text-ink-400">
        Veja também:{" "}
        <Link href="/privacidade" className="text-gold-400 hover:underline">
          Política de Privacidade
        </Link>{" "}
        ·{" "}
        <Link href="/termos" className="text-gold-400 hover:underline">
          Termos de Uso
        </Link>
      </p>
    </article>
  );
}

export function Secao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="font-display text-lg font-bold">{titulo}</h2>
      <div className="mt-2 space-y-3 text-[14.5px] leading-relaxed text-ink-300 [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_strong]:text-ink-100 [&_ul]:space-y-1.5">
        {children}
      </div>
    </section>
  );
}

export function Email() {
  return (
    <a href={`mailto:${CONTATO}`} className="text-gold-400 hover:underline">
      {CONTATO}
    </a>
  );
}
