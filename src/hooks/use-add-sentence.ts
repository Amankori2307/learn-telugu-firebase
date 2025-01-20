import { useState } from "react";
import { addSentenceToChapter } from "../services/chapter.service";

const useAddSentences = (
  chapterId: string,
  onSentencesAdded: (sentenceIds: string[]) => void
) => {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (selectedSentenceIds: string[]) => {
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
    } catch (err) {
      console.error("Failed to add sentences to chapter: ", err);
      setSubmitError("Failed to add sentences. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  return { submitLoading, submitError, handleSubmit };
};

export default useAddSentences;
