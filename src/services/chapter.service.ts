import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { IChapter } from "../interfaces/chapter.interfaces";
import { db } from "./firebase";

export const createChapter = async (name: string): Promise<string> => {
  try {
    const chapterRef = await addDoc(collection(db, "chapters"), {
      name,
      sentenceIds: [], // Start with an empty list of sentences
    });
    console.log("Chapter created with ID: ", chapterRef.id);
    return chapterRef.id;
  } catch (error) {
    console.error("Error creating chapter: ", error);
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

export const fetchChapters = async (): Promise<IChapter[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "chapters"));
    const chapters: IChapter[] = [];

    querySnapshot.forEach((doc) => {
      chapters.push({ id: doc.id, ...doc.data() } as IChapter);
    });

    return chapters;
  } catch (error) {
    console.error("Error fetching chapters: ", error);
    throw error;
  }
};
