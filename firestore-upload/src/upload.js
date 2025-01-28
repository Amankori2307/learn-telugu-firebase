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
      // Check if a document with the same `text` already exists
      const querySnapshot = await db
        .collection("sentences")
        .where("text", "==", item.text)
        .get();

      if (!querySnapshot.empty) {
        console.log(`Skipping duplicate text: ${item.text}`);
        continue; // Skip this item if a duplicate is found
      }

      // If no duplicate, upload the document with an auto-generated ID
      const docRef = db.collection("sentences").doc(); // Auto-generate ID
      await docRef.set(
        {
          pronunciation: item.pronunciation,
          meaning: item.meaning,
          text: item.text,
          type: item.type,
          examples: item.examples || [],
          isReviewed: false, // Set isReviewed to true for new entries
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
    // Fetch all documents in the "sentences" collection
    const querySnapshot = await db.collection("sentences").get();

    // Initialize Firestore batch
    const batch = db.batch();
    let updatedCount = 0;

    // Iterate through each document
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const updates = {};

      // Check if isReviewed is not set
      if (data.isReviewed === undefined) {
        updates.isReviewed = true;
      }

      // Check if textLowercase is not set and text exists
      if (data.textLowercase === undefined && data.text) {
        updates.textLowercase = data.text.toLowerCase();
      }

      // If there are updates, add them to the batch
      if (Object.keys(updates).length > 0) {
        batch.update(doc.ref, updates);
        updatedCount++;
        console.log(`Preparing update for document with ID: ${doc.id}`);
      }
    });

    // Commit the batch update if there are updates
    if (updatedCount > 0) {
      await batch.commit();
      console.log(`Successfully updated ${updatedCount} documents.`);
    } else {
      console.log("No documents required updates.");
    }
  } catch (error) {
    console.error("Error updating existing entries:", error);
    throw error; // Re-throw the error for further handling if needed
  }
}

// Function to rename a field in the Firestore collection
async function renameFieldInCollection(collectionName, oldField, newField) {
  try {
    // Fetch all documents in the collection
    const querySnapshot = await db.collection(collectionName).get();

    // Initialize Firestore batch
    const batch = db.batch();
    let updatedCount = 0;

    // Iterate through each document
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      // Check if the old field exists
      if (data[oldField] !== undefined) {
        const updates = {
          [newField]: data[oldField], // Copy old field value to new field
          [oldField]: admin.firestore.FieldValue.delete(), // Delete the old field
        };

        batch.update(doc.ref, updates);
        updatedCount++;
        console.log(`Preparing rename for document with ID: ${doc.id}`);
      }
    });

    // Commit the batch update if there are updates
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

// Run functions
async function run() {
  // await uploadData(); // Upload new data
  // await updateExistingEntries(); // Update existing entries
  await renameFieldInCollection("chapters", "sentenceIds", "vocabularyIds"); // Rename field
}

run();
