const express = require('express');
const router = express.Router();

const { getUser ,newUser, loginUser } = require('../controllers/user');

router.get('/', getUser);
router.post('/newuser', newUser);
router.post('/login', loginUser);

module.exports = router;

