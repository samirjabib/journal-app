import { signInWithGoogle, registerUserWithEmailAndPassword, loginWithEmailPassword, logoutFirebase } from "../../firebase";
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

export const startRegisterWithEmailAndPassword = ({displayName, email, password}) => {
    return async( dispatch ) => {
        dispatch(onCheckingCredentials());

        const result = await registerUserWithEmailAndPassword({displayName, email, password}); //Enviamos los datos hacia la funcion para que nos retorne el resultado. 
        if(result.status === 'failed') return dispatch(onLogout(result.errorMessage));
        console.log(result,'result of register')

        dispatch( onLogin(result)); //enviamos el resultado hacia el payload
    }
}

export const startLoginWithEmailAndPasssword = ({ email, password}) => {
    return async( dispatch) => {
        dispatch(onCheckingCredentials());

        const result = await loginWithEmailPassword({email, password}); //Enviamos los datos hacia la funcion para que nos retorne el resultado. 
        if(result.status === 'failed') return dispatch(onLogout(result.errorMessage));


        dispatch(onLogin(result)); //enviamos el resultado hacia el payload
    }
;}

export const startLogout = () => {
    async(dispatch) => {

        await logoutFirebase(); 

    
        dispatch(onLogout());
    }
};