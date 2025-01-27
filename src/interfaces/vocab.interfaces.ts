export enum VocabularyTypeEnum {
  Sentence = "sentence",
  Word = "word",
}

export interface IBaseVocabularyEntry {
  pronunciation: string;
  meaning: string;
  text: string;
  type: string;
  examples: string[];
  isReviewed?: boolean;
  meta?: string;
}
export interface IVocabularyEntry extends IBaseVocabularyEntry {
  textLowercase: string;
  id: string;
}
