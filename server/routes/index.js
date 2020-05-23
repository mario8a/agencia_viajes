const express = require('express');
const router = express.Router();

const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');

//controladores
const nosotrosController = require('../controllers/nosotrosController');
const homeController = require('../controllers/homeController');
const viajesController = require('../controllers/viajesController')
const testimonialesController = require('../controllers/testimonialesController')

 module.exports = function() {
     /**USE: responde a todos los verbos http */
    //render (nombre carpeta)
    router.get('/', homeController.consultasHomepage);
    router.get('/nosotros',nosotrosController.infoNosotros);
    router.get('/viajes', viajesController.mostrarViajes);
    router.get('/viajes/:id',viajesController.mostrarViaje );
    router.get('/testimoniales', testimonialesController.mostrarTestimoniales);
    //cuando s ellena el form 
    router.post('/testimoniales', testimonialesController.crearTestimonial)

    return router;
 }