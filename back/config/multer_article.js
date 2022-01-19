const multer = require("multer");

const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: './public/img/Voitures-Img',
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        callback(null, name);
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
        // Limite de la taille de l'img fixé à 2MB
        fileSize: 2000000, // 2000000 Bytes = 2 MB
        files: 5 
    },
    fileFilter(req, file, callback) {
        // Si l'extansion de l'image est png/jpg/jpeg c'est bon 
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
            callback(null, true);
        } else {
        // Si autre c'est pas bon 
            callback(null, false);
        }
    }
});

module.exports = imageUpload