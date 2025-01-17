// src/pages/ChaptersListPage.tsx
import { useEffect, useState } from "react";
import { IChapter } from "../../../interfaces/chapter.interfaces";
import { deleteChapter, fetchChapters } from "../../../services/chapter.service";
import ChapterList from "../../sub-components/chapter/chapter-list";

const ChaptersListPage = () => {
    const [chapters, setChapters] = useState<IChapter[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadChapters = async () => {
            try {
                setLoading(true);
                const chaptersData = await fetchChapters();
                setChapters(chaptersData);
            } catch (error) {
                console.error("Failed to fetch chapters: ", error);
            } finally {
                setLoading(false);
            }
        };

        loadChapters();
    }, []);

    const handleDeleteChapter = async (chapterId: string) => {
        try {
            await deleteChapter(chapterId);
            setChapters((prev) => prev.filter((chapter) => chapter.id !== chapterId));
            alert("Chapter deleted successfully!");
        } catch (error) {
            console.error("Failed to delete chapter: ", error);
            alert("Failed to delete chapter. Please try again.");
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">All Chapters</h1>
                <ChapterList
                    chapters={chapters}
                    onDeleteChapter={handleDeleteChapter}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default ChaptersListPage;