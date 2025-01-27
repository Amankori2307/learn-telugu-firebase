import { useCallback, useEffect, useState } from "react";
import { IVocabularyEntry } from "../interfaces/vocab.interfaces";
import { fetchAllVocabularyEntries } from "../services/vocabulary.service";

const useFetchVocabulary = (isReviewed: boolean) => {
  const [vocabularyEntries, setVocabularyEntries] = useState<IVocabularyEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVocabularyHelper = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAllVocabularyEntries(isReviewed); // Pass isReviewed to the service
      setVocabularyEntries(data);
    } catch (err) {
      console.error("Failed to fetch vocabulary entries: ", err);
      setError("Failed to fetch vocabulary entries. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [isReviewed]);

  // Automatically fetch vocabulary entries when isReviewed changes
  useEffect(() => {
    fetchVocabularyHelper();
  }, [fetchVocabularyHelper]);

  // Expose a function to manually reload vocabulary entries
  const reloadVocabulary = async () => {
    await fetchVocabularyHelper();
  };

  return { vocabularyEntries, loading, error, reloadVocabulary };
};

export default useFetchVocabulary;
