const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt')

require('dotenv').config()

const jwt=require('jsonwebtoken');

const staffMembers=require('../models/staffMembers');
const location=require('../models/locations')
const faculty=require('../models/faculty');
const courseDep=require('../models/courseDep')

const staffIDs = require('../models/staffIDs');
const { async } = require('rsvp');



router.route('/location')
.post(async(req,res)=>{
 
    const loc=new location({
        location:req.body.location,
        remainingPlaces:req.body.remainingPlaces,
        capacity:req.body.capacity,
        type:req.body.type})
    
    await loc.save()
    res.send(loc)
    console.log("location inserted");
    

})
.delete(async(req,res)=>{
   
    const result=await location.findOneAndRemove({"location":req.body.location})
    //console.log("deletesd")
    if(result!=null){
        res.send("the location deleted successfuly")
    }
    else{
        res.send("there is no data for this location")
    
}

})
.put(async(req,res)=>{
const result= await location.findOneAndUpdate({"location":req.body.location},req.body,{new:true})
    res.send(result);
})
router.route('/faculty')
.post(async(req,res)=>{

    const fac=new faculty({
       facultyName:req.body.facultyName,
       departmentName:req.body.departmentName,
       instructorID:req.body.instructorID
    })
    await fac.save();
    async function makedep(depname){
        const dep= new courseDep({
            departmentName:depname
        })
        await dep.save();
    }
    fac.departmentName.forEach(makedep)
    res.send(fac);
    console.log("faculty inserted");
   
   
})
.put(async (req,res)=>{
    const result=await faculty.findOne({"facultyName":req.body.facultyName})
    if(result!=null){
        async function removedep(depname){
           const removed= await courseDep.findOneAndRemove({"departmentName":depname})
        }
        result.departmentName.forEach(removedep)
       
          const updt=  await faculty.findOneAndUpdate({"facultyName":req.body.facultyName},req.body,{new:true})
            async function makedep(depname){
                const dep= new courseDep({
                    departmentName:depname
                })
                await dep.save();
            }
            updt.departmentName.forEach(makedep)
            res.send(result); 
            console.log("faculty updated successfuly")
        }
       
       
})
.delete(async(req,res)=>{
    
        const result=await faculty.findOne({"facultyName":req.body.facultyName})
        if(result!=null){
            async function removedep(depname){
               const removed= await courseDep.findOneAndRemove({"departmentName":depname})
            }
            result.departmentName.forEach(removedep)
           await faculty.findOneAndRemove({"facultyName":req.body.facultyName})
            res.send("the faculty deleted successfuly")
            
        }
        else{
            res.send("no faculty with this name")
        }
})

router.route('/department')
.post(async(req,res)=>{
   const fac= await faculty.findOne({"facultyName":req.body.facultyName});
    if(fac!=null){
        console.log("faculty to add department found")
        fac.departmentName.push(req.body.departmentName)
        const dep=new courseDep({
            departmentName:req.body.departmentName
        })
        await dep.save();
       await fac.save();
        res.send(fac)
    }
    else{
        res.send('there is no such a faculty')
    }

  
})
.put(async (req,res)=>{
    
        const fac=await faculty.findOne({"facultyName":req.body.facultyName})
        if(fac!=null){
            const indx=fac.departmentName.indexOf(req.body.departmentName)
            if(fac.departmentName.includes(req.body.departmentName)){
                const deldep =await courseDep.findOneAndRemove({"departmentName":req.body.departmentName})
                const addep=new courseDep({
                    departmentName:req.body.departmentName2
                })
                await addep.save();
            fac.departmentName.splice(indx,1,req.body.departmentName2)
            await fac.save();
            console.log("department updated successfuly")
            res.send(fac);}
            else{
                res.send("the department you want to update does not exist")
            }
        }
        else{
            res.send('the faculty you want to update a department from it doesnt exist')
        }
        
      
})
.delete(async(req,res)=>{
    const fac=await faculty.findOne({"facultyName":req.body.facultyName})
    if(fac!=null){
        if(fac.departmentName.includes(req.body.departmentName)){
            const deldep =await courseDep.findOneAndRemove({"departmentName":req.body.departmentName})
         const indx=fac.departmentName.indexOf(req.body.departmentName)
        fac.departmentName.splice(indx,1);
        await fac.save();
        console.log("department deleted successfuly")
        res.send(fac);}
        else{
            res.send("the department you want to delete does not exist")
        }
    }
    else{
        res.send('the faculty you want to delete a department from it doesnt exist')
    }
    
    
})
router.route('/course')
.post(async(req,res)=>{
    const dep= await courseDep.findOne({"departmentName":req.body.departmentName});
     if(dep!=null){
         console.log("department that you want found !")
         dep.courseName.push(req.body.courseName)
        await dep.save();
         res.send(dep)
     }
     else{
         res.send('there is no such a department')
     }
 
   
 })
 .put(async (req,res)=>{
     
         const dep=await courseDep.findOne({"departmentName":req.body.departmentName})
         if(dep!=null){
             if(dep.courseName.includes(req.body.courseName)){
             const indx=dep.courseName.indexOf(req.body.courseName) 
             dep.courseName.splice(indx,1,req.body.courseName2)
             await dep.save();
             console.log("course updated successfuly")
             res.send(dep);}
             else{
                 res.send("the course you want to update does not exist")
             }
         }
         else{
             res.send('the department you want to update a course from it doesnt exist')
         }
         
       
 })
 .delete(async(req,res)=>{
    const dep=await courseDep.findOne({"departmentName":req.body.departmentName})
    if(dep!=null){
        if(dep.courseName.includes(req.body.courseName)){
        const indx=dep.courseName.indexOf(req.body.courseName) 
        dep.courseName.splice(indx,1)
        await dep.save();
        console.log("course deleted successfuly")
        res.send(dep);}
        else{
            res.send("the course you want to delete does not exist")
        }
    }
    else{
        res.send('the department you want to delete a course from it doesnt exist')
    }
    
     
     
 })
 router.route('/staffAffairs')
 .post(async(req,res)=>{
      const locdata=await location.findOne({"location":req.body.office})
     let bolloc=false;
      let idtype="";
      let dayoff=["friday"]
      if(locdata!=null){
       if(locdata.remainingPlaces>0){
           bolloc=true
           console.log("the place found and there is enough capacity ")
           const locnewcap=await location.findOneAndUpdate({"location":req.body.office},{"remainingPlaces":locdata.remainingPlaces-1},{new:true})
        }
        else{
            res.send("the office is full ,please re-enter your data")
        }   
    }
    else{
        res.send("there is no such a location ,please re-enetr your data ")
    }
    if(req.body.department=="hr"){
        idtype="hr-"
        dayoff.push("saturday")
        let last=staffIDs[0].id.length+1
        staffIDs[0].id.push(1)

        idtype+=last
        
    }
    else{
        idtype="ac-"
        let last=staffIDs[1].id.length+1
        staffIDs[1].id.push(1)
        idtype+=last
    }
    if(bolloc){
    const staff=new staffMembers({
        name:req.body.name,
        email:req.body.email,
        id:idtype,
        officeLocation:req.body.office,
        salary:req.body.salary,
        daysOff:dayoff,
        department:req.body.department
}) 
      await staff.save();
      res.send(staff)
      console.log("staff inserted , congrats !")
} 

 }
 )
 .put(async (req,res)=>{
      const staff=await staffMembers.findOneAndUpdate({"id":req.body.id},req.body,{new:true})
      if(staff!=null){
         res.send(staff)
         console.log("staff member updated successfully !")
      }
      else{
          res.send("the employee you are tring to update doesnot exist !")
      }
 } )
 .delete(async(req,res)=>{
        const staff= await staffMembers.findOne({"id":req.body.id});
        if(staff!=null){
        const loc =await location.findOne({"location":staff.officeLocation})
        await location.findOneAndUpdate({"location":loc.location},{"remainingPlaces":loc.remainingPlaces+1},{new:true})
        await staffMembers.findOneAndDelete({"id":req.body.id})
        res.send("the staff member deleted successfully !")}
        else{
            res.send('there is no staff with this id !')
        }
 })
module.exports=router

