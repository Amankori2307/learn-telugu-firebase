const admin = require("firebase-admin");
const serviceAccount = require("../env/service-account-key.json");
const data = require("./assets/data.js");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

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
      await docRef.set({
        pronunciation: item.pronunciation,
        meaning: item.meaning,
        text: item.text,
        type: item.type,
        examples: item.examples || [], 
      }, {
        ignoreUndefinedProperties: true
      });
      console.log(`Uploaded document with auto-generated ID: ${docRef.id}`);
    }
    console.log("Upload complete!");
  } catch (error) {
    console.error("Error uploading data:", error);
  }
}

uploadData();