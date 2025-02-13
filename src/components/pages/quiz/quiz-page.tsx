import { useEffect, useState } from "react";
import { IVocabularyEntry } from "../../../interfaces/vocab.interfaces";
import { fetchVocabularyEntriesByChapter } from "../../../services/vocabulary.service";
import localStorageUtils from "../../../utils/localstorage.utils";
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

  // Load a random question with weighted selection
  const loadRandomQuestion = (vocabList: IVocabularyEntry[]) => {
    if (vocabList.length === 0) {
      console.error("No vocabulary entries available.");
      return;
    }

    const randomVocabularyEntry =
      localStorageUtils.getWeightedRandomQuestion(vocabList);

    // Update metrics for the selected question
    localStorageUtils.updateMetrics(randomVocabularyEntry.id, false); // false because the question is being shown, not answered yet

    const isMeaningQuestion = Math.random() < 0.5;
    setIsMeaningQuestion(isMeaningQuestion);

    const incorrectOptions = vocabList
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

  // Handle chapter selection
  const handleChapterSelect = async (chapterId: string) => {
    if (!chapterId) return;

    setIsLoadingVocab(true);
    try {
      const vocabData = await fetchVocabularyEntriesByChapter(chapterId);
      setVocabularyEntryList(vocabData);
      localStorageUtils.initializeMetrics(vocabData); // Initialize metrics for all vocabulary entries
      loadRandomQuestion(vocabData);
    } catch (error) {
      console.error("Error loading vocabulary entries: ", error);
    } finally {
      setIsLoadingVocab(false);
    }
  };

  // Handle option selection
  const handleOptionClick = (option: IVocabularyEntry) => {
    setSelectedOption(option);
    const isCorrectAnswer = checkIsCorrect(option);
    setIsCorrect(isCorrectAnswer);
    setShowExamples(true);

    // Update metrics for the current question
    if (currentVocabularyEntry) {
      localStorageUtils.updateMetrics(
        currentVocabularyEntry.id,
        isCorrectAnswer
      );
    }
  };

  // Check if the selected option is correct
  const checkIsCorrect = (option: IVocabularyEntry) => {
    if (!currentVocabularyEntry) return false;
    if (isMeaningQuestion)
      return currentVocabularyEntry.meaning === option.meaning;
    else return currentVocabularyEntry.text === option.text;
  };

  // Load chapters and vocabulary entries
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
    <div className="p-4 max-w-md mx-auto">
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
