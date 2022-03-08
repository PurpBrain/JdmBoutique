exports.isAdmin = (req, res, next) => {
    !req.session.user ? res.redirect('/') : !req.session.user.isAdmin ? res.redirect('/') : next() ;
}
exports.isBan = (req, res, next) => {
    !req.session.user ? res.redirect('/') : req.session.user.isBan === 0 ? res.redirect('/') : next() ;
} 
