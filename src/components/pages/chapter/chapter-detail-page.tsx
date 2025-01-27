import { useState } from "react";
import { useParams } from "react-router-dom";
import useChapterDetails from "../../../hooks/use-chapter-details";
import AddVocabularyPopup from "../../sub-components/chapter/add-vocabulary-popup";
import ChapterContent from "../../sub-components/chapter/chapter-content";
import ChapterHeader from "../../sub-components/chapter/chapter-header";

const ChapterDetailsPage = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const { chapter, vocabularyEntryList, loading, reloadChapter } =
    useChapterDetails(chapterId);
  const [showAddVocabPopup, setShowAddVocabPopup] = useState(false);

  const togglePopup = () => {
    setShowAddVocabPopup(!showAddVocabPopup);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Chapter Header */}
        {chapter && (
          <ChapterHeader
            chapter={chapter}
            onAddVocab={togglePopup}
            isLoading={loading}
          />
        )}

        {/* Chapter Content */}
        <ChapterContent
          vocabularyEntryList={vocabularyEntryList}
          isLoading={loading}
          chapterId={chapterId as string}
          onRemoveVocabulary={reloadChapter}
        />
      </div>

      {/* Add Vocabulary Popup */}
      {chapterId && showAddVocabPopup && (
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
