const express = require('express');
const router = express.Router();

const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');

 module.exports = function() {
     /**USE: responde a todos los verbos http */
    //render (nombre carpeta)
     router.get('/', (req,res) => {
        const promises = [];
        promises.push(Viaje.findAll({
                limit: 3
        }) )
        
        promises.push(Testimonial.findAll({
                limit: 3
        }) )
        //pasar el promise y ejecutarlo
        const resultado = Promise.all(promises)
        
        resultado.then(resultado => res.render('index', {
            pagina: 'Proximos Viajes',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        }))
        .catch(error => console.log(error))
    });

    router.get('/nosotros', (req,res) => {
        res.render('nosotros', {
            pagina: 'Sobre nosotros'
        });
    });

    router.get('/viajes', (req,res) => {
        Viaje.findAll()
            .then(viajes => res.render('viajes', {
                pagina: 'Proximos Viajes',
                viajes
            }))
            .catch(error => console.log(error))
    });

    router.get('/viajes/:id', (req,res) => {
       Viaje.findByPk(req.params.id)
            .then(viaje => res.render('viaje', {
                viaje
            }))
            .catch(error => console.log(error))
    });

    router.get('/testimoniales', (req,res) => {
        Testimonial.findAll()
            .then(testimoniales => res.render('testimoniales', {
                pagina: 'Testimoniales',
                testimoniales
            }))
    });
    //cuando s ellena el form 
    router.post('/testimoniales', (req,res) => {
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
        
    })

    return router;
 }