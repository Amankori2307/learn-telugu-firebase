import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IVocabularyEntry } from "../../../interfaces/vocab.interfaces";
import { fetchVocabularyEntryById } from "../../../services/vocabulary.service";
import Loader from "../../shared/loader";
import VocabFormContainer from "../../sub-components/vocab/vocab-form-container";

const EditVocabPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the ID from the URL
  const navigate = useNavigate();
  const [vocabularyEntry, setVocabularyEntry] =
    useState<IVocabularyEntry | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the vocabulary entry by ID
  useEffect(() => {
    const loadVocabularyEntry = async () => {
      try {
        if (!id) {
          throw new Error("No ID provided");
        }
        const data = await fetchVocabularyEntryById(id);
        setVocabularyEntry(data);
      } catch (err) {
        console.error("Failed to fetch vocabulary entry: ", err);
        setError("Failed to load vocabulary entry. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadVocabularyEntry();
  }, [id]);

  if (loading) {
    return <Loader />; // Show loader while fetching data
  }

  if (error) {
    return <p className="text-red-500 text-center mt-6">{error}</p>; // Show error message
  }

  if (!vocabularyEntry) {
    return (
      <p className="text-gray-600 text-center mt-6">
        No Vocabulary Entry found.
      </p>
    ); // Handle case where vocabulary entry is not found
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Vocabulary</h1>
      <VocabFormContainer
        initialValues={vocabularyEntry} // Pass the fetched vocabulary entry as initial values
        onSuccess={() => navigate("/review")} // Redirect on success
        isEditMode={true} // Enable edit mode
      />
    </div>
  );
};

export default EditVocabPage;
