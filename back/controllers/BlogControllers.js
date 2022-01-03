/*
 * Controller: Blog
 * **************** */ 
// Import la base de donnée
const voiture = require("../../public/data/db.json").fiche;

// Controller pour la page blog
exports.blogpage = (req, res) => {
    console.log('je suis la page blog');
    
    res.render('blog',{
        voiture
    });
}
