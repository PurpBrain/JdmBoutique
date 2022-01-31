/*
 * Controller: Modal Login
 * *********************** */ 

const bcrypt = require('bcrypt')


module.exports = {
    // Method register
    register: (req, res) => {
        // Racourcie pour accèder à la session
        const sess = req.session
        console.log(req.body)
        // ici on compare les 2 mot de passe
        if (req.body.password !== req.body.passwordConfirm) {
            console.log('error password')
            res.render('home', {
                error: 'Nous rencontrons un problèmes avec votre mot de passe !',
                sess: sess
            })
        } else {
            // ON log si la function est OK
            console.log('password OK')
            // On demande la function de Mongo pour créé notre utilisateur
            User.create({
                // On récupère notre formulaire
                ...req.body,
                // Au cas ou une err survient en force
            }, (err, user) => {
                // Si il y a une err
                if (err) console.log(err)
                else {
                    // Redirection
                    res.render('home', {
                        success: 'Votre compte à bien été créé ;)',
                        sess: sess
                    })
                }
            })
        }
    },
}
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

exports.forgotpage = (req, res) => {
    console.log('Page MDP oublié');
    // Afficher la page MDP oublié
    res.render('forgot');
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