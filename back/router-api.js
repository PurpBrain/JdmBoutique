/*
 * Router-api.js
 * ********* */

// Import de module
// Définition de router afin de pouvoir l'exporter en fin de page
const express = require("express");
const router = express.Router();
const UploadArticle = require('./config/multer_article');
const UploadImgUser = require("./config/multer_user");

const { accountpage, editProfile, addVoiture, delVoiture, editVoiture, delCom }

// ROUTE

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

// /////