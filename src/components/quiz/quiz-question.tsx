// components/QuizQuestion.tsx

import { Sentence } from "../../services/sentence.service";

interface QuizQuestionProps {
  sentence: Sentence;
  isMeaningQuestion: boolean;
  options: string[];
  selectedOption: string | null;
  handleOptionClick: (option: string) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  sentence,
  isMeaningQuestion,
  options,
  selectedOption,
  handleOptionClick,
}) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        {isMeaningQuestion ? `${sentence.text} (${sentence.pronunciation})` : sentence.meaning}
      </h1>
      <p className="mb-4">
        {isMeaningQuestion ? "Select the correct meaning:" : "Select the correct sentence:"}
      </p>
      <div className="space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            disabled={selectedOption !== null}
            className={`w-full p-2 rounded ${selectedOption === option
              ? selectedOption === (isMeaningQuestion ? sentence.meaning : sentence.text)
                ? "bg-green-500"
                : "bg-red-500"
              : "bg-blue-500 hover:bg-blue-700"
              } text-white`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;