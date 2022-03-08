const { adminpage, getVoiture,banUser,debanUser, repMsg, } = require ("./AdminController"),
      { articlepage, addcom,  } = require ("./ArticleController"),
      { loginpage, connect, registerpage, infoRegister, forgotpage,logout } = require("./AutController"),
      { blogpage, search } = require ("./BlogControllers"),
      { contactpage} = require("./ContactController"),
      { homepage, addMessage } = require("./HomeController"),
      { accountpage, editProfile, addVoiture, delVoiture, editVoiture, delCom} = require("./AccountController");

module.exports = {
    // Page Admin
    adminpage, getVoiture, banUser,debanUser,repMsg,

    // Page Article
    articlepage, addcom,

    // Page de Connexion 
    loginpage, connect, registerpage, infoRegister, forgotpage, logout,

    // Page Blog
    blogpage, search,

    // Page Contact 
    contactpage, 

    // Page Home
    homepage, addMessage,

    // Page Account 
    accountpage, editProfile, addVoiture, delVoiture, editVoiture, delCom
}