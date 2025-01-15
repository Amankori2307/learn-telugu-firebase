import { addDoc, collection, getDocs } from "firebase/firestore";
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

export const fetchSentences = async (): Promise<Sentence[]> => {
  const querySnapshot = await getDocs(collection(db, "sentences"));
  const sentencesData: Sentence[] = [];
  querySnapshot.forEach((doc) => {
    sentencesData.push({ id: doc.id, ...doc.data() } as Sentence);
  });
  return sentencesData;
};

export const saveVocab = async (vocabData: Sentence) => {
  try {
    const docRef = await addDoc(collection(db, "sentences"), {
      ...vocabData,
      isReviewed: false, // Set isReviewed to false by default
    });
    console.log("Vocab saved with ID: ", docRef.id);
    return docRef.id; // Return the document ID (optional)
  } catch (error) {
    console.error("Error saving vocab: ", error);
    throw error;
  }
};
