const mongoose=require('mongoose');

const faculty=mongoose.Schema({
    facultyName:{type:String,required:true,unique:true},
    departmentName:{type:Array,required:true},
    instructorID:{type:Number,required:true}
});
module.exports=mongoose.model('faculty',faculty);