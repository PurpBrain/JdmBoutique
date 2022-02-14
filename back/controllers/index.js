const { adminpage, getVoiture, addVoiture, delVoiture, editVoiture } = require ("./AdminController"),
      { articlepage } = require ("./ArticleController"),
      { loginpage, connect, registerpage, infoRegister, forgotpage, forgot, logout } = require("./AutController"),
      { blogpage, search } = require ("./BlogControllers"),
      { contactpage, createMessage} = require("./ContactController"),
      { homepage } = require("./HomeController"),
      { accountpage, editProfile } = require("./AccountController");

module.exports = {
    // Page Admin
    adminpage, getVoiture, addVoiture, delVoiture, editVoiture,

    // Page Article
    articlepage,

    // Page de Connexion 
    loginpage, connect, registerpage, infoRegister, forgotpage, forgot, logout,

    // Page Blog
    blogpage, search,

    // Page Contact 
    contactpage, createMessage,

    // Page Home
    homepage,

    // Page Account 
    accountpage,editProfile
}