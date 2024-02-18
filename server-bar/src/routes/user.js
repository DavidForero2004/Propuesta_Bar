//routes/user.js
const express = require('express')
const router = express.Router()

const { getUser , insertUser, loginUser, updateUser, deleteUser } = require('../controllers/user')
const { validateToken } = require('../routes/validate-token.js')


//Routes call all methods
router.get('/', validateToken, getUser)
router.post('/insertuser', validateToken, insertUser)
router.post('/updateuser', validateToken, updateUser)
router.post('/deleteuser', validateToken, deleteUser)
router.post('/login', loginUser)


module.exports = router;

