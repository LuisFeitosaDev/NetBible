"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Library, CircleUser, Users } from "lucide-react";

/** A ordem é a do uso: abrir o app, ler, voltar ao que é seu, estudar junto, conta. */
const ITEMS = [
  { href: "/", label: "Início", icon: Home },
  { href: "/busca", label: "Bíblia", icon: BookOpen },
  { href: "/biblioteca", label: "Biblioteca", icon: Library },
  { href: "/grupos", label: "Grupos", icon: Users },
  { href: "/ajustes", label: "Conta", icon: CircleUser },
];

export function MobileNav() {
  const pathname = usePathname();
  if (/^\/livro\/[^/]+\/\d+/.test(pathname)) return null;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/5 bg-ink-950/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
      <div className="flex">
        {ITEMS.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex min-w-0 flex-1 flex-col items-center gap-1 py-2.5 transition-colors ${
                active ? "text-gold-400" : "text-ink-400"
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.4 : 1.8} />
              {/* Cinco itens numa tela de 320px: sem `whitespace-nowrap`,
                  "Biblioteca" quebra em duas linhas e desalinha a barra. */}
              <span className="whitespace-nowrap text-[9.5px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
