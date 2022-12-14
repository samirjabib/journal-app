import { collection, getDocs } from 'firebase/firestore';
import { firebaseDB } from '../../firebase';

export const loadNotes = async( uid= '') => { //Recibimos por parametros el uid
    if(!uid) throw new Error('the uid of user dont exists');

    const coleccionRef = collection( firebaseDB, `${ uid }/journal/notes`  ); //buscamos en la db, pasandole la ruta dinamica con el uid del user para encontrar las notes.
    const docs = await getDocs(coleccionRef); //obtenemos la coleccion y la guardamos en una variable
    const notes = [];
    console.log(docs, 'console in the load notes')
    docs.forEach( doc => { 
        notes.push({ id: doc.id, ...doc.data}); //mediante el spread operator enviamos a el arreglo vacio notes, lo obtenido en docs, para darle una nueva estructura
        console.log(doc.data)
    });

    

    return notes //Enviamos hacia la funcion. 
}