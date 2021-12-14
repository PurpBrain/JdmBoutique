/*
 * Controller: ID Blog
 * ******************* */

// Controller pour la page de l'ID blog
const voiture = require("../../public/data/db.json").fiche;
exports.idblogpage = (req, res) => {
    console.log('je suis la page idblog');

    // let voitureItem = {}

    // voiture.forEach(art => {
    //     if (art.id === Number(req.params.id)) {
    //         voitureItem = art
    //         console.log(voitureItem);
    //     }        
    // })

    res.render('idblog', {
        voiture: voiture[req.params.id],
        pathimg: `${voiture[req.params.id].img_url}`
    });
}