const express=require("express")

const paymentRouter=express.Router()
const {getPayment,deleteProductOnPayment,makeWithdrawal,getSingleWithdraw,getAllWithdraw}=require('../controller/payment.js')
paymentRouter.post('/transaction',getPayment)
paymentRouter.post('/transaction/withdraw',makeWithdrawal)
paymentRouter.delete('/removeProduct/:id',deleteProductOnPayment)
paymentRouter.get('/transaction/withdraw/:id',getSingleWithdraw)
paymentRouter.get('/admin/withdraw',getAllWithdraw)
module.exports={paymentRouter}