/*
 * Controller: Home
 * **************** */

const { mailSend } = require("../utils/nodeMailer");

// Controller pour la page home
exports.homepage = (req, res) => {
    console.log('Page home');
    // console.log('session',req.session)
    let sql = `SELECT * 
            FROM article 
            INNER JOIN image ON image.id_article = article.id_Article 
            INNER JOIN role ON article.author_id = role.id_user
            WHERE is_ban = 0 ORDER BY article.id_Article DESC;`;
    db.query(sql, (error, data, fields) => {
        if (error) throw error;

        res.render('home', {
            voiture: data
        });
    })
}
exports.addMessage = async (req, res) => {
    // SQL pour creer un msg

    const { name, email, service, message } = req.body;

    await db.query(`INSERT INTO message SET name='${name}', email='${email}', service='${service}', message="${message}"`);
    const getVoiture = await db.query(`SELECT * 
                                    FROM article 
                                    INNER JOIN image ON image.id_article = article.id_Article 
                                    INNER JOIN role ON article.author_id = role.id_user
                                    WHERE is_ban = 0 ORDER BY article.id_Article DESC;`)

    res.render("home", {
        flash: "Message envoyé",    
        voiture: getVoiture
    })
} 