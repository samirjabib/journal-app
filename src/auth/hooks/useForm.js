import { useEffect, useMemo, useState } from 'react';


export const useForm = (initialForm = {},  formValidations = {} ) => {


    const [ formState, setFormState ] = useState(initialForm);
    const [ formValidation, setFormValidation ] = useState({});

    useEffect( () => {
        createValidators(); //Con esta funcion hacemos que cada vez que cambie el form , nosotros volvemos a correr la funcion de los validadores
    }, [ formState ])

    useEffect( () => {
        setFormState(initialForm); //
    }, [])
    

    const isFormValid = useMemo( () => { //Con esta funcion vamos a chekear si ahi algun campo de nuestro form que falte por completar
        for(const formValue of Object.keys( formValidation )) {
            if( formValidation(formValue) !== null) return false; //Regresamos form para indicar que faltan acciones por llenar
        }

        return true; //Regresamos true si nuestro fromValidation esta vacio. 
    }, [ formValidation]) //Esta se renderiza cada vez que cambia nuestra aplicacion.

    const createValidators = () => {

        const formCheckedValues = {};

        for( const formField of Object.keys( formValidation )){ 
                                                                /* 
                                                                    iteramos sobre nuestro objeto con las validaciones, 
        
                                                                */
            const [ fn, errorMessage ] = formValidation[formField];   //Desectructuramos las propiedades del formValidation, basados en el formField(actual iteracion).

            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage; // Creamos la propiedad que va a contener nuestros valores
        }


        setFormValidation( formCheckedValues ); //Enviamos nuestars validaciones al form validation.
    }

    const onInputChange = ( {target }) => { //Extraemos el value del target de nuestros input. 
        const { name, value } = target;
        setFormState({
            ...formState,
            [name] : value
        });
    };

    const onResetForm = () => {
        setFormState(initialForm);
    };

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,


        ...formValidation,
        isFormValid
        
    }



}