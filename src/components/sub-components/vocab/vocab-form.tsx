import React from "react";

interface VocabFormUIProps {
    values: {
        type: string;
        text: string;
        meaning: string;
        pronunciation: string;
        examples: string[];
    };
    errors: {
        type?: string;
        text?: string;
        meaning?: string;
        pronunciation?: string;
        examples?: string | string[];
    };
    touched: {
        type?: boolean;
        text?: boolean;
        meaning?: boolean;
        pronunciation?: boolean;
        examples?: boolean;
    };
    handleChange: (e: React.ChangeEvent<unknown>) => void;
    handleBlur: (e: React.FocusEvent<unknown>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    setFieldValue: (field: string, value: unknown) => void;
    isEditMode?: boolean;
}

const VocabFormUI: React.FC<VocabFormUIProps> = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    isEditMode = false,
}) => {
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="sentence">Sentence</option>
                    <option value="word">Word</option>
                </select>
                {touched.type && errors.type && (
                    <p className="text-red-500 text-sm mt-1">{errors.type}</p>
                )}
            </div>

            {/* Text Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Text</label>
                <input
                    type="text"
                    name="text"
                    value={values.text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter the text"
                />
                {touched.text && errors.text && (
                    <p className="text-red-500 text-sm mt-1">{errors.text}</p>
                )}
            </div>

            {/* Meaning Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Meaning
                </label>
                <input
                    type="text"
                    name="meaning"
                    value={values.meaning}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter the meaning"
                />
                {touched.meaning && errors.meaning && (
                    <p className="text-red-500 text-sm mt-1">{errors.meaning}</p>
                )}
            </div>

            {/* Pronunciation Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Pronunciation
                </label>
                <input
                    type="text"
                    name="pronunciation"
                    value={values.pronunciation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter the pronunciation"
                />
                {touched.pronunciation && errors.pronunciation && (
                    <p className="text-red-500 text-sm mt-1">{errors.pronunciation}</p>
                )}
            </div>

            {/* Examples Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Examples
                </label>
                {values.examples.map((example, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                        <input
                            name={`examples[${index}]`}
                            value={example}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder={`Example ${index + 1}`}
                        />
                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => {
                                    const newExamples = [...values.examples];
                                    newExamples.splice(index, 1);
                                    setFieldValue("examples", newExamples);
                                }}
                                className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => {
                        setFieldValue("examples", [...values.examples, ""]);
                    }}
                    className="mt-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    + Add Example
                </button>
                {touched.examples && errors.examples && (
                    <p className="text-red-500 text-sm mt-1">{errors.examples}</p>
                )}
            </div>

            {/* Submit Button */}
            <div>
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    {isEditMode ? "Update Vocab" : "Add Vocab"}
                </button>
            </div>
        </form>
    );
};

export default VocabFormUI;