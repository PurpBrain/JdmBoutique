/*
 * Server.js
 * Point d'entré de l'application (Main / Root)
 * ******************************************** */

console.log("Node JS");

// Import de variable d'environnement (.env)
require("dotenv").config();

// Import de module
const express = require("express"),
 app = express(),
 bodyParser = require('body-parser'),
 methodOverride = require('method-override'),
 port = process.env.PORT || 3003,
 {engine} = require("express-handlebars"),
 Handlebars = require('handlebars'),
 mysql = require('mysql');

let conf = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};

db = mysql.createConnection(conf);

db.connect((err) => {
  if (err) console.error('error connecting: ' + err.stack);
  console.log('connected as id ' + db.threadId);
});


// Configuration de handlebars
app.set("view engine", "hbs");
app.engine("hbs", engine({
  extname: "hbs",
  defaultLayout: "main",
}));

app.use(methodOverride('_method'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Configuration de la route vers notre dossier static
app.use('/assets', express.static('public'))

// Helper pour donner une limite de card a afficher
Handlebars.registerHelper('limit', function (ar, max) {

  let arrayVoiture = [];
  for (i = 0; i < max; i++) {
    var random = Math.floor(Math.random() * ar.length);
    var random_voiture = ar[random];
    // Si random_voiture est présent dans arrayVoiture alors on retire 1 à i afin de refaire un tour de boucle 
    if (arrayVoiture.includes(random_voiture)) {
      i -= 1;
      console.log("doublons");
    } else {
      // Ajout de la voiture choisi aléatoirement
      arrayVoiture.push(random_voiture)
    }
  }
  return arrayVoiture;
});


// Import de notre router
const ROUTER = require('./back/router');
const {
  array
} = require("./back/config/multer");
app.use('/', ROUTER)

// Lancement de l'appli
app.listen(port, () => {
  console.log("le serv est sur le port:" + port);
})