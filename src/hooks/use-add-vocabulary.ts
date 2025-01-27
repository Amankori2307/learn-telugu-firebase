import { useState } from "react";
import { addVocabularyEntryToChapter } from "../services/chapter.service";

const useAddVocabulary = (
  chapterId: string,
  onVocabularyAdded: (vocabularyIds: string[]) => void
) => {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (selectedVocabularyIds: string[]) => {
    if (selectedVocabularyIds.length === 0) {
      setSubmitError("Please select at least one vocab entry.");
      return;
    }

    setSubmitLoading(true);
    setSubmitError(null);

    try {
      // Add selected vocabulary entries to the chapter
      await Promise.all(
        selectedVocabularyIds.map((vocabId) =>
          addVocabularyEntryToChapter(chapterId, vocabId)
        )
      );

      // Notify parent component of the new associations
      onVocabularyAdded(selectedVocabularyIds);
    } catch (err) {
      console.error("Failed to add vocabulary entries to chapter: ", err);
      setSubmitError("Failed to add vocabulary entries. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  return { submitLoading, submitError, handleSubmit };
};

export default useAddVocabulary;
