// src/components/CreateChapter.tsx
import { useState } from "react";
import { createChapter } from "../../../services/chapter.service";

const CreateChapter = () => {
    const [name, setName] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createChapter(name);
            alert("Chapter created successfully!");
            setName("");
        } catch (error) {
            console.error("Failed to create chapter: ", error);
            alert("Failed to create chapter. Please try again.");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Create Chapter</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Create Chapter
                </button>
            </form>
        </div>
    );
};

export default CreateChapter;