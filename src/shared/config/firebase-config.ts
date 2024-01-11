import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCioeN4UnUoiSDOU3NPImRkDizpH25cETM",
  authDomain: "database-4aea2.firebaseapp.com",
  projectId: "database-4aea2",
  storageBucket: "database-4aea2.appspot.com",
  messagingSenderId: "328954475094",
  appId: "1:328954475094:web:d6dd0d0bfbe7479d6d01f7",
  measurementId: "G-QVL20FP0LS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const appAuthWorker = initializeApp(firebaseConfig);
export const authWorker = getAuth(appAuthWorker);

// export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const storage = getStorage(app);