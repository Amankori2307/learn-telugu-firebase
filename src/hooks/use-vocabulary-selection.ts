import { useState } from "react";

const useVocabularyEntrySelection = () => {
  const [selectedVocabIds, setSelectedVocabIds] = useState<string[]>([]);

  const handleVocabularySelection = (vocabId: string) => {
    setSelectedVocabIds(
      (prev) =>
        prev.includes(vocabId)
          ? prev.filter((id) => id !== vocabId) // Deselect if already selected
          : [...prev, vocabId] // Select if not already selected
    );
  };

  const selectAll = (vocabIds: string[]) => {
    setSelectedVocabIds(vocabIds);
  };

  const clearAll = () => {
    setSelectedVocabIds([]);
  };

  return { selectedVocabIds, handleVocabularySelection, selectAll, clearAll };
};

export default useVocabularyEntrySelection;
