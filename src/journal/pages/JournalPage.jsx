import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { useJournalStore } from '../hooks/useJournalStore';
import { useEffect } from 'react';

export const JournalPage = () => {

  const { onClickNewNote, isSaving, active  } = useJournalStore();




  
  
  return (
    <JournalLayout className='animate__animated animate__fadeIn animate__faster'>
      
      {
        (!!active) // el operador !! transforma un objeto en un valor booleano
          ? <NoteView />
          : <NothingSelectedView /> 
      }
      


      <IconButton
        size='large'
        onClick={ onClickNewNote }
        disabled={isSaving}
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
        
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>

    </JournalLayout>
  )
}
