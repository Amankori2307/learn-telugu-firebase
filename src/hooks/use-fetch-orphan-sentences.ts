import { useEffect, useState } from "react";
import { ISentence } from "../interfaces/vocab.interfaces";
import { fetchOrphanSentences } from "../services/sentence.service";

const useFetchOrphanSentences = () => {
  const [sentences, setSentences] = useState<ISentence[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSentences = async () => {
      setLoading(true);
      try {
        const data = await fetchOrphanSentences();
        setSentences(data);
      } catch (err) {
        console.error("Failed to fetch sentences: ", err);
        setError("Failed to fetch sentences. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSentences();
  }, []);

  return { sentences, loading, error };
};

export default useFetchOrphanSentences;