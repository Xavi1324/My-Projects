// controllers/homeController.js
const Pokemon = require('../Models/Pokemon');
const Region = require('../Models/Region');
const Tipo = require('../Models/Tipo');
const { Op } = require('sequelize');

exports.filterPokemones = async(req, res) => {
    try {
        const { nombre, tipoNombre, regionNombre } = req.query;

        // Construir el objeto de búsqueda dinámicamente
        const whereConditions = {};

        if (nombre) {
            whereConditions.nombre = { [Op.like]: `%${nombre}%` };
        }

        if (tipoNombre) {
            const tipo = await Tipo.findOne({ where: { nombre: tipoNombre } });
            if (tipo) whereConditions.tipoId = tipo.id;
        }

        if (regionNombre) {
            const region = await Region.findOne({ where: { nombre: regionNombre } });
            if (region) whereConditions.regionId = region.id;
        }

        // Realizar la consulta con las condiciones de búsqueda
        const pokemones = await Pokemon.findAll({
            where: whereConditions,
            include: [Tipo, Region],
        });

        // Obtener los tipos y regiones para las opciones de filtrado
        const tipos = await Tipo.findAll();
        const regiones = await Region.findAll();

        res.render('home', {
            pokemones,
            tipos,
            regiones,
            nombre,
            tipoNombre,
            regionNombre,
        });
    } catch (error) {
        console.error("Error al filtrar Pokemones:", error);
        res.status(500).send("Error en el servidor");
    }
};


