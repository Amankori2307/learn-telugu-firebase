import { useEffect, useState } from "react";
import { ISentence } from "../../../interfaces/vocab.interfaces";
import { deleteSentence, fetchSentences, markAsReviewed, } from "../../../services/sentence.service";


const ReviewSentences = () => {
  const [sentences, setSentences] = useState<ISentence[]>([]);

  useEffect(() => {
    const loadSentences = async () => {
      try {
        const unReviewedSentences = await fetchSentences(false);
        setSentences(unReviewedSentences);
      } catch (error) {
        console.error("Failed to fetch un reviewed sentences: ", error);
      }
    };

    loadSentences();
  }, []);

  // Handle marking a sentence as reviewed
  const handleMarkAsReviewed = async (id: string) => {
    try {
      await markAsReviewed(id);
      // Remove the sentence from the list
      setSentences((prev) => prev.filter((sentence) => sentence.id !== id));
      alert("Sentence marked as reviewed!");
    } catch (error) {
      console.error("Failed to mark sentence as reviewed: ", error);
      alert("Failed to mark sentence as reviewed. Please try again.");
    }
  };

  // Handle deleting a sentence
  const handleDeleteSentence = async (id: string) => {
    try {
      await deleteSentence(id);
      // Remove the sentence from the list
      setSentences((prev) => prev.filter((sentence) => sentence.id !== id));
      alert("Sentence deleted!");
    } catch (error) {
      console.error("Failed to delete sentence: ", error);
      alert("Failed to delete sentence. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Un-reviewed Sentences ({sentences.length})</h1>
      {sentences.length === 0 ? (
        <p>No un-reviewed sentences found.</p>
      ) : (
        <ul className="space-y-4">
          {sentences.map((sentence) => (
            <li
              key={sentence.id}
              className="p-4 border rounded-lg shadow-sm bg-white"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold">{sentence.text}</p>
                  <p className="text-gray-600">{sentence.meaning}</p>
                  <p className="text-sm text-gray-500">{sentence.pronunciation}</p>
                  {sentence.examples && (
                    <ul className="mt-2 space-y-1">
                      {sentence.examples.map((example, index) => (
                        <li key={index} className="text-sm text-gray-700">
                          {example}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleMarkAsReviewed(sentence.id)}
                    className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Mark as Reviewed
                  </button>
                  <button
                    onClick={() => handleDeleteSentence(sentence.id)}
                    className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewSentences;