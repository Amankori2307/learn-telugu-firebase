// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAB6GjIOPPLt3pNK7PvMzMtNEbjJoWCVR8",
  authDomain: "learn-telugu-be0b9.firebaseapp.com",
  projectId: "learn-telugu-be0b9",
  storageBucket: "learn-telugu-be0b9.firebasestorage.app",
  messagingSenderId: "523561901203",
  appId: "1:523561901203:web:42a24b738d93d54393c166",
  measurementId: "G-LVSPJS7WTJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
