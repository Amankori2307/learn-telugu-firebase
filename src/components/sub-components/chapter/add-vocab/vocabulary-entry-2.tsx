import React from "react";
import { IVocabularyEntry } from "../../../../interfaces/vocab.interfaces";

interface VocabularyEntry2Props {
    vocabularyEntry: IVocabularyEntry;
    isSelected: boolean;
    onVocabularyEntrySelection: (vocabId: string) => void;
}

const VocabularyEntry2: React.FC<VocabularyEntry2Props> = ({
    vocabularyEntry,
    isSelected,
    onVocabularyEntrySelection,
}) => {
    return (
        <li className="flex items-start p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            {/* Checkbox */}
            <input
                type="checkbox"
                id={vocabularyEntry.id}
                checked={isSelected}
                onChange={() => onVocabularyEntrySelection(vocabularyEntry.id)}
                className="mt-1.5 mr-4"
            />

            {/* Vocabulary Entry Details */}
            <div className="flex-1">
                {/* Text */}
                <p className="text-lg font-semibold text-gray-800">{vocabularyEntry.text}</p>

                {/* Meaning */}
                <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Meaning:</span> {vocabularyEntry.meaning}
                </p>

                {/* Pronunciation */}
                <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Pronunciation:</span>{" "}
                    {vocabularyEntry.pronunciation}
                </p>
            </div>
        </li>
    );
};

export default VocabularyEntry2;