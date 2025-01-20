import React from "react";
import { ISentence } from "../../../../interfaces/vocab.interfaces";

interface SentenceListItemProps {
    sentence: ISentence;
    isSelected: boolean;
    onSentenceSelection: (sentenceId: string) => void;
}

const SentenceList2Item: React.FC<SentenceListItemProps> = ({
    sentence,
    isSelected,
    onSentenceSelection,
}) => {
    return (
        <li className="flex items-start p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            {/* Checkbox */}
            <input
                type="checkbox"
                id={sentence.id}
                checked={isSelected}
                onChange={() => onSentenceSelection(sentence.id)}
                className="mt-1.5 mr-4"
            />

            {/* Sentence Details */}
            <div className="flex-1">
                {/* Text */}
                <p className="text-lg font-semibold text-gray-800">{sentence.text}</p>

                {/* Meaning */}
                <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Meaning:</span> {sentence.meaning}
                </p>

                {/* Pronunciation */}
                <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Pronunciation:</span>{" "}
                    {sentence.pronunciation}
                </p>
            </div>
        </li>
    );
};

export default SentenceList2Item;