/*
 * Controller: Home
 * **************** */ 

// Import la base de donnée
const voiture = require("../../public/data/db.json").fiche;

// Controller pour la page home
exports.homepage = (req, res) => {
    console.log('Page home');
    res.render('home',{
        voiture
    });
}