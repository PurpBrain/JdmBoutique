/*
 * Controller: Admin
 * ****************** */ 

// Controller pour la page admin

exports.adminpage = (req, res) => {
    console.log('je suis la page admin');
    res.render('admin');
}