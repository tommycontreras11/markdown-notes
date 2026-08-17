import { Request, Response } from "express";
import { Router } from "express";
import { noteService } from "../../../services/note/index.service.js";
import { validateDto } from "../../../middlewares/validate-dto.middleware.js";
import {
  checkNoteGrammarSchema,
  createNoteSchema,
} from "../../../dtos/note.schema.js";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const notes = await noteService.getAll();

  return res.status(200).json({ data: notes });
});

router.get("/render/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const note = await noteService.getById(+id);

  if (!note)
    return res.status(400).json({ error: { message: "Note not found" } });

  return res.status(200).json({ data: note });
});

router.post(
  "/",
  validateDto(createNoteSchema),
  async (req: Request, res: Response) => {
    const { content } = req.body;

    await noteService.create(content);

    return res.status(201).json({ message: "Note saved successfully" });
  },
);

router.post(
  "/check-grammar",
  validateDto(checkNoteGrammarSchema),
  async (req: Request, res: Response) => {
    const { content } = req.body;

    try {
      const result = await noteService.checkGrammar(content);

      return res.status(200).json({ data: result });
    } catch (error) {
      return res.status(503).json({
        error: {
          message: "Grammar service unavailable",
        },
      });
    }
  },
);

export default router;
