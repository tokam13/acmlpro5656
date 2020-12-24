const express=require('express');
const router=express.Router();
const bcryptjs=require('bcryptjs')

require('dotenv').config()

const jwt=require('jsonwebtoken');
const key = 'asdfghjkl'

const staffMembers = require('../models/staffMembers')
const attendance=require('../models/attendance')
const course=require('../models/course')
const courseDep=require('../models/courseDep')
const coverage=require('../models/coverage')
const faculty=require('../models/faculty')
const instructors=require('../models/instructors')
const locations=require('../models/attendance')
const requests=require('../models/requests')
const staffIDs = require('../models/staffIDs');
const { MongoTimeoutError } = require('mongodb');
const { ReplSet } = require('mongodb');
const { findOneAndUpdate } = require('../models/staffMembers');
const teachingSlot = require('../models/teachingSlot');


//app.use(authenticate)

//1st: Assign/delete/update a course instructor for each course in his department.
router.route('/instructor')
.get(async(req,res)=>{
    res.send("it in")
} )
.post(async function(req,res){
   // if(departmentName of instructor == departmentName of hod (token) )
  // const token = req.header('auth-token')
  // const x = jwt.verify(token, key)   //el hagat eli ethatet fel token
   const hod = await staffMembers.findOne({"id":req.body.hodid })///token

   const member =await staffMembers.findOne({"id": req.body.id})
 if(hod!=null && member!=null){
   if(hod.department == member.department)
   {
       const dep=await courseDep.findOne({"departmentName":hod.department})
       let flg=false
       for(let i=0;i<dep.courseName.length;i++){
           if(dep.courseName[i]==req.body.courseName){
               flg=true;
               break;
           }
       }
       if(flg){
    const instructor = new instructors({"id" : req.body.id, "courseName" : req.body.courseName,
      "departmentName":member.department,"daysOff":member.daysOff})
    await instructor.save()
    await staffMembers.findOneAndUpdate({"id":req.body.id},{"role":"instructor","courseName":req.body.courseName},{new:true})
     res.send("Instructor Assigned Succesfully")
   }
   else 
   {
       res.send("Instructor Does Not Exist In Your Department")
   }}
   else{
            res.send("this course is not in your department")
   }}
   else{
       res.send("no hod or member")
   }
})
.delete(async function(req, res){
    //const token = req.header('auth-token')
   //const x = jwt.verify(token, key)   //el hagat eli ethatet fel token
   const hod = await staffMembers.findOne({"id": req.body.hodid })
   
   const member = await staffMembers.findOne({"id": req.body.id})

   if(hod.department == member.department)
   {
        const result = await instructors.findOneAndRemove({"id": req.body.id})
        if(result!=null)
        { await findOneAndUpdate({"id":req.body.id},{"role":null,"courseName":null},{new:true})
           return res.send("Instructor Deleted Successfully")
        }
    }
    else
    {
        return res.send("No Data Provided")
    }
})

.put(async function(req,res){
    //const token = req.header('auth-token')
   //const x = jwt.verify(token, key)   //el hagat eli ethatet fel token
   const hod = await staffMembers.findOne({"id": req.body.hodid })
   
   const member = await staffMembers.findOne({"id": req.body.id})

   if(hod.departmentName == member.departmentName)
   { const dep=await courseDep.findOne({"departmentName":hod.department})
   let flg=false
   for(let i=0;i<dep.courseName.length;i++){
       if(dep.courseName[i]==req.body.courseName){
           flg=true;
           break;
       }
   }
   if(flg){

    const output = await instructors.findOneAndUpdate({"id": req.body.id},{"courseName":req.body.courseName,"departmentName":req.body.departmentName},{new:true})
     if(output!=null){
     return res.send(output)}
     else{
         res.send("noinstructor with this id ")
     }
   }
   else{res.send("this course is not in your dep")}
}
else{
    res.send("this instructor is not in your dep")
}
})

//2nd: View all the staff in his/her department || View all the staff in his/her department per course along with their profiles
router.route('/Staff')
.get(async function(req,res){
   //const token = req.header('auth-token')
   //const x = jwt.verify(token, key)   //el hagat eli ethatet fel token
   const hod = await staffMembers.findOne({"id":req.body.hodid })
   if(req.body.type=="department"){
   const output = await staffMembers.find({"department": hod.department},function(err,docs){
       if(docs!=null){
           res.send(docs)
       }
       else{
           res.send(err)
       }
       if(err){
           res.send(err)
       }
   }) }//returns an array
    if(req.body.type=="course"){
        const dep=await courseDep.findOne({"departmentName":hod.department})
        let flg=false
        for(let i=0;i<dep.courseName.length;i++){
            if(dep.courseName[i]==req.body.courseName){
                flg=true;
                break;
            }
        }
        if(flg){
        const output = await staffMembers.find({"courseName": req.body.course},function(err,docs){
            if(err!=null){
                res.send(docs)
            }
            else{
                res.send(err)
            }
            if(err){
                res.send(err)
            }
        })}
        else{
            res.send("this course is not in your dep")
        }
    }
    else{
        res.send("please specify course or dep")
    }
  
})



//3rd: view the days off of a single staff in his/her department
router.route('/DaysOff')
.get(async function (req,res){
    //const token = req.header('auth-token')
  // const x = jwt.verify(token, key)   //el hagat eli ethatet fel token
   const hod = await staffMembers.findOne({"id": req.body.hodid })
   if(req.body.id==null){
   const output = await staffMembers.find({"department": hod.department},('daysOff') )
    if(output!=null){
        res.send(output)
    }
    else{
        res.send("there is no staff in your dep")
    }
}
   else{
       const stf=await staffMembers.findOne({"id":req.body.id})
       if(stf.department==hod.department){
       if(stf!=null){
           res.send(stf.daysOff)
       }
       else{
           res.send("no staff with this id")
       }}
       else{
           res.send("this member is not in your dep")
       }
       
   }

})



//4th: View all the “change day off/leave” requests sent by staff members in his/her department
router.route('/requests')
.get(async function(req,res){
  //  const token = req.header('auth-token')
   //const x = jwt.verify(token, key)   //el hagat eli ethatet fel token
   const hod = await staffMembers.findOne({"id":req.body.hodid})
  
   const output = await requests.find({"type": "Change Day Off", "reciverID":hod.id} || {"type": "Leave", "reciverID":hod.id})
   if(output.length>0) {
       res.send(output)
   }
   else{
       res.send("there is no requests ")
   }
  
})

//7th: View the coverage of each course in his/her department
router.route('/coverage')
.get(async function(req,res){
   /// const token = req.header('auth-token')
   // const x = jwt.verify(token, key)   //el hagat eli ethatet fel token
    const hod = await staffMembers.findOne({"id": req.body.hodid })
    if(hod!=null){
    const output = await coverage.find({"course": req.body.course,"department": hod.department},('coverage'))
    if(output.length>0){
        res.send(output)
    }
    else{
        res.send("no courses available")
    }
}
else{
    res.send("invalid hod ID")
} 
})

//8th: view teaching assigments of a course offered by his department (view who teaches some course in his department in which slot)
router.route('/teachingAssignments')
.get(async function(req,res){
   // const token = req.header('auth-token')
    //const x = jwt.verify(token, key)   //el hagat eli ethatet fel token
    const hod = await staffMembers.findOne({"id":req.body.hodid })
    const courses=await courseDep.findOne({"departmentName":hod.department})
    let fnl=[];
   // res.send(courses)
    async function tes(courseName) {
        console.log(courseName)
        let slts=await teachingSlot.find({"courseName":courseName})
        //console.log(slts)
        if(slts.length>0){
            fnl.push(slts)
          
        }
        console.log(fnl)
        
    }
   await courses.courseName.forEach(tes)
  res.send(fnl)
})



















function authenticate(req, res, next)
{
    const token = req.header('auth-token')
    //if token is undefined
    if(!token)
    return res.status(403).send("No Such Token")
    //verify the token
    try
    {
        //btakhod token wel key el kont 3amel bih el signature
        jwt.verify(token, key)
        //please move on to the next step (either another middleware or to the route handlers (server))
        next()
    }
    catch(err)
    {
        //m3na eni dkhlt hna yb2a el verification failed yb2a signature bta3 el token bayez 
        return res.status(403).send("Token Unverified")
    }


//to find department of person, el department name da msh bydkholi ka input fel req.body, instead bydkholi his id
//fa lazem adawar 3al instructor da gowa staffMembers using findOne and save it in a const and then we can access his department using 
//const.department
}
module.exports=router