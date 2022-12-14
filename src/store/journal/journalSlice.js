import { createSlice } from '@reduxjs/toolkit';


export const journalSlice = createSlice({
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
        setActiveNote: (state, { payload }) => {
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
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
} = journalSlice.actions; //exportamos las acciones para usarlas en el thunk