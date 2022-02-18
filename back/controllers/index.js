const { adminpage, getVoiture,banUser,debanUser,  } = require ("./AdminController"),
      { articlepage, addcom,  } = require ("./ArticleController"),
      { loginpage, connect, registerpage, infoRegister, forgotpage, forgot, logout } = require("./AutController"),
      { blogpage, search } = require ("./BlogControllers"),
      { contactpage, createMessage} = require("./ContactController"),
      { homepage } = require("./HomeController"),
      { accountpage, editProfile, addVoiture, delVoiture, editVoiture, delCom} = require("./AccountController");

module.exports = {
    // Page Admin
    adminpage, getVoiture, banUser,debanUser,

    // Page Article
    articlepage, addcom,

    // Page de Connexion 
    loginpage, connect, registerpage, infoRegister, forgotpage, forgot, logout,

    // Page Blog
    blogpage, search,

    // Page Contact 
    contactpage, createMessage,

    // Page Home
    homepage,

    // Page Account 
    accountpage, editProfile, addVoiture, delVoiture, editVoiture, delCom
}