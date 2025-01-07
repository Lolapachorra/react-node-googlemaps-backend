const router = require('express').Router()

const EntregasController = require('../controllers/EntregasController.js')
//route crud

router.post('/create', EntregasController.createEntrega)
router.patch('/editarEntrega/:id', EntregasController.patchEntrega)
router.get('/:id', EntregasController.getEntregaById)
router.delete('/delete/:id', EntregasController.deleteEntregaById)
router.get('/', EntregasController.getAllEntregas)
router.get('/calculateroute/:id', EntregasController.calcularRota)
module.exports = router