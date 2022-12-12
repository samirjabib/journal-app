import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider(); //Creamos una nueva instancia.


export const signInWithGoogle = async() => {
    try{
        const result = await signInWithPopup( firebaseAuth, googleProvider); //Pasamos la auth y el proveedor para generar nuestro token, y llamaremos al popup con este metodo. 

        const { displayName, email, photoURL, uid } = result.user; //Enviamos los datos objenitods por nuestro provider a la siguiente funcion. 

        return {
            status:'success',
            displayName,
            email,
            photoURL,
            uid,
        }
    } catch(error){
        const errorCode = error.errorCode;
        const errorMessage = error.errorMessage;

        return {
            status:'failed',
            errorMessage
        }
    }
};