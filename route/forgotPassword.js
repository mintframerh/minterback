const express=require("express")

const forgotPasswordRouter=express.Router()
const {ForgotPasswordPost,UpdatePassword}=require('../controller/resetPassword.js')
forgotPasswordRouter.post('/forgotpassword',ForgotPasswordPost)
forgotPasswordRouter.patch('/resetpassword/:token',UpdatePassword)

module.exports={forgotPasswordRouter}