import { IGrammarError, INote } from "./../../interfaces/note.interface.js";
import { readData, saveToFile } from "./../../helper/file.js";
import { grammarService } from "../../services/grammar/index.service.js";

export const noteService = {
  async getAll() {
    return await readData();
  },
  async getById(id: number) {
    const notes = await this.getAll();

    return notes.find((note: INote) => note.id == id);
  },
  async create(content: string) {
    const notes = await this.getAll();

    const lastNote = notes[notes.length - 1];

    const payload = {
      id: lastNote ? lastNote.id + 1 : 1,
      content,
    };

    notes.push(payload);

    await saveToFile(notes);
  },
  async checkGrammar(content: string): Promise<
    | {
        valid: boolean;
        errors?: undefined;
      }
    | {
        valid: boolean;
        errors: any;
      }
  > {
    const result = await grammarService.checkGrammar(content);

    if (result.matches && result.matches.length === 0) return { valid: true };

    const data = result.matches.map((match: IGrammarError) => ({
      message: match.message,
      shortMessage: match.shortMessage,
      offset: match.offset,
      length: match.length,
      replacements: match.replacements.map((replacement) => replacement.value),
    }));

    return { valid: false, errors: data };
  },
};
