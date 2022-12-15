import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useForm } from '../../auth';
import { ImageGallery } from '../components'
import { useJournalStore } from '../hooks';


export const NoteView = () => {


    const { active:note, onClickActiveNote, messageSaved  } = useJournalStore(); 
    const { formState ,onInputChange, body, title, date} = useForm(note);


    const dateString = useMemo(() => {
        const newDate = new Date( date ); //Creamos la nueva fecha.
        return newDate.toUTCString();//Este metodo nos convierte el date a algo mas lejible por el humano
    },[date]);

    useEffect( () => {
        onClickActiveNote(formState); //Actualizamos el valor mostrado cada vez que cambiamos de note;
    }, [formState]);


    useEffect( () => {
        if(messageSaved.length > 0) {
            Swal.fire( 'note update', messageSaved) //Mandamos la notificacion de la nota actualizada. 
        }
    }, [messageSaved]);


    

  return (
    <Grid 
        container direction='row' 
        justifyContent='space-between' 
        alignItems='center' 
        sx={{ mb: 1 }}
        className='animate__animated animate__fadeIn animate__faster'
        >
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light' >{ dateString }</Typography>
        </Grid>
        <Grid item>
            <Button color="primary" sx={{ padding: 2 }}>
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                sx={{ border: 'none', mb: 1 }}
                name="title"
                value={title}
                onChange={onInputChange}
            />

            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió en el día de hoy?"
                minRows={ 5 }
                name="body"
                value={body}
                onChange={onInputChange}
            />
        </Grid>

        {/* Image gallery */}
        <ImageGallery />

    </Grid>
  )
}
