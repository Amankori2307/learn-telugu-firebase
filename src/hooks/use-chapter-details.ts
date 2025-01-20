import { useEffect, useState } from "react";
import { IChapter } from "../interfaces/chapter.interfaces";
import { ISentence } from "../interfaces/vocab.interfaces";
import { fetchChapterDetails } from "../services/chapter.service";
import { fetchSentencesInChapter } from "../services/sentence.service";

const useChapterDetails = (chapterId: string | undefined) => {
  const [chapter, setChapter] = useState<IChapter | null>(null);
  const [sentences, setSentences] = useState<ISentence[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      if (chapterId) {
        try {
          setLoading(true);

          // Fetch chapter details
          const chapterData = await fetchChapterDetails(chapterId);
          setChapter(chapterData);

          // Fetch sentences in the chapter
          const sentencesData = await fetchSentencesInChapter(chapterId);
          setSentences(sentencesData);
        } catch (error) {
          console.error("Failed to fetch data: ", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadData();
  }, [chapterId]);

  return { chapter, sentences, loading };
};

export default useChapterDetails;
