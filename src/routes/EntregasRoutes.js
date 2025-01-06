const router = require('express').Router()

const EntregasController = require('../controllers/EntregasController.js')
//route crud

router.post('/create', EntregasController.createEntrega)
router.get('/', EntregasController.getAllEntregas)
router.patch('/editarEntrega/:id', EntregasController.patchEntrega)
router.get('/:id', EntregasController.getEntregaById)
router.delete('/delete/:id', EntregasController.deleteEntregaById)

module.exports = router