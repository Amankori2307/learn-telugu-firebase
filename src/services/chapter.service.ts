import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { ISentence } from "../interfaces/vocab.interfaces";

export const fetchSentences = async (
  isReviewed = true
): Promise<ISentence[]> => {
  try {
    // Create a query to fetch only reviewed sentences
    const q = query(
      collection(db, "sentences"),
      where("isReviewed", "==", isReviewed) // Filter by isReviewed = true
    );

    const querySnapshot = await getDocs(q);
    const sentencesData: ISentence[] = [];

    querySnapshot.forEach((doc) => {
      sentencesData.push({ id: doc.id, ...doc.data() } as ISentence);
    });
    return sentencesData;
  } catch (error) {
    console.error("Error fetching sentences: ", error);
    throw error;
  }
};

export const saveVocab = async (vocabData: ISentence) => {
  try {
    const docRef = await addDoc(collection(db, "sentences"), {
      ...vocabData,
      isReviewed: false, // Set isReviewed to false by default
    });
    return docRef.id; // Return the document ID (optional)
  } catch (error) {
    console.error("Error saving vocab: ", error);
    throw error;
  }
};

// Mark a sentence as reviewed
export const markAsReviewed = async (id: string) => {
  try {
    const sentenceRef = doc(db, "sentences", id);
    await updateDoc(sentenceRef, { isReviewed: true });
  } catch (error) {
    console.error("Error marking sentence as reviewed: ", error);
    throw error;
  }
};

// Delete a sentence
export const deleteSentence = async (id: string) => {
  try {
    const sentenceRef = doc(db, "sentences", id);
    await deleteDoc(sentenceRef);
  } catch (error) {
    console.error("Error deleting sentence: ", error);
    throw error;
  }
};

export const addSentenceToChapter = async (
  chapterId: string,
  sentenceId: string
): Promise<void> => {
  try {
    // Check if the sentence already belongs to another chapter
    const sentenceRef = doc(db, "sentences", sentenceId);
    const sentenceDoc = await getDoc(sentenceRef);

    if (!sentenceDoc.exists()) {
      throw new Error("Sentence not found");
    }

    const sentenceData = sentenceDoc.data();
    if (sentenceData.chapterId) {
      throw new Error("Sentence already belongs to another chapter");
    }

    // Add the sentence to the chapter
    const chapterRef = doc(db, "chapters", chapterId);
    await updateDoc(chapterRef, {
      sentenceIds: [...(sentenceData.sentenceIds || []), sentenceId],
    });

    // Update the sentence to include the chapter ID
    await updateDoc(sentenceRef, {
      chapterId,
    });

    console.log("Sentence added to chapter successfully");
  } catch (error) {
    console.error("Error adding sentence to chapter: ", error);
    throw error;
  }
};
