// src/pages/ChapterPage.tsx

import ChapterList from "../../sub-components/chapter/chapter-list";
import CreateChapter from "../../sub-components/chapter/create-chapter";

const ChapterPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Chapters</h1>
      <CreateChapter />
      <ChapterList />
    </div>
  );
};

export default ChapterPage;