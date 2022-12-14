// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'


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
export const FirebaseApp = initializeApp(firebaseConfig); //Configuramos la base de datos
export const firebaseAuth = getAuth(FirebaseApp); //Obtenemos el metodo para ultilizar la Auth de uestra base de datos.
export const firebaseDB = getFirestore( FirebaseApp); //Obtenemos nuestros datos de nuestra App con este metodo de firebase. 


