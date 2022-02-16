/*
 * Controller: Article
 * ******************* */

// Controller pour la page article


exports.articlepage = async(req, res) => {
    console.log('Page article');
    const { id } = req.params 
    let sql = `SELECT * 
               FROM article 
               INNER JOIN image 
               ON image.id_article = article.id_Article 
               WHERE article.id_Article = ${id}`;

    let getCom = await db.query(`SELECT * FROM comment INNER JOIN user ON comment.author_id = user.id_user WHERE article_id=${id};`)
    db.query(sql, (error, data, fields) => {
        if (error) throw error;

        res.render('article', {
            voiture: data[0],
            pathimg: data[0].img_url,
            commentaire: getCom,
        });
    })
}

exports.addcom = async (req, res) => {
    const { com } = req.body;
    const { id } = req.params
    console.log("id",id)

    await db.query(`INSERT INTO comment SET content= :com, author_id="${req.session.user.id_user}",article_id="${id}";`,{com});

    res.redirect("back")
}