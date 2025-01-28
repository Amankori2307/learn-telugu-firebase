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
    <li className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
      {/* Chapter Name and Sentence Count */}
      <div className="flex-1">
        <span
          onClick={onClick}
          className="cursor-pointer font-medium text-blue-500 hover:text-blue-700"
        >
          {chapter.name}
        </span>
        <p className="text-sm text-gray-500 mt-1">
          {chapter.vocabularyIds?.length || 0} sentences
        </p>
      </div>

      {/* Delete Button */}
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
