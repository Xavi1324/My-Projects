// routes/series.js
const express = require('express');
const router = express.Router();
const seriesController = require('../Controller/SeriesController');

router.get('/', seriesController.getSeries); 
router.get('/Add', seriesController.getAddSerie); 
router.post('/Add', seriesController.postAddSeries); 
router.get('/Edit/:id', seriesController.getEditSeries); 
router.post('/Edit/:id', seriesController.postEditSeries);
router.post('/Delete/:id', seriesController.postDeleteSeries); 
router.get('/Detail/:id', seriesController.getSeriesDetail);


module.exports = router;
