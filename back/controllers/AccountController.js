exports.accountpage = (req, res) => {
    console.log('Page Mon compte');
    // Afficher la page contact 
    res.render('account', {
        layout: 'no-footer'
    });
    console.log(req.session.user)
}

const bcrypt = require('bcrypt');

exports.editProfile = async (req, res) => {
    // Récupération de l'id 
    const { id } = req.params
    // console.log("id", id)
    // Récupération des infos 
    const { pseudo, email, mdp, old_mdp, new_mdp, confirm_new_mdp } = req.body

    // Faire await pour obtenir les infos de l'user 
    const user = await db.query(`SELECT * FROM user WHERE id_user = ${id}`);
    const role = await db.query(`SELECT * FROM role WHERE id_user = ${id}`);

    // Condition pour les changements 
    let setavatar = !req.file ? user[0].avatar_url : req.file.filename
    let setpseudo = !pseudo ? user[0].pseudo : pseudo
    let setemail = !email ? user[0].email : email
    let setpassword = !hash ? user[0].hash : hash

    if (req.file) {
        await db.query(`UPDATE user SET avatar_url="${setavatar}" WHERE id_user = ${id}`)
        req.session.user = {
            id_user: id,
            avatar_url: setavatar,
            pseudo: setpseudo,
            email: setemail,
            password: setpassword,
            isAdmin: role[0].is_admin

        };
        res.redirect('back')
    } 
    if (!req.file && !old_mdp) {
        var hash = bcrypt.hashSync(mdp, 10);
        // Comparaison des mdp 
        bcrypt.compare(mdp, user[0].password, async function (err, result) {
            console.log(result)
            if (result === true) {
                await db.query(`UPDATE user SET pseudo="${setpseudo}", email="${setemail}", password="${hash}" WHERE id_user = ${id}`)

                console.log("modif faite")
                req.session.user = {
                    id_user: id,
                    avatar_url: setavatar,
                    pseudo: setpseudo,
                    email: setemail,
                    password: setpassword,
                    isAdmin: role[0].is_admin
                };
                res.redirect('back')

            } else return res.render('account', {
                flash: "Mauvais mdp !"
            })
        })
    }
    if (old_mdp) {
        bcrypt.compare(old_mdp, user[0].password, async function (err, result) {
            if (result === true) {
                if (new_mdp == confirm_new_mdp) {
                    const hash = bcrypt.hashSync(new_mdp, 10)
                    await db.query(`UPDATE user SET password="${hash}" WHERE id_user = ${id}`);
                    res.render('account', {
                        flash: "Mot de passe modifié !"
                    })
                } else {
                    res.render('account', {
                        flash: "Les mots de passe ne sont pas identiques"
                    })
                }
            } else {
                res.render('account', {
                    flash: "Mauvais mot de passe"
                })
            }
        })
    }
     




}