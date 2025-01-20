import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VocabularyEntry } from "../../../interfaces/vocab.interfaces";
import { fetchVocabById } from "../../../services/sentence.service";
import Loader from "../../shared/loader";
import VocabFormContainer from "../../sub-components/vocab/vocab-form-container";


const EditVocabPage: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get the ID from the URL
    const navigate = useNavigate();
    const [sentence, setSentence] = useState<VocabularyEntry | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch the sentence by ID
    useEffect(() => {
        const loadSentence = async () => {
            try {
                if (!id) {
                    throw new Error("No ID provided");
                }
                const data = await fetchVocabById(id);
                setSentence(data);
            } catch (err) {
                console.error("Failed to fetch sentence: ", err);
                setError("Failed to load sentence. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        loadSentence();
    }, [id]);


    if (loading) {
        return <Loader />; // Show loader while fetching data
    }

    if (error) {
        return <p className="text-red-500 text-center mt-6">{error}</p>; // Show error message
    }

    if (!sentence) {
        return <p className="text-gray-600 text-center mt-6">No sentence found.</p>; // Handle case where sentence is not found
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Sentence</h1>
            <VocabFormContainer
                initialValues={sentence} // Pass the fetched sentence as initial values
                onSuccess={() => navigate("/review")} // Redirect on success
                isEditMode={true} // Enable edit mode
            />
        </div>
    );
};

export default EditVocabPage;