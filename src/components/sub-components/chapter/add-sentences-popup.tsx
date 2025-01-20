import { useState } from "react";
import useFetchOrphanSentences from "../../../hooks/use-fetch-orphan-sentences";
import useSearch from "../../../hooks/use-search";
import { addSentenceToChapter } from "../../../services/chapter.service";
import Loader from "../../shared/loader";
import PopupFooter from "../../shared/popup/pop-up-footer";
import SearchInput from "../../shared/search-input";
import SentenceList2 from "./add-sentence/sentence-list2";

interface AddSentencePopupProps {
    chapterId: string;
    onClose: () => void;
    onSentencesAdded: (sentenceIds: string[]) => void;
}

const AddSentencePopup: React.FC<AddSentencePopupProps> = ({
    chapterId,
    onClose,
    onSentencesAdded,
}) => {
    const { sentences, loading: fetchLoading, error: fetchError } = useFetchOrphanSentences();
    const { searchTerm, setSearchTerm, filteredData } = useSearch(sentences);
    const [selectedSentenceIds, setSelectedSentenceIds] = useState<string[]>([]);
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

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
            setSubmitError("Please select at least one sentence.");
            return;
        }

        setSubmitLoading(true);
        setSubmitError(null);

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
            setSubmitError("Failed to add sentences. Please try again.");
        } finally {
            setSubmitLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Add Sentences to Chapter</h2>
                {/* Search Input */}
                <div className="mb-4">
                    <SearchInput
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Search by text or meaning..."
                    />
                </div>
                {/* Error Messages */}
                {fetchError && <p className="text-red-500 mb-4">{fetchError}</p>}
                {submitError && <p className="text-red-500 mb-4">{submitError}</p>}

                {/* Loading State */}
                {fetchLoading ? (
                    <Loader />
                ) : (
                    <>
                        {/* Sentence List */}
                        <SentenceList2
                            sentences={filteredData}
                            selectedSentenceIds={selectedSentenceIds}
                            onSentenceSelection={handleSentenceSelection}
                        />

                        {/* Popup Footer */}
                        <PopupFooter
                            onClose={onClose}
                            onSubmit={handleSubmit}
                            loading={submitLoading}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default AddSentencePopup;
