// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdwb31HblaWfyq-MZYANAWvo-U2Z91HxM",
  authDomain: "stud-cee12.firebaseapp.com",
  projectId: "stud-cee12",
  storageBucket: "stud-cee12.appspot.com",
  messagingSenderId: "655721382233",
  appId: "1:655721382233:web:728956bd02eea597554c48",
  measurementId: "G-DJBFYMT823"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
