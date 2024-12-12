const express = require("express");
const path = require('path');
const { engine } = require("express-handlebars");

const Handlebars = require('handlebars');
require('./Public/Js/helpers'); 


const app = express();

// Configuración del motor de vistas Handlebars
app.engine('hbs', engine({ 
    extname: 'hbs',
    defaultLayout: 'mainLayout', 
    layoutsDir: __dirname + '/Views/Layouts' 
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/Views');

// Middleware para analizar los datos del formulario
app.use(express.urlencoded({ extended: true }));


// Servir archivos estáticos
app.use(express.static(__dirname + '/Public'));


// Importar y usar routers
const HomeRoutes = require('./Routes/HomeRoutes');
const GeneroRoutes = require('./Routes/GeneroRoutes');
const SeriesRoutes = require('./Routes/SeriesRoutes');

app.use('/', HomeRoutes);
app.use('/Genero', GeneroRoutes);
app.use('/Series', SeriesRoutes);

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
