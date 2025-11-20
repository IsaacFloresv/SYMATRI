const express = require('express');
const router = express.Router();
const {getAll, getAllById, getById, create, update} = require('../controllers/mensajeReceptorControllers');

// Obtener todos los registros
router.get('/all', getAll);

// Obtener todos los registros que corresponde a un mismo mensaje
router.get('/allById', getAllById);

// Obtener un registro por ID
router.get('/byId', getById);

// Crear registros de receptores para un mensaje
router.post('/create', create);

// Marcar un mensaje como leído por un receptor
router.put('/update', update);

module.exports = router;