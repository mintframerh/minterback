const mongoose=require('mongoose')
// import mongoose from 'mongoose'
const saleSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name required"],
        trim:true
    },
    image:{
        type: String,
        required: true
    },
   
    price:{
        type:Number,
        required:[true,"price required"],
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

const Sale= module.exports=mongoose.model('sales',saleSchema)
module.exports= Sale