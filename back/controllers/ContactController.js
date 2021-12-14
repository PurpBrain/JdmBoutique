/*
 * Controller: Contact
 * ******************* */ 

// Controller pour la page contact

exports.contactpage = (req, res) => {
    console.log('je suis la page contact');
    res.render('contact');
}

exports.createMessage = (req, res) => {
    console.log("Controller formulaire", req.body);
    res.redirect('back');
    /*if (req.originalUrl === '/' ) {
        res.render('home')
    }
    if (req.originalUrl === '/contact') {
        res.render('contact')
    }*/  
}
