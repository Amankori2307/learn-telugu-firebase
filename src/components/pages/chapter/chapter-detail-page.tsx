import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useChapterDetails from "../../../hooks/use-chapter-details";
import { removeSentenceFromChapter } from "../../../services/chapter.service";
import vocabUtils from "../../../utils/vocab.utils";
import Back from "../../shared/back";
import Loader from "../../shared/loader";
import AddSentencePopup from "../../sub-components/chapter/add-sentences-popup";
import SentenceList from "../../sub-components/vocab/sentence-list";

const ChapterDetailsPage = () => {
    const { chapterId } = useParams<{ chapterId: string }>();
    const { chapter, sentences, loading } = useChapterDetails(chapterId);
    const [showAddSentencePopup, setShowAddSentencePopup] = useState(false);

    const togglePopup = () => {
        setShowAddSentencePopup(!showAddSentencePopup);
    };

    const handleRemoveSentence = async (sentenceId: string) => {
        if (chapterId) {
            try {
                await removeSentenceFromChapter(chapterId, sentenceId);
                alert("Sentence removed from chapter successfully!");
            } catch (error) {
                console.error("Failed to remove sentence: ", error);
                alert("Failed to remove sentence. Please try again.");
            }
        }
    };



    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Back onClick={() => { }} className="pb-4" />
            <div className="max-w-4xl mx-auto">
                {/* Chapter Details */}
                {chapter && (
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">{chapter.name}</h1>
                        <p className="text-gray-600">{chapter.sentenceIds?.length || 0} sentences</p>
                        <button
                            type="submit"
                            onClick={togglePopup}
                            disabled={loading}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300"
                        >
                            Add Sentences
                        </button>
                    </div>
                )}

                {/* Sentences List */}
                {loading ? (
                    <Loader />
                ) : sentences.length === 0 ? (
                    <p className="text-gray-500">No sentences found in this chapter.</p>
                ) : (
                    <SentenceList
                        sentences={sentences}
                        onDelete={handleRemoveSentence}
                        onEdit={onEdit}
                        onMarkAsReviewed={() => { }}
                    />
                )}
            </div>

            {/* Add Sentence Popup */}
            {chapterId && showAddSentencePopup && (
                <AddSentencePopup
                    chapterId={chapterId}
                    onClose={togglePopup}
                    onSentencesAdded={() => window.location.reload()} // Reload to reflect changes
                />
            )}
        </div>
    );
};

export default ChapterDetailsPage;