import React from "react";
import { IVocabularyEntry } from "../../../interfaces/vocab.interfaces";
import Loader from "../../shared/loader";
import VocabList from "../vocab/vocab-list";

interface ChapterContentProps {
  sentences: IVocabularyEntry[];
  isLoading: boolean;
  chapterId: string;
  onRemoveSentence: (id: string) => void;
}

const ChapterContent: React.FC<ChapterContentProps> = ({ sentences, isLoading, chapterId, onRemoveSentence }) => {
  if (isLoading) {
    return <Loader />;
  }

  if (sentences.length === 0) {
    return <p className="text-gray-500">No sentences found in this chapter.</p>;
  }

  return <VocabList vocabularyEntryList={sentences} chapterId={chapterId} onRemoveVocabularyEntry={onRemoveSentence} />;
};

export default ChapterContent;