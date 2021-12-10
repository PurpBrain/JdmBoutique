/*
 * Controller: Home
 * **************** */ 

// Controller pour la page home

exports.homepage = (req, res) => {
    console.log('je suis la page home');
    res.render('home');
}