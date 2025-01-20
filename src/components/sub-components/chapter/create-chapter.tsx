import React from "react";
import useCreateChapter from "../../../hooks/chapter/use-create-chapter";

interface CreateChapterProps {
    onCreateChapter: () => void;
}

const CreateChapter: React.FC<CreateChapterProps> = ({ onCreateChapter }) => {
    const { name, setName, loading, error, handleSubmit } = useCreateChapter();

    return (
        <div className="pb-10">
            <h2 className="text-xl font-bold mb-4">Create Chapter</h2>
            <form onSubmit={(e) => handleSubmit(e, onCreateChapter)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Chapter Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                {error && <p className="text-red-500 text-sm whitespace-pre-wrap">{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                >
                    {loading ? "Creating..." : "Create Chapter"}
                </button>
            </form>
        </div>
    );
};

export default CreateChapter;