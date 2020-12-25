
const mongoose=require('mongoose');
const course=mongoose.Schema({
     instructorID:{type:String},
     assigned:{type:Boolean},
     slotTime:{type:Number},
     slotLoction:{type:String},
     courseName:{type:String,required:true,unique:true}
});
module.exports=mongoose.model('course',course);