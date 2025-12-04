const express = require('express');
const router = express.Router();
const {getAll, getAllById, getById, create, update} = require('../controllers/mensajeReceptorControllers');


router.get('/all', getAll);
router.get('/allById', getAllById);
router.get('/byId', getById);
router.post('/create', create);
router.put('/update', update);

module.exports = router;