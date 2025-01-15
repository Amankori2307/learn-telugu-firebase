// components/QuizResult.tsx
interface QuizResultProps {
    isCorrect: boolean | null;
    correctAnswer: string;
    examples: string[];
    showExamples: boolean;
    onNextQuestion: () => void;
  }
  
  const QuizResult: React.FC<QuizResultProps> = ({
    isCorrect,
    correctAnswer,
    examples,
    showExamples,
    onNextQuestion,
  }) => {
    return (
      <div className="mt-4">
        <p className={`text-xl font-bold ${isCorrect ? "text-green-500" : "text-red-500"}`}>
          {isCorrect ? "Correct!" : "Incorrect!"}
        </p>
        <p className="mt-2">Correct Answer: {correctAnswer}</p>
        {showExamples && (
          <div className="mt-4">
            <h3 className="text-lg font-bold">Examples:</h3>
            <ul className="list-disc list-inside">
              {examples.map((example, index) => (
                <li key={index} className="mt-1">
                  {example}
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          onClick={onNextQuestion}
          className="mt-4 w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    );
  };
  
  export default QuizResult;