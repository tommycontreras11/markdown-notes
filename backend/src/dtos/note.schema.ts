import z from "zod";

export const createNoteSchema = z.object({
    content: z.string({ error: "Content is required" }).trim().min(1, { error: "The min length is 1" })
})

export const checkNoteGrammarSchema = z.object({
    content: z.string({ error: "Content is required" }).trim().min(1, { error: "The min length is 1" })
})
