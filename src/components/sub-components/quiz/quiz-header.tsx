// components/QuizHeader.tsx
import React from "react";
import ChapterSelector from "../../sub-components/chapter/chapter-selector";

interface QuizHeaderProps {
  onChapterSelect: (chapterId: string) => void;
  isLoadingChapters: boolean;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({
  onChapterSelect,
  isLoadingChapters,
}) => {
  return (
    <div className="">
      <ChapterSelector
        onChapterSelect={onChapterSelect}
        isLoading={isLoadingChapters}
      />
    </div>
  );
};

export default QuizHeader;
