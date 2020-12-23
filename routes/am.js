const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt')


require('dotenv').config();

const jwt=require('jsonwebtoken');
const requests= require ('../models/requests');
const { async } = require('rsvp');

const teachingSlot= require('../models/teachingSlot');
const staffMembers=require('../models/staffMembers');

//const courseDep= require('../models/courseDep');
//const course=require('../models/course');
//const reqIds= require('../models/reqId');

/*router.route('/request')
.post(async(req,res)=>{
    
    let lastid=reqIds.length+1;
    reqIds.push(1);

    const req= new requests({
        reqId: lastid,



    })
})*/
router.route('/viewReqState')
.get(async(req,res)=>{
    if(req.body.state=="accepted"){
    const result= await requests.find({"senderID": req.body.id,"state":"accepted"},
    function(err,docs){
        if(docs!=null){
            res.send(docs);
        }
        else{
            res.send("there are no any accepted requests")
        }
        if(err)
        res.send(err)
    })
   }
    if(req.body.state=="pending"){
        console.log("in if")
        const result= await requests.find({"senderID": req.body.id,"state":"pending"},
        
        function(err,docs){
            if(docs!=null){
                res.send(docs);
            }
            else{
                res.send("there are no any pending requests")
            }
            if(err)
            res.send(err) 
        })
        }
        if(req.body.state=="rejected"){
            const result= await requests.find({"senderID": req.body.id,"state":"rejected"},
            function(err,docs){
                if(docs!=null){
                    res.send(docs);
                }
                else{
                    res.send("there are no any rejected requests")
                }
                if(err)
            res.send(err)
            })
            }


})
router.route('/cancelReq')
.delete(async (req,res)=>{
   
     var today= new Date();
    
    const result= await requests.findOne({"reqId":req.body.rId,"senderID":req.body.id})
    if (result!=null){
        if(result.dayReqOff>today){
           await requests.findOneAndDelete({"reqId":req.body.rId,"senderID":req.body.id})
           res.send("request that is yet to come canceled successfuly")
        }
        if(result.state=="pending"){
        await requests.findOneAndDelete({"reqId":req.body.rId,"senderID":req.body.id})
        res.send("pending request canceled successfully")

    }}
    else{
        res.send("the request already had a response")
    }
    
})

router.route('/sendReplacementReq')
.post(async(req,res)=>{
    const result= await teachingSlot.findOne({"staffID":req.body.replID,"courseName":req.body.cname})
   // res.send(rs)
    if(result!=null){
        const fady= await teachingSlot.findOne({"staffID":req.body.replID,"slotTime":req.body.sTime,"slotDay":req.body.sDay})
        if(fady==null){
            const request= new requests({
              reciverID:req.body.replID,
             senderID:req.body.id,
             type:"replacement",
             dayReqOff:req.body.date
})
            await request.save();
            res.send(request)
             console.log("replacement sent to staff ")
    }
}
const dep= await staffMembers.findOne({"id":req.body.id})

if(dep!=null){
   
const hod=await staffMembers.findOne({"department":dep.department,"role":"HOD"})

if(hod!=null){
    console.log("hod foun")
 const request= new requests({
 
     reciverID:hod.id,
     senderID:req.body.id,
     type:"replacement",
     dayReqOff:req.body.date

    })
    await request.save();
    res.send(request)
 console.log("replacement sent to HOD")
}
}
 else{
     res.send("there is no such a department ")
 } 
})
router.route('/viewReplacmentReq')
.get(async(req,res)=>{
    const result=await requests.find({"senderID":req.body.id,"type":"replacement"}||{"reciverID":req.body.id,"type":"replacement"},
    function (err,docs) {
        if(docs!=null){
            res.send(docs)
        }
        else{
            res.send("there is no replacmennt requests for this member")
        }
        if(err){
            res.send(err)
        }
    })
})
router.route('/viewSchedule')
.get(async(req,res)=>{
    await teachingSlot.find({"staffID":req.body.id},
    function(err,docs){
        if(docs.length>0){
        res.send(docs);}
        else{
            res.send("there is no staff with this ID")
        }

    } )
    if(err){
        res.send(err);
    }
})

router.route('/changeDayReq')
.post(async (req,res)=>{
    const dep= await staffMembers.findOne({"id":req.body.id})
    if(dep!=null){
               const hod=await staffMembers.findOne({"department":dep.department,"role":"HOD"})
               if(hod!=null){
                const request= new requests({
                
                    reciverID:hod.id,
                    senderID:req.body.id,
                    type:"changeDayOff",
                    reason:req.body.reason
    
                   })
                   await request.save();
                res.send(request)
                   
           }}
           else{
           res.send("there is no member with this id")}

})
router.route('/notify')
.get(async(req,res)=>{
    const result= await requests.find({"senderID":req.body.id},
    function(err,docs){
        if(docs!=null){

        }
    }
    

    )
})
    
module.exports=router    

