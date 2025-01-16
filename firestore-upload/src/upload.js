const admin = require("firebase-admin");
const serviceAccount = require("../env/service-account-key.json");
// const data = require("./assets/data.js");
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

// Function to update existing entries where isReviewed is not set
async function updateExistingEntries() {
  try {
    // Fetch all documents in the "sentences" collection
    const querySnapshot = await db.collection("sentences").get();

    // Counter to track updated documents
    let updatedCount = 0;

    // Iterate through each document
    querySnapshot.forEach(async (doc) => {
      const data = doc.data();

      // Check if isReviewed is not set
      if (data.isReviewed === undefined) {
        // Update the document to set isReviewed to true
        await doc.ref.update({ isReviewed: true });
        console.log(`Updated document with ID: ${doc.id}`);
        updatedCount++;
      }
    });

    console.log(`Updated ${updatedCount} documents.`);
  } catch (error) {
    console.error("Error updating existing entries:", error);
  }
}

// Run both functions
async function run() {
  await uploadData(); // Upload new data
  // await updateExistingEntries(); // Update existing entries
}

run();