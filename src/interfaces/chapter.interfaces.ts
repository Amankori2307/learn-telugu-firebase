export interface IChapter {
  id: string; // Unique ID for the chapter
  name: string; // Name of the chapter
  vocabularyIds: string[]; // List of sentence/word IDs in this chapter
  nameLowercase: string;
}
