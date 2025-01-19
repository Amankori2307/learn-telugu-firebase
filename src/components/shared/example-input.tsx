import React from "react";

interface ExampleFieldProps {
    examples: string[];
    onChange: (e: React.ChangeEvent<unknown>) => void;
    onBlur: (e: React.FocusEvent<unknown>) => void;
    onAddExample: () => void;
    onRemoveExample: (index: number) => void;
    error?: string;
    touched?: boolean;
}

const ExampleField: React.FC<ExampleFieldProps> = ({
    examples,
    onChange,
    onBlur,
    onAddExample,
    onRemoveExample,
    error,
    touched,
}) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Examples
            </label>
            {examples.map((example, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                    <input
                        name={`examples[${index}]`}
                        value={example}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={`Example ${index + 1}`}
                        className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                    {index > 0 && (
                        <button
                            type="button"
                            onClick={() => onRemoveExample(index)}
                            className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                        >
                            Remove
                        </button>
                    )}
                </div>
            ))}
            <button
                type="button"
                onClick={onAddExample}
                className="mt-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
                + Add Example
            </button>
            {touched && error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </div>
    );
};

export default ExampleField;