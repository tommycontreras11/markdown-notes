"use client";

import { useParams } from "next/navigation";
import { useRenderedNote } from "@/hooks/api/note.hook";

export default function NotePage() {
  const { id } = useParams<{ id: string }>();

  const { data: note, isPending, isError } = useRenderedNote(Number(id));

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Failed to load note.</div>;
  }

  if (!note) {
    return <div>Note not found</div>;
  }

  return (
    <main className="mx-auto max-w-5xl p-8">
      <article
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{
          __html: note.html,
        }}
      />
    </main>
  );
}
