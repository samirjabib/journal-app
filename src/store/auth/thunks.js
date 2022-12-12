import { signInWithGoogle } from "../../firebase";
import { onCheckingCredentials, onLogout, onLogin } from "./authSlice";


export const checkingAuthentication = () => {
    return async( dispatch) => {
        dispatch(onCheckingCredentials());
    }
};


export const startGoogleSignIn = () => {
    return async( dispatch ) => {
        dispatch(onCheckingCredentials());

        const  result  = await signInWithGoogle(); //Recibimos los datos de la funcion los cual pasaremos al payload. 
        if(result.status === 'failed') return dispatch(onLogout(result.errorMessage));

        dispatch( onLogin(result)); //Enviamos al payload para tener los datos de inicio de secion en la store. 
    };
};


