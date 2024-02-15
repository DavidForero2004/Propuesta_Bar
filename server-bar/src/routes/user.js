const express = require('express');
const router = express.Router();

const { newUser, loginUser } = require('../controllers/user');

router.post('/', newUser);
router.post('/login', loginUser);

module.exports = router;

