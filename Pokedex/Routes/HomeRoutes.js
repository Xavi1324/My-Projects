const express = require('express');
const router = express.Router();
const homeController = require('../Controllers/HomeControllers');


router.get('/', homeController.filterPokemones);
router.get('/Pokemones/Filter', homeController.filterPokemones)


module.exports = router;