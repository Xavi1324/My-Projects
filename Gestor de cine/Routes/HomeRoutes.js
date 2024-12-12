// routes/homeRoutes.js
const express = require('express');
const router = express.Router();
const homeController = require('../Controller/HomeController');

router.get('/', homeController.getHome); 
router.post('/Series/Search', homeController.postSearchSeries); 
router.post('/Series/Filter', homeController.postFilterSeries);

module.exports = router;
