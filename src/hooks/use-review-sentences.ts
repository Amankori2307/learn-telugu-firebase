import { useEffect, useState } from "react";
import { ISentence } from "../interfaces/vocab.interfaces";
import {
  deleteSentence,
  fetchSentences,
  markAsReviewed,
} from "../services/sentence.service";

const useReviewSentences = () => {
  const [sentences, setSentences] = useState<ISentence[]>([]);

  useEffect(() => {
    const loadSentences = async () => {
      try {
        const unReviewedSentences = await fetchSentences(false);
        setSentences(unReviewedSentences);
      } catch (error) {
        console.error("Failed to fetch un-reviewed sentences: ", error);
      }
    };

    loadSentences();
  }, []);

  const handleMarkAsReviewed = async (id: string) => {
    try {
      await markAsReviewed(id);
      setSentences((prev) => prev.filter((sentence) => sentence.id !== id));
      alert("Sentence marked as reviewed!");
    } catch (error) {
      console.error("Failed to mark sentence as reviewed: ", error);
      alert("Failed to mark sentence as reviewed. Please try again.");
    }
  };

  const handleDeleteSentence = async (id: string) => {
    try {
      await deleteSentence(id);
      setSentences((prev) => prev.filter((sentence) => sentence.id !== id));
      alert("Sentence deleted!");
    } catch (error) {
      console.error("Failed to delete sentence: ", error);
      alert("Failed to delete sentence. Please try again.");
    }
  };

  return {
    sentences,
    handleMarkAsReviewed,
    handleDeleteSentence,
  };
};

export default useReviewSentences;
