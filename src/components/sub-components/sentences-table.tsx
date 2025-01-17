import { ISentence } from "../../interfaces/vocab.interfaces";

interface SentenceTableProps {
    sentences: ISentence[];
}

const SentenceTable = ({ sentences }: SentenceTableProps) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sentence
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Pronunciation
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Meaning
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {sentences.map((sentence) => (
                        <tr key={sentence.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {sentence.text}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {sentence.pronunciation}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {sentence.meaning}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SentenceTable;