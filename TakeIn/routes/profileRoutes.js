/*
ROUTE FOR PAGES(/profile/):
    - Favourites Page (15):     /favourites
    - Your Profile (17):        /
    - Settings (18):            /settings
*/

const express = require('express')
const router = express.Router()
const { checkAuthenticated } = require('../middleware/authMiddleware')
const { profilePage, addFavourites, delFavourites, settingsPage, settings, checkUser, addFollow, delFollow } = require('../controllers/profileController')

router.get('/', profilePage)

router.post('/favourite', checkAuthenticated, addFavourites)
router.delete('/favourite', checkAuthenticated, delFavourites)

router.get('/settings', checkAuthenticated, settingsPage)
router.post('/settings', checkAuthenticated, settings)

router.post("/user", checkAuthenticated, checkUser)

router.post("/follow", checkAuthenticated, addFollow)
router.delete("/follow", checkAuthenticated, delFollow)


module.exports = router