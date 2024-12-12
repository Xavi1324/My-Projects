const express = require('express');
const router = express.Router();
const regionController = require('../Controllers/regionController');


router.get('/Regiones', regionController.getAllRegions);
router.get('/Regiones/Add', regionController.createRegionForm);
router.post('/Regiones/Add', regionController.createRegion);
router.get('/Regiones/Edit/:id', regionController.editRegionForm);
router.post('/Regiones/Edit/:id', regionController.updateRegion);
router.get('/Regiones/ConfirmDelete/:id', regionController.confirmDeleteRegion);
router.post('/Regiones/Delete/:id', regionController.deleteRegion);


module.exports = router;
