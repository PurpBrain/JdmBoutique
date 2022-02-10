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
    const { pseudo, email, mdp } = req.body
    

    // Faire await pour obtenir les infos de l'user 
    const user = await db.query(`SELECT * FROM user WHERE id_user = ${id}`);
    const role = await db.query(`SELECT * FROM role WHERE id_user = ${id}`);

    // Mot de passe hasher
    if (!req.file) {
        var hash = bcrypt.hashSync(mdp, 10);
    }

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
    } else {
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
                    is_admin: setIsAdmin,
                    is_ban: setIsBan,
                    is_archive: setIsArchive
                };
                res.redirect('back')

            } else return res.render('account', {
                flash: "Mauvais mdp !"
            })
        })
    }




}