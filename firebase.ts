// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHnK_tANS3MWVzfMJu8qcqt_GrCAz1m7I",
  authDomain: "todo-d5387.firebaseapp.com",
  projectId: "todo-d5387",
  storageBucket: "todo-d5387.appspot.com",
  messagingSenderId: "488038366089",
  appId: "1:488038366089:web:712586e40a7fde3c00bf58",
  measurementId: "G-39N85G1EE0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
