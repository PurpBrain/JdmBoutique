exports.accountpage = (req, res) => {
    console.log('Page Mon compte');
    // Afficher la page contact 
    res.render('account');
}

exports.editProfile = async (req, res) => {
// Faire await pour obtenir les infos de l'user 
    await db.query(`SELECT * FROM user WHERE id_user = ${req.params.id}`);
    const hash = bcrypt.hashSync(mdp, 10);

    var setavatar = !req.file ? user[0].avatar_url : req.file.filename

    // ma requete sql pour update l'user
    await db.query(`UPDATE user SET avatar_url=${setavatar} WHERE id_user = ${req.params.id}`)
}