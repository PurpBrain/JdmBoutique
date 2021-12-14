/*
 * Controller: ID Blog
 * ******************* */

// Controller pour la page de l'ID blog
const voiture = require("../../public/data/db.json").fiche;
exports.idblogpage = (req, res) => {
    console.log('je suis la page idblog');

    let voitureItem = {}

    voiture.forEach(art => {
        if (art.id === Number(req.params.id)) {
            voitureItem = art
        }        
    })
    
    var nbr = Number(voitureItem.id)
    nbr-=1
    res.render('idblog', {
        voiture: voiture[nbr],
        pathimg: `${voiture[nbr].img_url}`
    });
}