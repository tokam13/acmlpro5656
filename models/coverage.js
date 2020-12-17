const mongoose=require('mongoose');
const coverage=mongoose.Schema({
   course:{type:String,required:true},
   department:{type:String,required:true},
   coverage:{type:String,required:true},
   instructorID:{type:Number,required:true}
});
module.exports=mongoose.model('coverage',coverage);