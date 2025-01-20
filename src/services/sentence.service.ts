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

export const fetchAllVocabularyEntries = async (
  isReviewed = true
): Promise<VocabularyEntry[]> => {
  try {
    // Create a query to fetch only reviewed vocabulary
    const q = query(
      collection(db, CollectionEnum.Vocab),
      where("isReviewed", "==", isReviewed) // Filter by isReviewed = true
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

export const createVocabularyEntry = async (vocabData: VocabularyEntry) => {
  try {
    const vocabularyEntryRef = collection(db, CollectionEnum.Vocab);

    // Create a lowercase version of the text for case-insensitive comparison
    const textLowercase = vocabData.text.toLowerCase();

    // Query for duplicates using the lowercase version
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

    // If no duplicate is found, add the new document
    const docRef = await addDoc(vocabularyEntryRef, {
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
// Mark a vocabulary entry as reviewed
export const markVocabularyEntryAsReviewed = async (id: string) => {
  try {
    const vocabularyEntryRef = doc(db, CollectionEnum.Vocab, id);
    await updateDoc(vocabularyEntryRef, { isReviewed: true });
  } catch (error) {
    console.error("Error marking vocabulary entry as reviewed: ", error);
    throw error;
  }
};

// Delete a vocabulary entry
export const deleteVocabularyEntry = async (id: string) => {
  try {
    const vocabularyEntryRef = doc(db, CollectionEnum.Vocab, id);
    await deleteDoc(vocabularyEntryRef);
  } catch (error) {
    console.error("Error deleting vocabulary entry: ", error);
    throw error;
  }
};

export const fetchVocabularyEntriesByChapter = async (
  chapterId: string
): Promise<VocabularyEntry[]> => {
  try {
    const chapterRef = doc(db, CollectionEnum.Chapter, chapterId);
    const chapterDoc = await getDoc(chapterRef);

    if (!chapterDoc.exists()) {
      throw new Error("Chapter not found");
    }

    const chapterData = chapterDoc.data();
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

export const fetchOrphanedVocabularyEntries = async (): Promise<
  VocabularyEntry[]
> => {
  try {
    // Fetch all vocabulary entries
    const vocabularyEntryRef = collection(db, CollectionEnum.Vocab);
    const vocabularyEntryQuery = query(
      vocabularyEntryRef,
      where("isReviewed", "==", true)
    );
    const vocabularyEntrySnapshot = await getDocs(vocabularyEntryQuery);

    // Fetch all chapters and collect their vocabulary entry ids
    const chaptersRef = collection(db, CollectionEnum.Chapter);
    const chaptersSnapshot = await getDocs(chaptersRef);

    // Create a Set of all vocabulary Entry ids that belong to chapters
    const vocabularyEntryIdsInChapters = new Set<string>();
    chaptersSnapshot.forEach((chapterDoc) => {
      const chapterData = chapterDoc.data();
      if (chapterData.sentenceIds && Array.isArray(chapterData.sentenceIds)) {
        chapterData.sentenceIds.forEach((sentenceId: string) => {
          vocabularyEntryIdsInChapters.add(sentenceId);
        });
      }
    });

    // Filter out sentences that are not in any chapter
    const orphanVocabularyEntries: VocabularyEntry[] = [];
    vocabularyEntrySnapshot.forEach((vocabularyEntryDoc) => {
      const vocabularyEntryData = vocabularyEntryDoc.data();
      if (!vocabularyEntryIdsInChapters.has(vocabularyEntryDoc.id)) {
        orphanVocabularyEntries.push({
          id: vocabularyEntryDoc.id,
          ...vocabularyEntryData,
        } as VocabularyEntry);
      }
    });

    return orphanVocabularyEntries;
  } catch (error) {
    console.error("Error fetching orphan vocabulary entries: ", error);
    throw error;
  }
};

export const updateVocabularyEntry = async (
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
