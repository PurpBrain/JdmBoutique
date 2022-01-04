/*
 * Controller: Modal Login
 * *********************** */ 

// Controller pour le modal login

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