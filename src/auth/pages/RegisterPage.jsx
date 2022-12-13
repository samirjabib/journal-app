import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useAuthStore, useForm } from '../hooks';
import { useMemo, useState } from 'react';


const formFields = {
    displayName: "",
    email :"",
    password :""
  
}

const formValidations = {
  email:[ (value)  => value.includes('@'), 'The email must contain a @'],
  password: [ (value) => value.length >= 6, 'Password must contain 6 letters or more.'],
  displayName: [ (value) => value.length >= 1, 'The name is required '],
}


export const RegisterPage = () => {

  const [ formSubmitted, setFormSubmitted] = useState(false);

  const {
    displayName, email, password, onInputChange, isFormValid, 
    displayNameValid, emailValid, passwordValid, formState
  } = useForm(formFields, formValidations);


  const { errorMessage, status, onRegisterWithEmailAndPassword } = useAuthStore();

  const isChekingAuthentication = useMemo(() => status === 'checking', [status]);


  const onSubmit = ( event ) => {
    event.preventDefault();
    setFormSubmitted(true);
    if ( !isFormValid ) return;
    onRegisterWithEmailAndPassword(formState)

  }

  return (
    <AuthLayout title="Crear cuenta">
      <form 
        className='animate__animated animate__fadeIn animate__faster'
        onSubmit={ onSubmit }
        >
          <Grid container>
           
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre completo" 
                type="text" 
                placeholder='Nombre completo' 
                fullWidth
                value={displayName}
                name='displayName'
                onChange={onInputChange}
                error={ !!displayNameValid && formSubmitted }
                helperText={displayNameValid}
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                value={email}
                name='email'
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
                value={password}
                name='password'
                onChange={onInputChange}
                error={!!passwordValid && formSubmitted}
                helperText={passwordValid}
              />
            </Grid>

            <Grid
              item
              xs={12}
              display={!!errorMessage ? '' : 'none'}
            >
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 }>
                <Button 
                  variant='contained' 
                  fullWidth
                  type="submit"
                  // disabled={ isChekingAuthentication}
                  >
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                ingresar
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}
