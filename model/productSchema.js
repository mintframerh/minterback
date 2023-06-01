const mongoose=require('mongoose')
// import mongoose from 'mongoose'
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name required"],
        trim:true
    },
    image:{
        type: String,
        required: true
    },
    no_of_review:{
        type:Number,
        trim:true
    },
    countInStock:{
        type:Number,
        trim:true
    },
    category:{
        type:String,
        trim:true
    },
    price:{
        type:Number,
        required:[true,"price required"],
        trim:true
    },
    rating:{
        type:Number,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    userId:{
        type:String,
        trim:true
    },
    ownerName:{
        type:String,
        trim:true
    }
},
{
    timestamps:true
}
)

const Product= module.exports=mongoose.model('product',productSchema)
module.exports= Product