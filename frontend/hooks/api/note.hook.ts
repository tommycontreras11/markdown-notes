import { getNote, getNotes } from "@/providers/http/notes";
import { useQuery } from "@tanstack/react-query";

export function useNotes() {
 return useQuery({
    queryKey: ["notes"],
    retry: 1,
    queryFn: getNotes
 })   
}

export function useNote(id: number) {
   return useQuery({
      queryKey: [`note:${id}`],
      retry: 1,
      queryFn: () => getNote(id),
      enabled: !!id
   })
}