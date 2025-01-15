// src/components/AddVocabForm.tsx
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Define the schema for validation
const schema = yup.object().shape({
    type: yup.string().required("Type is required"),
    text: yup.string().required("Text is required"),
    meaning: yup.string().required("Meaning is required"),
    pronunciation: yup.string().required("Pronunciation is required"),
    examples: yup.array().of(yup.string()).optional(), // Make this optional
});

type FormData = {
    type: string;
    text: string;
    meaning: string;
    pronunciation: string;
    examples?: string[]; // Make this optional
};

const AddVocabForm = () => {
    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            type: "sentence",
            examples: [], // Explicitly set to an empty array
        },
    });

    const onSubmit = (data: FormData) => {
        console.log(data); // Handle form submission (e.g., send to an API)
        alert("Vocab added successfully!");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Type Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                    {...register("type")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                >
                    <option value="sentence">Sentence</option>
                    <option value="word">Word</option>
                </select>
                {errors.type && (
                    <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
                )}
            </div>

            {/* Text Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Text</label>
                <input
                    type="text"
                    {...register("text")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
                {errors.text && (
                    <p className="text-red-500 text-sm mt-1">{errors.text.message}</p>
                )}
            </div>

            {/* Meaning Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Meaning
                </label>
                <input
                    type="text"
                    {...register("meaning")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
                {errors.meaning && (
                    <p className="text-red-500 text-sm mt-1">{errors.meaning.message}</p>
                )}
            </div>

            {/* Pronunciation Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Pronunciation
                </label>
                <input
                    type="text"
                    {...register("pronunciation")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
                {errors.pronunciation && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.pronunciation.message}
                    </p>
                )}
            </div>

            {/* Examples Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Examples (Optional)
                </label>
                <Controller
                    name="examples"
                    control={control}
                    defaultValue={[]} // Set default value to an empty array
                    render={({ field }) => (
                        <textarea
                            {...field}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            placeholder="Enter examples, one per line"
                            rows={4}
                            onChange={(e) =>
                                field.onChange(e.target.value.split("\n").filter(Boolean))
                            }
                        />
                    )}
                />
                {errors.examples && (
                    <p className="text-red-500 text-sm mt-1">{errors.examples.message}</p>
                )}
            </div>

            {/* Submit Button */}
            <div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                    Add Vocab
                </button>
            </div>
        </form>
    );
};

export default AddVocabForm;