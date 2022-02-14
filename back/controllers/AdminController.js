/*
 * Controller: Admin
 * ****************** */

// Controller pour la page admin
const fs = require("fs");
const path = require('path');
const { deleteFile } = require('../utils/deleteFile');

exports.adminpage = async (req, res) => {
    console.log('Page admin');

    const getUser = await db.query(`SELECT * FROM user;`);

    const sqlGetImg = await db.query(`SELECT * FROM article INNER JOIN image ON image.id_article = article.id_Article;`);

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

exports.editVoiture = async (req, res) => {
    const { id } = req.params
    const { make, model, price, img, description } = req.body

    const article = await db.query(`SELECT * FROM article WHERE id_Article = ${id}`)
    const image = await db.query(`SELECT * FROM image WHERE id_img = ${id}`)

    await db.query(`UPDATE article SET make="${make}", model="${model}", price="${price}", author_id="${req.session.user.id_user}", description="${description}" WHERE id_Article=${id}`)

    if (req.file) {
        const dir = path.join("./public/img/Voitures-Img")
        deleteFile(dir, image[0].img_url)

        await db.query(`UPDATE image SET img_url = "${req.file.filename}" WHERE id_img = "${id}"`)
    }

    console.log("Modif OK")
    res.redirect('/admin')
}
exports.delVoiture = async (req, res) => {
    const { id } = req.params
    const image = await db.query(`SELECT * FROM image WHERE id_img = ${id}`)
    const dir = path.join("./public/img/Voitures-Img")
    deleteFile(dir, image[0].img_url)

    let sql = `DELETE image,article 
               FROM image
               INNER JOIN article
               ON image.id_article = article.id_Article
               WHERE image.id_article=?`
    db.query(sql, req.params.id, (error, dataRes, fields) => {
        if (error) throw error;
        res.redirect('back')
    })
}
