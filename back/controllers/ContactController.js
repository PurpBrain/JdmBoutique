/*
 * Controller: Contact
 * **************** */ 

// Controller pour la page contact

exports.contactpage = (req, res) => {
    console.log('je suis la page contact');
    res.render('contact');
}