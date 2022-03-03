/*
 * Controller: Blog
 * **************** */

// Controller pour la page blog
exports.blogpage = (req, res) => {
    console.log('Page blog');
    /////////// Pagination /////////// 
    // Nombres d'article au total
    let numRows;
    //Nombres d'articles par page
    let numPerPage = 6;
    // Page actuel
    let page = parseInt(req.query.page, 10) || 1;
    // Numéro de page
    let numPages;
    // Numéro de l'article précédent la page actuelle 
    let skip = (page-1) * numPerPage;
    // Récupération des articles après "skip"
    let limit = skip + ',' + numPerPage;
    // Requête SQL pour compter le nombres de lignes dans la table * et lui donner le nom de "numRows" 
    let sql = `SELECT count(*) as numRows FROM article`;

    db.query(sql, (error, results, fields) => {
        numRows = results[0].numRows;
        // Numero de page qu'on arrondi a l'entier surpérieur 
        numPages = Math.ceil(numRows / numPerPage);
        // console.log(numPerPage)
    })
    // Requête SQL pour séléctionner tout les articles selon les images trier par ordre croissant 
    let sqlget = `SELECT * 
                  FROM article 
                  INNER JOIN image ON image.id_article = article.id_Article 
                  INNER JOIN role ON article.author_id = role.id_user
                  WHERE is_ban = 0 ORDER BY article.id_Article 
                  DESC LIMIT ${limit}`
    db.query(sqlget, (error, results, fields) => {

        // Si le numéro de la page est inférieur 
        
        if (page <= numPages) {
            var Pagination = {
                current: page,
                previous: page > 0 ? page - 1 : undefined,
                next: page < numPages ? page + 1 : undefined,
            }
            res.render('blog', {
                voiture: results,
                page: Pagination
            })
        } else {
            res.redirect('blog')
        }

    })
}

exports.search = (req, res) => {
    // Séléction de la barre de recherche
    search = req.query.search
    // Requête MySQL pour séléctionner les articles avec leurs images selon la recherche 
    var searchvoiture = `SELECT * 
                         FROM article 
                         INNER JOIN image 
                         ON image.id_article = article.img_id 
                         WHERE (make LIKE '%${search}%' OR model LIKE '%${search}%')`
    db.query(searchvoiture, function (error, resQuery) {

        if (error) throw error;

        if (!req.query.search) {
            res.redirect('blog');
        }
        else {
            // Si la recherche est inférieur a deux caractères alors pas de résultats
            if (req.query.search.length <= 2) {
                res.render('blog', {
                    page_disable: true,
                    recherche_false: true
                });
            } else {
                // Si la recherche est vide alors redirection vers la page blog
                if (resQuery == "") {
                    res.render('blog', {
                        page_disable: true,
                        recherche_false: true
                    });
                } else {
                    // Si tout est ok
                    res.render('blog', {
                        voiture: resQuery,
                        page_disable: true
                    })
                }
            }
        }
    })
}