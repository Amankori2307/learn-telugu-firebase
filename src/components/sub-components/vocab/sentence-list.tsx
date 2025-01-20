import React from "react";
import { ISentence } from "../../../interfaces/vocab.interfaces";
import SentenceItem from "./sentence";

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
        return <p>No un-reviewed sentences found.</p>;
    }

    return (
        <div className="w-[600px] mx-auto"> {/* Set a fixed width */}
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