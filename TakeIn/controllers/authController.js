const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcrypt")

// @desc    Render login page
// @route   GET /login
// @acces   Public
const loginPage = (req, res) => {
    res.render('./auth/login')
}


// @desc    Login user and authenticate then using session
// @route   POST /login
// @acces   Public
const login = 
    (passport.authenticate('local', { failureRedirect: '/login', failureFlash: true, keepSessionInfo: true }))
    
const loginRedirect = (req, res) => {
        res.redirect(req.session.redirectTo || '/');
}

    

// @desc    Render register page
// @route   GET /register
// @acces   Public
const registerPage = (req, res) => {
    res.render('./auth/register')
}


// @desc    Register new user
// @route   POST /register
// @acces   Public
const register = async (req, res) => {
    User.create({
      email: req.body.email,
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      description: "Hello, I am new to TakeIn!",
    }).then(user => {
        console.log("Succesfull");
        res.redirect("/login")
    }).catch(err => {
        console.log(err)
        req.flash('error', 'An user with that email already exits.')
        res.redirect("/register")
    })
}

// @desc    Render entry page
// @route   GET /entry
// @acces   Public
const entryPage = (req, res) => {
    res.render('./auth/entry')
}


module.exports = {loginPage, login, loginRedirect, registerPage, register, entryPage};