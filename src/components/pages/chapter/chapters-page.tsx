// src/pages/ChaptersPage.tsx
import { useEffect, useState } from "react";
import { IChapter } from "../../../interfaces/chapter.interfaces";
import { ISentence } from "../../../interfaces/vocab.interfaces";
import { fetchChapters, removeSentenceFromChapter } from "../../../services/chapter.service";
import { fetchSentencesInChapter } from "../../../services/sentence.service";

const ChaptersPage = () => {
    const [chapters, setChapters] = useState<IChapter[]>([]);
    const [selectedChapter, setSelectedChapter] = useState<IChapter | null>(null);
    const [sentences, setSentences] = useState<ISentence[]>([]);
    const [loadingChapters, setLoadingChapters] = useState<boolean>(true);
    const [loadingSentences, setLoadingSentences] = useState<boolean>(false);

    useEffect(() => {
        const loadChapters = async () => {
            try {
                setLoadingChapters(true);
                const chaptersData = await fetchChapters();
                setChapters(chaptersData);
            } catch (error) {
                console.error("Failed to fetch chapters: ", error);
            } finally {
                setLoadingChapters(false);
            }
        };

        loadChapters();
    }, []);

    useEffect(() => {
        const loadSentences = async () => {
            if (selectedChapter) {
                try {
                    setLoadingSentences(true);
                    const sentencesData = await fetchSentencesInChapter(selectedChapter.id);
                    setSentences(sentencesData);
                } catch (error) {
                    console.error("Failed to fetch sentences: ", error);
                } finally {
                    setLoadingSentences(false);
                }
            }
        };

        loadSentences();
    }, [selectedChapter]);

    const handleRemoveSentence = async (sentenceId: string) => {
        if (selectedChapter) {
            try {
                await removeSentenceFromChapter(selectedChapter.id, sentenceId);
                setSentences((prev) => prev.filter((sentence) => sentence.id !== sentenceId));
                alert("Sentence removed from chapter successfully!");
            } catch (error) {
                console.error("Failed to remove sentence: ", error);
                alert("Failed to remove sentence. Please try again.");
            }
        }
    };

    return (
        <div className="flex h-screen p-6 bg-gray-100">
            {/* Left Side: Chapter List */}
            <div className="w-1/4 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Chapters</h2>
                {loadingChapters ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : chapters.length === 0 ? (
                    <p className="text-gray-500">No chapters found.</p>
                ) : (
                    <ul className="space-y-3">
                        {chapters.map((chapter) => (
                            <li
                                key={chapter.id}
                                onClick={() => setSelectedChapter(chapter)}
                                className={`p-3 cursor-pointer rounded-lg transition-all ${selectedChapter?.id === chapter.id
                                        ? "bg-blue-500 text-white shadow-lg"
                                        : "bg-gray-50 hover:bg-gray-100 hover:shadow-md"
                                    }`}
                            >
                                <span className="font-medium">{chapter.name}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Right Side: Sentences in Selected Chapter */}
            <div className="w-3/4 p-6 ml-6 bg-white rounded-lg shadow-md">
                {selectedChapter ? (
                    <>
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">
                            Sentences in "{selectedChapter.name}"
                        </h2>
                        {loadingSentences ? (
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
                                        className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all"
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
                    </>
                ) : (
                    <p className="text-gray-500">Select a chapter to view its sentences.</p>
                )}
            </div>
        </div>
    );
};

export default ChaptersPage;