import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
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

    // Check if the sentence is already in the chapter
    const chapterRef = doc(db, "chapters", chapterId);
    const chapterDoc = await getDoc(chapterRef);

    if (!chapterDoc.exists()) {
      throw new Error("Chapter not found");
    }

    const chapterData = chapterDoc.data();
    if (chapterData.sentenceIds?.includes(sentenceId)) {
      throw new Error("Sentence already exists in this chapter");
    }

    // Add the sentence to the chapter's sentenceIds array (using arrayUnion to avoid duplicates)
    await updateDoc(chapterRef, {
      sentenceIds: arrayUnion(sentenceId),
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

export const removeSentenceFromChapter = async (
  chapterId: string,
  sentenceId: string
): Promise<void> => {
  try {
    const chapterRef = doc(db, "chapters", chapterId);
    await updateDoc(chapterRef, {
      sentenceIds: arrayRemove(sentenceId),
    });

    const sentenceRef = doc(db, "sentences", sentenceId);
    await updateDoc(sentenceRef, {
      chapterId: null,
    });

    console.log("Sentence removed from chapter successfully");
  } catch (error) {
    console.error("Error removing sentence from chapter: ", error);
    throw error;
  }
};

export const deleteChapter = async (chapterId: string): Promise<void> => {
  try {
    // Step 1: Fetch the chapter to get its sentenceIds
    const chapterRef = doc(db, "chapters", chapterId);
    const chapterDoc = await getDoc(chapterRef);

    if (!chapterDoc.exists()) {
      throw new Error("Chapter not found");
    }

    const chapterData = chapterDoc.data();
    const sentenceIds = chapterData.sentenceIds || [];

    // Step 2: Remove the chapterId from all associated sentences
    for (const sentenceId of sentenceIds) {
      const sentenceRef = doc(db, "sentences", sentenceId);
      await updateDoc(sentenceRef, {
        chapterId: null, // Remove the chapterId association
      });
    }

    // Step 3: Delete the chapter
    await deleteDoc(chapterRef);

    console.log("Chapter and its associations deleted successfully");
  } catch (error) {
    console.error("Error deleting chapter: ", error);
    throw error;
  }
};

export const fetchChapterDetails = async (
  chapterId: string
): Promise<IChapter | null> => {
  try {
    const chapterRef = doc(db, "chapters", chapterId);
    const chapterDoc = await getDoc(chapterRef);

    if (!chapterDoc.exists()) {
      throw new Error("Chapter not found");
    }

    return { id: chapterDoc.id, ...chapterDoc.data() } as IChapter;
  } catch (error) {
    console.error("Error fetching chapter details: ", error);
    throw error;
  }
};
