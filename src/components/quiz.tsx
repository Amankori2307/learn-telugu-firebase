import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

interface Sentence {
  id: string;
  sentence: string;
  pronunciation: string;
  meaning: string;
  options: string[];
}

const Quiz: React.FC = () => {
  const [currentSentence, setCurrentSentence] = useState<Sentence | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    fetchRandomSentence();
  }, []);

  const fetchRandomSentence = async () => {
    const querySnapshot = await getDocs(collection(db, "sentences"));
    const sentences: Sentence[] = [];
    querySnapshot.forEach((doc) => {
      sentences.push({ id: doc.id, ...doc.data() } as Sentence);
    });
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
    setCurrentSentence(randomSentence);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsCorrect(option === currentSentence?.meaning);
  };

  if (!currentSentence) return <div>Loading...</div>;

  return (
    <div>
      <h1>{currentSentence.sentence}</h1>
      <p>{currentSentence.pronunciation}</p>
      <div>
        {currentSentence.options.map((option, index) => (
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
          <p>Correct Answer: {currentSentence.meaning}</p>
          <button onClick={fetchRandomSentence}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;