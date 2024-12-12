// controllers/seriesController.js
const Serie = require('../Models/SerieModel');
const Genero = require('../Models/GeneroModel');

exports.getSeries = (req, res) => {
    const series = Serie.fetchAll();
    const generos = Genero.fetchAll(); 
    res.render('SeriesView', { series, generos }); 
};

exports.getAddSerie = (req, res) => {
    const generos = Genero.fetchAll(); 
    res.render('admin/AddSeries', { generos }); 
};

exports.postAddSeries = (req, res) => {
    const newSerie = {
        title: req.body.title,
        genero: req.body.genero, 
        imagenPortada: req.body.imagenPortada,
        descripcion: req.body.descripcion,
        videoUrl: req.body.videoUrl
    };
    
    Serie.add(newSerie); 
    res.redirect('/Series'); 
};

exports.getEditSeries = (req, res) => {
    const serieId = parseInt(req.params.id, 10); 
    const serie = Serie.findById(serieId); 
    const generos = Genero.fetchAll(); 
    res.render('admin/EditSeries', { serie, generos });
}

exports.postEditSeries = (req, res) => {
    const serieId = parseInt(req.params.id, 10);
    const updatedSerie = req.body; 
    Serie.update(serieId, updatedSerie); 
    res.redirect('/Series'); 
};

exports.postDeleteSeries = (req, res) => {
    const serieId = parseInt(req.params.id, 10);
    Serie.delete(serieId); 
    res.redirect('/Series'); 
};

exports.getSeriesDetail = (req, res) => {
    const serieId = parseInt(req.params.id, 10);
    const serie = Serie.findById(serieId); 
    res.render('admin/DetailSeries', { serie }); 
};
