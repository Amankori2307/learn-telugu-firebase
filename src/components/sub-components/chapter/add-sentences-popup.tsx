import React from "react";
import useAddVocabulary from "../../../hooks/use-add-vocabulary";
import useFetchOrphanVocabulary from "../../../hooks/use-fetch-orphan-vocabulary";
import useSearch from "../../../hooks/use-search";
import useVocabularyEntrySelection from "../../../hooks/use-vocabulary-selection";
import Loader from "../../shared/loader";
import PopupFooter from "../../shared/popup/pop-up-footer";
import SearchInput from "../../shared/search-input";
import VocabList2 from "./add-vocab/vocab-list-2";

interface AddVocabularyPopupProps {
    chapterId: string;
    onClose: () => void;
    onVocabularyAdded: (vocabIds: string[]) => void;
}

const AddVocabularyPopup: React.FC<AddVocabularyPopupProps> = ({
    chapterId,
    onClose,
    onVocabularyAdded,
}) => {
    const { vocabularyEntryList, loading: fetchLoading, error: fetchError } = useFetchOrphanVocabulary();
    const { searchTerm, setSearchTerm, filteredData } = useSearch(vocabularyEntryList);
    const { selectedVocabIds, handleVocabularySelection, selectAll, clearAll } = useVocabularyEntrySelection();
    const { submitLoading, submitError, handleSubmit } = useAddVocabulary(chapterId, onVocabularyAdded);

    const onSubmit = async () => {
        await handleSubmit(selectedVocabIds);
        onClose();
    };

    // Get all vocab IDs from the filtered data
    const allVocabIds = filteredData.map((vocabEntry) => vocabEntry.id);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Add Vocabulary to Chapter ({filteredData.length}/{vocabularyEntryList.length})</h2>

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
                        {/* Select All and Clear All Buttons */}
                        <div className="flex space-x-2 mb-4">
                            <button
                                type="button"
                                onClick={() => selectAll(allVocabIds)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Select All
                            </button>
                            <button
                                type="button"
                                onClick={clearAll}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                            >
                                Clear All
                            </button>
                        </div>

                        {/* Vocabulary List */}
                        <VocabList2
                            vocabularyEntryList={filteredData}
                            selectedVocabIds={selectedVocabIds}
                            onVocabularyEntrySelection={handleVocabularySelection}
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

export default AddVocabularyPopup;