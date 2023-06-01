const express=require("express")

// import express  from "express"
const userRouter=express.Router()
const {postInfo,postSignInfo}=require('../controller/user.js')
// const {getproduct}=require('../controller/product.js')
userRouter.post('/login',postInfo)
userRouter.post('/signin',postSignInfo)

module.exports={userRouter}



