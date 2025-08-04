/*
ROUTE FOR PAGES (/recipe/):
    - View Recipe Page (6):     /
    - Review Recipe Page (7):   /review
    - See Reviews (8):          /reviews
    - Submit Recipe Page (16):  /submit
*/


const express = require('express')
const router = express.Router()
const { checkAuthenticated } = require('../middleware/authMiddleware')
const { recipe, recipePage, reviewPage, review, reviewsPage, submitPage, submit, randomRecipe, getRecipes } = require('../controllers/recipeController')

router.get('/', recipePage)

router.post('/recipe', recipe)

router.post('/recipes', getRecipes)

router.post('/review', review)

router.get('/submit', checkAuthenticated, submitPage)
router.post('/submit', checkAuthenticated, submit)

router.get('/random', randomRecipe)

module.exports = router