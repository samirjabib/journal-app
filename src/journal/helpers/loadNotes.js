import { collection, getDocs } from 'firebase/firestore';
import { firebaseDB } from '../../firebase/config';

export const loadNotes = async( uid= '') => { //Recibimos por parametros el uid
    if(!uid) throw new Error('the uid of user dont exists');

    const notes = []

    const docs = await getDocs(collection(firebaseDB, `${uid}/journal/notes`))
    
    docs.forEach ( doc => { //dentro de doc tenemos el metodo .data() que nos trae todos los datos de nuestra coleccion;
        notes.push({id:doc.id, ...doc.data()}); //Enviamos con el id, y la copia de lo que trae el objeto data. 
    });

    return notes
}