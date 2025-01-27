import React from "react";
import { IVocabularyEntry } from "../../../interfaces/vocab.interfaces";
import Loader from "../../shared/loader";
import VocabList from "../vocab/vocab-list";

interface ChapterContentProps {
  vocabularyEntryList: IVocabularyEntry[];
  isLoading: boolean;
  chapterId: string;
  onRemoveVocabulary: (id: string) => void;
}

const ChapterContent: React.FC<ChapterContentProps> = ({
  vocabularyEntryList,
  isLoading,
  chapterId,
  onRemoveVocabulary,
}) => {
  if (isLoading) {
    return <Loader />;
  }

  if (vocabularyEntryList.length === 0) {
    return (
      <p className="text-gray-500">No vocabulary found in this chapter.</p>
    );
  }

  return (
    <VocabList
      vocabularyEntryList={vocabularyEntryList}
      chapterId={chapterId}
      onRemoveVocabularyEntry={onRemoveVocabulary}
    />
  );
};

export default ChapterContent;
