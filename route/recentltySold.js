// const {getProduct}=require('../controller/product.js')
const express=require('express')
const recentlySoldRouter =express.Router()
const {getRecentlySold,postRecentlySold} =require('../controller/recentlySold.js')

recentlySoldRouter.get('/',getRecentlySold)
recentlySoldRouter.post('/',postRecentlySold)


module.exports={recentlySoldRouter}