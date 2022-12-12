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

        const result = await signInWithGoogle();
        if(result.status === 'failed') return dispatch(onLogout(result.errorMessage));

        dispatch( onLogin(result));
        console.log('result in start google signin')
    };
};


