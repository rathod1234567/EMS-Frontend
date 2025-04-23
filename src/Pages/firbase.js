// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXTW-wwsdayiiWZk7fvFmTwHIfM99D0bo",
  authDomain: "employee-ms-d5a00.firebaseapp.com",
  projectId: "employee-ms-d5a00",
  storageBucket: "employee-ms-d5a00.firebasestorage.app",
  messagingSenderId: "188860620394",
  appId: "1:188860620394:web:6c371833ddd7db4f047413"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth()
export default app;