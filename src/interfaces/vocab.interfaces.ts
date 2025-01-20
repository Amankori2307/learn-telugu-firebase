export enum VocabularyType {
  Sentence = "sentence",
  Word = "word",
}

export interface BaseVocabularyEntry {
  pronunciation: string;
  meaning: string;
  text: string;
  type: string;
  examples: string[];
  isReviewed?: boolean;
  meta?: string;
}
export interface VocabularyEntry extends BaseVocabularyEntry {
  textLowercase: string;
  id: string;
}
