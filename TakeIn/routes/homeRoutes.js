/*
ROUTE FOR PAGES (/):
    - Home Screen (4):      /
    - Shopping Cart (5):    /cart
    - Seach Screen (13):    /search
    - Location (14):        /find
*/

const express = require('express')
const router = express.Router()
const { checkAuthenticated } = require('../middleware/authMiddleware')
const { homePage, cartPage, searchPage, addCart, delCart } = require('../controllers/homeController')

router.get('/', homePage)

router.get('/cart', checkAuthenticated, cartPage)
router.post('/cart', checkAuthenticated, addCart)
router.delete('/cart', checkAuthenticated, delCart)

router.get('/search', searchPage)



module.exports = router