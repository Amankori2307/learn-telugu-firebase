import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

interface Sentence {
  id: string;
  pronunciation: string;
  meaning: string;
  text: string;
  type: string;
  examples: string[];
}

const Quiz: React.FC = () => {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [currentSentence, setCurrentSentence] = useState<Sentence | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExamples, setShowExamples] = useState<boolean>(false);
  const [isMeaningQuestion, setIsMeaningQuestion] = useState<boolean>(false);

  useEffect(() => {
    fetchSentences();
  }, []);

  const fetchSentences = async () => {
    const querySnapshot = await getDocs(collection(db, "sentences"));
    const sentencesData: Sentence[] = [];
    querySnapshot.forEach((doc) => {
      sentencesData.push({ id: doc.id, ...doc.data() } as Sentence);
    });
    setSentences(sentencesData);
    loadRandomQuestion(sentencesData);
  };

  const loadRandomQuestion = (sentencesData: Sentence[]) => {
    const randomIndex = Math.floor(Math.random() * sentencesData.length);
    const randomSentence = sentencesData[randomIndex];

    // Randomly decide whether to show a sentence or a meaning
    const isMeaningQuestion = Math.random() < 0.5;
    setIsMeaningQuestion(isMeaningQuestion);

    // Set the correct answer
    const correctAnswer = isMeaningQuestion ? randomSentence.meaning : randomSentence.text;

    // Get 3 random incorrect options
    const incorrectOptions = sentencesData
      .filter((s) => s.id !== randomSentence.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((s) => (isMeaningQuestion ? s.meaning : s.text));

    // Combine correct and incorrect options and shuffle them
    const allOptions = [correctAnswer, ...incorrectOptions].sort(() => Math.random() - 0.5);

    setCurrentSentence(randomSentence);
    setOptions(allOptions);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowExamples(false);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    const correctAnswer = isMeaningQuestion ? currentSentence?.meaning : currentSentence?.text;
    setIsCorrect(option === correctAnswer);
    setShowExamples(true);
  };

  if (!currentSentence) return <div>Loading...</div>;

  return (
    <div>
      <h1>{isMeaningQuestion ? currentSentence.text : currentSentence.meaning}</h1>
      <p>{isMeaningQuestion ? "Select the correct meaning:" : "Select the correct sentence:"}</p>
      <div>
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            disabled={selectedOption !== null}
          >
            {option}
          </button>
        ))}
      </div>
      {selectedOption !== null && (
        <div>
          <p>{isCorrect ? "Correct!" : "Incorrect!"}</p>
          <p>Correct Answer: {isMeaningQuestion ? currentSentence.meaning : currentSentence.text}</p>
          {showExamples && (
            <div>
              <h3>Examples:</h3>
              <ul>
                {currentSentence.examples.map((example, index) => (
                  <li key={index}>{example}</li>
                ))}
              </ul>
            </div>
          )}
          <button onClick={() => loadRandomQuestion(sentences)}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;