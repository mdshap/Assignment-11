// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOy_Tb0M1Q69yqBZLvRBSMhw2SpbJMjQA",
  authDomain: "smart-db-user.firebaseapp.com",
  projectId: "smart-db-user",
  storageBucket: "smart-db-user.firebasestorage.app",
  messagingSenderId: "497069293024",
  appId: "1:497069293024:web:e5a9a91c0834d568febf85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);