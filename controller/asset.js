const User=require('../model/userSchema')
const getAsset=async(req,res)=>{
    const {id}=req.params
    try {
        const asset= await User.findOne({_id:id});
        if(asset){
            res.send(asset.assets.asset)           
        }
        else{
            res.json("User not found")
        }
    } catch (error) {
        console.log(error)
    }
}
const getAssetDetail=async(req,res)=>{
    
    try {
        const {id}=req.params
        const asset= await User.findOne({_id:id});
        if(asset){
            res.send(asset) 
        }
        else{
            res.json("User not found")
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports={getAsset,getAssetDetail}