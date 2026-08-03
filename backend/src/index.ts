import express, { Request, Response } from "express";
import { IGrammarError, INote } from "./interfaces/note.interface.js";
import { initFile, readData, saveToFile } from "./helper/file.js";
import { grammarService } from "./services/grammar.service.js";

const PORT = 3000;

const app = express();

app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  return res.status(200).json({ healthy: true });
});

app.get("/notes", async (_req: Request, res: Response) => {
  const notes = await readData();

  return res.status(200).json({ data: notes });
});

app.get("/notes/render/:id", async (req: Request, res: Response) => {
  const { id } = req.params

  const notes = await readData();

  const note = notes.find((note: INote) => note.id == +id)

  if(!note) return res.status(400).json({ error: { message: "Note not found" } })

  return res.status(200).json({ data: note });
});


app.post("/notes", async (req: Request, res: Response) => {
  const { content } = req.body;

  if (!content)
    return res
      .status(400)
      .json({ error: { message: "The content cannot be empty" } });

  const notes = await readData();

  const payload = {
    id: notes.length + 1,
    content,
  };

  notes.push(payload);

  await saveToFile(notes);

  return res.status(200).json({ message: "Note saved successfully" });
});

app.post("/notes/check-grammar", async (req: Request, res: Response) => {
  const { content } = req.body;

  if (!content)
    return res
      .status(400)
      .json({ error: { message: "The content cannot be empty" } });

  try {
    const result = await grammarService.checkGrammar(content);

    if (result.matches && result.matches.length === 0)
      return res.status(200).json({ valid: true });

    const data = result.matches.map((match: IGrammarError) => ({
      message: match.message,
      shortMessage: match.shortMessage,
      offset: match.offset,
      length: match.length,
      replacements: match.replacements.map((replacement) => replacement.value),
    }));

    return res.status(200).json({ valid: false, errors: data });
  } catch (error) {
    return res.status(503).json({
      error: {
        message: "Grammar service unavailable",
      },
    });
  }
});

await initFile();

app.listen(PORT, () => console.log(`The server is running on port: ${PORT}`));
