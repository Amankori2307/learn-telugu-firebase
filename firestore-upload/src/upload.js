const admin = require("firebase-admin");
const serviceAccount = require("../env/service-account-key.json");
const data = require("./assets/raw-data2.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Function to upload new data
async function uploadData() {
  try {
    for (const item of data) {
      const querySnapshot = await db
        .collection("sentences")
        .where("text", "==", item.text)
        .get();

      if (!querySnapshot.empty) {
        console.log(`Skipping duplicate text: ${item.text}`);
        continue;
      }

      const docRef = db.collection("sentences").doc();
      await docRef.set(
        {
          pronunciation: item.pronunciation,
          meaning: item.meaning,
          text: item.text,
          type: item.type,
          examples: item.examples || [],
          isReviewed: false,
        },
        {
          ignoreUndefinedProperties: true,
        }
      );
      console.log(`Uploaded document with auto-generated ID: ${docRef.id}`);
    }
    console.log("Upload complete!");
  } catch (error) {
    console.error("Error uploading data:", error);
  }
}

// Function to update existing entries where isReviewed or textLowercase is not set
async function updateExistingEntries() {
  try {
    const querySnapshot = await db.collection("sentences").get();
    const batch = db.batch();
    let updatedCount = 0;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const updates = {};

      if (data.isReviewed === undefined) {
        updates.isReviewed = true;
      }
      if (data.textLowercase === undefined && data.text) {
        updates.textLowercase = data.text.toLowerCase();
      }
      if (Object.keys(updates).length > 0) {
        batch.update(doc.ref, updates);
        updatedCount++;
        console.log(`Preparing update for document with ID: ${doc.id}`);
      }
    });

    if (updatedCount > 0) {
      await batch.commit();
      console.log(`Successfully updated ${updatedCount} documents.`);
    } else {
      console.log("No documents required updates.");
    }
  } catch (error) {
    console.error("Error updating existing entries:", error);
    throw error;
  }
}

// Function to rename a field in the Firestore collection
async function renameFieldInCollection(collectionName, oldField, newField) {
  try {
    const querySnapshot = await db.collection(collectionName).get();
    const batch = db.batch();
    let updatedCount = 0;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data[oldField] !== undefined) {
        const updates = {
          [newField]: data[oldField],
          [oldField]: admin.firestore.FieldValue.delete(),
        };

        batch.update(doc.ref, updates);
        updatedCount++;
        console.log(`Preparing rename for document with ID: ${doc.id}`);
      }
    });

    if (updatedCount > 0) {
      await batch.commit();
      console.log(
        `Successfully renamed field '${oldField}' to '${newField}' in ${updatedCount} documents.`
      );
    } else {
      console.log(`No documents found with field '${oldField}' to rename.`);
    }
  } catch (error) {
    console.error(
      `Error renaming field '${oldField}' to '${newField}' in collection '${collectionName}':`,
      error
    );
  }
}

// Function to rename a collection in Firestore
async function renameCollection(oldCollectionName, newCollectionName) {
  try {
    const querySnapshot = await db.collection(oldCollectionName).get();
    if (querySnapshot.empty) {
      console.log(`Collection '${oldCollectionName}' is empty or does not exist.`);
      return;
    }

    let copiedCount = 0;
    for (const doc of querySnapshot.docs) {
      const data = doc.data();
      await db.collection(newCollectionName).doc(doc.id).set(data); // Copy to new collection
      copiedCount++;
      console.log(`Copied document with ID: ${doc.id} to '${newCollectionName}'`);
    }

    // Delete old collection documents
    const batch = db.batch();
    for (const doc of querySnapshot.docs) {
      batch.delete(doc.ref);
    }
    await batch.commit();
    console.log(
      `Successfully renamed collection '${oldCollectionName}' to '${newCollectionName}' with ${copiedCount} documents.`
    );
  } catch (error) {
    console.error(
      `Error renaming collection '${oldCollectionName}' to '${newCollectionName}':`,
      error
    );
  }
}

// Run functions
async function run() {
  // await uploadData(); // Upload new data
  // await updateExistingEntries(); // Update existing entries
  // await renameFieldInCollection("chapters", "sentenceIds", "vocabularyIds"); // Rename field
  await renameCollection("sentences", "vocabulary_entries"); // Rename collection
}

run();
