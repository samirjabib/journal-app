import { useDispatch, useSelector } from "react-redux"

import { startNewNote,  setActiveNote  } from '../../store'



export const useJournalStore = () => {

    const dispatch = useDispatch();
    const { isSaving, active, notes,  } = useSelector( state => state.journal )


    const onClickNewNote = () => {
        dispatch( startNewNote() )
    }

    const onClickActiveNote = ({ title, body, id, date, imageUrls }) => {
        dispatch(setActiveNote({ title, body, id, date, imageUrls }))
    }



    return{
        //Propietes
        isSaving,
        active,
        notes,

        //Methods
        onClickNewNote,
        onClickActiveNote,
    }
}