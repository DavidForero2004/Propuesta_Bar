//routes/order-products.js
const express = require('express');
const router = express.Router();


const { getOrderProduct, getOrderProductId, insertOrderProduct, updateOrderProduct, deleteOrderProduct, getOrderIdProduct } = require('../controllers/order-products.js');
const { validateToken } = require('../routes/validate-token.js');


//routes call all methods
router.post('/insertorderproduct', insertOrderProduct);
router.get('/', validateToken, getOrderProduct);
router.get('/:id', validateToken, getOrderProductId);
router.get('/orderid/:id', validateToken, getOrderIdProduct);
router.put('/updateorderproduct', validateToken, updateOrderProduct);
router.delete('/deleteorderproduct/:id', validateToken, deleteOrderProduct);


module.exports = router;