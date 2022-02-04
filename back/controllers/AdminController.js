/*
 * Controller: Admin
 * ****************** */

// Controller pour la page admin

exports.adminpage = (req, res) => {
    console.log('Page admin');
    
    let sqlGetImg = `SELECT image.id_img, image.img_url, article.id_Article, article.make, article.model
                        FROM article 
                        INNER JOIN image
                        ON image.id_article = article.id_Article;`;

    db.query(sqlGetImg, (error, data, fields) => {
        if (error) throw error;
        res.render('admin', {
            voiture: data
        });
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

exports.addVoiture = async (req, res) => {
    console.log(req.files)
    // SQL pour creer un article

    const { make, model, price, description } = req.body;

    const cars_insert = await db.query(`INSERT INTO article SET make='${make}', model='${model}', price='${price}', author_id=${req.session.user.id_user}, description='${description}'`);

    for (i = 0; i < req.files.length; i++) {
        const picture_insert = await db.query(`INSERT INTO image SET img_url='${req.files[i].filename}', id_article='${cars_insert.insertId}'`);
        const update_cars = await db.query(`UPDATE article SET img_id ='${picture_insert.insertId}' WHERE id_Article='${cars_insert.insertId}'`);
    }

    // SQL récupération de tout les articles
    let sql = `SELECT * FROM article`;
    db.query(sql, (error, dataRes, fields) => {
        if (error) throw error;
        res.redirect('back')
    })

}

exports.delVoiture = (req, res) => {
    let sql = `DELETE image,article 
               FROM image
               INNER JOIN article
               ON image.id_article = article.img_id 
               WHERE image.id_article=?`
    db.query(sql, req.params.id, (error, dataRes, fields) => {
        if (error) throw error;
        res.redirect('back')
    })
}