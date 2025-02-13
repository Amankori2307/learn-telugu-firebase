// components/Quiz.tsx
import { useEffect, useState } from "react";
import { IVocabularyEntry } from "../../../interfaces/vocab.interfaces";
import { fetchVocabularyEntriesByChapter } from "../../../services/vocabulary.service";
import QuizContent from "../../sub-components/quiz/quiz-content";
import QuizHeader from "../../sub-components/quiz/quiz-header";
import QuizLoader from "../../sub-components/quiz/quiz-loader";

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
  const [isLoadingChapters, setIsLoadingChapters] = useState<boolean>(true);
  const [isLoadingVocab, setIsLoadingVocab] = useState<boolean>(false);

  const handleChapterSelect = async (chapterId: string) => {
    if (!chapterId) return;

    setIsLoadingVocab(true);
    try {
      const vocabData = await fetchVocabularyEntriesByChapter(chapterId);
      setVocabularyEntryList(vocabData);
      loadRandomQuestion(vocabData);
    } catch (error) {
      console.error("Error loading vocabulary entries: ", error);
    } finally {
      setIsLoadingVocab(false);
    }
  };

  const checkIsCorrect = (option: IVocabularyEntry) => {
    if (!currentVocabularyEntry) return null;
    if (isMeaningQuestion)
      return currentVocabularyEntry.meaning === option.meaning;
    else return currentVocabularyEntry.text === option.text;
  };

  const loadRandomQuestion = (vocabData: IVocabularyEntry[]) => {
    if (vocabData.length === 0) {
      console.error("No vocabulary entries available.");
      return;
    }

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

  useEffect(() => {
    const loadChapters = async () => {
      setIsLoadingChapters(true);
      try {
        // Simulate loading chapters (replace with actual fetch logic if needed)
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } finally {
        setIsLoadingChapters(false);
      }
    };
    loadChapters();
  }, []);




  
  return (
    <div className="p-4 w-full sm:w-80 md:w-96 lg:w-112 xl:w-128 2xl:w-144 mx-auto">
      <QuizHeader
        onChapterSelect={handleChapterSelect}
        isLoadingChapters={isLoadingChapters}
      />

      {isLoadingVocab ? (
        <QuizLoader message="Loading vocabulary entries..." />
      ) : (
        <QuizContent
          currentVocabularyEntry={currentVocabularyEntry}
          isMeaningQuestion={isMeaningQuestion}
          options={options}
          selectedOption={selectedOption}
          handleOptionClick={handleOptionClick}
          isCorrect={isCorrect}
          correctAnswer={
            isMeaningQuestion
              ? currentVocabularyEntry?.meaning || ""
              : currentVocabularyEntry?.text || ""
          }
          examples={currentVocabularyEntry?.examples || []}
          showExamples={showExamples}
          onNextQuestion={() => loadRandomQuestion(vocabularyEntryList)}
        />
      )}
    </div>
  );
};

export default QuizPage;
