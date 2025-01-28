import React from "react";
import { IChapter } from "../../../interfaces/chapter.interfaces";

interface ChapterHeaderProps {
  chapter: IChapter;
  onAddVocab: () => void;
  isLoading: boolean;
}

const ChapterHeader: React.FC<ChapterHeaderProps> = ({
  chapter,
  onAddVocab,
  isLoading,
}) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-800">{chapter.name}</h1>
      <p className="text-gray-600">
        {chapter.vocabularyIds?.length || 0} items
      </p>
      <button
        type="submit"
        onClick={onAddVocab}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300"
      >
        Add Vocabulary
      </button>
    </div>
  );
};

export default ChapterHeader;
