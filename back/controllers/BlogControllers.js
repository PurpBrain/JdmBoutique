/*
 * Controller: Blog
 * **************** */ 

// Controller pour la page blog
exports.blogpage = (req, res) => {
    console.log('Page blog');
    
    let sql = `SELECT * FROM voiture`;

    db.query(sql, (error, data, fields) => {
        if (error) throw error;
        
        res.render('blog',{
        voiture:data
    });
    })
}
