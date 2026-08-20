export interface INote {
  id: number;
  content: string;
}

export interface IRenderNote {
  id: number;
  html: string;
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
