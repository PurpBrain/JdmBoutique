/*
 * Controller: Article
 * ******************* */

// Controller pour la page article

exports.articlepage = (req, res) => {
    console.log('Page article');

    let sql = `SELECT * FROM article WHERE ID = ${req.params.id}`;

    db.query(sql, (error, data, fields) => {
        if (error) throw error;

        
        res.render('article', {
            voiture: data[0],
            pathimg: data[0].img_url
        });
    })
}