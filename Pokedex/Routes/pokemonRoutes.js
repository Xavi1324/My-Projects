// routes/pokemonRoutes.js
const express = require('express');
const router = express.Router();
const pokemonController = require('../Controllers/pokemonController');

router.get('/', pokemonController.getAllPokemons);
router.get('/AddPokemon', pokemonController.createPokemonForm);
router.post('/AddPokemon', pokemonController.createPokemon);
router.get('/Edit/:id', pokemonController.editPokemonForm);
router.post('/EditPokemon/:id', pokemonController.updatePokemon);
router.get('/ConfirmDeletePokemon/:id', pokemonController.confirmDeletePokemon);
router.post('/delete/:id', pokemonController.deletePokemon);

module.exports = router;
