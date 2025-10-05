import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration
// You'll need to replace these with your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyCWcMO-ZGBtQjud580hB4VwtTEJu9iJw2c",
  authDomain: "wheel-of-holidays.firebaseapp.com",
  projectId: "wheel-of-holidays",
  storageBucket: "wheel-of-holidays.firebasestorage.app",
  messagingSenderId: "293787018009",
  appId: "1:293787018009:web:cb593c440a8b5b466e5b88",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
