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
    editProfile,
    editVoiture,
    addcom,
    delCom,
    banUser
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
    .post(UploadImgUser.single('avatar'), infoRegister)

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

// Article
router.route('/blog/:id')
    .get(articlepage)

// Commentaire article
router.route('/send/com/:id')
    .post(addcom)

// Admin
router.route('/admin')
    .get(mdlAuth.isAdmin, adminpage)

router.route('/admin/edit/voiture/:id')
    .put(UploadArticle.single('img'), editVoiture)

router.route('/admin/delete/voiture/:id')
    .delete(delVoiture)

router.route('/api/voiture')
    .get(getVoiture)

router.route('/admin/ban/user/:id')
    .post(banUser)

// Mon Compte
router.route('/account')
    .get(accountpage)

router.route('/create/voiture')
    .post(UploadArticle.array('img'), addVoiture)

router.route('/account/edit/voiture/:id')
    .put(UploadArticle.single('img'), editVoiture)

router.route('/account/delete/voiture/:id')
    .delete(delVoiture)

router.route('/account/create/voiture')
    .post(UploadArticle.array('img'), addVoiture)

router.route('/account/delete/com/:id')
    .delete(delCom)

router.route('/account/:id')
    .put(UploadImgUser.single('avatar'), editProfile)

// /Routes

// Export de notre router
module.exports = router