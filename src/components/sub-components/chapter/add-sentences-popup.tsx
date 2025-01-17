import { useEffect, useState } from "react";
import { ISentence } from "../../../interfaces/vocab.interfaces";
import { addSentenceToChapter } from "../../../services/chapter.service";
import { fetchOrphanSentences } from "../../../services/sentence.service";

interface AddSentencePopupProps {
    chapterId: string;
    onClose: () => void; // Callback to close the popup
    onSentencesAdded: (sentenceIds: string[]) => void; // Callback to handle new sentence associations
}

const AddSentencePopup = ({ chapterId, onClose, onSentencesAdded }: AddSentencePopupProps) => {
    const [allSentences, setAllSentences] = useState<ISentence[]>([]); // All sentences fetched from the DB
    const [selectedSentenceIds, setSelectedSentenceIds] = useState<string[]>([]); // IDs of selected sentences
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch all sentences from the database
    useEffect(() => {
        const fetchSentencesHelper = async () => {
            setLoading(true);
            try {
                const sentences = await fetchOrphanSentences();
                setAllSentences(sentences);
            } catch (err) {
                console.error("Failed to fetch sentences: ", err);
                setError("Failed to fetch sentences. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchSentencesHelper();
    }, []);

    // Handle sentence selection
    const handleSentenceSelection = (sentenceId: string) => {
        setSelectedSentenceIds((prev) =>
            prev.includes(sentenceId)
                ? prev.filter((id) => id !== sentenceId) // Deselect if already selected
                : [...prev, sentenceId] // Select if not already selected
        );
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedSentenceIds.length === 0) {
            setError("Please select at least one sentence.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Add selected sentences to the chapter
            await Promise.all(
                selectedSentenceIds.map((sentenceId) =>
                    addSentenceToChapter(chapterId, sentenceId)
                )
            );

            // Notify parent component of the new associations
            onSentencesAdded(selectedSentenceIds);
            onClose(); // Close the popup
        } catch (err) {
            console.error("Failed to add sentences to chapter: ", err);
            setError("Failed to add sentences. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Add Sentences to Chapter</h2>

                {/* Error Message */}
                {error && <p className="text-red-500 mb-4">{error}</p>}

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <>
                        {/* Sentence List */}
                        <ul className="space-y-2 mb-4 max-h-60 overflow-y-auto">
                            {allSentences.map((sentence) => (
                                <li key={sentence.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={sentence.id}
                                        checked={selectedSentenceIds.includes(sentence.id)}
                                        onChange={() => handleSentenceSelection(sentence.id)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={sentence.id} className="text-gray-700">
                                        {sentence.text} ({sentence.pronunciation})
                                    </label>
                                </li>
                            ))}
                        </ul>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={loading}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300"
                            >
                                {loading ? "Adding..." : "Add Sentences"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AddSentencePopup;