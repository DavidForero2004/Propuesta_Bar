//routes/event.js
const express = require('express');
const router = express.Router();

const {insertEvent, getEventActive, updateEvent,deleteEvent} = require('../controllers/event');


//Routes call all methods
router.get('/', getEventActive);
router.post('/newEvent', insertEvent);
router.put('/updateEvent', updateEvent);
router.delete('/deleteEvent', deleteEvent);


module.exports = router;
