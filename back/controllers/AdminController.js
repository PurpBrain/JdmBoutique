/*
 * Controller: Admin
 * ****************** */ 

// Controller pour la page admin

exports.adminpage = (req, res) => {
    console.log('Page admin');
    let sql = `SELECT * FROM voiture`;

    db.query(sql, (error, data, fields) => {
        if (error) throw error;
        
        res.render('admin',{
        voiture:data
    });
    })
    
}

exports.getVoiture =  (req, res) => {
    // SQL récupération de tout les users
   
    var numRows;
    var numPerPage = 6;
    var page = parseInt(req.query.page, 10) || 0;
    var numPages;
    var skip = page * numPerPage;
    var limit = skip + ',' + numPerPage;

    let sql = `SELECT count(*) as numRows FROM voiture`;
    db.query(sql, (error, results, fields) => {
        numRows = results[0].numRows;
        numPages = Math.ceil(numRows / numPerPage);
    })

    let sqlget = `SELECT * FROM voiture ORDER BY ID DESC LIMIT ${limit}`
    db.query(sqlget, (error, results, fields) => {
        if (page < numPages) {
            res.json({
                fiche: results
            })
        } else {
            res.redirect('blog')
        }

    })
}

exports.addVoiture = (req, res) => {
    console.log(req.files)
    // SQL pour creer un users
    let sql = `INSERT INTO voiture SET make=?, model=?, price=?, img_url=?`;
    let values = [
        req.body.make,
        req.body.model,
        req.body.price,
        req.files[0].filename
    ];
    db.query(sql, values, function (err, data, fields) {
        if (err) throw err;
        // SQL récupération de tout les users
        let sql = `SELECT * FROM voiture`;
        db.query(sql, (error, dataRes, fields) => {
            if (error) throw error;
            res.redirect('back')
        })
    })
}

exports.delVoiture = (req, res) => {
    let sql = `DELETE FROM voiture WHERE id=?`
    db.query(sql, req.params.id, (error, dataRes, fields) => {
        if (error) throw error;
        res.redirect('back')
    })
}