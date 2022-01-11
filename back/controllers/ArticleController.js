/*
 * Controller: Article
 * ******************* */

// Controller pour la page article

exports.articlepage = (req, res) => {
    console.log('Page article');

    let sql = `SELECT * FROM voiture`;

    db.query(sql, (error, data, fields) => {
        if (error) throw error;

        
        res.render('article', {
            voiture: data[req.params.id],
            pathimg: `${data[req.params.id].img_url}`
        });
    })
}