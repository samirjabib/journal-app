import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider(); //Creamos una nueva instancia.


export const signInWithGoogle = async() => {
    try{
        const result = await signInWithPopup( firebaseAuth, googleProvider); //Pasamos la auth y el proveedor para generar nuestro token, y llamaremos al popup con este metodo. 
        
        console.log(result)

        return {
            status:'success',
            result
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