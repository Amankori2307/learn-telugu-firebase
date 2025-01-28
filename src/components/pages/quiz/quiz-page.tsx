// components/Quiz.tsx
import { useEffect, useState } from "react";
import { IVocabularyEntry } from "../../../interfaces/vocab.interfaces";
import { fetchAllVocabularyEntries } from "../../../services/vocabulary.service";
import QuizQuestion from "../../sub-components/quiz/quiz-question";
import QuizResult from "../../sub-components/quiz/quiz-result";

const QuizPage: React.FC = () => {
  const [vocabularyEntryList, setVocabularyEntryList] = useState<
    IVocabularyEntry[]
  >([]);
  const [currentVocabularyEntry, setCurrentVocabularyEntry] =
    useState<IVocabularyEntry | null>(null);
  const [options, setOptions] = useState<IVocabularyEntry[]>([]);
  const [selectedOption, setSelectedOption] = useState<IVocabularyEntry | null>(
    null
  );
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExamples, setShowExamples] = useState<boolean>(false);
  const [isMeaningQuestion, setIsMeaningQuestion] = useState<boolean>(false);

  useEffect(() => {
    const loadVocabulary = async () => {
      const vocabData = await fetchAllVocabularyEntries();
      setVocabularyEntryList(vocabData);
      loadRandomQuestion(vocabData);
    };
    loadVocabulary();
  }, []);

  const checkIsCorrect = (option: IVocabularyEntry) => {
    if (!currentVocabularyEntry) return null;
    if (isMeaningQuestion)
      return currentVocabularyEntry.meaning === option.meaning;
    else return currentVocabularyEntry.text === option.text;
  };

  const loadRandomQuestion = (vocabData: IVocabularyEntry[]) => {
    const randomIndex = Math.floor(Math.random() * vocabData.length);
    const randomVocabularyEntry = vocabData[randomIndex];

    const isMeaningQuestion = Math.random() < 0.5;
    setIsMeaningQuestion(isMeaningQuestion);

    const incorrectOptions = vocabData
      .filter((s) => s.id !== randomVocabularyEntry.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const allOptions = [randomVocabularyEntry, ...incorrectOptions].sort(
      () => Math.random() - 0.5
    );

    setCurrentVocabularyEntry(randomVocabularyEntry);
    setOptions(allOptions);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowExamples(false);
  };

  const handleOptionClick = (option: IVocabularyEntry) => {
    setSelectedOption(option);
    setIsCorrect(checkIsCorrect(option));
    setShowExamples(true);
  };

  if (!currentVocabularyEntry)
    return <div className="text-center text-xl">Loading...</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
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
          correctAnswer={
            isMeaningQuestion
              ? currentVocabularyEntry.meaning
              : currentVocabularyEntry.text
          }
          examples={currentVocabularyEntry.examples}
          showExamples={showExamples}
          onNextQuestion={() => loadRandomQuestion(vocabularyEntryList)}
        />
      )}
    </div>
  );
};

export default QuizPage;
