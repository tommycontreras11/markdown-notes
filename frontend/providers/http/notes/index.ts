import { apiClient } from "../../client";
import {
  CheckGrammarResponse,
  checkGrammarResponseSchema,
  createNoteResponseSchema,
  noteRenderResponseSchema,
  notesResponseSchema,
} from "@/schemas/note.schema";
import { INote, IRenderNote } from "./interface";

export const getNotes = async (): Promise<INote[]> => {
  const notes = await apiClient("api/notes");

  return notesResponseSchema.parse(notes).data;
};

export const getRenderedNote = async (id: number): Promise<IRenderNote> => {
  const note = await apiClient(`api/notes/render/${id}`);

  return noteRenderResponseSchema.parse(note).data;
};

export const createNote = async (content: string): Promise<string> => {
  const note = await apiClient(`api/notes`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });

  return createNoteResponseSchema.parse(note).message;
};

export const checkNoteGrammar = async (
  content: string,
): Promise<CheckGrammarResponse> => {
  const response = await apiClient("api/notes/check-grammar", {
    method: "POST",
    body: JSON.stringify({ content }),
  });

  return checkGrammarResponseSchema.parse(response);
};