const express = require('express')
const router = express.Router()

const { getAll, search } = require('../controllers/eventosControllers')

// Ruta de ejemplo: /eventos/all?seccionId=A1&start=2024-08-01&end=2024-09-30
router.get('/all', getAll)

// Buscar por userId y/o seccionId (devuelve eventos expandidos para calendario)
// Ejemplo: /eventos/search?userId=6&seccionId=2&start=2024-08-01&end=2024-09-30
router.get('/search', search)

module.exports = router
