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
import { CollectionEnum } from "../enums/db.enums";
import { VocabularyEntry } from "../interfaces/vocab.interfaces";
import { db } from "../services/firebase";

export const fetchSentences = async (
  isReviewed = true
): Promise<VocabularyEntry[]> => {
  try {
    // Create a query to fetch only reviewed sentences
    const q = query(
      collection(db, CollectionEnum.Vocab),
      where("isReviewed", "==", isReviewed) // Filter by isReviewed = true
    );

    const querySnapshot = await getDocs(q);
    const sentencesData: VocabularyEntry[] = [];

    querySnapshot.forEach((doc) => {
      sentencesData.push({ id: doc.id, ...doc.data() } as VocabularyEntry);
    });
    return sentencesData;
  } catch (error) {
    console.error("Error fetching sentences: ", error);
    throw error;
  }
};

export const saveVocab = async (vocabData: VocabularyEntry) => {
  try {
    const sentencesRef = collection(db, CollectionEnum.Vocab);

    // Create a lowercase version of the text for case-insensitive comparison
    const textLowercase = vocabData.text.toLowerCase();

    // Query for duplicates using the lowercase version
    const q = query(sentencesRef, where("textLowercase", "==", textLowercase));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      throw new Error(
        "Duplicate text found: A document with the same text already exists."
      );
    }

    // If no duplicate is found, add the new document
    const docRef = await addDoc(sentencesRef, {
      ...vocabData,
      textLowercase: textLowercase, // Store the lowercase version
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
    const sentenceRef = doc(db, CollectionEnum.Vocab, id);
    await updateDoc(sentenceRef, { isReviewed: true });
  } catch (error) {
    console.error("Error marking sentence as reviewed: ", error);
    throw error;
  }
};

// Delete a sentence
export const deleteSentence = async (id: string) => {
  try {
    const sentenceRef = doc(db, CollectionEnum.Vocab, id);
    await deleteDoc(sentenceRef);
  } catch (error) {
    console.error("Error deleting sentence: ", error);
    throw error;
  }
};

export const fetchSentencesInChapter = async (
  chapterId: string
): Promise<VocabularyEntry[]> => {
  try {
    const chapterRef = doc(db, CollectionEnum.Chapter, chapterId);
    const chapterDoc = await getDoc(chapterRef);

    if (!chapterDoc.exists()) {
      throw new Error("Chapter not found");
    }

    const chapterData = chapterDoc.data();
    const sentenceIds = chapterData.sentenceIds || [];

    const sentences: VocabularyEntry[] = [];
    for (const sentenceId of sentenceIds) {
      const sentenceRef = doc(db, CollectionEnum.Vocab, sentenceId);
      const sentenceDoc = await getDoc(sentenceRef);

      if (sentenceDoc.exists()) {
        sentences.push({
          id: sentenceDoc.id,
          ...sentenceDoc.data(),
        } as VocabularyEntry);
      }
    }

    return sentences;
  } catch (error) {
    console.error("Error fetching sentences in chapter: ", error);
    throw error;
  }
};

export const fetchOrphanSentences = async (): Promise<VocabularyEntry[]> => {
  try {
    // Fetch all sentences
    const sentencesRef = collection(db, CollectionEnum.Vocab);
    const sentencesQuery = query(sentencesRef, where("isReviewed", "==", true));
    const sentencesSnapshot = await getDocs(sentencesQuery);

    // Fetch all chapters and collect their sentenceIds
    const chaptersRef = collection(db, CollectionEnum.Chapter);
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
    const orphanSentences: VocabularyEntry[] = [];
    sentencesSnapshot.forEach((sentenceDoc) => {
      const sentenceData = sentenceDoc.data();
      if (!sentenceIdsInChapters.has(sentenceDoc.id)) {
        orphanSentences.push({
          id: sentenceDoc.id,
          ...sentenceData,
        } as VocabularyEntry);
      }
    });

    return orphanSentences;
  } catch (error) {
    console.error("Error fetching orphan sentences: ", error);
    throw error;
  }
};

export const updateVocab = async (
  docId: string,
  vocabData: VocabularyEntry
) => {
  try {
    // Reference the document to update
    const docRef = doc(db, CollectionEnum.Vocab, docId);

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

export const fetchVocabById = async (id: string): Promise<VocabularyEntry> => {
  try {
    const docRef = doc(db, CollectionEnum.Vocab, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Sentence not found");
    }

    return { id: docSnap.id, ...docSnap.data() } as VocabularyEntry;
  } catch (error) {
    console.error("Error fetching sentence: ", error);
    throw error;
  }
};
