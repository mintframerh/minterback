const express=require("express")

const assetRouter=express.Router()
const {getAsset,getAssetDetail}=require('../controller/asset.js')
assetRouter.get('/user/:id',getAsset)
assetRouter.get('/user/balance/:id',getAssetDetail)

module.exports={assetRouter}