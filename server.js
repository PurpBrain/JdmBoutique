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
  { engine } = require("express-handlebars"),
  Handlebars = require('handlebars'),
  util = require('util'),
  mysql = require('mysql'),
  expressSession = require("express-session"),
  MySQLStore = require("express-mysql-session")(expressSession);

let conf = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};

var sessionStore = new MySQLStore(conf); 

// Express-session
app.use(
  expressSession({
    secret: "securite",
    name: "ptiGato",
    saveUninitialized: true,
    resave: false,
    store: sessionStore
  })
);

db = mysql.createConnection(conf);

db.config.queryFormat = function (query, values) {
  if (!values) return query;
  return query.replace(/\:(\w+)/g, function (txt, key) {
    if (values.hasOwnProperty(key)) {
      return this.escape(values[key]);
    }
    return txt;
  }.bind(this));
};

db.query = util.promisify(db.query).bind(db);


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
// Session Connexion for HBS
app.use('*', (req, res, next) => {
  res.locals.user = req.session.user;
  next();
})

// Configuration de la route vers notre dossier static
app.use('/assets', express.static('public'))

// Helper pour donner une limite de card a afficher
Handlebars.registerHelper('limit', function (ar, max) {
  
  var db = ar.slice(0,max);
  return db;

});
Handlebars.registerHelper('iffpage', function (a, b, opts) {
  if (a == b) {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
})

// Import de notre router
const ROUTER = require('./back/router');
app.use('/', ROUTER)
// Met toutes les pages non défini en 404 error
app.use('*',function(req, res) {
  res.status(404).render("error404", {
    layout: 'err'
  })
})

// Lancement de l'appli
app.listen(port, () => {
  console.log("le serv est sur le port:" + port);
})