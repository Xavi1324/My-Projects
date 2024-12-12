const Genero = require('../Models/GeneroModel');

exports.getGeneros = (req, res) => {
    const generos = Genero.fetchAll();
    res.render('GeneroView', { generos }); 
};

exports.getAddGenero = (req, res) => {
    res.render('GeneroAdmin/AddGenero'); 
};

exports.postAddGenero = (req, res) => {
    const newGenero = req.body;
    
    try {
        Genero.add(newGenero); 
        res.redirect('/Genero'); 
    } catch (error) {
        res.render('GeneroAdmin/AddGenero', { 
            errorMessage: error.message, 
            genero: newGenero 
        });
    }
};

exports.getEditGenero = (req, res) => {
    const generoNombre = req.params.nombre; 
    const genero = Genero.findByName(generoNombre); 
    res.render('GeneroAdmin/EditGenero', { genero }); 
};


exports.postEditGenero = (req, res) => {
    const originalNombre = req.body.originalNombre; 
    const updatedGenero = req.body; 
    Genero.update(originalNombre, updatedGenero); 
    res.redirect('/Genero'); 
};

exports.postDeleteGenero = (req, res) => {
    const generoNombre = req.params.nombre;
    Genero.delete(generoNombre); 
    res.redirect('/Genero');
};


exports.getGeneroDetail = (req, res) => {
    const generoNombre = req.params.nombre;
    const genero = Genero.findByName(generoNombre); 
    res.render('GeneroAdmin/DetailGenero', { genero });
};
