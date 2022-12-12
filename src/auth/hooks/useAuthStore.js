import { useDispatch, useSelector } from "react-redux";
import { onLogin, onLogout, onCheckingCredentials, startGoogleSignIn } from '../../store';


export const useAuthStore = () => {

    const { status, errorMessage, displayName } = useSelector(state => state.auth);
    const dispatch = useDispatch();


    const onGoogleSign = () => {
        console.log('login with google'),
        dispatch( startGoogleSignIn());
    }


    return{
        //Propierties
        status,
        errorMessage,
        displayName,

        //Methods
        onGoogleSign
    }

}