import { CheckNoteGrammarForm } from "@/components/notes/check-note-grammar-form";

export default function CheckNoteGrammarPage() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Check Note Grammar
      </h1>

      <CheckNoteGrammarForm />
    </main>
  );
}