import { useState } from "react";
import { createChapter } from "../../services/chapter.service";

const useCreateChapter = () => {
    const [name, setName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent, onCreateChapter: () => void) => {
        e.preventDefault();
        if (!name.trim()) {
            setError("Chapter name is required.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await createChapter(name);
            alert("Chapter created successfully!");
            setName("");
            await onCreateChapter(); // Refresh the chapter list
        } catch (err) {
            console.error("Failed to create chapter: ", err);
            setError(`Failed to create chapter. Please try again. \n\n (Error: ${err})`);
        } finally {
            setLoading(false);
        }
    };

    return {
        name,
        setName,
        loading,
        error,
        handleSubmit,
    };
};

export default useCreateChapter;