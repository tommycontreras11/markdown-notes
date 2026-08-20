import { getRenderedNote, getNotes } from "@/providers/http/notes";
import { useQuery } from "@tanstack/react-query";

export function useNotes() {
  return useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
    retry: 1,
  });
}

export function useRenderedNote(id: number) {
  return useQuery({
    queryKey: [`note:${id}`],
    retry: 1,
    queryFn: () => getRenderedNote(id),
    enabled: !!id,
  });
}
