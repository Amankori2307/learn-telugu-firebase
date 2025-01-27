import { useState } from "react";
import { useParams } from "react-router-dom";
import useChapterDetails from "../../../hooks/use-chapter-details";
import AddVocabularyPopup from "../../sub-components/chapter/add-sentences-popup";
import ChapterContent from "../../sub-components/chapter/chapter-content";
import ChapterHeader from "../../sub-components/chapter/chapter-header";

const ChapterDetailsPage = () => {
    const { chapterId } = useParams<{ chapterId: string }>();
    const { chapter, sentences, loading, reloadChapter } = useChapterDetails(chapterId);
    const [showAddSentencePopup, setShowAddSentencePopup] = useState(false);

    const togglePopup = () => {
        setShowAddSentencePopup(!showAddSentencePopup);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Chapter Header */}
                {chapter && (
                    <ChapterHeader
                        chapter={chapter}
                        onAddSentences={togglePopup}
                        isLoading={loading}
                    />
                )}

                {/* Chapter Content */}
                <ChapterContent sentences={sentences} isLoading={loading} chapterId={chapterId as string} onRemoveSentence={reloadChapter} />
            </div>

            {/* Add Sentence Popup */}
            {chapterId && showAddSentencePopup && (
                <AddVocabularyPopup
                    chapterId={chapterId}
                    onClose={togglePopup}
                    onVocabularyAdded={() => window.location.reload()} // Reload to reflect changes

                />
            )}
        </div>
    );
};

export default ChapterDetailsPage;