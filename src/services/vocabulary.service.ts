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
import { IChapter } from "../interfaces/chapter.interfaces";
import { VocabularyEntry } from "../interfaces/vocab.interfaces";
import { db } from "./firebase";

/**
 * Fetch all vocabulary entries, optionally filtered by `isReviewed` status.
 * @param isReviewed - Whether to fetch reviewed or unreviewed entries (default: true).
 * @returns A promise resolving to an array of `VocabularyEntry` objects.
 */
export const fetchAllVocabularyEntries = async (
  isReviewed = true
): Promise<VocabularyEntry[]> => {
  try {
    const q = query(
      collection(db, CollectionEnum.Vocab),
      where("isReviewed", "==", isReviewed)
    );

    const querySnapshot = await getDocs(q);
    const vocabularyData: VocabularyEntry[] = [];

    querySnapshot.forEach((doc) => {
      vocabularyData.push({ id: doc.id, ...doc.data() } as VocabularyEntry);
    });

    return vocabularyData;
  } catch (error) {
    console.error("Error fetching vocabulary entries: ", error);
    throw error;
  }
};

/**
 * Create a new vocabulary entry.
 * @param vocabData - The vocabulary entry data to create.
 * @returns A promise resolving to the ID of the newly created document.
 */
export const createVocabularyEntry = async (
  vocabData: Omit<VocabularyEntry, "id">
): Promise<string> => {
  try {
    const vocabularyEntryRef = collection(db, CollectionEnum.Vocab);
    const textLowercase = vocabData.text.toLowerCase();

    // Check for duplicates
    const q = query(
      vocabularyEntryRef,
      where("textLowercase", "==", textLowercase)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      throw new Error(
        "Duplicate text found: A document with the same text already exists."
      );
    }

    // Add the new document
    const docRef = await addDoc(vocabularyEntryRef, {
      ...vocabData,
      textLowercase,
      isReviewed: false, // Default to unreviewed
    });

    return docRef.id;
  } catch (error) {
    console.error("Error saving vocab: ", error);
    throw error;
  }
};

/**
 * Mark a vocabulary entry as reviewed.
 * @param id - The ID of the vocabulary entry to mark as reviewed.
 */
export const markVocabularyEntryAsReviewed = async (
  id: string
): Promise<void> => {
  try {
    const vocabularyEntryRef = doc(db, CollectionEnum.Vocab, id);
    await updateDoc(vocabularyEntryRef, { isReviewed: true });
  } catch (error) {
    console.error("Error marking vocabulary entry as reviewed: ", error);
    throw error;
  }
};

/**
 * Delete a vocabulary entry.
 * @param id - The ID of the vocabulary entry to delete.
 */
export const deleteVocabularyEntry = async (id: string): Promise<void> => {
  try {
    const vocabularyEntryRef = doc(db, CollectionEnum.Vocab, id);
    await deleteDoc(vocabularyEntryRef);
  } catch (error) {
    console.error("Error deleting vocabulary entry: ", error);
    throw error;
  }
};

/**
 * Fetch vocabulary entries associated with a specific chapter.
 * @param chapterId - The ID of the chapter to fetch vocabulary entries for.
 * @returns A promise resolving to an array of `VocabularyEntry` objects.
 */
export const fetchVocabularyEntriesByChapter = async (
  chapterId: string
): Promise<VocabularyEntry[]> => {
  try {
    const chapterRef = doc(db, CollectionEnum.Chapter, chapterId);
    const chapterDoc = await getDoc(chapterRef);

    if (!chapterDoc.exists()) {
      throw new Error("Chapter not found");
    }

    const chapterData = chapterDoc.data() as IChapter;
    const vocabularyEntryIds = chapterData.sentenceIds || [];

    const vocabularyEntries: VocabularyEntry[] = [];
    for (const vocabularyEntryId of vocabularyEntryIds) {
      const vocabularyEntryRef = doc(
        db,
        CollectionEnum.Vocab,
        vocabularyEntryId
      );
      const vocabularyEntryDoc = await getDoc(vocabularyEntryRef);

      if (vocabularyEntryDoc.exists()) {
        vocabularyEntries.push({
          id: vocabularyEntryDoc.id,
          ...vocabularyEntryDoc.data(),
        } as VocabularyEntry);
      }
    }

    return vocabularyEntries;
  } catch (error) {
    console.error("Error fetching vocabulary entries in chapter: ", error);
    throw error;
  }
};

/**
 * Fetch orphaned vocabulary entries (not associated with any chapter).
 * @returns A promise resolving to an array of `VocabularyEntry` objects.
 */
export const fetchOrphanedVocabularyEntries = async (): Promise<
  VocabularyEntry[]
> => {
  try {
    const vocabularyEntryRef = collection(db, CollectionEnum.Vocab);
    const vocabularyEntryQuery = query(
      vocabularyEntryRef,
      where("isReviewed", "==", true)
    );
    const vocabularyEntrySnapshot = await getDocs(vocabularyEntryQuery);

    const chaptersRef = collection(db, CollectionEnum.Chapter);
    const chaptersSnapshot = await getDocs(chaptersRef);

    const vocabularyEntryIdsInChapters = new Set<string>();
    chaptersSnapshot.forEach((chapterDoc) => {
      const chapterData = chapterDoc.data() as IChapter;
      if (chapterData.sentenceIds && Array.isArray(chapterData.sentenceIds)) {
        chapterData.sentenceIds.forEach((sentenceId: string) => {
          vocabularyEntryIdsInChapters.add(sentenceId);
        });
      }
    });

    const orphanVocabularyEntries: VocabularyEntry[] = [];
    vocabularyEntrySnapshot.forEach((vocabularyEntryDoc) => {
      if (!vocabularyEntryIdsInChapters.has(vocabularyEntryDoc.id)) {
        orphanVocabularyEntries.push({
          id: vocabularyEntryDoc.id,
          ...vocabularyEntryDoc.data(),
        } as VocabularyEntry);
      }
    });

    return orphanVocabularyEntries;
  } catch (error) {
    console.error("Error fetching orphan vocabulary entries: ", error);
    throw error;
  }
};

/**
 * Update a vocabulary entry.
 * @param docId - The ID of the vocabulary entry to update.
 * @param vocabData - The updated vocabulary entry data.
 */
export const updateVocabularyEntry = async (
  docId: string,
  vocabData: Partial<VocabularyEntry>
): Promise<void> => {
  try {
    const docRef = doc(db, CollectionEnum.Vocab, docId);
    await updateDoc(docRef, vocabData);
    console.log("Vocab updated successfully!");
  } catch (error) {
    console.error("Error updating vocab: ", error);
    throw error;
  }
};

/**
 * Fetch a vocabulary entry by its ID.
 * @param id - The ID of the vocabulary entry to fetch.
 * @returns A promise resolving to the `VocabularyEntry` object.
 */
export const fetchVocabularyEntryById = async (
  id: string
): Promise<VocabularyEntry> => {
  try {
    const docRef = doc(db, CollectionEnum.Vocab, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Vocabulary Entry not found");
    }

    return { id: docSnap.id, ...docSnap.data() } as VocabularyEntry;
  } catch (error) {
    console.error("Error fetching vocabulary entry: ", error);
    throw error;
  }
};
