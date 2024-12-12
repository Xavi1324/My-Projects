// controllers/homeController.js
const Serie = require('../Models/SerieModel');
const Genero = require('../Models/GeneroModel');

exports.getHome = (req, res) => {
    const series = Serie.fetchAll(); // Obtener todas las series
    const generos = Genero.fetchAll(); // Obtener todos los géneros

    res.render('HomeView', { series, generos }); // Renderiza la vista inicial
};

exports.postSearchSeries = (req, res) => {
    const title = req.body.title ? req.body.title.trim().toLowerCase() : ''; // Título ingresado, normalizado
    const generoNombre = req.body.generoNombre || ''; // Nombre del género seleccionado, si existe
    const generos = Genero.fetchAll(); // Obtener todos los géneros
    const series = Serie.fetchAll(); // Obtener todas las series

    // Función para normalizar texto eliminando acentos
    const normalizeText = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Crear expresión regular de acuerdo al tamaño del texto ingresado
    let titleRegex;
    if (title.length === 1) {
        // Si hay solo un carácter, crear regex para coincidencia al inicio del título
        titleRegex = new RegExp(`^${normalizeText(title)}`, 'i');
    } else if (title.length > 1) {
        // Para más de un carácter, crear regex para coincidencia parcial
        titleRegex = new RegExp(normalizeText(title), 'i');
    }

    // Filtrar series por coincidencia parcial o inicio del título y coincidencia exacta en género
    const filteredSeries = series.filter(serie => {
        const titleMatch = title ? titleRegex.test(normalizeText(serie.title)) : true;
        const genreMatch = generoNombre ? serie.genero === generoNombre : true;
        return titleMatch && genreMatch;
    });

    // Renderizar la vista con series filtradas y valores actuales de `title` y `generoNombre`
    res.render('HomeView', { series: filteredSeries, generos, title, generoNombre });
};


exports.postFilterSeries = (req, res) => {
    const generoNombre = req.body.generoNombre || ''; // Género seleccionado
    const generos = Genero.fetchAll(); // Obtener todos los géneros
    const series = Serie.fetchAll(); // Obtener todas las series

    // Marcar el género seleccionado
    const generosConSeleccion = generos.map(genero => ({
        ...genero,
        isSelected: genero.nombre === generoNombre
    }));

    // Filtro de series
    const filteredSeries = generoNombre ? series.filter(serie => serie.genero === generoNombre) : series;

    // Renderizar vista y enviar `generoNombre` para conservar la selección
    res.render('HomeView', { series: filteredSeries, generos: generosConSeleccion, generoNombre });
};
