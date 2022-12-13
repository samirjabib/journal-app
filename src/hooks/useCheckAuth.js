import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useAuthStore } from "../auth/hooks";
import {  firebaseAuth } from "../firebase";
import { onLogin, onLogout } from "../store";


export const useCheckAuth = () => {
  
    const { status } = useSelector( state => state.auth ); 
    const { startLogout } = useAuthStore();
    const dispatch = useDispatch();

    useEffect(() => {
        
        onAuthStateChanged( firebaseAuth, async( user ) => { //la funcion firebaseAuth nos permite acceder a los datos en firebase de el user, en caso de haber uno.
        if ( !user ) return dispatch( startLogout() ); //en caso de no existir 

        const { uid, email, displayName, photoURL } = user;
        dispatch( onLogin({ uid, email, displayName, photoURL }) );
        })
    }, []);

    return status;
}