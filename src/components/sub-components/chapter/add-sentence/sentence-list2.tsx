import React from "react";
import { VocabularyEntry } from "../../../../interfaces/vocab.interfaces";
import SentenceList2Item from "./sentence-list2-item";

interface SentenceListProps {
    sentences: VocabularyEntry[];
    selectedSentenceIds: string[];
    onSentenceSelection: (sentenceId: string) => void;
}

const SentenceList2: React.FC<SentenceListProps> = ({
    sentences,
    selectedSentenceIds,
    onSentenceSelection,
}) => {
    return (
        <ul className="space-y-4 max-h-96 overflow-y-auto p-2">
            {sentences.map((sentence) => (
                <SentenceList2Item
                    key={sentence.id}
                    sentence={sentence}
                    isSelected={selectedSentenceIds.includes(sentence.id)}
                    onSentenceSelection={onSentenceSelection}
                />
            ))}
        </ul>
    );
};

export default SentenceList2;