const express = require('express');
const router = express.Router();
const {insertEvent} = require('../controllers/event');




router.post('/newEvent', insertEvent);





module.exports = router;
