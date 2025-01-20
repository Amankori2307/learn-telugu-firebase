import React from "react";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import { ISentence } from "../../../interfaces/vocab.interfaces";

interface SentenceItemUIProps {
    sentence: ISentence;
    onEdit: () => void;
    onMarkAsReviewed: () => void;
    onDelete: () => void;
    isLoadingMarkAsReviewed: boolean;
    isLoadingDelete: boolean;
}

const SentenceItemUI: React.FC<SentenceItemUIProps> = ({
    sentence,
    onEdit,
    onMarkAsReviewed,
    onDelete,
    isLoadingMarkAsReviewed,
    isLoadingDelete,
}) => {
    return (
        <li className="p-6 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200">
            <div className="flex justify-between items-start">
                {/* Sentence Details */}
                <div className="flex-1">
                    {/* Text */}
                    <p className="text-xl font-semibold text-gray-800">{sentence.text}</p>

                    {/* Meaning */}
                    <p className="mt-2 text-gray-600">{sentence.meaning}</p>

                    {/* Pronunciation */}
                    {sentence.pronunciation && (
                        <p className="mt-1 text-sm text-gray-500 italic">
                            {sentence.pronunciation}
                        </p>
                    )}

                    {/* Meta (if available) */}
                    {sentence.meta && (
                        <p className="mt-2 text-sm text-gray-600">{sentence.meta}</p>
                    )}

                    {/* Examples (always visible) */}
                    {sentence.examples && sentence.examples.length > 0 && (
                        <div className="mt-3">
                            <h4 className="text-sm font-medium text-gray-700">Examples:</h4>
                            <ul className="mt-2 space-y-2">
                                {sentence.examples.map((example, index) => (
                                    <li key={index} className="text-sm text-gray-700">
                                        • {example}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 ml-4">
                    <button
                        onClick={onEdit}
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                        title="Edit"
                    >
                        <FaEdit className="h-4 w-4" /> {/* Smaller icon */}
                    </button>
                    {!sentence.isReviewed && <button
                        onClick={onMarkAsReviewed}
                        disabled={isLoadingMarkAsReviewed}
                        className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 disabled:bg-green-300"
                        title="Mark as Reviewed"
                    >
                        <FaCheck className="h-4 w-4" /> {/* Smaller icon */}
                    </button>}
                    <button
                        onClick={onDelete}
                        disabled={isLoadingDelete}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 disabled:bg-red-300"
                        title="Delete"
                    >
                        <FaTrash className="h-4 w-4" /> {/* Smaller icon */}
                    </button>
                </div>
            </div>
        </li>
    );
};

export default SentenceItemUI;