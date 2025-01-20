export enum DataTypeEnum {
  Sentence = "sentence",
  Word = "word",
}

export interface ISentenceBase {
  pronunciation: string;
  meaning: string;
  text: string;
  type: string;
  examples: string[];
  isReviewed?: boolean;
  meta?: string;
}
export interface ISentence extends ISentenceBase {
  textLowercase: string;
  id: string;
}
