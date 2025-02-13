// components/QuizQuestion.tsx

import { IVocabularyEntry } from "../../../interfaces/vocab.interfaces";

interface QuizQuestionProps {
  vocabularyEntry: IVocabularyEntry;
  isMeaningQuestion: boolean;
  options: IVocabularyEntry[];
  selectedOption: IVocabularyEntry | null;
  handleOptionClick: (option: IVocabularyEntry) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  vocabularyEntry,
  isMeaningQuestion,
  options,
  selectedOption,
  handleOptionClick,
}) => {
  // Format the vocabulary entry text and pronunciation
  const formattedQuestion = (value: IVocabularyEntry) => {
    return `${value.text} (${value.pronunciation})`;
  };

  // Get the display value for the question or option
  const getDisplayValue = (value: IVocabularyEntry, isOption: boolean) => {
    if (isOption)
      return isMeaningQuestion ? value.meaning : formattedQuestion(value);
    else return isMeaningQuestion ? formattedQuestion(value) : value.meaning;
  };

  // Get the style for a specific option
  const getStyle = (option: IVocabularyEntry) => {
    if (!selectedOption) return "bg-blue-500 hover:bg-blue-700";
    const currentValue = isMeaningQuestion ? option.meaning : option.text;
    const selectedValue = isMeaningQuestion
      ? selectedOption.meaning
      : selectedOption.text;
    const correctValue = isMeaningQuestion
      ? vocabularyEntry.meaning
      : vocabularyEntry.text;

    if (currentValue === correctValue) {
      // Correct answer
      return "bg-green-500";
    } else if (currentValue === selectedValue) {
      // Selected but incorrect answer
      return "bg-red-500";
    } else {
      // Unselected option
      return "bg-gray-300 text-gray-700 cursor-not-allowed";
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        {getDisplayValue(vocabularyEntry, false)}
      </h1>
      <p className="mb-4">
        {isMeaningQuestion
          ? "Select the correct meaning:"
          : `Select the correct ${vocabularyEntry.type}:`}
      </p>
      <div className="space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            disabled={selectedOption !== null}
            className={`w-full p-2 rounded text-white ${getStyle(option)}`}
          >
            {getDisplayValue(option, true)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
