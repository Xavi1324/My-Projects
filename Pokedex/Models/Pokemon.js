// models/Pokemon.js
const { DataTypes } = require('sequelize');
const connection = require('../Context/AppContext'); 
const Tipo = require('./Tipo');
const Region = require('./Region');

const Pokemon = connection.define('Pokemon', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Tipo, // Nombre del modelo al que se refiere
            key: 'id',   // Nombre de la clave primaria en el modelo referenciado
        },
    },
    regionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Region, // Nombre del modelo al que se refiere
            key: 'id',     // Nombre de la clave primaria en el modelo referenciado
        },
    },
}, {
    tableName: 'Pokemones',
    timestamps: false,
});
Pokemon.belongsTo(Tipo, { foreignKey: 'tipoId' });
Pokemon.belongsTo(Region, { foreignKey: 'regionId' });

module.exports = Pokemon;


