
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "book-app-ca836.firebaseapp.com",
  projectId: "book-app-ca836",
  storageBucket: "book-app-ca836.firebasestorage.app",
  messagingSenderId: "799117570881",
  appId: "1:799117570881:web:6cc60ba3f6c2d6c964e7c0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {db};