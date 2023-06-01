// const {getProduct}=require('../controller/product.js')
const express=require('express')
const router =express.Router()

const {getProduct,getSingleProduct, getAddToCart, getTrending} =require('../controller/product.js')
router.get('/', getProduct)
router.get('/id/:id',getSingleProduct)
router.get('/:id', getAddToCart)
router.get('/',getTrending)

module.exports={router}