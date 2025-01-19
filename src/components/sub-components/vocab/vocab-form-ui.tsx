import React from "react";
import ExampleField from "../../shared/example-input";
import InputField from "../../shared/input";
import SubmitButton from "../../shared/submit-btn";

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
    const handleAddExample = () => {
        setFieldValue("examples", [...values.examples, ""]);
    };

    const handleRemoveExample = (index: number) => {
        const newExamples = [...values.examples];
        newExamples.splice(index, 1);
        setFieldValue("examples", newExamples);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-4 w-full max-w-2xl mx-auto">
            {/* Type Field */}
            <InputField
                label="Type"
                name="type"
                value={values.type}
                onChange={handleChange}
                onBlur={handleBlur}
                as="select"
                options={[
                    { value: "sentence", label: "Sentence" },
                    { value: "word", label: "Word" },
                ]}
                error={errors.type}
                touched={touched.type}
            />

            {/* Text Field */}
            <InputField
                label="Text"
                name="text"
                value={values.text}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter the text"
                error={errors.text}
                touched={touched.text}
            />

            {/* Meaning Field */}
            <InputField
                label="Meaning"
                name="meaning"
                value={values.meaning}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter the meaning"
                error={errors.meaning}
                touched={touched.meaning}
            />

            {/* Pronunciation Field */}
            <InputField
                label="Pronunciation"
                name="pronunciation"
                value={values.pronunciation}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter the pronunciation"
                error={errors.pronunciation}
                touched={touched.pronunciation}
            />

            {/* Examples Field */}
            <ExampleField
                examples={values.examples}
                onChange={handleChange}
                onBlur={handleBlur}
                onAddExample={handleAddExample}
                onRemoveExample={handleRemoveExample}
                error={errors.examples as string}
                touched={touched.examples}
            />

            {/* Submit Button */}
            <SubmitButton label={isEditMode ? "Update Vocab" : "Add Vocab"} />
        </form>
    );
};

export default VocabFormUI;