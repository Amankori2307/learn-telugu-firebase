import { useEffect, useState } from "react";
import { IVocabularyEntry } from "../interfaces/vocab.interfaces";
import { fetchOrphanedVocabularyEntries } from "../services/vocabulary.service";

const useFetchOrphanVocabulary = () => {
  const [vocabularyEntryList, setVocabularyEntryList] = useState<IVocabularyEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVocabulary = async () => {
      setLoading(true);
      try {
        const data = await fetchOrphanedVocabularyEntries();
        setVocabularyEntryList(data);
      } catch (err) {
        console.error("Failed to fetch vocabulary: ", err);
        setError("Failed to fetch vocabulary. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchVocabulary();
  }, []);

  return { vocabularyEntryList, loading, error };
};

export default useFetchOrphanVocabulary;
