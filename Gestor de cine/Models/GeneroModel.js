const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../Data/Generos.json');

// Cargar géneros desde el archivo JSON
const loadGeneros = () => {
    const fileData = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(fileData);
};

// Guardar géneros en el archivo JSON
const saveGeneros = (generos) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(generos, null, 2));
};

class Genero {
    static fetchAll() {
        return loadGeneros();
    }

    static add(newGenero) {
        const generos = loadGeneros();
        if (generos.find(genero => genero.nombre === newGenero.nombre)) {
            throw new Error('El género ya existe');
        }
        generos.push(newGenero); 
        saveGeneros(generos); 
    }

    static findByName(nombre) {
        const generos = loadGeneros();
        return generos.find(genero => genero.nombre === nombre); 
    }

    static update(originalNombre, updatedGenero) {
        const generos = loadGeneros();
        const index = generos.findIndex(genero => genero.nombre === originalNombre);
        if (index !== -1) {
            generos[index] = updatedGenero; 
            saveGeneros(generos); 
        }
    }
        

    static delete(nombre) {
        let generos = loadGeneros();
        generos = generos.filter(genero => genero.nombre !== nombre); 
        saveGeneros(generos);
    }
}

module.exports = Genero;
