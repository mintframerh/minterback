const express=require("express")

// import express  from "express"
const saleRouter=express.Router()
const {createNewSale,updateUserBalance,updateBalanceAfterWithdraw,getUserSales}=require('../controller/sales.js')
// const {getproduct}=require('../controller/product.js')
saleRouter.post('/sales',createNewSale)
saleRouter.patch('/updatebalance/:userId',updateUserBalance)
saleRouter.patch('/updatebalance/withdraw/:userId',updateBalanceAfterWithdraw)
saleRouter.get('/sales/singleSingle/:userId',getUserSales)


module.exports={saleRouter}