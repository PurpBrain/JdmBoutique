/*
 * Router.js
 * ********* */

// Import de module
// Définition de router afin de pouvoir l'exporter en fin de page
const express = require("express");
const router = express.Router();
const UploadArticle = require('./config/multer_article');
const UploadImgUser = require("./config/multer_user");

// Import des controllers
const { adminpage, 
        getVoiture, 
        addVoiture, 
        delVoiture,
        articlepage,
        loginpage,
        connect,
        registerpage,
        infoRegister,
        forgotpage,
        forgot,
        logout,
        blogpage,
        search,
        contactpage,
        createMessage,
        homepage,
        accountpage,
        editProfile
    } = require("./controllers");

// Import de middleware
const mdlAuth = require('./middleware/auth')

// Routes

// Home
router.route('/')
    .get(homepage)

// Contact
router.route('/contact')
    .get(contactpage)
    .post(createMessage);

//Register
router.route('/register')
    .get(registerpage)  
    .post(UploadImgUser.single('avatar'),infoRegister) 
      
//Login
router.route('/login')
    .get(loginpage)
    .post(connect)

// Logout
router.route('/logout')
    .post(logout)
    
// Forgot Password
router.route('/forgot')
    .post(forgot)
    .get(forgotpage)

// Blog
router.route('/blog')
    .get(blogpage)

router.route('/result')
    .get(search)

// ID Blog
router.route('/blog/:id')
    .get(articlepage)

// Admin
router.route('/admin')
    .get(mdlAuth.isAdmin, adminpage)

router.route('/admin/:id')
    .delete(delVoiture)

router.route('/admin/create/voiture')
    .post(UploadArticle.array('img'),addVoiture)
    
router.route('/api/voiture')
    .get(getVoiture)

// Mon Compte
router.route('/account')
    .get(accountpage)
router.route('/account/:id')
    .put(UploadImgUser.single('avatar'),editProfile) 
    
// /Routes

// Export de notre router
module.exports = router