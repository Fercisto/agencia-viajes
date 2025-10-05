import { Testimonial } from "../models/Testimoniales.js";

const guardarTestimonial = async (req, res) => {


    const { nombre, correo, mensaje } = req.body; // Leer datos del form
    const errores = [];

    if(nombre.trim() === '') {
        errores.push({mensaje: 'El nombre está vacío'});
    }

    
    if(correo.trim() === '') {
        errores.push({mensaje: 'El correo está vacío'});
    }

    
    if(mensaje.trim() === '') {
        errores.push({mensaje: 'El mensaje está vacío'});
    }

    if(errores.length > 0) {

        // Consultar testimoniales
        const testimoniales = await Testimonial.findAll();

        // Mostrar vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        });
    } else {
        // Almacenar en la bd

        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });

            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }

    }

}

export {
    guardarTestimonial
}