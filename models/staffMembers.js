const { Double } = require('mongodb');
const mongoose=require('mongoose');
const staffMembers=mongoose.Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String,default:"123456"},
    id:{type:String,unique:true},
    name:{type:String,required:true},
    salary:{type:Number,required:true},
    salaryThismonth:{type:Number},
    officeLocation:{type:String},
    daysOff:{type:Array },
    department:{ type:String,required:true},
    role:{type:String},
    hours:{type:Number,default:0},
    missingDays:{type:Number,default:30}
    
})
module.exports=mongoose.model('staffMembers',staffMembers);