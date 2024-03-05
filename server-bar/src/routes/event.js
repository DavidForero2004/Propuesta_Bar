//routes/event.js
const express = require('express');
const router = express.Router();


const { insertEvent, getEventActive, updateEvent, deleteEvent, getEventId,selectTop } = require('../controllers/event');
const { validateToken } = require('../routes/validate-token.js');


//Routes call all methods
router.get('/', validateToken, getEventActive);
router.get('/:id', validateToken, getEventId);
router.post('/insertevent', validateToken, insertEvent);
router.put('/updateevent', validateToken, updateEvent);
router.delete('/deleteevent/:id', validateToken, deleteEvent);
router.get('/selectTop', selectTop);


module.exports = router;
