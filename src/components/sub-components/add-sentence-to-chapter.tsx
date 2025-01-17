// src/components/AddSentenceToChapter.tsx
import { useState, useEffect } from "react";
import { fetchUnreviewedSentences } from "../services/sentenceService";
import { addSentenceToChapter } from "../services/chapterService";

const AddSentenceToChapter = ({ chapterId }: { chapterId: string }) => {
    const [sentences, setSentences] = useState<IData[]>([]);
    const [selectedSentenceId, setSelectedSentenceId] = useState<string | null>(null);

    useEffect(() => {
        const loadSentences = async () => {
            try {
                const unreviewedSentences = await fetchUnreviewedSentences();
                // Filter sentences that don't belong to any chapter
                const availableSentences = unreviewedSentences.filter(
                    (sentence) => !sentence.chapterId
                );
                setSentences(availableSentences);
            } catch (error) {
                console.error("Failed to fetch sentences: ", error);
            }
        };

        loadSentences();
    }, []);

    const handleAddSentence = async () => {
        if (!selectedSentenceId) {
            alert("Please select a sentence.");
            return;
        }

        try {
            await addSentenceToChapter(chapterId, selectedSentenceId);
            alert("Sentence added to chapter successfully!");
            setSelectedSentenceId(null);
            // Refresh the list of available sentences
            const unreviewedSentences = await fetchUnreviewedSentences();
            const availableSentences = unreviewedSentences.filter(
                (sentence) => !sentence.chapterId
            );
            setSentences(availableSentences);
        } catch (error) {
            console.error("Failed to add sentence to chapter: ", error);
            alert("Failed to add sentence to chapter. Please try again.");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Add Sentence to Chapter</h2>
            <div className="space-y-4">
                <select
                    value={selectedSentenceId || ""}
                    onChange={(e) => setSelectedSentenceId(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                >
                    <option value="" disabled>
                        Select a sentence
                    </option>
                    {sentences.map((sentence) => (
                        <option key={sentence.id} value={sentence.id}>
                            {sentence.text} ({sentence.pronunciation})
                        </option>
                    ))}
                </select>
                <button
                    onClick={handleAddSentence}
                    className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Add Sentence
                </button>
            </div>
        </div>
    );
};

export default AddSentenceToChapter;