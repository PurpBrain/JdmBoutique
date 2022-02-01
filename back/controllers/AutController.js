/*
 * Controller: Modal Login
 * *********************** */
const bcrypt = require('bcrypt');
const { DEC8_BIN } = require('mysql/lib/protocol/constants/charsets');

exports.loginpage = (req, res) => {
    console.log('Page Login');
    // Afficher la page login
    res.render('login');
}

exports.connect = async (req, res) => {
    const { email, mdp } = req.body;

    if (email && mdp) {
        const results = await db.query(`SELECT * FROM user WHERE email = '${email}'`)

        if (results.length > 0) {


            if (results[0].isBan === 1) {
                res.send("Vous avez été banni !")
            }


            bcrypt.compare(mdp, results[0].password, function (err, result) {
                if (result === true) {
                    if (results[0].isAdmin === 1) {
                        req.session.user =results[0]
                        req.session.user.isAdmin =true
                            
                       
                    } else {
                        req.session.user = results[0]
                    }
                    res.redirect('/');
                    console.log("Log correct");
                } else return res.render('login', {
                    flash: "Mauvais mdp !"
                });
            })

            return;
        } else {
            res.render('login', {
                flash: "Quelque chose ne va pas !"
            });
        }


    }
}


exports.registerpage = (req, res) => {
    console.log('Page register');
    // Afficher la page register
    res.render('register');
}

exports.infoRegister = async (req, res) => {

    const { name, email, mdp, avatar, mdpConfirm } = req.body;
    const hash = bcrypt.hashSync(mdp, 10);

    if (mdp !== mdpConfirm) {

        console.log("Mdp Différent")

        res.render('register', {
            flash: "Mot de passe différent !"
        })

    } else {
        await db.query(`INSERT INTO user (pseudo, email, password, avatar_url) 
                        VALUES ('${name}', '${email}', '${hash}', '${req.file.filename}');`),
            function (err) {
                if (err) res.redirect('back')

            };
        console.log("Compte crée !")
        res.redirect("/")
    }
}

exports.forgotpage = (req, res) => {
    console.log('Page MDP oublié');
    // Afficher la page MDP oublié
    res.render('forgot');
}

exports.forgot = (req, res) => {
    console.log("Controller forgot", req.body);
    //Pour revenir a la page de base
    res.redirect('back');
}

exports.logout = (req, res) => {
    req.session.destroy(() => {
      res.clearCookie('ptiGato');
      console.log("Clear Cookie session :", req.sessionID);
      res.redirect('/');
    })
  }