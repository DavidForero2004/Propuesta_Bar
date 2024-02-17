const express = require('express')
const router = express.Router()

const { getProducts, insertProduct, updateProduct, deletepProduct } = require ('../controllers/product');


//routes call all methos
router.get('/', getProducts);
router.post('/insertProduct', insertProduct);
router.put('/updateProduct', updateProduct);
router.delete('/deleteProduct', deletepProduct);


module.exports =  router;