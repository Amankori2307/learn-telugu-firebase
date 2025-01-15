import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
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
  try {
    // Create a query to fetch only reviewed sentences
    const q = query(
      collection(db, "sentences"),
      where("isReviewed", "==", true) // Filter by isReviewed = true
    );

    const querySnapshot = await getDocs(q);
    const sentencesData: Sentence[] = [];

    querySnapshot.forEach((doc) => {
      sentencesData.push({ id: doc.id, ...doc.data() } as Sentence);
    });
    console.log(sentencesData);
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
    console.log("Vocab saved with ID: ", docRef.id);
    return docRef.id; // Return the document ID (optional)
  } catch (error) {
    console.error("Error saving vocab: ", error);
    throw error;
  }
};
