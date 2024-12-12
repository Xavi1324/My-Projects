
// Definir helper eq para comparaciones
const Handlebars = require('handlebars');

// Definir helper eq para comparaciones
Handlebars.registerHelper('eq', function (a, b) {
    if (a === b) {
        return true; // Devuelve true si son iguales
    } else {
        return false; // Devuelve false si no son iguales
    }
});



