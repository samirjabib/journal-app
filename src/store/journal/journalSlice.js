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
            state.notes = state.notes.map( note => { //Iteramos sobre nuestro estado de notas.
                if(note.id === payload.id){ //Si encontramos alguna nota que coincida con el payload.
                    return payload //La remplazamos con el paylload.
                };

                return note //Devolvemos la nota al array.
            });

            state.messageSaved = `${payload.title}, update correctly` //Mostramos la nota que hemos actualizado
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