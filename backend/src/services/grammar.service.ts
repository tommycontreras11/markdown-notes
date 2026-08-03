import { cleanMarkdown } from "../helper/string.js";

export const grammarService = {
  async checkGrammar(markdown: string) {
    const response = await fetch("https://api.languagetool.org/v2/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        text: cleanMarkdown(markdown),
        language: "en-US",
      }),
    });

    if (!response.ok) {
      throw new Error(`LanguageTool failed: ${response.status}`);
    }

    return response.json();
  },
};
