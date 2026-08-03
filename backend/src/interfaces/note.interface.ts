export interface INote {
  id: number;
  content: string
}

export interface IGrammarError {
  message: string;
  shortMessage: string;
  offset: number;
  length: number;
  replacements: IReplacementGrammarError[]
}

interface IReplacementGrammarError {
  value: string;
}
