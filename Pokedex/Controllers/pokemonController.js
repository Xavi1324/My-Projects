const Pokemon = require('../Models/Pokemon');
const Tipo = require('../Models/Tipo');
const Region = require('../Models/Region');

// Obtener todos los Pokemones
exports.getAllPokemons = async (req, res) => {
    try {
        const pokemones = await Pokemon.findAll({
            include: [
                { model: Region },
                { model: Tipo}
            ],
        });
        res.render('PokemonAdmin/PokemonViewList', { 
            pokemones: pokemones  });
    } catch (error) {
        console.error("Error al obtener los pokemones:", error);
        res.status(500).send("Error al obtener los pokemones");
    }
};

// Formulario para crear nuevo Pokemon
exports.createPokemonForm = async (req, res) => {
    try {
        const tipos = await Tipo.findAll();
        const regiones = await Region.findAll();
        res.render('PokemonAdmin/AddPokemon', { tipos, regiones });
    } catch (error) {
        console.error("Error al cargar el formulario de creación:", error);
        res.status(500).send("Error al cargar el formulario de creación");
    }
};

// Guardar nuevo Pokemon
exports.createPokemon = async (req, res) => {
    try {
        const { nombre, imagen, tipoId, regionId } = req.body;
        await Pokemon.create({ nombre, imagen, tipoId, regionId });
        res.redirect('/Pokemones'); // Redirecciona a la lista de pokemones
    } catch (error) {
        console.error("Error al crear el pokemon:", error);
        res.status(500).send("Error al crear el pokemon");
    }
};

// Formulario para editar Pokemon
exports.editPokemonForm = async (req, res) => {
    try {
        const pokemon = await Pokemon.findByPk(req.params.id);
        const tipos = await Tipo.findAll();
        const regiones = await Region.findAll();
        res.render('PokemonAdmin/EditPokemon', { pokemon, tipos, regiones });
    } catch (error) {
        console.error("Error al cargar el formulario de edición:", error);
        res.status(500).send("Error al cargar el formulario de edición");
    }
};

// Actualizar Pokemon
exports.updatePokemon = async (req, res) => {
    try {
        const { nombre, imagen, tipoId, regionId } = req.body;
        await Pokemon.update({ nombre, imagen, tipoId, regionId }, {
            where: { id: req.params.id }
        });
        res.redirect('/Pokemones');
    } catch (error) {
        console.error("Error al actualizar el pokemon:", error);
        res.status(500).send("Error al actualizar el pokemon");
    }
};

exports.confirmDeletePokemon = async (req, res) => {
    try {
        const pokemon = await Pokemon.findByPk(req.params.id);
        if (!pokemon) {
            return res.status(404).send('Pokémon no encontrado');
        }
        res.render('PokemonAdmin/ConfirmDeletePokemon', { pokemon });
    } catch (error) {
        console.error("Error al cargar el Pokémon para eliminación:", error);
        res.status(500).send("Error al cargar el Pokémon para eliminación");
    }
};

// Eliminar un Pokémon
exports.deletePokemon = async (req, res) => {
    try {
        const pokemonid = req.params.id;
        const deleted = await Pokemon.destroy({ where: { id: pokemonid } });
        if (deleted === 0) {
            return res.status(404).render('PokemonAdmin/PokemonError', { 
                errorMessage: "No se pudo eliminar el Pokémon, no encontrado"
            });
        }
        res.redirect('/Pokemones');
    } catch (error) {
        console.error("Error al eliminar el Pokémon:", error);
        res.status(500).send("Error al eliminar el Pokémon");
    }
};

;