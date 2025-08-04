const bodyParser = require("body-parser");              // Parses incoming bodies for middleware
const express = require('express');
const flash = require("express-flash");                 // Used for sending messages when authenitcations errors occur
const session = require("express-session")              // Used for maintaing sessions when authenticating
const fileupload = require("express-fileupload");
const busboy = require('connect-busboy');
const app = express();  
const path = require("path")


app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static('../views'));
app.use('/css', express.static(path.resolve(__dirname, "../views/css")));
app.use('/scripts', express.static(path.resolve(__dirname, "../views/scripts")));
app.use('/images', express.static(path.resolve(__dirname, "../views/images")));
app.use(flash());
app.use(fileupload());
app.use(busboy());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false }
}));

module.exports = app;