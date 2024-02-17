const express = require('express');
const router = express.Router();
const {insertEvent, getEventActive, updateEvent,deleteEvent} = require('../controllers/event');



router.get('/', getEventActive);
router.post('/newEvent', insertEvent);
router.put('/updateEvent', updateEvent);
router.delete('/deleteEvent', deleteEvent);




module.exports = router;
