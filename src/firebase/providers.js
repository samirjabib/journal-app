import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();


export const signInWithGoogle = async() => {
    try{
        const result = await signInWithPopup( firebaseAuth, googleProvider);

        console.log(result)

        return {
            status:'success',
        }
    } catch(error){
        const errorCode = error.errorCode;
        const errorMessage = error.errorMessage;

        return {
            status:'failed',
            errorMessage
        }
    }

}