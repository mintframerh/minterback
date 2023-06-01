import express from 'express'
import cors from 'cors'
import {data} from './data.js'
const app=express()
app.use(cors())
app.get('/api/product',(req,res)=>{
    res.send(data.product)
})
app.get('/api/product/id/:id',(req,res)=>{
    const product=data.product.find((x)=>Number(x._id) === Number(req.params.id))
    if (product){
        res.send(product)
    }
    else{
        res.status(404).send({message:'Page not found'})
    }

})
// kk
// app.get('/api/:id',(req,res)=>{
//     if(Number(req.params.id) === Number(3)){
//         const a=typeof(Number(req.params.id))
//         console.log(a);
//         return res.send('hii')  
        
//     }
    
//     res.send('error')
// })
    app.get('/api/product/:id',(req,res)=>{
    const product=data.product.find((x)=> Number(x._id) === Number(req.params.id))
   
    if (product){
        return res.send(product)
    }
    else{
        res.status(404).send({message:'Page not found'})
    }
   
})
app.get('/api/trending/:id',(req,res)=>{
    const trending=data.TrendingData.find((x)=> Number(x._id) === Number(req.params.id))
   
    if (trending){
        return res.send(trending)
    }
    else{
        res.status(404).send({message:'Page not found'})
    }
   
})
app.get('/api/landandasset/:id',(req,res)=>{
    const landandasset=data.LandAndEstateData.find((x)=> Number(x._id) === Number(req.params.id))
   
    if (landandasset){
        return res.send(landandasset)
    }
    else{
        res.status(404).send({message:'Page not found'})
    }
   
})
app.listen(5000,()=>console.log('listening on port 5000'))