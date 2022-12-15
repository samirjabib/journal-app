import { collection, getDocs } from 'firebase/firestore';
import { firebaseDB } from '../../firebase/config';

export const loadNotes = async( uid= '') => { //Recibimos por parametros el uid
    if(!uid) throw new Error('the uid of user dont exists');

    const notes = []

    const docs = await getDocs(collection(firebaseDB, `${uid}/journal/notes`))
    

    docs.forEach ( doc => {
        notes.push({id:doc.id, ...doc.data()});
    });

    console.log(notes);



    return notes
}