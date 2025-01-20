import { useState } from "react";

const useSentenceSelection = () => {
  const [selectedSentenceIds, setSelectedSentenceIds] = useState<string[]>([]);

  const handleSentenceSelection = (sentenceId: string) => {
    setSelectedSentenceIds(
      (prev) =>
        prev.includes(sentenceId)
          ? prev.filter((id) => id !== sentenceId) // Deselect if already selected
          : [...prev, sentenceId] // Select if not already selected
    );
  };

  return { selectedSentenceIds, handleSentenceSelection };
};

export default useSentenceSelection;
