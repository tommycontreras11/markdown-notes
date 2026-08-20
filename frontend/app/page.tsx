"use client";

import Link from "next/link";
import { useNotes } from "@/hooks/api/note.hook";

export default function Home() {
  const { data: notes, isPending, isError } = useNotes();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Failed to load notes.</div>;
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        My Notes
      </h1>

      <div className="space-y-4">
        {notes?.map((note) => (
          <article
            key={note.id}
            className="rounded-lg border p-4"
          >
            <h2 className="text-xl font-semibold">
              Note #{note.id}
            </h2>

            <p className="mt-2 line-clamp-3 whitespace-pre-line text-gray-600">
              {note.content}
            </p>

            <Link
              href={`/notes/${note.id}`}
              className="mt-4 inline-block text-blue-600 hover:underline"
            >
              View note →
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}