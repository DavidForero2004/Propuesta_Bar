//routes/product.js
const express = require('express');
const router = express.Router();


const { getProducts, insertProduct, updateProduct, deletepProduct } = require ('../controllers/product');


//Routes call all methods
router.get('/', getProducts);
router.post('/insertproduct', insertProduct);
router.put('/updateproduct', updateProduct);
router.delete('/deleteproduct', deletepProduct);


module.exports =  router;