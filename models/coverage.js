const { Double } = require('mongodb');
const mongoose=require('mongoose');
const coverage=mongoose.Schema({
   course:{type:String,required:true,unique:true},
   department:{type:String,required:true},
   coverage:{type:Number,required:true,default:0}
});

module.exports=mongoose.model('coverage',coverage);