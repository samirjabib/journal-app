import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../hooks';


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

  const {
    displayName, email, password, onInputChange, isFormValid, 
    displayNameValid, emailValid, passwordValid 
  } = useForm(formFields, formValidations)


  return (
    <AuthLayout title="Crear cuenta">
      <form>
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
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 }>
                <Button variant='contained' fullWidth>
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
