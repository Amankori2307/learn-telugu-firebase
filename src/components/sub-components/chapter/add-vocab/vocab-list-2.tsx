import React from "react";
import { IVocabularyEntry } from "../../../../interfaces/vocab.interfaces";
import VocabularyEntry2 from "./vocabulary-entry-2";

interface VocabList2Props {
    vocabularyEntryList: IVocabularyEntry[];
    selectedVocabIds: string[];
    onVocabularyEntrySelection: (vocabId: string) => void;
}

const VocabList2: React.FC<VocabList2Props> = ({
    vocabularyEntryList,
    selectedVocabIds,
    onVocabularyEntrySelection,
}) => {
    return (
        <ul className="space-y-4 max-h-96 overflow-y-auto p-2">
            {vocabularyEntryList.map((vocabularyEntry) => (
                <VocabularyEntry2
                    key={vocabularyEntry.id}
                    vocabularyEntry={vocabularyEntry}
                    isSelected={selectedVocabIds.includes(vocabularyEntry.id)}
                    onVocabularyEntrySelection={onVocabularyEntrySelection}
                />
            ))}
        </ul>
    );
};

export default VocabList2;