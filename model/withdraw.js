const mongoose=require('mongoose')
// import mongoose from 'mongoose'
const withdrawSchema=new mongoose.Schema({
    userAddress:{
        type:String,
        required:[true,"name required"],
        trim:true
    },
    amountWitdraw:{
        type: Number,
        required: true
    },
   
    paymentMethod:{
        type:String,
        required:[true,"price required"],
        trim:true
    },
    WithdrawalId:{
        type:String,
        trim:true
    },
    amountInEth:{
        type:Number,
        trim:true
    },
    status:{
        type:String,
        trim:true,
        default:'Pending'
    },
    email:{
        type:String,
        trim:true
    }
},
{
    timestamps:true
}
)

const Withdraw= module.exports=mongoose.model('withdraw',withdrawSchema)
module.exports= Withdraw