/*
ROUTE FOR PAGES(/):
    - Login/Regiser (1):    /entry
    - Login Page (2):       /login     
    - Register Page (3):    /register
*/

const passport = require("passport");
const express = require('express')
const router = express.Router()
const { checkNotAuthenticated } = require('../middleware/authMiddleware')
const { login, loginRedirect, loginPage, register, registerPage, entryPage} = require('../controllers/authController')

router.get('/entry', entryPage)

router.get('/login', checkNotAuthenticated, loginPage)
router.post('/login', login, loginRedirect);

router.get('/register', checkNotAuthenticated, registerPage)
router.post('/register', register)

module.exports = router