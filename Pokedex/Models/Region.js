const { DataTypes } = require('sequelize');
const connection = require('../Context/AppContext');  

const Region = connection.define('Region', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'Regiones',
    timestamps: false, 
});

module.exports = Region;