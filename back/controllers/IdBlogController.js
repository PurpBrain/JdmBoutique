/*
 * Controller: ID Blog
 * ******************* */

// Controller pour la page de l'ID blog
const voiture = require("../../public/data/db.json").fiche;
exports.idblogpage = (req, res) => {
    console.log('je suis la page idblog');

    let article = {}

    voiture.forEach(art => {
        if (art.id === Number(req.params.id)) {
            article = art
            console.log(article);
        }
        let n = number(article.id)-1
    })

    res.render('idblog', {
        article,
        pathimg: `${voitures[n].img_url}`
    });
}