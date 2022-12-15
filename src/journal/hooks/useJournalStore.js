import { useDispatch, useSelector } from "react-redux"

import { startNewNote  } from '../../store'



export const useJournalStore = () => {

    const dispatch = useDispatch();
    const { isSaving, active, notes, setActiveNote } = useSelector( state => state.journal )

    console.log(active, 'nota activa')


    const onClickNewNote = () => {
        dispatch( startNewNote() )
    }

    const onClickActiveNote = ({title, body, id, date, imageUrls}) => {
        dispatch(setActiveNote({title, body, id, date, imageUrls}));
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