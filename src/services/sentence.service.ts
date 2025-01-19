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
import { ISentence } from "../interfaces/vocab.interfaces";
import { db } from "../services/firebase";

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

export const fetchSentencesInChapter = async (
  chapterId: string
): Promise<ISentence[]> => {
  try {
    const chapterRef = doc(db, "chapters", chapterId);
    const chapterDoc = await getDoc(chapterRef);

    if (!chapterDoc.exists()) {
      throw new Error("Chapter not found");
    }

    const chapterData = chapterDoc.data();
    const sentenceIds = chapterData.sentenceIds || [];

    const sentences: ISentence[] = [];
    for (const sentenceId of sentenceIds) {
      const sentenceRef = doc(db, "sentences", sentenceId);
      const sentenceDoc = await getDoc(sentenceRef);

      if (sentenceDoc.exists()) {
        sentences.push({
          id: sentenceDoc.id,
          ...sentenceDoc.data(),
        } as ISentence);
      }
    }

    return sentences;
  } catch (error) {
    console.error("Error fetching sentences in chapter: ", error);
    throw error;
  }
};

export const fetchOrphanSentences = async (): Promise<ISentence[]> => {
  try {
    // Fetch all sentences
    const sentencesRef = collection(db, "sentences");
    const sentencesSnapshot = await getDocs(sentencesRef);

    // Fetch all chapters and collect their sentenceIds
    const chaptersRef = collection(db, "chapters");
    const chaptersSnapshot = await getDocs(chaptersRef);

    // Create a Set of all sentenceIds that belong to chapters
    const sentenceIdsInChapters = new Set<string>();
    chaptersSnapshot.forEach((chapterDoc) => {
      const chapterData = chapterDoc.data();
      if (chapterData.sentenceIds && Array.isArray(chapterData.sentenceIds)) {
        chapterData.sentenceIds.forEach((sentenceId: string) => {
          sentenceIdsInChapters.add(sentenceId);
        });
      }
    });

    // Filter out sentences that are not in any chapter
    const orphanSentences: ISentence[] = [];
    sentencesSnapshot.forEach((sentenceDoc) => {
      const sentenceData = sentenceDoc.data();
      if (!sentenceIdsInChapters.has(sentenceDoc.id)) {
        orphanSentences.push({
          id: sentenceDoc.id,
          ...sentenceData,
        } as ISentence);
      }
    });

    return orphanSentences;
  } catch (error) {
    console.error("Error fetching orphan sentences: ", error);
    throw error;
  }
};


export const updateVocab = async (docId: string, vocabData: ISentence) => {
  try {
    // Reference the document to update
    const docRef = doc(db, "sentences", docId);

    // Update the document with the new data
    await updateDoc(docRef, {
      ...vocabData,
    });

    console.log("Vocab updated successfully!");
  } catch (error) {
    console.error("Error updating vocab: ", error);
    throw error;
  }
};