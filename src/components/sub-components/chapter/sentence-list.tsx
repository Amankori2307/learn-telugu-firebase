// src/components/SentenceList.tsx
import { ISentence } from "../../../interfaces/vocab.interfaces";

interface SentenceListProps {
    sentences: ISentence[];
    onRemoveSentence: (sentenceId: string) => void;
    loading: boolean;
}

const SentenceList = ({ sentences, onRemoveSentence, loading }: SentenceListProps) => {
    return (
        <div className="w-3/4 p-6 ml-6 bg-white rounded-lg shadow-md relative">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Sentences</h2>
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : sentences.length === 0 ? (
                <p className="text-gray-500">No sentences found.</p>
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
                                onClick={() => onRemoveSentence(sentence.id!)}
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
    );
};

export default SentenceList;