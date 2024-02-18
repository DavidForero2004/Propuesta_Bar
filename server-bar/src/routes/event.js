//routes/event.js
const express = require('express');
const router = express.Router();

const {insertEvent, getEventActive, updateEvent,deleteEvent} = require('../controllers/event');


//Routes call all methods
router.get('/', getEventActive);
router.post('/newevent', insertEvent);
router.put('/updateevent', updateEvent);
router.delete('/deleteevent', deleteEvent);


module.exports = router;
