import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../services/firebase";

export interface Sentence {
  id: string;
  pronunciation: string;
  meaning: string;
  text: string;
  type: string;
  examples: string[];
  isReviewed?: boolean;
}

export const fetchSentences = async (
  isReviewed = true
): Promise<Sentence[]> => {
  try {
    // Create a query to fetch only reviewed sentences
    const q = query(
      collection(db, "sentences"),
      where("isReviewed", "==", isReviewed) // Filter by isReviewed = true
    );

    const querySnapshot = await getDocs(q);
    const sentencesData: Sentence[] = [];

    querySnapshot.forEach((doc) => {
      sentencesData.push({ id: doc.id, ...doc.data() } as Sentence);
    });
    return sentencesData;
  } catch (error) {
    console.error("Error fetching sentences: ", error);
    throw error;
  }
};

export const saveVocab = async (vocabData: Sentence) => {
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
