/*
 * Controller: Home
 * **************** */ 

// Controller pour la page home
exports.homepage = (req, res) => {
    console.log('Page home');
    
    let sql = `SELECT * FROM article`;

    db.query(sql, (error, data, fields) => {
        if (error) throw error;
        
        res.render('home',{
        voiture:data
    });
    })
}