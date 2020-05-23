const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimoniales = (req,res) => {
    Testimonial.findAll()
        .then(testimoniales => res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        }))
}

exports.crearTestimonial = (req,res) => {
    //validar que todos los campos esten llenos
    let {nombre,correo,mensaje} = req.body;

    let errores = [];

    if(!nombre) {
        errores.push({'mensaje': 'Agrega tu nombre'})
    }
    if(!correo) {
        errores.push({'mensaje': 'Agrega tu correo'})
    }
    if(!mensaje) {
        errores.push({'mensaje': 'Agrega tu mensaje'})
    }

    //revisar por erroes
    if(errores.length > 0) {
        //muestra la vista con errores
        res.render('testimoniales', {
            errores,
            nombre,
            correo,
            mensaje
        })
    } else {
        //Guarda en la DB
        Testimonial.create({
            nombre,
            correo,
            mensaje
        })
        .then(testimonial => res.redirect('/testimoniales'))
        .catch(error => console.log(error))
    }
    
}