//routes/order-products.js
const express = require('express');
const router = express.Router();


const { getOrderProduct, getOrderProductId, insertOrderProduct, updateOrderProduct, deleteOrderProduct } = require('../controllers/order-products.js');
const { validateToken } = require('../routes/validate-token.js');


//routes call all methods
router.post('/insertorderproduct', insertOrderProduct);
router.get('/', validateToken, getOrderProduct);
router.get('/:id', validateToken, getOrderProductId);
router.put('/updateorderproduct', validateToken, updateOrderProduct);
router.delete('/deleteorderproduct/:id', validateToken, deleteOrderProduct);


module.exports = router;