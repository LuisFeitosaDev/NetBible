"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, Library, Home, Settings2 } from "lucide-react";
import { VersionSwitch } from "./VersionSwitch";

const LINKS = [
  { href: "/", label: "Início", icon: Home },
  { href: "/busca", label: "Buscar", icon: Search },
  { href: "/biblioteca", label: "Minha biblioteca", icon: Library },
  { href: "/ajustes", label: "Ajustes", icon: Settings2 },
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
        <Link href="/" className="group flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-gold-300 to-gold-600 text-sm font-black text-ink-950">
            L
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight">
            Lumen
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
