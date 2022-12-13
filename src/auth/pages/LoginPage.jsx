import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';

import { useAuthStore, useForm } from '../hooks';
import { startGoogleSignIn } from '../../store';
import { useState } from 'react';



const formValidations = {
  email:[ (value)  => value.includes('@'), 'The email must contain a @'],
  password: [ (value) => value.length >= 6, 'Password must contain 6 letters or more.'],
}

const formFields = {
  email :"",
  password :""

}


export const LoginPage = () => {

  const { email, password, formState, onInputChange, emailValid, passwordValid , isFormValid} = useForm(formFields, formValidations);

  const [ formSubmitted, setFormSubmitted] = useState(false);

  const { status, onGoogleSign, errorMessage, onLoginEmailAndPassword,  } = useAuthStore();
  console.log(status)

  const onSubmit = (event) => {
    event.preventDefault()
    setFormSubmitted(true);
    if(!isFormValid) return;
    onLoginEmailAndPassword(formState)
  }


  return (
    <AuthLayout title="Login">
      <form onSubmit={ onSubmit }>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                name='email'
                value={email}
                onChange={onInputChange}
                error={!!emailValid && formSubmitted}
                helperText={emailValid}

              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name='password'
                value={password}
                onChange={ onInputChange}
                error={!!passwordValid && formSubmitted}
                helperText={passwordValid}
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button 
                  variant='contained' 
                  fullWidth
                  type='submit'
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button 
                  variant='contained' 
                  fullWidth
                  onClick={ onGoogleSign }
                  >
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}
