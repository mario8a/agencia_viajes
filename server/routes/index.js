const express = require('express');
const router = express.Router();

 module.exports = function() {
     /**USE: responde a todos los verbos http */
    //render (nombre carpeta)
     router.get('/', (req,res) => {
        res.render('index')
    });

    router.get('/nosotros', (req,res) => {
        res.render('nosotros', {
            pagina: 'Sobre nosotros'
        });
    });

    return router;
 }