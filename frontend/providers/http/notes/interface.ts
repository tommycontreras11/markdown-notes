export interface INote {
  id: number;
  content: string;
}

interface ICheckNoteGrammarResponse {
  message: string;
  shortMessage: string;
  offset: number;
  length: number;
  replacements?: string[];
}

export interface ICheckNoteGrammar {
  valid: boolean;
  errors?: ICheckNoteGrammarResponse[];
}
