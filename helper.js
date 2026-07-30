import fs from "node:fs/promises";

const FILE = "notes.json";

export const saveToFile = async (data) => {
  await fs.writeFile(FILE, JSON.stringify(data, null, 2), { encoding: "utf8" });
};

export const readData = async () => {
  try {
    const data = await fs.readFile(FILE, "utf8");

    if (!data.trim()) return [];

    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") return [];

    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
};

export const initFile = async () => {
  try {
    await fs.access(FILE);
  } catch {
    saveToFile([]);
  }
};

const cleanMarkdown = (markdown) => {
  return markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]+)\]\(.*?\)/g, "$1")
    .replace(/[#*_`~>-]/g, "")
    .trim();
};

export const checkGrammar = async (markdown) => {
  const response = await fetch(
    "https://api.languagetool.org/v2/check",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        text: cleanMarkdown(markdown),
        language: "en-US",
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `LanguageTool failed: ${response.status}`
    );
  }

  return response.json();
};