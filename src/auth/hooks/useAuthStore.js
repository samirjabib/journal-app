import { useDispatch, useSelector } from "react-redux";
import { startGoogleSignIn, startLoginWithEmailAndPasssword, startRegisterWithEmailAndPassword, startLogout, clearNotesLogout } from '../../store';


export const useAuthStore = () => {

    const { status, errorMessage, displayName, photoURL } = useSelector(state => state.auth);

    
    const dispatch = useDispatch();



    const onGoogleSign = () => {
        dispatch( startGoogleSignIn());
    }

    const onLoginEmailAndPassword = (formState) => {
        dispatch(startLoginWithEmailAndPasssword(formState));
    }

    const onRegisterWithEmailAndPassword = (formState) => {
        dispatch( startRegisterWithEmailAndPassword(formState))
    }


    const onLogoutHandle = () => {
        dispatch(clearNotesLogout());
        dispatch(startLogout());
    }

    return{
        //Propierties
        status,
        errorMessage,
        displayName,

        //Methods
        onGoogleSign,
        onLogoutHandle,
        onLoginEmailAndPassword,
        onRegisterWithEmailAndPassword,
    }

}