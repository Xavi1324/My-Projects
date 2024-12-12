const express = require('express');
const router = express.Router();
const tipoController = require('../Controllers/tipoController');


router.get('/Tipos', tipoController.getAllTipos);
router.get('/Tipos/Add', tipoController.createTipoForm);
router.post('/Tipos/Add', tipoController.createTipo);
router.get('/Tipos/Edit/:id', tipoController.editTipoForm);
router.post('/Tipos/Edit/:id', tipoController.updateTipo);
router.get('/Tipos/ConfirmDeleteTipos/:id', tipoController.ComfirmDeleteTipo);
router.post('/Tipos/Delete/:id', tipoController.deleteTipo);

module.exports = router;
