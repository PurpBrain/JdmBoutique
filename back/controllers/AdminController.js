/*
 * Controller: Admin
 * ****************** */ 

// Controller pour la page admin
const voiture = require("../../public/data/db.json").fiche;

exports.adminpage = (req, res) => {
    console.log('je suis la page admin');

    res.render('admin',{
        voiture
    });
}