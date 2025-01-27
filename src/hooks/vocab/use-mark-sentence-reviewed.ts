import { useState } from "react";
import { markVocabularyEntryAsReviewed } from "../../services/vocabulary.service";

const useMarkVocabularyEntryReviewed = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleMarkAsReviewed = async (id: string) => {
    try {
      setLoading(true);
      await markVocabularyEntryAsReviewed(id);
      alert("Vocabulary entry marked as reviewed!");
      return true; // Indicate success
    } catch (error) {
      console.error("Failed to mark vocabulary entry as reviewed: ", error);
      setError("Failed to mark vocabulary entry as reviewed. Please try again.");
      alert("Failed to mark vocabulary entry as reviewed. Please try again.");
      return false; // Indicate failure
    } finally {
      setLoading(false);
    }
  };

  return { handleMarkAsReviewed, loading, error };
};

export default useMarkVocabularyEntryReviewed;
