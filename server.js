/*
 * Server.js
 * Point d'entré de l'application (Main / Root)
 * ******************************************** */ 

console.log("Node JS");

// Import de variable d'environnement (.env)
require("dotenv").config();

// Import de module
const express = require("express");
const app = express();
const port = process.env.PORT || 3003;
const { engine } = require("express-handlebars");

// Configuration de handlebars
app.set("view engine", "hbs");
app.engine("hbs", engine({
    extname: "hbs",
    defaultLayout: "main",
  })
);

// Configuration de la route vers notre dossier static
app.use('/assets', express.static('public'))

// Import de notre router
const ROUTER = require('./back/router')
app.use('/', ROUTER) 

// Lancement de l'appli
app.listen(port, () => {
    console.log("le serv est sur le port:" + port);
})