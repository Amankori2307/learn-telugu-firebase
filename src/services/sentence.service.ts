import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

export interface Sentence {
  id: string;
  pronunciation: string;
  meaning: string;
  text: string;
  type: string;
  examples: string[];
}

export const fetchSentences = async (): Promise<Sentence[]> => {
  const querySnapshot = await getDocs(collection(db, "sentences"));
  const sentencesData: Sentence[] = [];
  querySnapshot.forEach((doc) => {
    sentencesData.push({ id: doc.id, ...doc.data() } as Sentence);
  });
  return sentencesData;
};