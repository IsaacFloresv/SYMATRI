const express = require('express');
const router = express.Router();
const mensajeReceptorController = require('../controllers/mensajeReceptorControllers');

// Obtener todos los registros
router.get('/getAll', mensajeReceptorController.getAll);

// Obtener un registro por ID
router.get('/byId', mensajeReceptorController.getById);

// Crear registros de receptores para un mensaje
router.post('/create', mensajeReceptorController.create);

// Marcar un mensaje como leído por un receptor
router.put('/update', mensajeReceptorController.update);

module.exports = router;