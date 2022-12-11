// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtYlF55-GY_0tDIChkLnNZ-o4IHDn_Wek",
  authDomain: "journal-app-266b5.firebaseapp.com",
  projectId: "journal-app-266b5",
  storageBucket: "journal-app-266b5.appspot.com",
  messagingSenderId: "827556599582",
  appId: "1:827556599582:web:19509026a511f06ddcdb0f",
  measurementId: "G-3XJS21H704"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(FirebaseApp);