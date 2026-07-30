import express from "express";
import { initFile, readData, saveToFile } from "./helper.js";

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

await initFile();

app.listen(PORT, () => console.log(`The server is running on port: ${PORT}`));
