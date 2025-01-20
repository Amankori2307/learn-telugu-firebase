import React from "react";
import { ISentence } from "../../../interfaces/vocab.interfaces";
import SentenceItem from "./sentence-item";

interface SentenceListProps {
    sentences: ISentence[];
    onMarkAsReviewed?: (id: string) => void;
    onDelete?: (id: string) => void;
    onEdit?: (id: string) => void;
}

const SentenceList: React.FC<SentenceListProps> = ({
    sentences,
    onMarkAsReviewed,
    onDelete,
    onEdit,
}) => {
    if (sentences.length === 0) {
        return <p className="text-gray-500 text-center">No sentences found.</p>;
    }

    return (
        <div className="w-full sm:max-w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px] mx-auto px-4">
            {/* Responsive widths with max-width for sm breakpoint */}
            <ul className="space-y-4">
                {sentences.map((sentence) => (
                    <SentenceItem
                        key={sentence.id}
                        sentence={sentence}
                        onMarkAsReviewed={onMarkAsReviewed}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))}
            </ul>
        </div>
    );
};

export default SentenceList;