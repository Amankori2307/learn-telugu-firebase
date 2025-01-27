import { useState } from "react";
import { deleteVocabularyEntry } from "../../services/vocabulary.service";

const useDeleteVocabularyEntry = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteVocabularyEntry = async (id: string) => {
    try {
      setLoading(true);
      await deleteVocabularyEntry(id);
      alert("Vocabulary entry deleted!");
      return true; // Indicate success
    } catch (error) {
      console.error("Failed to delete vocabulary entry: ", error);
      setError("Failed to delete vocabulary entry. Please try again.");
      alert("Failed to delete vocabulary entry. Please try again.");
      return false; // Indicate failure
    } finally {
      setLoading(false);
    }
  };

  return { handleDeleteVocabularyEntry, loading, error };
};

export default useDeleteVocabularyEntry;
