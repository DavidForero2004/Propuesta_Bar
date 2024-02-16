const express = require('express');
const router = express.Router();
const {insertEvent, getEventActive} = require('../controllers/event');



router.get('/', getEventActive);
router.post('/newEvent', insertEvent);





module.exports = router;
