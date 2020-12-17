const { request } = require('express');
const mongoose=require('mongoose');
const requests=mongoose.Schema({
       reqId:{type:Number,required:true,unique:true},////auto increment
       reciverID:{type:Number,required:true},
       senderID:{type:Number,required:true},
       state:{type:String,required:true},
       type:{type:String,required:true},
       dayReqOff:{type:String},
       slotReq1:String,
       slotReq2:String
});
module.exports =mongoose.model('requests',requests);