import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import {
  IVocabularyEntry,
  VocabularyTypeEnum,
} from "../../../interfaces/vocab.interfaces";
import {
  createVocabularyEntry,
  updateVocabularyEntry,
} from "../../../services/vocabulary.service";
import VocabFormUI from "./vocab-form-ui";

// Define the validation schema using Yup
const validationSchema = Yup.object({
  type: Yup.string().required("Type is required"),
  text: Yup.string().required("Text is required"),
  meaning: Yup.string().required("Meaning is required"),
  pronunciation: Yup.string().required("Pronunciation is required"),
  examples: Yup.array().of(Yup.string().required("Example cannot be empty")),
});

interface VocabFormContainerProps {
  initialValues?: IVocabularyEntry;
  onSuccess?: () => void;
  isEditMode?: boolean;
}

const VocabFormContainer: React.FC<VocabFormContainerProps> = ({
  initialValues,
  onSuccess,
  isEditMode = false,
}) => {
  const formik = useFormik({
    initialValues: {
      type: "sentence",
      text: "",
      meaning: "",
      pronunciation: "",
      examples: [""],
      ...initialValues, // Override with initialValues if provided
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (isEditMode && initialValues?.id) {
          // Update the vocab data in Firebase
          await updateVocabularyEntry(initialValues.id, {
            ...(values as IVocabularyEntry),
          });
          alert("Vocab updated successfully!");
        } else {
          // Save the vocab data to Firebase
          await createVocabularyEntry({
            ...(values as IVocabularyEntry),
            isReviewed: false, // Set isReviewed to false by default
          });
          alert("Vocab added successfully!");
        }

        formik.resetForm(); // Reset the form after submission
        onSuccess?.(); // Call the onSuccess callback if provided
      } catch (error) {
        console.error("Error saving vocab: ", error);
        alert(`Failed to save vocab. Please try again. (Error: ${error})`);
      }
    },
  });

  // Effect to update form values when initialValues change
  useEffect(() => {
    if (initialValues) {
      formik.setValues({
        type: initialValues.type || VocabularyTypeEnum.Sentence,
        text: initialValues.text || "",
        meaning: initialValues.meaning || "",
        pronunciation: initialValues.pronunciation || "",
        examples: initialValues.examples || [""],
      });
    }
  }, [initialValues]);

  return (
    <VocabFormUI
      values={formik.values}
      errors={formik.errors}
      touched={formik.touched}
      handleChange={formik.handleChange}
      handleBlur={formik.handleBlur}
      handleSubmit={formik.handleSubmit}
      setFieldValue={formik.setFieldValue}
      isEditMode={isEditMode}
    />
  );
};

export default VocabFormContainer;
