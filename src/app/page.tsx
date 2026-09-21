"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { Hero } from "@/components/Hero";
import { Shelf } from "@/components/Shelf";
import { BookCard, ResumeCard } from "@/components/BookCard";
import { useBible } from "@/lib/store";
import { db } from "@/lib/db";
import { COLLECTIONS } from "@/lib/catalog";

export default function HomePage() {
  const { index, bySlug } = useBible();

  const resume = useLiveQuery(
    () => db.reading.orderBy("updatedAt").reverse().limit(12).toArray(),
    [],
  );
  const favorites = useLiveQuery(
    () => db.favorites.orderBy("createdAt").reverse().toArray(),
    [],
  );

  if (!index) {
    return (
      <div className="space-y-8">
        <div className="h-[62vh] min-h-[440px] animate-pulse bg-ink-900" />
        <div className="flex gap-4 px-4 md:px-8">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="aspect-[2/3] w-[144px] shrink-0 animate-pulse rounded-xl bg-ink-900 sm:w-[170px]" />
          ))}
        </div>
      </div>
    );
  }

  const resumeBooks = (resume ?? [])
    .map((r) => bySlug.get(r.slug))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  const favoriteBooks = (favorites ?? [])
    .map((f) => bySlug.get(f.slug))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  return (
    <div className="-mt-16">
      <Hero />

      <div className="relative z-10 -mt-10 space-y-2 md:-mt-16">
        {resumeBooks.length > 0 && (
          <Shelf title="Continue lendo" subtitle="De onde você parou">
            {resumeBooks.map((book) => (
              <ResumeCard key={book.slug} book={book} />
            ))}
          </Shelf>
        )}

        {favoriteBooks.length > 0 && (
          <Shelf title="Minha lista">
            {favoriteBooks.map((book) => (
              <BookCard key={book.slug} book={book} />
            ))}
          </Shelf>
        )}

        {COLLECTIONS.map((collection) => (
          <Shelf
            key={collection.title}
            title={collection.title}
            subtitle={collection.subtitle}
          >
            {collection.books
              .map((slug) => bySlug.get(slug))
              .filter((b): b is NonNullable<typeof b> => Boolean(b))
              .map((book) => (
                <BookCard key={book.slug} book={book} />
              ))}
          </Shelf>
        ))}

        {index.groups.map((group) => {
          const books = index.books.filter((b) => b.group === group.id);
          if (!books.length) return null;
          return (
            <Shelf
              key={group.id}
              title={group.label}
              subtitle={group.testament === "VT" ? "Antigo Testamento" : "Novo Testamento"}
            >
              {books.map((book) => (
                <BookCard key={book.slug} book={book} />
              ))}
            </Shelf>
          );
        })}

        <footer className="px-4 py-12 text-xs leading-relaxed text-ink-400 md:px-8">
          <p>
            {index.versions.map((v) => `${v.short} — ${v.name} (${v.note})`).join(" · ")}
          </p>
          <p className="mt-2">
            Suas marcações e notas ficam só neste dispositivo. Faça backup em Ajustes.
          </p>
        </footer>
      </div>
    </div>
  );
}
