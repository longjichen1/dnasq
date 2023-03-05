// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAqt-5QSOq3zjSBRj-8lHjaP_bmfMgO7v4",
  authDomain: "dnasq-5c57e.firebaseapp.com",
  projectId: "dnasq-5c57e",
  storageBucket: "dnasq-5c57e.appspot.com",
  messagingSenderId: "472168275419",
  appId: "1:472168275419:web:9ab1dd2ed0b112df385bfe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const firestore = getFirestore();
