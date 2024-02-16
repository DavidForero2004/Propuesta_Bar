const express = require('express')
const router = express.Router()

const { getProducts } = require ('../controllers/product')


//routes call all methos
router.get('/', getProducts)


module.exports =  router;