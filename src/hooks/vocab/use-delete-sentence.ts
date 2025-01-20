import { useState } from "react";
import { deleteVocabularyEntry } from "../../services/sentence.service";

const useDeleteSentence = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteSentence = async (id: string) => {
    try {
      setLoading(true);
      await deleteVocabularyEntry(id);
      alert("Sentence deleted!");
      return true; // Indicate success
    } catch (error) {
      console.error("Failed to delete sentence: ", error);
      setError("Failed to delete sentence. Please try again.");
      alert("Failed to delete sentence. Please try again.");
      return false; // Indicate failure
    } finally {
      setLoading(false);
    }
  };

  return { handleDeleteSentence, loading, error };
};

export default useDeleteSentence;
