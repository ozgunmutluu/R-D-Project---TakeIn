/*
ROUTE FOR PAGES(/friends):
    - Friends Profile (9):      /friend?<friendsid>
    - Friends List (10):        /  
    - Conversation List (11):   /chats
    - Chat Menu (12):           /chat?id=<friendsid>
*/

const express = require('express')
const router = express.Router()
const { checkAuthenticated } = require('../middleware/authMiddleware')
const { friendsPage, friendPage, chatsPage, chatPage, message } = require('../controllers/friendsController')

router.get('/', checkAuthenticated, friendsPage)

router.get('/friend', checkAuthenticated, friendPage)

router.get('/chats', checkAuthenticated, chatsPage)

router.get('/chat', checkAuthenticated, chatPage)

router.post('/message', checkAuthenticated, message)


module.exports = router