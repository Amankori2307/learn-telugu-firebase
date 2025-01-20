import React from "react";
import useAddSentences from "../../../hooks/use-add-sentence";
import useFetchOrphanSentences from "../../../hooks/use-fetch-orphan-sentences";
import useSearch from "../../../hooks/use-search";
import useSentenceSelection from "../../../hooks/use-sentence-selection";
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
    const { selectedSentenceIds, handleSentenceSelection } = useSentenceSelection();
    const { submitLoading, submitError, handleSubmit } = useAddSentences(chapterId, onSentencesAdded);

    const onSubmit = async () => {
        await handleSubmit(selectedSentenceIds)
        onClose();
    }


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
                            onSubmit={onSubmit}
                            loading={submitLoading}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default AddSentencePopup;