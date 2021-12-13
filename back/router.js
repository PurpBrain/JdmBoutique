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
const IdBlogController = require("./controllers/IdBlogController")
const AutController = require("./controllers/AutController")

// Routes

// Home
router.route('/')
    .get(HomeController.homepage)
    .post(ContactController.createMessage)
    .post(AutController.login)

// Contact
router.route('/contact')
    .get(ContactController.contactpage)
    .post(ContactController.createMessage);

// Blog
router.route('/blog')
    .get(BlogController.blogpage)

// Admin
router.route('/admin')
    .get(AdminController.adminpage)

// ID Blog
router.route('/idblog')
    .get(IdBlogController.idblogpage)

// /Routes

// Export de notre router
module.exports = router