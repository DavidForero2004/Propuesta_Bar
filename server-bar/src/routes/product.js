//routes/product.js
const express = require('express');
const router = express.Router();


const { insertProduct, updateProduct, getProduct, getProductId, deleteProduct } = require('../controllers/product');
const { validateToken } = require('../routes/validate-token.js');


//routes call all methods
router.get('/', validateToken, getProduct);
router.get('/:id', validateToken, getProductId);
router.post('/insertproduct', validateToken, insertProduct);
router.put('/updateproduct', validateToken, updateProduct);
router.delete('/deleteproduct/:id', validateToken, deleteProduct);


module.exports = router;