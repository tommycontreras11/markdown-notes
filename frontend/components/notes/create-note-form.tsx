"use client";

import { ApiError } from "@/exceptions/api-error";
import { useCreateNote } from "@/mutations/api/notes";
import { useState } from "react";

export function CreateNoteForm() {
  const [content, setContent] = useState("");

  const { mutate, isPending, isSuccess, isError, error } = useCreateNote();

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    mutate(content);

    setContent("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Write your Markdown..."
        className="min-h-96 w-full rounded-lg border p-4 font-mono"
      />

      <button type="submit" disabled={isPending} className="hover:underline">
        {isPending ? "Saving..." : "Save note"}
      </button>

      {isSuccess && <p>Note saved successfully.</p>}

      {isError && error instanceof ApiError && (
        <div>{error.data?.errors?.fields?.content?.map((message: string) => (
          <p key={message} className="text-red-500">{message}</p>
        ))}</div>
      )}
    </form>
  );
}
