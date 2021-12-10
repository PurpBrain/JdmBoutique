/*
 * Controller: ID Blog
 * ******************* */ 

// Controller pour la page de l'ID blog

exports.idblogpage = (req, res) => {
    console.log('je suis la page idblog');
    res.render('idblog');
}