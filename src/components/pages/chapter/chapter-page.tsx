// src/pages/ChapterPage.tsx
import { useState } from "react";
import CreateChapter from "../components/CreateChapter";
import AddSentenceToChapter from "../components/AddSentenceToChapter";

const ChapterPage = () => {
  const [chapterId, setChapterId] = useState<string | null>(null);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Chapters</h1>
      <CreateChapter onChapterCreated={(id) => setChapterId(id)} />
      {chapterId && <AddSentenceToChapter chapterId={chapterId} />}
    </div>
  );
};

export default ChapterPage;