const { DataTypes } = require('sequelize');
const connection = require('../Context/AppContext');  

const Tipo = connection.define('Tipo', {
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
    tableName: 'Tipos',
    timestamps: false,
});

module.exports = Tipo;