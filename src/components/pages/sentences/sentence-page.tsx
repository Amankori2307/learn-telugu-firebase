// src/pages/SentencesPage.tsx
import { useEffect, useState } from "react";
import { ISentence } from "../../../interfaces/vocab.interfaces";
import { fetchSentences } from "../../../services/sentence.service";
import DownloadButton from "../../sub-components/download-button";
import SentenceTable from "../../sub-components/sentences-table";

const SentencesPage = () => {
    const [sentences, setSentences] = useState<ISentence[]>([]);

    useEffect(() => {
        const loadSentences = async () => {
            try {
                const sentencesData = await fetchSentences();
                setSentences(sentencesData);
            } catch (error) {
                console.error("Failed to fetch sentences: ", error);
            }
        };

        loadSentences();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Sentences ({sentences.length})</h1>
            <div className="mb-4">
                <DownloadButton data={sentences} fileName="sentences.json" />
            </div>
            <SentenceTable sentences={sentences} />
        </div>
    );
};

export default SentencesPage;