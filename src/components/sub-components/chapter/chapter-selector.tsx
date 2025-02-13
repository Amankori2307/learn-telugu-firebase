// components/ChapterSelector.tsx
import { useEffect, useState } from "react";
import { IChapter } from "../../../interfaces/chapter.interfaces";
import { fetchChapters } from "../../../services/chapter.service";

interface ChapterSelectorProps {
  onChapterSelect: (chapterId: string) => void;
  isLoading: boolean;
}

const ChapterSelector: React.FC<ChapterSelectorProps> = ({
  onChapterSelect,
  isLoading,
}) => {
  const [chapters, setChapters] = useState<IChapter[]>([]);
  const [selectedChapterId, setSelectedChapterId] = useState<string>("");

  useEffect(() => {
    const loadChapters = async () => {
      const chaptersData = await fetchChapters();
      setChapters(chaptersData);
    };
    loadChapters();
  }, []);

  const handleChapterSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const chapterId = e.target.value;
    setSelectedChapterId(chapterId);
    onChapterSelect(chapterId);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Select a Chapter</h1>
      {isLoading ? (
        <div className="text-center text-xl">Loading chapters...</div>
      ) : (
        <select
          value={selectedChapterId}
          onChange={handleChapterSelect}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">-- Select a Chapter --</option>
          {chapters.map((chapter) => (
            <option key={chapter.id} value={chapter.id}>
              {chapter.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default ChapterSelector;
