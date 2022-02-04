/*
 * Controller: Home
 * **************** */ 

// Controller pour la page home
exports.homepage = (req, res) => {
    console.log('Page home');
    // console.log('session',req.session)
    let sql = `SELECT * FROM article INNER JOIN image ON image.id_article = article.img_id ORDER BY article.id_Article DESC;`;
    db.query(sql, (error, data, fields) => {
        if (error) throw error;
        
        res.render('home',{
        voiture:data
    });
    })
}