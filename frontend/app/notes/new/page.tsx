import { CreateNoteForm } from "@/components/notes/create-note-form";

export default function NewNotePage() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Create Note
      </h1>

      <CreateNoteForm />
    </main>
  );
}