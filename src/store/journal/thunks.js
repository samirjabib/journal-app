import { addNewEmptyNote, savingNewNotes, setActiveNote, setNotes, } from './journalSlice';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { firebaseDB } from '../../firebase';
import { loadNotes } from '../../journal/helpers';


export const startNewNote = () => {
    
    return async(dispatch, getState) => { //Usamos la otra funcion del thunk para acceder a el estado actual de la store 
        dispatch( savingNewNotes());

        // const stateUser = getState() /El getState nos permite obtener el estado actual de nuestro storage. 

        const { uid } = getState().auth //Extraemos el id del el auth actual de la aplicacion.
 
        const newNote = { //Creamos la nueva nota dummie dta. 
            title:'me tiran heig',
            body:'pero se va a folmar',
            date: new Date().getTime(),
        };

        const newDoc = doc( collection( firebaseDB, `${ uid }/journal/notes`) ); // doc recibe como parametro la coleccion, la cual recibe la db y el path que queremos que tenga nuestra coleccion
        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id 

        dispatch( addNewEmptyNote(newNote)); //Añadimos la nueva nota
        dispatch( setActiveNote(newNote)) //Colocamos como activa esta. 

    }
};


export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {

        const stateUser = getState()
        console.log(stateUser)

        const { uid } = getState().auth; //el get state nos permite acceder  a el contenido de la store



        if(!uid) throw new Error(" the uid don't exists");

        const notes = await loadNotes( uid ); //Invocamos la funcion para obtener las notas y la guardamos en una variable

        console.log(notes);

        dispatch(setNotes(notes));
    }
}



