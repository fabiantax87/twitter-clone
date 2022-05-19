// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV_mEeLZX4q6Fvh_mNespx7oJEjc8LKmY",
  authDomain: "twitter-clone-c1e7a.firebaseapp.com",
  projectId: "twitter-clone-c1e7a",
  storageBucket: "twitter-clone-c1e7a.appspot.com",
  messagingSenderId: "461504717226",
  appId: "1:461504717226:web:ba684d48793534d675cbd3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
