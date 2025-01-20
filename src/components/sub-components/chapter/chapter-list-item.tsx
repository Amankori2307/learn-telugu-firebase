import React from "react";
import { FaTrash } from "react-icons/fa"; // Import the trash icon from react-icons
import useDeleteChapter from "../../../hooks/chapter/use-delete-chapter";
import { IChapter } from "../../../interfaces/chapter.interfaces";

interface ChapterListItemProps {
    chapter: IChapter;
    onDeleteSuccess?: () => void; // Callback to notify parent of successful deletion
    onClick: () => void;
}

const ChapterListItem: React.FC<ChapterListItemProps> = ({
    chapter,
    onDeleteSuccess,
    onClick,
}) => {
    const { loading, handleDeleteChapter } = useDeleteChapter();

    const handleDelete = async () => {
        await handleDeleteChapter(chapter.id, onDeleteSuccess);
    };

    return (
        <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
            <span
                onClick={onClick}
                className="cursor-pointer font-medium text-blue-500 hover:text-blue-700"
            >
                {chapter.name}
            </span>
            <button
                onClick={handleDelete}
                disabled={loading}
                className="p-2 text-red-500 hover:text-red-700 transition-colors disabled:text-red-300"
            >
                <FaTrash className="h-5 w-5" /> {/* Use the trash icon */}
            </button>
        </li>
    );
};

export default ChapterListItem;