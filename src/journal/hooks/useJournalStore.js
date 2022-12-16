import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

import { startNewNote,  setActiveNote, startSaveNote  } from '../../store'



export const useJournalStore = () => {

    const { isSaving, active, notes, messageSaved  } = useSelector( state => state.journal );

    const dispatch = useDispatch();



    


    const onClickNewNote = () => {
        dispatch(startNewNote());
    };


    const onClickActiveNote = ({ title, body, id, date, imageUrls }) => {
        dispatch(setActiveNote({title, body, id, date, imageUrls}))
    };
 

    const onUpdateNote = () => {
        dispatch( startSaveNote());
    };

    return{
        //Propietes
        isSaving,
        active,
        notes,
        messageSaved,

        //Methods
        onClickNewNote,
        onClickActiveNote,
        onUpdateNote,
    }
}