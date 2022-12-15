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
        setPhotosToActiveNote: ( state, { payload }) => {
            state.active.imageUrls = [...state.active.imageUrls, payload] //Le sumamos el payload a el array y enviamos un nuevo estado.
            state.isSaving = false;
        },

        clearNotesLogout : ( state) => {
            state.isSaving = false;
            state.messageSaved = '',
            state.notes = [];
        },
        deleteNotesById: ( state, { payload } ) => {
            state.active = null;
            state.notes = state.notes.filter( note => note.id !== payload ) //Usamos el metodo filter si alguna nota conindice con nuestro payload, la filtramos del array.
        }
    }
});

export const {
    addNewEmptyNote,
    savingNewNotes,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    clearNotesLogout,
    deleteNotesById,
    setPhotosToActiveNote
} = journalSlice.actions; //exportamos las acciones para usarlas en el thunk