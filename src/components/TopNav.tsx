"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { VersionSwitch } from "./VersionSwitch";

/** Mesma ordem da barra do celular, para o app não trocar de mapa por tamanho de tela. */
const LINKS = [
  { href: "/", label: "Início" },
  { href: "/busca", label: "Bíblia" },
  { href: "/biblioteca", label: "Biblioteca" },
  { href: "/grupos", label: "Grupos" },
  { href: "/ajustes", label: "Conta" },
];

export function TopNav() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // O leitor tem a própria barra: some daqui para o texto respirar.
  if (/^\/livro\/[^/]+\/\d+/.test(pathname)) return null;

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        solid
          ? "border-b border-white/5 bg-ink-950/85 backdrop-blur-xl"
          : "bg-gradient-to-b from-ink-950 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1500px] items-center gap-6 px-4 md:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icon.png"
            alt=""
            aria-hidden
            className="h-8 w-8 rounded-lg"
          />
          <span className="leading-none">
            <span className="block font-display text-lg font-extrabold tracking-tight">
              Genipse
            </span>
            <span className="block text-[9px] font-bold uppercase tracking-[0.28em] text-gold-400">
              Bible
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  active
                    ? "bg-white/10 font-semibold text-white"
                    : "text-ink-300 hover:text-white"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/busca"
            className="grid h-9 w-9 place-items-center rounded-full text-ink-300 transition-colors hover:bg-white/10 hover:text-white md:hidden"
            aria-label="Buscar"
          >
            <Search size={18} />
          </Link>
          <VersionSwitch />
        </div>
      </div>
    </header>
  );
}
