// src/components/AddSentencePopup.tsx
import { ISentence } from "../../../interfaces/vocab.interfaces";

interface AddSentencePopupProps {
    selectedChapterId: string;
    availableSentences: ISentence[];
    onAddSentence: (sentenceId: string) => void;
    onClose: () => void;
}

const AddSentencePopup = ({
    availableSentences,
    onAddSentence,
    onClose,
}: AddSentencePopupProps) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h3 className="text-xl font-bold mb-4">Add Sentence to Chapter</h3>
                <ul className="space-y-2">
                    {availableSentences.map((sentence) => (
                        <li
                            key={sentence.id}
                            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all"
                        >
                            <span className="text-gray-700">
                                {sentence.text} ({sentence.pronunciation})
                            </span>
                            <button
                                onClick={() => onAddSentence(sentence.id!)}
                                className="p-2 text-blue-500 hover:text-blue-700 transition-colors"
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
                <button
                    onClick={onClose}
                    className="mt-4 w-full p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default AddSentencePopup;