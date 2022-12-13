import { createSlice } from "@reduxjs/toolkit";


const state = {
    status:"checking",
    uid:null,
    email:null,
    displayName:null,
    photoURL:null,
    errorMessage:null,
}

export const authSlice = createSlice({
    name:'auth',
    initialState: state,
    reducers:{
        onLogin: ( state, { payload } ) => {
            state.status = 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
        },
        onLogout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload?.errorMessage;
        },
        onCheckingCredentials : ( state ) => {
            state.status = 'checking';
        }
    }
});


export const { onLogin, onCheckingCredentials, onLogout } = authSlice.actions;