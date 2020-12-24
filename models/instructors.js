
const mongoose=require('mongoose');
const instructors=mongoose.Schema({
     id:{type:Number,required:true,unique:true},
     courseName:{type:String,required:true},
     slotDay:{type:Number},
     slotTime:{type:Number},
     coordinatorID:{type:Number},
     departmentName:{type:String,required:true},
     daysOff:{type:Array,required:true}
})
module.exports=mongoose.model('instructors',instructors);