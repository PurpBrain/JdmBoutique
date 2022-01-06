/*
 * Controller: Article
 * ******************* */

// Controller pour la page article

exports.articlepage = (req, res) => {
    console.log('Page article');

    let sql = `SELECT * FROM voiture`;

    db.query(sql, (error, data, fields) => {
        if (error) throw error;

        let voitureItem = {}

        data.forEach(art => {
            if (art.id === Number(req.params.id)) {
                voitureItem = art
            }
        })

        var nbr = Number(voitureItem.id)
        nbr -= 1

        res.render('article', {
            voiture: data[nbr],
            pathimg: `${data[nbr].img_url}`
        });
    })
}