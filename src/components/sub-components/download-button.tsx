// src/components/DownloadButton.tsx
import { saveAs } from "file-saver";
import { ISentence } from "../../interfaces/vocab.interfaces";

interface DownloadButtonProps {
    data: Array<ISentence>; // The data to be downloaded
    fileName?: string; // Optional: Custom file name
}

const DownloadButton = ({ data, fileName = "data.json" }: DownloadButtonProps) => {
    const handleDownload = () => {
        // Convert the data to a JSON string
        const jsonString = JSON.stringify(data, null, 2); // Pretty-print JSON
        const blob = new Blob([jsonString], { type: "application/json" });

        // Trigger the download
        saveAs(blob, fileName);
    };

    return (
        <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
            Download Data
        </button>
    );
};

export default DownloadButton;