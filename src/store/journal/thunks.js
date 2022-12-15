import { addNewEmptyNote, deleteNotesById, savingNewNotes, setActiveNote, setNotes, setPhotosToActiveNote, updateNote, } from './journalSlice';
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

        const { uid } = getState().auth; //el get state nos permite acceder  a el contenido de la store



        if(!uid) throw new Error(" the uid don't exists");

        const notes = await loadNotes( uid ); //Invocamos la funcion para obtener las notas y la guardamos en una variable


        dispatch(setNotes(notes));
    }
}

export const startSaveNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth; //Obtenemos el usuario activo.
        const { active: note } = getState().journal; //Obtenemos la nota activa

        const noteToFireStore = {...note}; //Pasamos una copia de nuestro evento modificado.
        delete noteToFireStore.id; //Eliminamos el id con la palabra delete javascript.
        
        const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);  //Buscamos la ruta de la nota mediante su id;
        await setDoc(docRef, noteToFireStore, {merge:true});

        dispatch(updateNote()) //Pasasamos al payload
    };
};


export const startUploadingFiles = ( files = []) => {
    return async ( dispatch ) => { 
        dispatch( setSaving());

        //await fileUpload
        const fileUploadPromises = [];
    for( const file of files) {
        fileUploadPromises.push( fileUpload(file));

        const photUrls = await Promise.all(fileUploadPromises);

        dispatch( setPhotosToActiveNote( photoUrls)) 
    }
    }
}


export const startDeletingNote = () => {
    return async( dispatch, getState) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);  //Buscamos la ruta de la nota mediante su id;
        await deleteDoc( docRef);

        dispatch(deleteNotesById(note.id));
    }
}