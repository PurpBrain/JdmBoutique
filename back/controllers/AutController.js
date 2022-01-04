/*
 * Controller: Modal Login
 * *********************** */ 

// Controller pour le modal login

exports.loginpage = (req, res) => {
    console.log('Page Login');
    // Afficher la page login
    res.render('login');
}

exports.registerpage = (req, res) => {
    console.log('Page register');
    // Afficher la page register
    res.render('register');
}

exports.login = (req, res) => {
    console.log("Controller login", req.body);
    //Pour revenir a la page de base
    res.redirect('back');
}

exports.register = (req, res) => {
    console.log("Controller register", req.body);
    //Pour revenir a la page de base
    res.redirect('back');
}

exports.forgot = (req, res) => {
    console.log("Controller forgot", req.body);
    //Pour revenir a la page de base
    res.redirect('back');
}