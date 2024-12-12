// Models/SerieModel.js
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../Data/Series.json');

// Cargar series desde el archivo JSON
const loadSeries = () => {
    const fileData = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(fileData);
};

// Guardar series en el archivo JSON
const saveSeries = (series) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(series, null, 2));
};

class Serie {
    static fetchAll() {
        return loadSeries();
    }

    static add(newSerie) {
        const series = loadSeries();
        const lastId = series.length ? series[series.length - 1].id : 0; 
        newSerie.id = lastId + 1; 
        series.push(newSerie); 
        saveSeries(series); 
    }

    static findById(id) {
        const series = loadSeries();
        return series.find(serie => serie.id === parseInt(id)); 
    }

    static update(id, updatedSerie) {
        const series = loadSeries();
        const index = series.findIndex(serie => serie.id === parseInt(id));
        if (index !== -1) {
            updatedSerie.id = parseInt(id); 
            series[index] = updatedSerie; 
            saveSeries(series); 
        }
    }

    static delete(id) {
        let series = loadSeries();
        series = series.filter(serie => serie.id !== parseInt(id)); 
        saveSeries(series); 
    }
}

module.exports = Serie;
