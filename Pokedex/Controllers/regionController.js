const Pokemon = require('../Models/Pokemon');
const Region = require('../Models/Region');

// Obtener todas las regiones
exports.getAllRegions = async (req, res) => {
    try {
        const regiones = await Region.findAll();
        res.render('RegionAdmin/RegionViewList', { regiones });
    } catch (error) {
        console.error("Error al obtener las regiones:", error);
        res.status(500).send("Error al obtener las regiones");
    }
};

// Mostrar formulario para crear una nueva región
exports.createRegionForm = (req, res) => {
    res.render('RegionAdmin/AddRegion');
};

// Crear una nueva región
exports.createRegion = async (req, res) => {
    try {
        const { nombre } = req.body;
        await Region.create({ nombre });
        res.redirect('/Regiones');
    } catch (error) {
        console.error("Error al crear la región:", error);
        res.status(500).send("Error al crear la región");
    }
};

// Mostrar formulario para editar una región existente
exports.editRegionForm = async (req, res) => {
    try {
        const region = await Region.findByPk(req.params.id);
        if (!region) {
            return res.status(404).render('RegionAdmin/RegionError', { 
                errorMessage: "Región no encontrada"
            });
        }
        res.render('RegionAdmin/EditRegion', { region });
    } catch (error) {
        console.error("Error al cargar el formulario de edición:", error);
        res.status(500).send("Error al cargar el formulario de edición");
    }
};

// Actualizar una región existente
exports.updateRegion = async (req, res) => {
    try {
        const { nombre } = req.body;
        const updated = await Region.update({ nombre }, { where: { id: req.params.id } });
        if (updated[0] === 0) {
            return res.status(404).render('RegionAdmin/RegionError', { 
                errorMessage: "No se pudo actualizar la región, no encontrada"
            });
        }
        res.redirect('/Regiones');
    } catch (error) {
        console.error("Error al actualizar la región:", error);
        res.status(500).send("Error al actualizar la región");
    }
};

// Vista de confirmación de eliminación de una región
exports.confirmDeleteRegion = async (req, res) => {
    try {
        const region = await Region.findByPk(req.params.id);
        if (!region) {
            return res.status(404).render('RegionAdmin/RegionError', { 
                errorMessage: "Región no encontrada para eliminar"
            });
        }

        // Verifica si hay Pokémones asociados a la región
        const associatedPokemons = await Pokemon.findAll({ where: { regionId: region.id } });

        if (associatedPokemons.length > 0) {
            // Si hay Pokémones asociados, redirige a la vista de error
            return res.render('RegionAdmin/RegionError', { 
                errorMessage: "No se puede eliminar la región porque hay Pokémones asociados. Elimine primero los Pokémones."
            });
        }

        // Si no hay Pokémones asociados, redirige a la vista de confirmación de eliminación
        res.render('RegionAdmin/ConfirmDeleteRegion', { 
            id: region.id, 
            nombre: region.nombre 
        });
    } catch (error) {
        console.error("Error al cargar la confirmación de eliminación:", error);
        res.status(500).send("Error al cargar la confirmación de eliminación");
    }
};

// Eliminar una región después de la confirmación
exports.deleteRegion = async (req, res) => {
    try {
        const regionId = req.params.id;

        // Elimina la región de la base de datos
        const deleted = await Region.destroy({ where: { id: regionId } });
        if (deleted === 0) {
            return res.status(404).render('RegionAdmin/RegionError', { 
                errorMessage: "No se pudo eliminar la región, no encontrada"
            });
        }

        res.redirect('/Regiones');
    } catch (error) {
        console.error("Error al eliminar la región:", error);
        res.status(500).send("Error al eliminar la región");
    }
};
