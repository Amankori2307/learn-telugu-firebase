export enum DataTypeEnum {
  Sentence = 'sentence',
  Word = 'word',
}

export interface IData {
  id?: string;
  type: DataTypeEnum;
  text: string;
  meaning: string;
  meta?: string;
  examples?: Array<string>;
  pronunciation?: string;
}

type FormData = {
  type: string;
  text: string;
  meaning: string;
  pronunciation: string;
  examples?: string[]; // Make this optional
};