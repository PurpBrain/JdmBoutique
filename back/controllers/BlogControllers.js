/*
 * Controller: Blog
 * **************** */ 

// Controller pour la page blog

exports.blogpage = (req, res) => {
    console.log('je suis la page blog');
    res.render('blog');
}