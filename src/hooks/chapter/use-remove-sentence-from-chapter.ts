import { useState } from "react";
import { removeSentenceFromChapter } from "../../services/chapter.service";

const useRemoveSentenceFromChapter = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRemoveSentence = async (
    chapterId: string,
    sentenceId: string
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);
    let res = false;
    try {
      await removeSentenceFromChapter(chapterId, sentenceId);
      res = true; // Callback after successful removal
    } catch (err) {
      console.error("Failed to remove sentence from chapter: ", err);
      setError("Failed to remove sentence from chapter. Please try again.");
    } finally {
      setLoading(false);
    }
    return res;
  };

  return {
    loading,
    error,
    handleRemoveSentence,
  };
};

export default useRemoveSentenceFromChapter;
