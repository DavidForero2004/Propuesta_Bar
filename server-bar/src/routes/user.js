//routes/user.js
const express = require('express');
const router = express.Router();


const { getUser, insertUser, loginUser, updateUser, deleteUser, getUserId } = require('../controllers/user');
const { validateToken } = require('../routes/validate-token.js');


//routes call all methods
router.get('/', validateToken, getUser);
router.get('/:id', validateToken, getUserId);
router.post('/insertuser', validateToken, insertUser);
router.put('/updateuser', validateToken, updateUser);
router.delete('/deleteuser/:id', validateToken, deleteUser);
router.post('/login', loginUser);


module.exports = router;

