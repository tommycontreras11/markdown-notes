import express from "express";
import { initFile, readData, saveToFile, checkGrammar } from "./helper.js";

const PORT = 3000;

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ healthy: true });
});

app.post("/notes", async (req, res) => {
  const { content } = req.body;

  if (!content)
    return res
      .status(400)
      .json({ error: { message: "The content cannot be empty" } });

  const fileData = await readData();

  const payload = {
    id: fileData.length + 1,
    content,
  };

  fileData.push(payload);

  await saveToFile(fileData);

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
