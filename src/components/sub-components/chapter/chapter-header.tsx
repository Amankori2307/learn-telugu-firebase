import React from "react";
import { IChapter } from "../../../interfaces/chapter.interfaces";

interface ChapterHeaderProps {
  chapter: IChapter;
  onAddSentences: () => void;
  isLoading: boolean;
}

const ChapterHeader: React.FC<ChapterHeaderProps> = ({
  chapter,
  onAddSentences,
  isLoading,
}) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-800">{chapter.name}</h1>
      <p className="text-gray-600">{chapter.sentenceIds?.length || 0} sentences</p>
      <button
        type="submit"
        onClick={onAddSentences}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300"
      >
        Add Sentences
      </button>
    </div>
  );
};

export default ChapterHeader;