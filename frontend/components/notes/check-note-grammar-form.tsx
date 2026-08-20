"use client";

import { useState } from "react";
import { useCheckNoteGrammar } from "@/mutations/api/notes";
import { ApiError } from "@/exceptions/api-error";

export function CheckNoteGrammarForm() {
  const [content, setContent] = useState("");

  const { mutate, data, isPending, isError, error } =
    useCheckNoteGrammar();

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutate(content);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Write your Markdown here..."
        className="min-h-96 w-full rounded-lg border p-4 font-mono"
      />

      <button
        type="submit"
        disabled={isPending}
        className="hover:underline disabled:opacity-50"
      >
        {isPending ? "Checking..." : "Check grammar"}
      </button>

      {data?.data.valid === false && (
        <div>
          <h2 className="text-red-500">Grammar issues found</h2>

          {data.data.errors &&
            data.data.errors.map((error, index) => (
              <div key={index}>
                <p>{error.message}</p>

                {error.replacements.length > 0 && (
                  <p>Suggestions: {error.replacements.join(", ")}</p>
                )}
              </div>
            ))}
        </div>
      )}

      {data?.data.valid && (
        <p className="text-green-600">No grammar issues found!</p>
      )}

      {isError && error instanceof ApiError && (
        <div>
          {error.data?.errors?.fields?.content?.map((message: string) => (
            <p key={message} className="text-red-500">
              {message}
            </p>
          ))}
        </div>
      )}
    </form>
  );
}
