import { useDispatch, useSelector } from "react-redux"

import { startNewNote  } from '../../store'



export const useJournalStore = () => {

    const dispatch = useDispatch();
    const { isSaving, active, notes } = useSelector( state => state.journal )


    const onClickNewNote = () => {
        dispatch( startNewNote() )
        console.log('hice submit a la note hacia el thunk')
    }



    return{
        //Propietes
        isSaving,
        active,
        notes,

        //Methods
        onClickNewNote,
    }
}