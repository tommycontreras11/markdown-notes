import { z } from "zod";

export const noteSchema = z.object({
  id: z.number(),
  content: z.string(),
});

export const noteRenderSchema = z.object({
  id: z.number(),
  html: z.string(),
});

export const notesResponseSchema = z.object({
  data: z.array(noteSchema),
});

export const noteRenderResponseSchema = z.object({
  data: noteRenderSchema
});

export const createNoteSchema = z.object({
  content: z.string().min(1, "Content cannot be empty"),
});

export const createNoteResponseSchema = z.object({
  message: z.string(),
});

export const checkNoteGrammarSchema = z.object({
  content: z.string().min(1, "Content cannot be empty"),
});

export const checkNoteGrammarErrorResponseSchema = z.object({
  message: z.string(),
  shortMessage: z.string(),
  offset: z.number(),
  length: z.number(),
  replacements: z.array(z.string()).optional()
})

export const checkNoteGrammarErrorSchema = z.object({
  data: z.object({
    valid: z.boolean(),
    errors: z.array(checkNoteGrammarErrorResponseSchema).optional()
  })
})

// Types inferred from Zod
export type Note = z.infer<typeof noteSchema>;
export type CreateNote = z.infer<typeof createNoteSchema>;
export type CheckNoteGrammar = z.infer<typeof createNoteSchema>;
export type CheckNoteGrammarError = z.infer<typeof checkNoteGrammarErrorSchema>