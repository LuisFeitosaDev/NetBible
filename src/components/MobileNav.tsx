"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Library, Settings2, Users } from "lucide-react";

const ITEMS = [
  { href: "/", label: "Início", icon: Home },
  { href: "/grupos", label: "Grupos", icon: Users },
  { href: "/busca", label: "Buscar", icon: Search },
  { href: "/biblioteca", label: "Biblioteca", icon: Library },
  { href: "/ajustes", label: "Ajustes", icon: Settings2 },
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
              className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors ${
                active ? "text-gold-400" : "text-ink-400"
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.4 : 1.8} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
