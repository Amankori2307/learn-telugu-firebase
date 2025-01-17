import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IChapter } from "../../../interfaces/chapter.interfaces";
import { ISentence } from "../../../interfaces/vocab.interfaces";
import { fetchChapterDetails, removeSentenceFromChapter } from "../../../services/chapter.service";
import { fetchSentencesInChapter } from "../../../services/sentence.service";
import AddSentencePopup from "../../sub-components/chapter/add-sentences-popup";

const ChapterDetailsPage = () => {
    const { chapterId } = useParams<{ chapterId: string }>();
    const [chapter, setChapter] = useState<IChapter | null>(null);
    const [sentences, setSentences] = useState<ISentence[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showAddSentencePopup, setShowAddSentencePopup] = useState(false);

    const togglePopup = () => {
        setShowAddSentencePopup(!showAddSentencePopup)
    }
    const loadData = async () => {
        if (chapterId) {
            try {
                setLoading(true);

                // Fetch chapter details
                const chapterData = await fetchChapterDetails(chapterId);
                setChapter(chapterData);

                // Fetch sentences in the chapter
                const sentencesData = await fetchSentencesInChapter(chapterId);
                setSentences(sentencesData);
            } catch (error) {
                console.error("Failed to fetch data: ", error);
            } finally {
                setLoading(false);
            }
        }
    };
    useEffect(() => {


        loadData();
    }, [chapterId]);

    const handleRemoveSentence = async (sentenceId: string) => {
        if (chapterId) {
            try {
                await removeSentenceFromChapter(chapterId, sentenceId);
                setSentences((prev) => prev.filter((sentence) => sentence.id !== sentenceId));
                alert("Sentence removed from chapter successfully!");
            } catch (error) {
                console.error("Failed to remove sentence: ", error);
                alert("Failed to remove sentence. Please try again.");
            }
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Chapter Details */}
                {chapter && (
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">{chapter.name}</h1>
                        <p className="text-gray-600">{chapter.sentenceIds?.length || 0} sentences</p>
                        <button
                            type="submit"
                            onClick={togglePopup}
                            disabled={loading}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300"
                        >
                            Add Sentences
                        </button>
                    </div>
                )}

                {/* Sentences List */}
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : sentences.length === 0 ? (
                    <p className="text-gray-500">No sentences found in this chapter.</p>
                ) : (
                    <ul className="space-y-3">
                        {sentences.map((sentence) => (
                            <li
                                key={sentence.id}
                                className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
                            >
                                <span className="text-gray-700">
                                    {sentence.text} ({sentence.pronunciation})
                                </span>
                                <button
                                    onClick={() => handleRemoveSentence(sentence.id!)}
                                    className="p-2 text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {
                chapterId && showAddSentencePopup && <AddSentencePopup
                    chapterId={chapterId}
                    onClose={togglePopup}
                    onSentencesAdded={loadData}
                />
            }

        </div>
    );
};

export default ChapterDetailsPage;