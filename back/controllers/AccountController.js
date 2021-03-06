const fs = require("fs");
const path = require('path');
const { deleteFile } = require('../utils/deleteFile');

exports.accountpage = async (req, res) => {
    console.log('Page Mon compte');
    // console.log("numero user",req.session.user.id_user)

    const getMyArt = await db.query(`SELECT * FROM article INNER JOIN image ON image.id_article = article.id_Article WHERE author_id=${req.session.user.id_user}`)
    const myCom = await db.query(`SELECT * 
                                  FROM comment 
                                  INNER JOIN article ON comment.article_id = article.id_Article 
                                  INNER JOIN image ON image.id_article = article.id_Article
                                  WHERE comment.author_id=${req.session.user.id_user}`)
    // Afficher la page contact 
    res.render('account', {
        layout: 'no-footer',
        myArticle: getMyArt,
        myCom: myCom
    });
}

const bcrypt = require('bcrypt');

exports.editProfile = async (req, res) => {
    // Récupération de l'id 
    const { id } = req.params
    // console.log("id", id)
    // Récupération des infos 
    const { pseudo, email, mdp, old_mdp, new_mdp, confirm_new_mdp } = req.body

    // Faire await pour obtenir les infos de l'user 
    const user = await db.query(`SELECT * FROM user WHERE id_user = ${id}`);
    const role = await db.query(`SELECT * FROM role WHERE id_user = ${id}`);

    // Condition pour les changements 
    let setavatar = !req.file ? user[0].avatar_url : req.file.filename
    let setpseudo = !pseudo ? user[0].pseudo : pseudo
    let setemail = !email ? user[0].email : email
    let setpassword = !hash ? user[0].hash : hash

    if (req.file) {
        const user = await db.query(`SELECT * FROM user WHERE id_user = ${id}`)
        await db.query(`UPDATE user SET avatar_url="${setavatar}" WHERE id_user = ${id}`)
        req.session.user = {
            id_user: id,
            avatar_url: setavatar,
            pseudo: setpseudo,
            email: setemail,
            password: setpassword,
            isAdmin: role[0].is_admin
        };
        // console.log(user)
        const dir = path.join("./public/img/img-user")
        deleteFile(dir, user[0].avatar_url)
        res.redirect('back')
    }
    if (!req.file && !old_mdp) {
        var hash = bcrypt.hashSync(mdp, 10);
        // Comparaison des mdp 
        bcrypt.compare(mdp, user[0].password, async function (err, result) {
            console.log(result)
            if (result === true) {
                await db.query(`UPDATE user SET pseudo= :setpseudo, email=:setemail, password="${hash}" WHERE id_user = ${id}`,{setpseudo, setemail})

                console.log("modif faite")
                req.session.user = {
                    id_user: id,
                    avatar_url: setavatar,
                    pseudo: setpseudo,
                    email: setemail,
                    password: setpassword,
                    isAdmin: role[0].is_admin
                };
                res.redirect('back')

            } else res.render('account', {
                flash: "Mauvais mdp !"
            })
        })
    }
    if (old_mdp) {
        bcrypt.compare(old_mdp, user[0].password, async function (err, result) {
            if (result === true) {
                if (new_mdp == confirm_new_mdp) {
                    const hash = bcrypt.hashSync(new_mdp, 10)
                    await db.query(`UPDATE user SET password="${hash}" WHERE id_user = ${id}`);
                    res.render('account', {
                        flash: "Mot de passe modifié !"
                    })
                } else {
                    res.render('account', {
                        flash: "Les mots de passe ne sont pas identiques"
                    })
                }
            } else {
                res.render('account', {
                    flash: "Mauvais mot de passe"
                })
            }
        })
    }
}

exports.addVoiture = async (req, res) => {
    console.log(req.files)
    // SQL pour creer un article

    const { make, model, price, description } = req.body;

    const cars_insert = await db.query(`INSERT INTO article SET make= :make, model= :model, price='${price}', author_id=${req.session.user.id_user}, description= :description`,{make, model, description});

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

    await db.query(`UPDATE article 
                    SET make= :make, model= :model, price="${price}", description= :description WHERE id_Article=${id}`,{make, model, description})

    if (req.file) {
        const dir = path.join("./public/img/Voitures-Img")
        deleteFile(dir, image[0].img_url)

        await db.query(`UPDATE image SET img_url = "${req.file.filename}" WHERE id_img = "${id}"`)
    }

    console.log("Modif OK")
    res.redirect('back')
}

exports.delVoiture = async (req, res) => {
    const { id } = req.params
    const image = await db.query(`SELECT * FROM image WHERE id_img = ${id}`)
    const comment = await db.query(`SELECT * FROM comment WHERE comment.article_id= ${id}`)
    const dir = path.join("./public/img/Voitures-Img")
    deleteFile(dir, image[0].img_url)

    let test;
    !comment[0] ? test = 'LEFT' : test = 'RIGHT' 

    await db.query(`DELETE comment, image, article FROM article
        RIGHT JOIN image ON image.id_article = article.id_Article 
        ${test} JOIN comment ON comment.article_id  = article.id_Article
        WHERE (article.id_Article = '${id}' OR comment.article_id = '${id}');`);

    res.redirect("back")
}

exports.delCom = async (req, res) => {
    const { id } = req.params
    await db.query(`DELETE FROM comment WHERE id_comment=${id}`)
    console.log("Com effacé")
    res.redirect("back")
}