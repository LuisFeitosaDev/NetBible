"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Shelf({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      setEdges({
        start: el.scrollLeft < 8,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8,
      });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  const nudge = (dir: -1 | 1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="group/shelf relative py-4">
      <div className="mb-3 flex items-end justify-between gap-4 px-4 md:px-8">
        <div>
          <h2 className="font-display text-lg font-bold tracking-tight md:text-xl">{title}</h2>
          {subtitle && <p className="text-[13px] text-ink-400">{subtitle}</p>}
        </div>
      </div>

      <div className="relative">
        {!edges.start && (
          <button
            onClick={() => nudge(-1)}
            aria-label="Voltar"
            className="absolute left-1 top-1/2 z-20 hidden -translate-y-1/2 place-items-center rounded-full bg-ink-950/80 p-2 text-white opacity-0 ring-1 ring-white/15 backdrop-blur transition-opacity hover:bg-ink-950 group-hover/shelf:opacity-100 md:grid"
          >
            <ChevronLeft size={22} />
          </button>
        )}
        {!edges.end && (
          <button
            onClick={() => nudge(1)}
            aria-label="Avançar"
            className="absolute right-1 top-1/2 z-20 hidden -translate-y-1/2 place-items-center rounded-full bg-ink-950/80 p-2 text-white opacity-0 ring-1 ring-white/15 backdrop-blur transition-opacity hover:bg-ink-950 group-hover/shelf:opacity-100 md:grid"
          >
            <ChevronRight size={22} />
          </button>
        )}

        <div
          ref={track}
          className="shelf flex gap-3 overflow-x-auto px-4 pb-2 md:gap-4 md:px-8"
        >
          {children}
        </div>
      </div>
    </section>
  );
}
