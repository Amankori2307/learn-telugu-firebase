// src/components/AddSentenceToChapter.tsx
import { useEffect, useState } from "react";
import { ISentence } from "../../../interfaces/vocab.interfaces";
import { addSentenceToChapter } from "../../../services/chapter.service";
import { fetchSentences, fetchSentencesInChapter } from "../../../services/sentence.service";

const AddSentenceToChapter = ({ chapterId }: { chapterId: string }) => {
    const [sentences, setSentences] = useState<ISentence[]>([]);
    const [selectedSentenceId, setSelectedSentenceId] = useState<string | null>(null);
    const [chapterSentences, setChapterSentences] = useState<ISentence[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Fetch sentences not in any chapter
                const unreviewedSentences = await fetchSentences();
                setSentences(unreviewedSentences);

                // Fetch sentences in the selected chapter
                const sentencesInChapter = await fetchSentencesInChapter(chapterId);
                setChapterSentences(sentencesInChapter);
            } catch (error) {
                console.error("Failed to fetch data: ", error);
            }
        };

        loadData();
    }, [chapterId]);

    const handleAddSentence = async () => {
        if (!selectedSentenceId) {
            alert("Please select a sentence.");
            return;
        }

        try {
            await addSentenceToChapter(chapterId, selectedSentenceId);
            alert("Sentence added to chapter successfully!");

            // Refresh the lists
            const unreviewedSentences = await fetchSentences();
            setSentences(unreviewedSentences);

            const sentencesInChapter = await fetchSentencesInChapter(chapterId);
            setChapterSentences(sentencesInChapter);

            setSelectedSentenceId(null);
        } catch (error) {
            console.error("Failed to add sentence to chapter: ", error);
            alert("Failed to add sentence to chapter. Please try again.");
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-xl font-bold mb-2">Add Sentence to Chapter</h2>
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
                    className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-2"
                >
                    Add Sentence
                </button>
            </div>
            <div>
                <h2 className="text-xl font-bold mb-2">Sentences in Chapter</h2>
                <ul className="space-y-2">
                    {chapterSentences.map((sentence) => (
                        <li key={sentence.id} className="p-2 bg-gray-50 rounded-md">
                            {sentence.text} ({sentence.pronunciation})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AddSentenceToChapter;