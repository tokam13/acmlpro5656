const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt')

require('dotenv').config()

const jwt=require('jsonwebtoken');

const staffMembers=require('../models/staffMembers');
const location=require('../models/locations')
const faculty=require('../models/faculty');
const courseDep=require('../models/courseDep')
const { async } = require('rsvp');


router.route('/:location')
.post(async(req,res)=>{
    if(req.user.department=='hr'){
    const loc={
        location:req.body.location,
        remainingPlaces:req.body.remainingPlaces,
        capacity:req.body.capacity,
        type:req.body.type
    }
    await location.insertOne(loc);
    console.log("location inserted");}
    else{
        res.status(403).send('Acess denied')
    }

})
.delete(async(req,res)=>{
    if(req.user.department=='hr'){
    const result=await location.findOneAndDelete({"locaton":req.body.location})
    if(result!=null){
        res.send(result)
    }
    else{
        res.send("there is no data for this location")
    }
}else{
    res.status(403).send('Acess denied')
}

})
.put(async(req,res)=>{
    if(req.user.department=='hr'){
   // res.send("enter the update ");
    
    const result= await location.findOneAndUpdate({"location":req.body.location},req.body,{new:true})
    res.send(result);}
    else{
        res.status(403).send('Acess denied')
    }

})
router.route('/faculty')
.post(async(req,res)=>{
    if(req.user.department=='hr'){
    const fac={
       facultyName=req.body.facultyName,
       department=req.body.department,
       instructorID=req.body.instructorID
    }
    await faculty.insertOne(fac);
    console.log("faculty inserted");
   }
   else{
    res.status(403).send('Acess denied')
   }
})
.put(async (req,res)=>{
    if(req.user.departmentr=='hr'){
        const fac=await faculty.findOneAndUpdate({"facultyName":req.body.facultyName},req.body,{new:true})
        res.send(fac);
    }
    else{
        res.status(403).send('Acess denied')
       }   
})
.delete(async(req,res)=>{
    if(req.user.department=='hr'){
        const result=await faculty.findOneAndDelete({"facultyName":req.body.facultyName})
        if(result!=null){
            res.send(result)
        }
        else{
            res.send("no faculty with this name")
        }
    }
    else{
        res.status(403).send('Acess denied')
       }
})
router.route('/department')
.post(async(req,res)=>{
    if(req.user.department=='hr'){
    res.send("enter faculty name")
    const fac= await faculty.findOne("facultyName"==req.body.facultyName);
    if(fac!=null){
        fac.department.push(req.body.department)
        res.send(fac)
    }
    else{
        res.send('there is no such a faculty')
    }

   }
   else{
    res.status(403).send('Acess denied')
   }
})
.put(async (req,res)=>{
    if(req.user.department=='hr'){
        const fac=await faculty.findOneAndUpdate({"facultyName":req.body.facultyName},{"department":req.body.department},{new:true})
        res.send(fac);
    }
    else{
        res.status(403).send('Acess denied')
       }   
})
.delete(async(req,res)=>{
    if(req.user.department=='hr'){
        res.send("enter faculty name")
        const fac= await faculty.findOne("facultyName"==req.body.facultyName);
       
        
        if(fac!=null){

            res.send("which department you want to delete");
            const depname=req.body.department
            const indx=fac.department.indexOf(depname)
            fac.department.splice(indx,1);
            res.send(fac)
        }
        else{
            res.send('there is no such a faculty')
        }
    }
    else{
        res.status(403).send('Acess denied')
       }
})


module.exports=router

