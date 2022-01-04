/*
 * Controller: Contact
 * ******************* */ 

// Controller pour la page contact

exports.contactpage = (req, res) => {
    console.log('Page contact');
    // Afficher la page contact 
    res.render('contact');
}

exports.createMessage = (req, res) => {
    console.log("Controller formulaire", req.body);
    res.redirect('back'); 
}
