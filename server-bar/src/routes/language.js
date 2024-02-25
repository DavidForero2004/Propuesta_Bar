//routes/event.js
const express = require('express');
const router = express.Router();


const { language } = require('../controllers/language');


//Routes call all methods
router.post('/', language);


module.exports = router;
