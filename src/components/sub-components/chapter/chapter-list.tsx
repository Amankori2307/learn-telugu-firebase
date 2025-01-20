import React from "react";
import { useNavigate } from "react-router-dom";
import { IChapter } from "../../../interfaces/chapter.interfaces";
import Loader from "../../shared/loader";
import ChapterListItem from "./chapter-list-item";

interface ChapterListProps {
    chapters: IChapter[];
    onDeleteSuccess?: () => void;
    loading: boolean;
}

const ChapterList: React.FC<ChapterListProps> = ({
    chapters,
    onDeleteSuccess,
    loading,
}) => {
    const navigate = useNavigate();

    return (
        <div className="w-full sm:max-w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px] mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Chapters</h2>
            {loading ? (
                <Loader />
            ) : chapters.length === 0 ? (
                <p className="text-gray-500">No chapters found.</p>
            ) : (
                <ul className="space-y-3">
                    {chapters.map((chapter) => (
                        <ChapterListItem
                            key={chapter.id}
                            chapter={chapter}
                            onDeleteSuccess={onDeleteSuccess}
                            onClick={() => navigate(`/chapters/${chapter.id}`)}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ChapterList;