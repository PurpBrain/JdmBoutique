/*
 * Controller: Modal Login
 * *********************** */ 

// Controller pour le modal login

exports.login = (req, res) => {
    console.log("Controller login", req.body);
    res.redirect('back');
    // if (req.originalUrl === '/') {
    //     res.redirect('home')
    // }
    // if (req.originalUrl === '/admin') {
    //     res.redirect('admin')
    // }
    // if (req.originalUrl === '/contact') {
    //     res.redirect('contact')
    // }
    // if (req.originalUrl === '/blog') {
    //     res.redirect('blog')
    // }
    // if (req.originalUrl === '/idblog') {
    //     res.redirect('idblog')
    // }
}

exports.register = (req, res) => {
    console.log("Controller register", req.body);
    res.redirect('back');
}

exports.forgot = (req, res) => {
    console.log("Controller forgot", req.body);
    res.redirect('back');
}