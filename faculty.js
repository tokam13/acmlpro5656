const mongoose=require('mongoose');
const faculty=mongoose.Schema({
    facultyName:{type:String,required:true},
    departmentName:{type:String,required:true},
    instructorID:{type:Number,required:true}
});
module.exports=mongoose.model('faculty',faculty);