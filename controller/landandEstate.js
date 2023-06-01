const LandAndEstate=require('../model/landAndEstateSchema.js')
const getLandandEstate=async(req, res) => {
    try {
      
      // const createLand=await LandAndEstate.insertMany(data.LandAndEstateData)
      const land=await LandAndEstate.find()
        res.send(land)
        // res.send(createLand)
        
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }
  const getSingleLandandEstate=async(req,res)=>{
    try {
         
        const landandestate =await LandAndEstate.findOne({_id:req.params.id})
        
        if (landandestate){
            res.send(landandestate)
        }
        else{
            res.status(404).send({message:'Page not found'})
        }
          
      } catch (error) {
        res.status(500).json({ msg: error });
      }
    
}
const getAddToCartLand=async (req,res)=>{
    const landd=await LandAndEstate.findOne({_id:req.params.id})
   
    if (landd){
        return res.send(landd)
    }
    else{
        res.status(404).send({message:'Page not found'})
    }
   
  }
module.exports={getLandandEstate,getSingleLandandEstate, getAddToCartLand}