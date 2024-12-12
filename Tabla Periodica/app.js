const express = require("express");

const app = express();
const { engine } = require('express-handlebars');

const inicioRouter = require("./Routes/inicio");

// Configurar el motor de plantillas Handlebars
app.engine("handlebars", engine());

// Configurar el motor de vistas
app.set("view engine", "handlebars"); // Cambiado a 'view engine'
app.set("views","views"); // Cambiado a 'views'

app.use(express.static("Public"));

app.use(inicioRouter);

app.listen(5001, () => {
    console.log("Listening on port 5001");
});
