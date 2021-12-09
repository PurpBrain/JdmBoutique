console.log("Node JS");

require('dotenv').config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3003;
const { engine } = require('express-handlebars');

app.set('view engine','hbs');
app.engine('bhs',engine({
    extname: 'hbs',
    defaultLayout:'main',
}))

app.listen(port, () => {
    console.log("le serv est sur le port:" + port);
})