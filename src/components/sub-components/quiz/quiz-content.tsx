// components/QuizContent.tsx
import React from "react";
import { IVocabularyEntry } from "../../../interfaces/vocab.interfaces";
import QuizQuestion from "../../sub-components/quiz/quiz-question";
import QuizResult from "../../sub-components/quiz/quiz-result";

interface QuizContentProps {
  currentVocabularyEntry: IVocabularyEntry | null;
  isMeaningQuestion: boolean;
  options: IVocabularyEntry[];
  selectedOption: IVocabularyEntry | null;
  handleOptionClick: (option: IVocabularyEntry) => void;
  isCorrect: boolean | null;
  correctAnswer: string;
  examples: string[];
  showExamples: boolean;
  onNextQuestion: () => void;
}

const QuizContent: React.FC<QuizContentProps> = ({
  currentVocabularyEntry,
  isMeaningQuestion,
  options,
  selectedOption,
  handleOptionClick,
  isCorrect,
  correctAnswer,
  examples,
  showExamples,
  onNextQuestion,
}) => {
  if (!currentVocabularyEntry) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <QuizQuestion
        vocabularyEntry={currentVocabularyEntry}
        isMeaningQuestion={isMeaningQuestion}
        options={options}
        selectedOption={selectedOption}
        handleOptionClick={handleOptionClick}
      />
      {selectedOption !== null && (
        <QuizResult
          isCorrect={isCorrect}
          correctAnswer={correctAnswer}
          examples={examples}
          showExamples={showExamples}
          onNextQuestion={onNextQuestion}
        />
      )}
    </div>
  );
};

export default QuizContent;
