// src/pages/ChaptersListPage.tsx
import { useEffect, useState } from "react";
import { IChapter } from "../../../interfaces/chapter.interfaces";
import { deleteChapter, fetchChapters } from "../../../services/chapter.service";
import ChapterList from "../../sub-components/chapter/chapter-list";
import CreateChapter from "../../sub-components/chapter/create-chapter";

const ChaptersListPage = () => {
    const [chapters, setChapters] = useState<IChapter[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
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
    useEffect(() => {
        loadChapters();
    }, []);

    const handleDeleteChapter = async (chapterId: string) => {
        try {
            await deleteChapter(chapterId);
            setChapters((prev) => prev.filter((chapter) => chapter.id !== chapterId));
            alert("Chapter deleted successfully!");
            loadChapters();
        } catch (error) {
            console.error("Failed to delete chapter: ", error);
            alert("Failed to delete chapter. Please try again.");
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <CreateChapter onCreateChapter={loadChapters}/>
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