import React from "react";
import VocabularyEntry from "./vocabulary-entry";
import { IVocabularyEntry } from "../../../interfaces/vocab.interfaces";

interface VocabListProps {
    vocabularyEntryList: IVocabularyEntry[];
    onMarkAsReviewed?: (id: string) => void;
    onDelete?: (id: string) => void;
    onRemoveVocabularyEntry?: (id: string) => void;
    onEdit?: (id: string) => void;
    chapterId?: string;
}

const VocabList: React.FC<VocabListProps> = ({
    vocabularyEntryList: vocabularyEntryList,
    onMarkAsReviewed,
    onRemoveVocabularyEntry,
    onDelete,
    onEdit,
    chapterId
}) => {
    if (vocabularyEntryList.length === 0) {
        return <p className="text-gray-500 text-center">No vocabulary entries found.</p>;
    }

    return (
        <div className="w-full sm:max-w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px] mx-auto px-4">
            {/* Responsive widths with max-width for sm breakpoint */}
            <ul className="space-y-4">
                {vocabularyEntryList.map((vocabularyEntry) => (
                    <VocabularyEntry
                        key={vocabularyEntry.id}
                        vocabularyEntry={vocabularyEntry}
                        onMarkAsReviewed={onMarkAsReviewed}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        chapterId={chapterId}
                        onRemoveVocabularyEntry={onRemoveVocabularyEntry}
                    />
                ))}
            </ul>
        </div>
    );
};

export default VocabList;