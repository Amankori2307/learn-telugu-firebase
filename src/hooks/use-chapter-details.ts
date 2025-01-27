import { useCallback, useEffect, useState } from "react";
import { IChapter } from "../interfaces/chapter.interfaces";
import { IVocabularyEntry } from "../interfaces/vocab.interfaces";
import { fetchChapterDetails } from "../services/chapter.service";
import { fetchVocabularyEntriesByChapter } from "../services/vocabulary.service";

const useChapterDetails = (chapterId: string | undefined) => {
  const [chapter, setChapter] = useState<IChapter | null>(null);
  const [sentences, setSentences] = useState<IVocabularyEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    if (chapterId) {
      try {
        setLoading(true);

        // Fetch chapter details
        const chapterData = await fetchChapterDetails(chapterId);
        setChapter(chapterData);

        // Fetch sentences in the chapter
        const sentencesData = await fetchVocabularyEntriesByChapter(chapterId);
        setSentences(sentencesData);
      } catch (error) {
        console.error("Failed to fetch data: ", error);
      } finally {
        setLoading(false);
      }
    }
  }, [chapterId]);

  // Automatically fetch data when chapterId changes
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Expose a reload function to manually refresh the data
  const reloadChapter = async () => {
    await loadData();
  };

  return { chapter, sentences, loading, reloadChapter };
};

export default useChapterDetails;
