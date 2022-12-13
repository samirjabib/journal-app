import { addNewEmptyNote, jorunalSlice, savingNewNotes, setActiveNote, setNotes, setSaving, updateNote } from './journalSlice';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { firebaseDB } from '../../firebase';


export const starNewNote = () => {
    return async(dispatch) => {
        dispatch( savingNewNotes());

        const { uid } = getState().auth

        const newNote = {
            title:'',
            body:'',
            date: new Date().getTime(),
        };

        const newDoc = doc( collection( firebaseDB, `${ uid }/journal/notes`));
        await setDoc (newDoc, newNote);

        newNote.id = newDoc.id

        dispatch( addNewEmptyNote(newNote));
        dispatch( setActiveNote(newNote))

    }
}