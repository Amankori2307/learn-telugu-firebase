// components/Quiz.tsx
import { useEffect, useState } from "react";
import { fetchSentences, Sentence } from "../../services/sentence.service";
import QuizQuestion from "./quiz-question";
import QuizResult from "./quiz-result";

const Quiz: React.FC = () => {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [currentSentence, setCurrentSentence] = useState<Sentence | null>(null);
  const [options, setOptions] = useState<Sentence[]>([]);
  const [selectedOption, setSelectedOption] = useState<Sentence | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExamples, setShowExamples] = useState<boolean>(false);
  const [isMeaningQuestion, setIsMeaningQuestion] = useState<boolean>(false);

  useEffect(() => {
    const loadSentences = async () => {
      const sentencesData = await fetchSentences();
      setSentences(sentencesData);
      loadRandomQuestion(sentencesData);
    };
    loadSentences();
  }, []);

  const checkIsCorrect = (option: Sentence) => {
    if (!currentSentence) return null;
    if (isMeaningQuestion) return currentSentence.meaning === option.meaning;
    else return currentSentence.text === option.text;
  }

  const loadRandomQuestion = (sentencesData: Sentence[]) => {
    const randomIndex = Math.floor(Math.random() * sentencesData.length);
    const randomSentence = sentencesData[randomIndex];

    const isMeaningQuestion = Math.random() < 0.5;
    setIsMeaningQuestion(isMeaningQuestion);



    const incorrectOptions = sentencesData
      .filter((s) => s.id !== randomSentence.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)

    const allOptions = [randomSentence, ...incorrectOptions].sort(() => Math.random() - 0.5);

    setCurrentSentence(randomSentence);
    setOptions(allOptions);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowExamples(false);
  };

  const handleOptionClick = (option: Sentence) => {
    setSelectedOption(option);
    setIsCorrect(checkIsCorrect(option));
    setShowExamples(true);
  };

  if (!currentSentence) return <div className="text-center text-xl">Loading...</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <QuizQuestion
        sentence={currentSentence}
        isMeaningQuestion={isMeaningQuestion}
        options={options}
        selectedOption={selectedOption}
        handleOptionClick={handleOptionClick}
      />
      {selectedOption !== null && (
        <QuizResult
          isCorrect={isCorrect}
          correctAnswer={isMeaningQuestion ? currentSentence.meaning : currentSentence.text}
          examples={currentSentence.examples}
          showExamples={showExamples}
          onNextQuestion={() => loadRandomQuestion(sentences)}
        />
      )}
    </div>
  );
};

export default Quiz;