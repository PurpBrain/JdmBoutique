/*
 * Controller: Modal Login
 * *********************** */
const bcrypt = require('bcrypt');

exports.loginpage = (req, res) => {
    console.log('Page Login');
    // Afficher la page login
    res.render('login');
}

exports.connect = async (req, res) => {
    const { email, mdp } = req.body;

    if (email && mdp) {
        const results = await db.query(`SELECT * FROM user WHERE email = '${email}'`)
        if (!results[0]) return res.render('login', {
            flash: "Quelque chose ne va pas !"
        });
        const role = await db.query(`SELECT * FROM role WHERE id_user = '${results[0].id_user}'`)
        if (results.length > 0) {

            if (role[0].is_ban === 1) {
                res.render("login", {
                    flash: "Vous êtes banni !"
                })
            } else {
                bcrypt.compare(mdp, results[0].password, function (err, result) {

                    if (result === true) {
                        if (role[0].is_admin === 1) {
                            req.session.user = results[0]
                            req.session.user.isAdmin = true


                        } else {
                            req.session.user = results[0]
                        }
                        res.redirect('/');
                        console.log("Log correct");
                    } else return res.render('login', {
                        flash: "Mauvais mdp !"
                    });
                })
            }
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

    if (mdp == mdpConfirm) {
        
        const user = await db.query(`INSERT INTO user (pseudo, email, password, avatar_url) 
                        VALUES ('${name}', '${email}', '${hash}', '${req.file.filename}');`)
        console.log(user)
        const role = await db.query(`INSERT INTO role (id_user, is_admin, is_ban, is_archive) 
                        VALUES (${user.insertId},'0', '0', '0')`)
        const results = await db.query(`SELECT * FROM user WHERE email = '${email}'`)                
                        req.session.user = results[0]

        console.log("Compte crée !")
        res.redirect("/")

    } else {
        console.log("Mdp Différent")

        res.render('register', {
            flash: "Mot de passe différent !"
        })
    }
}

exports.forgotpage = (req, res) => {
    console.log('Page MDP oublié');
    // Afficher la page MDP oublié
    res.render('forgot');
}

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('ptiGato');
        console.log("Clear Cookie session :", req.sessionID);
        res.redirect('/');
    })
}