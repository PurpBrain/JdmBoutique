exports.mailSend = function (emailFrom, emailSend, sujet, content, callback) {
    const nodemailer = require("nodemailer");

    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_USER, // generated ethereal user
            pass: process.env.MAIL_PASSWORD, // generated ethereal password
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });

    let info = {
        from: emailFrom, // sender address
        to: emailSend, // list of receivers
        subject: sujet, // Subject line
        html: content, // html body
    };

    transporter.sendMail(info, (err, info) => {
        if (err) console.log(err)
        else {
            callback(null, info);
        }
      })
};
