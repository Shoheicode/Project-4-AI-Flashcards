// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${process.env.FIREBASE_API_KEY}`,
  authDomain: "ai-flashcard-98596.firebaseapp.com",
  projectId: "ai-flashcard-98596",
  storageBucket: "ai-flashcard-98596.appspot.com",
  messagingSenderId: "897708681280",
  appId: "1:897708681280:web:08b54faa183751908917a5",
  measurementId: "G-DCLTM6RHJ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const database = getFirestore(app);

export {app, database}