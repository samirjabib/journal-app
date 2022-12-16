import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

import { startNewNote,  setActiveNote, startSaveNote, setSaving, startUploadingFiles  } from '../../store'



export const useJournalStore = () => {

    const { isSaving, active, notes, messageSaved, } = useSelector( state => state.journal );

    const dispatch = useDispatch();

    const onUploadNewFiles = (files) => {; //Creamos nuestro manejador para el evento en el nuestro hook storage de los journal y lo enviamos hacia la vista. 
        console.log(files)
        dispatch(startUploadingFiles(files)); //Despachamos hacia nuestro thunk, y despues hacia el reducer. 
    }

    const onClickNewNote = () => {
        dispatch(startNewNote());
    };


    const onClickActiveNote = ({ title, body, id, date, imageUrls = [] }) => {
        dispatch(setActiveNote({title, body, id, date, imageUrls}))
    };
 

    const onUpdateNote = () => {
        dispatch(startSaveNote());
    };

    return{
        //Propietes
        isSaving,
        active,
        notes,
        messageSaved,

        //Methods
        onUploadNewFiles,
        onClickNewNote,
        onClickActiveNote,
        onUpdateNote,
        startNewNote,
    }
}