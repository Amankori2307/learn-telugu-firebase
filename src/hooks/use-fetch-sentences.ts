import { useCallback, useEffect, useState } from "react";
import { VocabularyEntry } from "../interfaces/vocab.interfaces";
import { fetchAllVocabularyEntries } from "../services/sentence.service";

const useFetchSentences = (isReviewed: boolean) => {
  const [sentences, setSentences] = useState<VocabularyEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSentencesHelper = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAllVocabularyEntries(isReviewed); // Pass isReviewed to the service
      setSentences(data);
    } catch (err) {
      console.error("Failed to fetch sentences: ", err);
      setError("Failed to fetch sentences. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [isReviewed]);

  // Automatically fetch sentences when isReviewed changes
  useEffect(() => {
    fetchSentencesHelper();
  }, [fetchSentencesHelper]);

  // Expose a function to manually reload sentences
  const reloadSentences = async () => {
    await fetchSentencesHelper();
  };

  return { sentences, loading, error, reloadSentences };
};

export default useFetchSentences;
