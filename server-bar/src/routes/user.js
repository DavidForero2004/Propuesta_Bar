const express = require('express')
const router = express.Router()

const { getUser ,newUser, loginUser } = require('../controllers/user')
const { validateToken } = require('../routes/validate-token.js')

router.get('/', validateToken, getUser)
router.post('/newuser', newUser)
router.post('/login', loginUser)

module.exports = router;

