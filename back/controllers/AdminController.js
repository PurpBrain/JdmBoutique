/*
 * Controller: Admin
 * ****************** */ 

// Controller pour la page admin
const voiture = require("../../public/data/db.json").fiche;

exports.adminpage = (req, res) => {
    console.log('Page admin');

    res.render('admin',{
        voiture
    });
}