import { addNewEmptyNote, deleteNotesById, savingNewNotes, setActiveNote, setNotes, setPhotosToActiveNote, updateNote,  setSaving} from './journalSlice';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { firebaseDB } from '../../firebase';
import { loadNotes } from '../../journal/helpers';
import { fileUpload } from '../../helpers/fileUpload';


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


        dispatch(setSaving())

        const { uid } = getState().auth; //Obtenemos el usuario activo.

        const { active:note } = getState().journal; //Obtenemos la nota activa.
        
        console.log(note)

        const noteToFireStore = {...note}; //Pasamos una copia de nuestro evento modificado.
        delete noteToFireStore.id; //Eliminamos el id con la palabra delete javascript.
        
        const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);  //Buscamos la ruta de la nota mediante su id;
        await setDoc(docRef, noteToFireStore, {merge:true});

        dispatch(updateNote(note)) //Pasasamos al payload
    };
};


export const startUploadingFiles = ( files ) => { //Pasaremos un array vacio como parametro inicial para evitar errores.
    return async ( dispatch ) => {  //Usamos la funcion dispatch para tirar los reducers del slice. 
        // dispatch( setSaving()); //Cambiamos a true el saving para evitar los doble clicks. 

        // await fileUpload( files[0] );

        const fileUploadPromises = [];

        for( const file of files) { //iteramos sobre todos los files 
            fileUploadPromises.push( fileUpload(file));  //De los cuales iremos agregando a nuestro array, aqui tendremos una promesa, ya que tenemso que esperar que el fileUpload resuelva en cada iteraccion. 
        }

        const photoUrls = await Promise.all(fileUploadPromises); //Creamos un arreglo con todas las cosas que vamos a ir trallendo de nuestro fileUploadin
        console.log(photoUrls)
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
};

