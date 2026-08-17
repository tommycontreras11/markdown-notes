"use client";

import { useNotes } from "@/hooks/api/note.hook";

export default function Home() {
  const { data, isPending, isError } = useNotes();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Failed to load notes.</div>;
  }

  return (
    <main>
      {data?.map((note) => (
        <div key={note.id}>
          {note.content}
        </div>
      ))}
    </main>
  );
}