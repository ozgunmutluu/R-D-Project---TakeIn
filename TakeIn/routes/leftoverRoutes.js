/*
ROUTE FOR PAGES (/leftover/):
    - Create/edit leftover:     /submit?id={new/id}
    - Leftovers page:           /find
    - Leftover page:            /leftover?id={id}
*/


const express = require('express')
const router = express.Router()
const { checkAuthenticated } = require('../middleware/authMiddleware')
const { leftoverPage, createLeftover, createLeftoverPage, findPage, pickup } = require('../controllers/leftoverController.js')

router.get('/', checkAuthenticated, leftoverPage)

router.get('/find', checkAuthenticated, findPage)

router.get('/submit', checkAuthenticated, createLeftoverPage)
router.post('/submit', checkAuthenticated, createLeftover)

router.post('/pickup', checkAuthenticated, pickup)


module.exports = router