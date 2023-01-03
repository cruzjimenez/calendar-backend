
// Todas tienen que pasar la por la validadción del JWT
//const router = require("../routes/auth");
/*
    Rutas de Eventos / Auth
    host + /api/events
*/
const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {getEventos, crearEvento, actualizarEvento,  eliminaEvento} = require('../controllers/events');
const {validarJWT} = require('../middlewares/validar-jwt');
const { isDate } = require('../helpers/isDate');

const events = Router();

// Todas tienen que pasar por la validación del JWT
events.use(validarJWT);
// Obtener eventos
events.get('/', getEventos);

//Crear un nuevo evento
events.post(
    '/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento);

//Actualizar evento
events.put('/:id', [
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').custom( isDate ),
    check('end','Fecha de finalización es obligatoria').custom( isDate ),
    validarCampos
], actualizarEvento);

//Boprrar evento
events.delete('/:id', eliminaEvento);

module.exports = events;