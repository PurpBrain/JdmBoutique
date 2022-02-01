/*
 * Router.js
 * ********* */

// Import de module
// Définition de router afin de pouvoir l'exporter en fin de page
const express = require("express");
const router = express.Router();

// Import des controllers
const HomeController = require("./controllers/HomeController");
const ContactController = require("./controllers/ContactController");
const BlogController = require("./controllers/BlogControllers");
const AdminController = require("./controllers/AdminController");
const ArticleController = require("./controllers/ArticleController");
const AutController = require("./controllers/AutController");
const UploadArticle = require('./config/multer_article');
const UploadImgUser = require("./config/multer_user");
// Routes

// Home
router.route('/')
    .get(HomeController.homepage)

// Contact
router.route('/contact')
    .get(ContactController.contactpage)
    .post(ContactController.createMessage);

//Register
router.route('/register')
    .get(AutController.registerpage)  
    .post(UploadImgUser.single('avatar'),AutController.infoRegister) 
      
//Login
router.route('/login')
    .get(AutController.loginpage)
    .post(AutController.connect)

// Logout
router.route('/logout')
    .post(AutController.logout)
    
// Forgot Password
router.route('/forgot')
    .post(AutController.forgot)
    .get(AutController.forgotpage)

// Blog
router.route('/blog')
    .get(BlogController.blogpage)

router.route('/result')
    .get(BlogController.search)

// ID Blog
router.route('/blog/:id')
    .get(ArticleController.articlepage)

// Admin
router.route('/admin')
    .get(AdminController.adminpage)
    
router.route('/admin/:id')
    .delete(AdminController.delVoiture)

router.route('/admin/create/voiture')
    .post(UploadArticle.array('img'),AdminController.addVoiture)
    
router.route('/api/voiture')
    .get(AdminController.getVoiture)

// /Routes

// Export de notre router
module.exports = router