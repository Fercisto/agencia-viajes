import { Testimonial } from "../models/Testimoniales.js";
import { Viaje } from '../models/Viaje.js';

// req - lo que enviamos : res - lo que express nos responde
const paginaInicio = async (req, res) => { 

    // Consultar 3 viajes

    const promiseDB = [];

    promiseDB.push(Viaje.findAll({ limit: 3 }));
    promiseDB.push(Testimonial.findAll({ limit: 4 }));

    try {
        const resultado = await Promise.all(promiseDB);

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });

    } catch (error) {
        console.log(error);
    }

}

const paginaNosotros = (req, res) => { 
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => { 

    // Consultar bd
    const viajes = await Viaje.findAll();
    
    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    });
}

const paginaTestimoniales = async (req, res) => { 

    try {
        
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.error;
    }

}

// Muestra viaje por su slug
const paginaDetalleViaje = async (req, res) => {

    // console.log(req.params.slug);
    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne({ where: { slug: slug } });

        res.render('viaje', {
            pagina: 'Informacion Viaje',
            viaje
        });

    } catch (error) {
        console.log(error);
    }

}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}