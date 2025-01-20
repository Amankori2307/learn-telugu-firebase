import React from "react";
import { VocabularyEntry } from "../../../interfaces/vocab.interfaces";
import Loader from "../../shared/loader";
import SentenceList from "../../sub-components/vocab/sentence-list";

interface ChapterContentProps {
  sentences: VocabularyEntry[];
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

  return <SentenceList sentences={sentences} chapterId={chapterId} onRemoveSentence={onRemoveSentence} />;
};

export default ChapterContent;