export enum DataTypeEnum {
  Sentence = 'sentence',
  Word = 'word',
}

export interface IData {
  type: DataTypeEnum;
  text: string;
  meaning: string;
  meta?: string;
  examples?: Array<string>;
  pronunciation?: string;
}
