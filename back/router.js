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
const ArticleController = require("./controllers/ArticleController")
const AutController = require("./controllers/AutController")
const Upload = require('./config/multer');

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

    .post(Upload.single('avatar'),AutController.register)
//Login
router.route('/login')
    .post(AutController.login)

// Forgot Password
router.route('/forgot')
    .post(AutController.forgot)

// Blog
router.route('/blog')
    .get(BlogController.blogpage)

// ID Blog
router.route('/blog/:id')
    .get(ArticleController.articlepage)

// Admin
router.route('/admin')
    .get(AdminController.adminpage)
    
// /Routes

// Export de notre router
module.exports = router