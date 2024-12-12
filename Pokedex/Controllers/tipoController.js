const { where } = require('sequelize');
const Pokemon = require('../Models/Pokemon');
const Tipo = require('../Models/Tipo');

// Obtener todos los tipos
exports.getAllTipos = async (req, res) => {
    try {
        const tipos = await Tipo.findAll();
        res.render('TipoAdmin/TipoViewList', { tipos });
    } catch (error) {
        console.error("Error al obtener los tipos:", error);
        res.status(500).send("Error al obtener los tipos");
    }
};

// Mostrar formulario para crear un nuevo tipo
exports.createTipoForm = (req, res) => {
    res.render('TipoAdmin/AddTipo');
};

// Crear un nuevo tipo
exports.createTipo = async (req, res) => {
    try {
        const { nombre } = req.body;
        await Tipo.create({ nombre });
        res.redirect('/Tipos');
    } catch (error) {
        console.error("Error al crear el tipo:", error);
        res.status(500).send("Error al crear el tipo");
    }
};

// Mostrar formulario para editar un tipo existente
exports.editTipoForm = async (req, res) => {
    try {
        const tipo = await Tipo.findByPk(req.params.id);
        res.render('TipoAdmin/EditTipo', { tipo });
    } catch (error) {
        console.error("Error al cargar el formulario de edición:", error);
        res.status(500).send("Error al cargar el formulario de edición");
    }
};

// Actualizar un tipo existente
exports.updateTipo = async (req, res) => {
    try {
        const { nombre } = req.body;
        await Tipo.update({ nombre }, {
            where: { id: req.params.id }
        });
        res.redirect('/Tipos');
    } catch (error) {
        console.error("Error al actualizar el tipo:", error);
        res.status(500).send("Error al actualizar el tipo");
    }
};

exports.ComfirmDeleteTipo = async (req, res) => {
    try {
        const tipo = await Tipo.findByPk(req.params.id);
        if (!tipo) {
            return res.status(404).render('TipoAdmin/TipoError', { 
                errorMessage: "Tipo no encontrado para eliminar"
            });
        }
        const associatedPokemons = await Pokemon.findAll({ where: { tipoId: tipo.id } });
        if (associatedPokemons.length > 0) {
            // Si hay Pokémones asociados, redirige a la vista de error
            return res.render('TipoAdmin/TipoError', { 
                errorMessage: "No se puede eliminar este tipo porque hay Pokémones asociados. Elimine primero los Pokémones."
            });
        }
        res.render('TipoAdmin/ConfirmDeteleTipo', { 
            id: tipo.id, 
            nombre: tipo.nombre 
        });
               
    } catch (error) {
        console.error("Error al cargar la confirmación de eliminación:", error);
        res.status(500).send("Error al cargar la confirmación de eliminación");
        
    }
};

// Eliminar un tipo
exports.deleteTipo = async (req, res) => {
    try {
        const tipoId = req.params.id;
        const deleted = await Tipo.destroy({where: {id: tipoId}});
        if (deleted === 0) {
            return res.status(404).render('TipoAdmin/TipoError', { 
                errorMessage: "No se pudo eliminar el tipo, no encontrado"
            });
        }
        res.redirect('/Tipos');
    } catch (error) {
        console.error("Error al eliminar el tipo:", error);
        res.status(500).send("Error al eliminar el tipo");
    }
};


