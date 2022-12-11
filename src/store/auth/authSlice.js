import { SatelliteTwoTone } from "@mui/icons-material";
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
        login: ( state, { payload } ) => {
            state.status = 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
        },
        logout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = null;
        },
        checkingCredentials : ( state ) => {
            state.status = 'checking';
        }
    }
});


export const { login, logout, checkingCredentials } = authSlice.actions;