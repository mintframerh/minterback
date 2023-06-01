const mongoose=require('mongoose')
// import mongoose from 'mongoose'
const recentlySoldSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name required"],
        trim:true
    },
    image:{
        type:String,
        required:[true,"image required"],
        trim:true
    },
    rarity:{
        type:String,
        required:[true,"rarity required"],
        trim:true
    },
    volume:{
        type:Number,
        required:[true,"volume required"],
        trim:true
    },
    
    landSize:{
        type:String,
        required:[true,"LandSize required"],
        trim:true
    }
},
{
    timestamps:true
}
)

const recentlySold= module.exports=mongoose.model('recentlySold',recentlySoldSchema)
module.exports= recentlySold