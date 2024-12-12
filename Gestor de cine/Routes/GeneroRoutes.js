// routes/generoRoutes.js
const express = require('express');
const router = express.Router();
const generoController = require('../Controller/GeneroController');

router.get('/', generoController.getGeneros); 
router.get('/Add', generoController.getAddGenero); 
router.post('/Add', generoController.postAddGenero); 
router.get('/Edit/:nombre', generoController.getEditGenero); 
router.post('/Edit/:nombre', generoController.postEditGenero);
router.post('/Delete/:nombre', generoController.postDeleteGenero); 
router.get('/Detail/:nombre', generoController.getGeneroDetail);




module.exports = router;
