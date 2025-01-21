import { useState } from "react";
import { markVocabularyEntryAsReviewed } from "../../services/vocuabulary.service";

const useMarkSentenceReviewed = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleMarkAsReviewed = async (id: string) => {
    try {
      setLoading(true);
      await markVocabularyEntryAsReviewed(id);
      alert("Sentence marked as reviewed!");
      return true; // Indicate success
    } catch (error) {
      console.error("Failed to mark sentence as reviewed: ", error);
      setError("Failed to mark sentence as reviewed. Please try again.");
      alert("Failed to mark sentence as reviewed. Please try again.");
      return false; // Indicate failure
    } finally {
      setLoading(false);
    }
  };

  return { handleMarkAsReviewed, loading, error };
};

export default useMarkSentenceReviewed;
