const mongoose=require('mongoose');
const locations=mongoose.Schema({
    location :{type:String,required:true},
    capacity:{type:Number,required:true},
    type:{type:String,required:true},
    remainingPlaces:{type:Number}
})
module.exports=mongoose.model('locations',locations);