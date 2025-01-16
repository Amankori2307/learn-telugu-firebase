// src/components/AddVocabForm.tsx
import { useFormik } from "formik";
import * as Yup from "yup";
import { saveVocab, Sentence } from "../../../services/sentence.service";

// Define the validation schema using Yup
const validationSchema = Yup.object({
    type: Yup.string().required("Type is required"),
    text: Yup.string().required("Text is required"),
    meaning: Yup.string().required("Meaning is required"),
    pronunciation: Yup.string().required("Pronunciation is required"),
    examples: Yup.array().of(Yup.string().required("Example cannot be empty")),
});

const AddVocabForm = () => {
    const formik = useFormik({
        initialValues: {
            type: "sentence",
            text: "",
            meaning: "",
            pronunciation: "",
            examples: [""], // Initialize with one empty example
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                // Save the vocab data to Firebase
                await saveVocab({
                    ...values as Sentence,
                    isReviewed: false, // Set isReviewed to false by default
                });

                alert("Vocab added successfully!");
                formik.resetForm(); // Reset the form after submission
            } catch (error) {
                console.error("Error saving vocab: ", error);
                alert("Failed to save vocab. Please try again.");
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Type Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                    name="type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="sentence">Sentence</option>
                    <option value="word">Word</option>
                </select>
                {formik.touched.type && formik.errors.type && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.type}</p>
                )}
            </div>

            {/* Text Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Text</label>
                <input
                    type="text"
                    name="text"
                    value={formik.values.text}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter the text"
                />
                {formik.touched.text && formik.errors.text && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.text}</p>
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
                    value={formik.values.meaning}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter the meaning"
                />
                {formik.touched.meaning && formik.errors.meaning && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.meaning}</p>
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
                    value={formik.values.pronunciation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter the pronunciation"
                />
                {formik.touched.pronunciation && formik.errors.pronunciation && (
                    <p className="text-red-500 text-sm mt-1">
                        {formik.errors.pronunciation}
                    </p>
                )}
            </div>

            {/* Examples Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Examples
                </label>
                {formik.values.examples.map((example, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                        <input
                            name={`examples[${index}]`}
                            value={example}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder={`Example ${index + 1}`}
                        />
                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => {
                                    const newExamples = [...formik.values.examples];
                                    newExamples.splice(index, 1);
                                    formik.setFieldValue("examples", newExamples);
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
                        formik.setFieldValue("examples", [...formik.values.examples, ""]);
                    }}
                    className="mt-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    + Add Example
                </button>
                {formik.touched.examples && formik.errors.examples && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.examples}</p>
                )}
            </div>

            {/* Submit Button */}
            <div>
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Add Vocab
                </button>
            </div>
        </form>
    );
};

export default AddVocabForm;