/*
 * Controller: Admin
 * ****************** */

// Controller pour la page admin

exports.adminpage = (req, res) => {
    console.log('Page admin');
    // res.render("admin", {
    //     article: await db.query("SELECT * FROM article;"),
    //     image: await db.query("SELECT DISTINCT img_url FROM image;")
    //   });
    // let sql = `SELECT * FROM article`;
    let sqlGetImg = `SELECT image.id_img, image.img_url, article.id_Article, article.make, article.model
                        FROM article 
                        INNER JOIN image
                        ON image.id_article = article.img_id;`;

    db.query(sqlGetImg, (error, data, fields) => {
        if (error) throw error;

        res.render('admin', {
            voiture: data
        });
        // res.json({data})
    })


}

exports.getVoiture = (req, res) => {
    var numRows;
    var numPerPage = 6;
    var page = parseInt(req.query.page, 10) || 0;
    var numPages;
    var skip = page * numPerPage;
    var limit = skip + ',' + numPerPage;
    console.log("voiture", req.query.page)

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


    const cars_insert = await db.query(`INSERT INTO article SET make='${make}', model='${model}', price='${price}', author_id=1, description='${description}'`);

    for (i = 0; i < req.files.length; i++) {
        const picture_insert = await db.query(`INSERT INTO image SET img_url='${req.files[i].filename}', id_article='${cars_insert.insertId}'`);
        const update_cars = await db.query(`UPDATE article SET img_id ='${picture_insert.insertId}' WHERE id_Article='${cars_insert.insertId}'`);
    }

    //console.log(cars_insert.insertId);

    // let sql = `INSERT INTO article SET make=?, model=?, price=?, author_id=?, description=?`;

    // let values = [
    //     req.body.make,
    //     req.body.model,
    //     req.body.price,
    //     1,
    //     req.body.description
    // ];

    //let sqlGet = `SELECT id_Article FROM article ORDER BY id_Article  DESC LIMIT 1`;
    // db.query(sqlGet, function (err, data_id, fields) {
    //     if (err) throw err;
    //     for (i = 0; i < req.files.length; i++) {
    //         let sqlSet = `INSERT INTO image SET img_url=?, id_article=?`;

    //         let values = [
    //             req.files[i].filename,
    //             data_id[0].id_Article
    //         ]

    //         db.query(sqlSet, values, function (err, data3, fields) {
    //             if (err) throw err;

    //             console.log("test");

    //             let sqlUpdate = `UPDATE article SET img_id = ? WHERE id_Article= ?`

    //         })
    //     }
    // })


    // SQL récupération de tout les articles
    let sql = `SELECT * FROM article`;
    db.query(sql, (error, dataRes, fields) => {
        if (error) throw error;
        res.redirect('back')
    })

}

exports.delVoiture = (req, res) => {
    // let sql = `DELETE image,article  
    //            FROM image
    //            INNER JOIN article  
    //            ON image.id_article = article.img_id
    //            WHERE article.id_Article= ?`
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