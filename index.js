import express from "express";
import { initFile, readData, saveToFile, checkGrammar } from "./helper.js";

const PORT = 3000;

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ healthy: true });
});

app.get("/notes", async (req, res) => {
  const notes = await readData();

  return res.status(200).json({ data: notes });
});

app.get("/notes/render/:id", async (req, res) => {
  const { id } = req.params

  const notes = await readData();

  const note = notes.find((note) => note.id == +id)

  if(!note) return res.status(400).json({ error: { message: "Note not found" } })

  return res.status(200).json({ data: note });
});


app.post("/notes", async (req, res) => {
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

app.post("/notes/check-grammar", async (req, res) => {
  const { content } = req.body;

  if (!content)
    return res
      .status(400)
      .json({ error: { message: "The content cannot be empty" } });

  try {
    const result = await checkGrammar(content);

    if (result.matches && result.matches.length === 0)
      return res.status(200).json({ valid: true });

    const data = result.matches.map((match) => ({
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
