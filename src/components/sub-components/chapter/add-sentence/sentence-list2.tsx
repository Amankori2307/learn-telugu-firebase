import React from "react";
import { ISentence } from "../../../../interfaces/vocab.interfaces";

interface SentenceListProps {
    sentences: ISentence[];
    selectedSentenceIds: string[];
    onSentenceSelection: (sentenceId: string) => void;
}

const SentenceList2: React.FC<SentenceListProps> = ({
    sentences,
    selectedSentenceIds,
    onSentenceSelection,
}) => {
    return (
        <ul className="space-y-2 max-h-60 overflow-y-auto">
            {sentences.map((sentence) => (
                <li key={sentence.id} className="flex items-center">
                    <input
                        type="checkbox"
                        id={sentence.id}
                        checked={selectedSentenceIds.includes(sentence.id)}
                        onChange={() => onSentenceSelection(sentence.id)}
                        className="mr-2"
                    />
                    <label htmlFor={sentence.id} className="text-gray-700">
                        {sentence.text} ({sentence.pronunciation})
                    </label>
                </li>
            ))}
        </ul>
    );
};

export default SentenceList2;