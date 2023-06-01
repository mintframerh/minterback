const express=require('express')
const Estaterouter =express.Router()
const {getLandandEstate,getSingleLandandEstate,getAddToCartLand} =require('../controller/landandEstate.js')
Estaterouter.get('/',getLandandEstate)
Estaterouter.get('/id/:id',getSingleLandandEstate)
Estaterouter.get('/:id',getAddToCartLand)


module.exports={Estaterouter}