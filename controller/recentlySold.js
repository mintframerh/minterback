const {data}=require('../data.js')

const recentltySoldSchema=require('../model/recentlySoldSchema')
// const landAndEstateSchema=require('../model/productSchema.js')

const getRecentlySold = async(req, res) => {
    try {
      // const products=await recentltySoldSchema.insertMany(data.RecentSold)
        const products=await recentltySoldSchema.find().sort({timestamp:-1})
        
        res.send(products)
        // res.send(createrecentltySold)
        
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  };
  const postRecentlySold = async(req, res) => {
    try {
      const {justSold}=req.body
      for (let index = 0; index < justSold.length; index++) {
        const element = justSold[index];
        const rarity="common"
        const volume=900
        const landSize="https://res.cloudinary.com/dkzuuda7n/image/upload/v1680445962/minty_3_c4hisj.png"
        const products=await recentltySoldSchema.create({name:element.name,image:element.image,rarity:rarity,volume:volume,landSize:landSize})
      }
        res.send('justsold')
        
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  };

  module.exports={getRecentlySold,postRecentlySold}