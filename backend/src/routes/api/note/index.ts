import { Request, Response } from "express";
import { Router } from "express";
import { noteService } from "../../../services/note/index.service.js";

const router = Router()

router.get("/", async (_req: Request, res: Response) => {
  const notes = await noteService.getAll();

  return res.status(200).json({ data: notes });
});

router.get("/render/:id", async (req: Request, res: Response) => {
  const { id } = req.params

  const note = await noteService.getById(+id)

  if(!note) return res.status(400).json({ error: { message: "Note not found" } })

  return res.status(200).json({ data: note });
});


router.post("/", async (req: Request, res: Response) => {
  const { content } = req.body;

  if (!content)
    return res
      .status(400)
      .json({ error: { message: "The content cannot be empty" } });

    await noteService.create(content)

  return res.status(200).json({ message: "Note saved successfully" });
});

router.post("/check-grammar", async (req: Request, res: Response) => {
  const { content } = req.body;

  if (!content)
    return res
      .status(400)
      .json({ error: { message: "The content cannot be empty" } });

  try {
    const result = await noteService.checkGrammar(content);

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(503).json({
      error: {
        message: "Grammar service unavailable",
      },
    });
  }
});

export default router