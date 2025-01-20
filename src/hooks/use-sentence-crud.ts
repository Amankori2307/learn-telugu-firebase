import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ISentence } from "../interfaces/vocab.interfaces";
import {
  deleteSentence,
  fetchSentences,
  markAsReviewed,
} from "../services/sentence.service";

const useReviewSentences = () => {
  const navigate = useNavigate();
  const [sentences, setSentences] = useState<ISentence[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const loadSentences = async () => {
      try {
        const unReviewedSentences = await fetchSentences(false);
        setSentences(unReviewedSentences);
      } catch (error) {
        console.error("Failed to fetch un-reviewed sentences: ", error);
      } finally {
        setLoading(false); // Set loading to false when done
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

  const handleEdit = (id: string) => {
    navigate(`/vocab/edit/${id}`);
  };

  return {
    sentences,
    loading, // Return loading state
    handleMarkAsReviewed,
    handleDeleteSentence,
    handleEdit,
  };
};

export default useReviewSentences;
