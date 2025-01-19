// src/components/ChapterList.tsx
import { useNavigate } from "react-router-dom";
import { IChapter } from "../../../interfaces/chapter.interfaces";
import Loader from "../../shared/loader";

interface ChapterListProps {
    chapters: IChapter[];
    onDeleteChapter: (chapterId: string) => void;
    loading: boolean;
}

const ChapterList = ({ chapters, onDeleteChapter, loading }: ChapterListProps) => {
    const navigate = useNavigate();

    return (
        <div className="w-full bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Chapters</h2>
            {loading ? (
                <Loader />
            ) : chapters.length === 0 ? (
                <p className="text-gray-500">No chapters found.</p>
            ) : (
                <ul className="space-y-3">
                    {chapters.map((chapter) => (
                        <li
                            key={chapter.id}
                            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all"
                        >
                            <span
                                onClick={() => navigate(`/chapters/${chapter.id}`)}
                                className="cursor-pointer font-medium text-blue-500 hover:text-blue-700"
                            >
                                {chapter.name}
                            </span>
                            <button
                                onClick={() => onDeleteChapter(chapter.id)}
                                className="p-2 text-red-500 hover:text-red-700 transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ChapterList;