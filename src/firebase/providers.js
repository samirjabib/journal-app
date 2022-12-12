import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
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


export const registerUserWithEmailAndPassword = async({email, password, displayName}) => { //Creamos la funcion por la cual recibiremos por parametros, los datos para crear la cuenta en firebase.
    try{
        const response = await createUserWithEmailAndPassword( firebaseAuth, email, password);  // Le pasamos el Auth que enruta a nuestra app para crear la cuenta y lo almacenamos en una variable.
        const { uid, photoUrl } = response.user;

        await updateProfile( firebaseAuth.currentUser, { displayName }); //Con el current user optenemos  el usuario actual, y lepasamos la informacion del nombre del usuario.

        return{
            status:'success',
            uid, photoUrl, email, displayName //Devolvemos los datos que enviaremos hacia el payload
        }

    } catch(error){
        console.log(error);
        return{ status:'failed', errorMessage:error.message}; //Retornamos el error en caso de ser asi.
    }
}

export const loginWithEmailPassword = async({email, password}) => {
    try{
        const response = await signInWithEmailAndPassword(firebaseAuth, email, password); //Enviamos la informacion que enviaremos al Auth App para lgoear
        const { uid, photoURL, displayName} = response.user //Desconstruimos de la respuesta lo que enviaremos hacia el palyoad. 

        return {
            status:'success',
            uid, photoURL, displayName
        }
    } catch(error){
        console.log(error)
        return{ status:'failed', errorMessage:error.message};
    }
};


export const logoutFirebase = async() => {
    return await firebaseAuth.signOut(); //Usamos el metodo de firebase para deslogearnos de nuestra App. 
}


