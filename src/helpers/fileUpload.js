export const fileUpload = async ( file ) => {

    if( !file ) throw new Error('dont have us files for uploading')
    const cloudUrl ='https://api.cloudinary.com/v1_1/dnoeqtok8/upload'//La url que necesitaremos para enviar la peticion hacia cloudinary

    const formData = new FormData(); //Creamos una instancia del objeto form-data del cliente.
    formData.append('upload_preset','react-journal') /*Le aplicamos los key necesarios en este caso de cloudinary  https://api.cloudinary.com/v1_1/dnoeqtok8/upload
                                                            Con el metodo de append insertamos estos valores dentro de la instancia almacenada en la variable.

                                                        */
    formData.append('file', file) //Almacenamos nuestros files 

    try{

        const response = await fetch(cloudUrl, {
            mehotd:'POST', 
            body:formData //Enviamos los datos para ser almacenados en el body.
        });

        if(!response.ok) throw new Error('')
        const cloudResponse = await response.json(); //Convertimos la respuesta a json para poderla manejar.

        return cloudResponse.secure_url;

    } catch ( error ) {
        console.log(error)//Mostramos el error
        throw new Error( error.message); //lanzamos el nuevo error con y sacamos el mensaje de el objeto. 
    };

}