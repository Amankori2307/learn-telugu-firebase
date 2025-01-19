import React from "react";
import { ISentence } from "../../../interfaces/vocab.interfaces";

interface SentenceItemProps {
    sentence: ISentence;
    onMarkAsReviewed: (id: string) => void;
    onDelete: (id: string) => void;
}

const SentenceItem: React.FC<SentenceItemProps> = ({
    sentence,
    onMarkAsReviewed,
    onDelete,
}) => {
    return (
        <li className="p-4 border rounded-lg shadow-sm bg-white">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-bold">{sentence.text}</p>
                    <p className="text-gray-600">{sentence.meaning}</p>
                    <p className="text-sm text-gray-500">{sentence.pronunciation}</p>
                    {sentence.examples && (
                        <ul className="mt-2 space-y-1">
                            {sentence.examples.map((example, index) => (
                                <li key={index} className="text-sm text-gray-700">
                                    {example}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => onMarkAsReviewed(sentence.id)}
                        className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                        Mark as Reviewed
                    </button>
                    <button
                        onClick={() => onDelete(sentence.id)}
                        className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </li>
    );
};

export default SentenceItem;