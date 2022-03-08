/*
 * Controller: Admin
 * ****************** */

// Controller pour la page admin

exports.adminpage = async (req, res) => {
    console.log('Page admin');

    const getUser = await db.query(`SELECT * FROM user INNER JOIN role ON user.id_user = role.id_user;`);

    const sqlGetImg = await db.query(`SELECT * 
                                      FROM article 
                                      INNER JOIN image 
                                      ON image.id_article = article.id_Article
                                      INNER JOIN user
                                      ON article.author_id=user.id_user ORDER BY article.id_Article 
                                      DESC;`);
    const getMessage = await db.query(`SELECT * FROM message`)

    res.render('admin', {
        layout: 'no-footer',
        users: getUser,
        voiture: sqlGetImg,
        message: getMessage
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
    res.redirect('back')
}

exports.debanUser = async (req, res) => {
    const { id } = req.params;
    await db.query(`UPDATE role SET is_ban = 0 WHERE id_user=${id}`)
    res.redirect('back')
}

exports.repMsg = async (req,res) => {
    const { mailSend } = require("../utils/nodeMailer")
    const { reponse } = req.body;
    const { id } = req.params;
    const [message] = await db.query(`SELECT * FROM message WHERE idmessage=${id}`)

    let msg = `Votre message:${message.message}<br>Réponse de l'admin: ${reponse}`;

    mailSend (`JDM BOUTIQUE <${process.env.MAIL_USER}>`,`${message.email}`,"Réponse à votre demande",msg, async(err,info) => {
        if (err) {
            console.log(err)
            res.redirect('back')
        }else {
            await db.query(`DELETE FROM message WHERE idmessage=${id}`)
            res.redirect('back')
        }
    })
    
}