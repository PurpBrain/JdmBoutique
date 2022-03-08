exports.blog_exist = async(req,res,next) => {
    const { id } = req.params;
    const [article] = await db.query(`SELECT * FROM article WHERE id_Article = "${id}"`)

    !article ? res.redirect('/blog') : next();
}