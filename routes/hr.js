const express=require('express');
const router=express.Router();
const staffMembers=require('../models/staffMembers');
const location=require('../models/locations')
const faculty=require('../models/faculty')
//router.route('/:location')

router.route('/:location')
.post(async(req,res)=>{
    const loc={
        location:req.params.location,
        remainingPlaces:req.params.remainingPlaces,
        capacity:req.params.capacity,
        type:req.params.type
    }
    await location.insertOne(loc);
    console.log("location inserted");
})
.delete(async(req,res)=>{
    const result=await location.findOneAndDelete({"locaton":req.params.location})
    if(result!=null){
        res.send(result)
    }
    else{
        res.send("there is no data for this location")
    }
})
.put(async(req,res)=>{
 
    res.send("enter the update ");
    
    const result= await location.findOneAndUpdate({"location":req.params.location},req.body,{new:true})
    res.send(result);
})
module.exports=router

