//routes/order.js
const express = require('express');
const router = express.Router();


const {  } = require('../controllers/order.js');
const { validateToken } = require('../routes/validate-token.js');


//routes call all methods
router.get('/', validateToken);
router.get('/:id', validateToken);
router.post('/insertorder', validateToken);
router.put('/updateorder', validateToken);
router.delete('/deleteorder/:id', validateToken);


module.exports = router;