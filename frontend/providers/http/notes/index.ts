import { apiClient } from "../../client";
import {
  checkNoteGrammarErrorSchema,
  createNoteResponseSchema,
  noteResponseSchema,
  notesResponseSchema,
} from "@/schemas/note.schema";
import { ICheckNoteGrammar, INote } from "./interface";

export const getNotes = async (): Promise<INote[]> => {
  const notes = await apiClient("api/notes");

  return notesResponseSchema.parse(notes).data;
};

export const getNote = async (id: number): Promise<INote> => {
  const note = await apiClient(`api/notes/render/${id}`);

  return noteResponseSchema.parse(note).data;
};

export const createNote = async (content: string): Promise<string> => {
  const note = await apiClient(`api/notes`, {
    method: "POST",
    body: JSON.stringify(content),
  });

  return createNoteResponseSchema.parse(note).message;
};

export const checkNoteGrammar = async (
  content: string,
): Promise<ICheckNoteGrammar> => {
  const note = await apiClient(`api/check-grammar`, {
    method: "POST",
    body: JSON.stringify(content),
  });

  return checkNoteGrammarErrorSchema.parse(note).data;
};
