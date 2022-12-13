import { Satellite } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit';


export const jorunalSlice = createSlice({
    name:'journal',
    initialState:{
        isSaving:false,
        messageSaved:'',
        notes:[],
        active:null,
    },
    reducers:{
        savingNewNotes: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote : (state, { payload }) => {
            state.notes.push( payload ); //Agregamos la nueva nota al arreglo con el metodo push
            state.isSaving = false;
        },
        setActiveNotes: (state, { payload }) => {
            state.active = payload; 
            state.messageSaved = '';
        },
        setNotes: (state, { payload }) => {
            state.notes = payload;
        },
        setSaving: ( state ) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: ( state, { payload } ) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {
                if(note.id === payload.id){
                    return payload
                };

                return note
            });

            state.messageSaved = `${payload.title}, update correctly`
        },
    }
});

export const {
    addNewEmptyNote,
    savingNewNotes,
    setActiveNotes,
    setNotes,
    setSaving,
    updateNote,
} = jorunalSlice.actions;