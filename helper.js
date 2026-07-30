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