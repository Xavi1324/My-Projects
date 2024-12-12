const express = require('express');
const {engine} = require('express-handlebars');
const app = express();
const connection = require('./Context/AppContext');

require('./Public/JS/helpers');

app.engine('hbs', engine({ 
    extname: 'hbs',
    defaultLayout: 'mainLayouts', 
    layoutsDir: __dirname + '/Views/Layouts',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true  // Esto permite acceder a propiedades del prototipo
    }
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/Views');

app.use(express.urlencoded({ extended: true }));


app.use(express.static(__dirname + '/Public'));

const HomeRoutes = require('./Routes/HomeRoutes');
app.use('/', HomeRoutes)

 const pokemonRoutes = require('./Routes/pokemonRoutes');
app.use('/Pokemones', pokemonRoutes); 

const regionRoutes = require('./Routes/RegionRoutes');
app.use(regionRoutes);

const tipoRoutes = require('./Routes/TipoRoutes');
app.use(tipoRoutes);

connection.sync();
app.listen(5001,() => {
    console.log('Server is running on port 5001');
});



