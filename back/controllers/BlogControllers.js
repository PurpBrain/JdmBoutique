/*
 * Controller: Blog
 * **************** */

// Controller pour la page blog
exports.blogpage = (req, res) => {
    console.log('Page blog');

    var numRows;
    var numPerPage = 6;
    var page = parseInt(req.query.page, 10) || 0;
    var numPages;
    var skip = page * numPerPage;
    var limit = skip + ',' + numPerPage;
    console.log("blog",page)
    let sql = `SELECT count(*) as numRows FROM article`;
    db.query(sql, (error, results, fields) => {
        numRows = results[0].numRows;
        numPages = Math.ceil(numRows / numPerPage);
    })

    let sqlget = `SELECT * FROM article ORDER BY ID DESC LIMIT ${limit}`
    db.query(sqlget, (error, results, fields) => {
        var responsePayload = {
            results: results
        };
        if (page < numPages) {
            responsePayload.pagination = {
                current: page,
                perPage: numPerPage,
                previous: page > 0 ? page - 1 : undefined,
                previousbis: page > 0 ? page - 2 : undefined,
                next: page < numPages - 1 ? page + 1 : undefined,
                nextbis: page < numPages - 1 ? page + 2 : undefined
            }
            res.render('blog', {
                voiture: results,
                page: responsePayload.pagination
            })
        } else {
            res.redirect('blog')
        }

    })
}

exports.search = (req, res) => {
    search = req.query.search
    var searchvoiture = `SELECT * FROM article WHERE (make LIKE '%${search}%' OR model LIKE '%${search}%')`
    db.query(searchvoiture, function (error, resQuery) {

        if (error) throw error;

        if (!req.query.search) {
            res.redirect('blog');
        }
        else {
            if (req.query.search.length <= 2) {
                console.log("a")
                res.render('blog', {
                    page_disable: true,
                    recherche_false: true
                });
            } else {
                if (resQuery == "") {
                    res.render('blog', {
                        page_disable: true,
                        recherche_false: true
                    });
                } else {
                    res.render('blog', {
                        voiture: resQuery,
                        page_disable: true
                    })
                }
            }
        }
    })
}