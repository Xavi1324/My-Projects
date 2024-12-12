const sequelize = require('sequelize');
const path = require('path');

const connection = new sequelize('sqlite::memory', {
    dialect: 'sqlite',
    storage: path.join(path.dirname(require.main.filename), 'Data', 'pokemon.sqlite'),
});


module.exports = connection;