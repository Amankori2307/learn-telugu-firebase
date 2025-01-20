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
  textLowercase: string;
}
export interface ISentence extends ISentenceBase {
  id: string;
}
