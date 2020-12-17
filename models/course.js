
const mongoose=require('mongoose');
const course=mongoose.Schema({
     instructorID:{type:Number,required:true},
     assigned:{type:Boolean,required:true},
     slotTime:{type:Number,required:true},
     slotLoction:{type:String,required:true},
     courseName:{type:String,required:true}
});
module.exports=mongoose.model('course',course);