
export const fileUpload = async( file ) => {
    if ( !file ) throw new Error('No tenemos ningúna archivo a subir');

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dnoeqtok8/upload';

    const formData = new FormData(); //Creamos una instancia del formData en el cliente para enviarlo mendiante el body.
    formData.append('upload_preset','react-journal'); //El metodo append nos adiciona dentro del objeto form como un nodo hijo
    formData.append('file', file );

    try {
 
        const resp = await fetch( cloudUrl, { //La peticion fecth recibe primero el url, despues un objeto con el json.
            method: 'POST', //Metodo post , enviamos datos
            body: formData
        });


        if ( !resp.ok ) throw new Error('No se pudo subir imagen');

        const cloudResp = await resp.json(); //Transformamos la respuesta a json. 
        console.log(cloudResp)
        return cloudResp.secure_url; //Devolvemos la propiedad dentro del objeto. 

    } catch (error) {
        console.log(error);
        throw new Error( error.message );
    }

}