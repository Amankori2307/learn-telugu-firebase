import { useState } from "react";
import { deleteChapter } from "../../services/chapter.service";

const useDeleteChapter = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleDeleteChapter = async (chapterId: string, onSuccess?: () => void) => {
        setLoading(true);
        setError(null);

        try {
            await deleteChapter(chapterId);
            if (onSuccess) onSuccess(); // Callback after successful deletion
        } catch (err) {
            console.error("Failed to delete chapter: ", err);
            setError("Failed to delete chapter. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        handleDeleteChapter,
    };
};

export default useDeleteChapter;