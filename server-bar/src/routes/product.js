//routes/product.js
const express = require('express');
const router = express.Router();


const { getProducts, insertProduct, updateProduct, deletepProduct } = require ('../controllers/product');
const { validateToken } = require('../routes/validate-token.js');


//Routes call all methods
router.get('/',validateToken, getProducts);
router.get('/:id',validateToken, getProducts);
router.post('/insertproduct',validateToken, insertProduct);
router.put('/updateproduct',validateToken, updateProduct);
router.delete('/deleteproduct/:id',validateToken, deletepProduct);


module.exports =  router;