//routes/order.js
const express = require('express');
const router = express.Router();


const { getOrder, getOrderId, insertOrder, updateOrder, deleteOrder } = require('../controllers/order.js');
const { validateToken } = require('../routes/validate-token.js');


//routes call all methods
router.post('/insertorder', insertOrder);
router.get('/', validateToken, getOrder);
router.get('/:id', validateToken, getOrderId);
router.put('/updateorder', validateToken, updateOrder);
router.delete('/deleteorder/:id', validateToken, deleteOrder);


module.exports = router;