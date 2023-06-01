const jwt=require('jsonwebtoken')
const generateToken=(user)=>{
    return jwt.sign({_id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,},process.env.JWTSECRET,{
        expiresIn:'30d'
    })
}
module.exports=generateToken