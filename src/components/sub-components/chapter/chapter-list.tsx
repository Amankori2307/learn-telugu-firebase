// src/components/ChapterList.tsx
import { useEffect, useState } from "react";
import { IChapter } from "../../../interfaces/chapter.interfaces";
import { fetchChapters } from "../../../services/chapter.service";
import AddSentenceToChapter from "./add-sentence-to-chapter";

const ChapterList = () => {
    const [chapters, setChapters] = useState<IChapter[]>([]);
    const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);

    useEffect(() => {
        const loadChapters = async () => {
            try {
                const chaptersData = await fetchChapters();
                setChapters(chaptersData);
            } catch (error) {
                console.error("Failed to fetch chapters: ", error);
            }
        };

        loadChapters();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Chapters</h1>
            <div className="space-y-4">
                <select
                    value={selectedChapterId || ""}
                    onChange={(e) => setSelectedChapterId(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                >
                    <option value="" disabled>
                        Select a chapter
                    </option>
                    {chapters.map((chapter) => (
                        <option key={chapter.id} value={chapter.id}>
                            {chapter.name}
                        </option>
                    ))}
                </select>
                {selectedChapterId && (
                    <AddSentenceToChapter chapterId={selectedChapterId} />
                )}
            </div>
        </div>
    );
};

export default ChapterList;