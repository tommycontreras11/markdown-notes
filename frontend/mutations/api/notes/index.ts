import { checkNoteGrammar, createNote } from "@/providers/http/notes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNote,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });
}

export function useCheckGrammar() {
  return useMutation({
    mutationFn: checkNoteGrammar,
  });
}
