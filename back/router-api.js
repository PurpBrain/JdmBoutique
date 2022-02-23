/*
 * Router-api.js
 * ********* */

// Import de module
// Définition de router afin de pouvoir l'exporter en fin de page
const express = require("express");
const router = express.Router();
const UploadArticle = require('./config/multer_article');
const UploadImgUser = require("./config/multer_user");

const { APIblogpage, APIsearch, addMessage } = require("./controller-api");

// ROUTE
// Blog
router.route('/blog')
    .get(APIblogpage)

router.route('/result')
    .get(APIsearch)

// Home 
router.route('/send/message')
    .post(addMessage)

// /////
module.exports = router