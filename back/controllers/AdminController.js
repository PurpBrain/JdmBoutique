/*
 * Controller: Admin
 * ****************** */

// Controller pour la page admin

exports.adminpage = async (req, res) => {
    console.log('Page admin');

    const getUser = await db.query(`SELECT * FROM user;`);

    const sqlGetImg = await db.query(`SELECT * 
                                      FROM article 
                                      INNER JOIN image 
                                      ON image.id_article = article.id_Article
                                      INNER JOIN user
                                      ON article.author_id=user.id_user;`);

    res.render('admin', {
        layout: 'no-footer',
        user: getUser,
        voiture: sqlGetImg
    })
}

exports.getVoiture = (req, res) => {
    var numRows;
    var numPerPage = 6;
    var page = parseInt(req.query.page, 10) || 0;
    var numPages;
    var skip = page * numPerPage;
    var limit = skip + ',' + numPerPage;

    let sql = `SELECT count(*) as numRows FROM article`;
    db.query(sql, (error, results, fields) => {
        numRows = results[0].numRows;
        numPages = Math.ceil(numRows / numPerPage);
    })

    let sqlget = `SELECT * FROM article ORDER BY ID DESC LIMIT ${limit}`
    db.query(sqlget, (error, results, fields) => {
        if (page < numPages) {
            res.json({
                fiche: results,
                num_page: page
            })
        } else {
            res.redirect('blog')
        }

    })
}
exports.banUser = async (req, res) => {
    const { id } = req.params
    await db.query(`UPDATE role SET is_ban = 1 WHERE id_user=${id}`)
    res.render('admin', {
        flash: "Vous avez banni cet utilisateur"
    })
}