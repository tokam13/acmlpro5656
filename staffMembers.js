const { Double } = require('mongodb');
const mongoose=require('mongoose');
const staffMembers=mongoose.Schema({
    email:{type:String, required:true, unique:true},
     password:{type:String,required:true},
     id:{type:Number,////3aiza y increment
    required:true,unique:true},
    name:{type:String,required:true},
    salary:{type:Number,required:true},
    officeLocation:{type:String},
    daysOff:{type:String, required:true },
    department:{ type:String,required:true},
    role:{type:String,required:true}
    
})
module.exports=mongoose.model('staffMembers',staffMembers);