import { useState } from "react";
import { removeVocabularyEntryFromChapter } from "../../services/chapter.service";

const useRemoveVocabularyEntryFromChapter = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRemoveVocabularyEntry = async (
    chapterId: string,
    vocabId: string
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);
    let res = false;
    try {
      await removeVocabularyEntryFromChapter(chapterId, vocabId);
      res = true; // Callback after successful removal
    } catch (err) {
      console.error("Failed to remove vocabulary entry from chapter: ", err);
      setError("Failed to remove vocabulary entry from chapter. Please try again.");
    } finally {
      setLoading(false);
    }
    return res;
  };

  return {
    loading,
    error,
    handleRemoveVocabularyEntry,
  };
};

export default useRemoveVocabularyEntryFromChapter;
