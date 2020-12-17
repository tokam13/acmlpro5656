
const mongoose=require('mongoose');
const attendance=mongoose.Schema({
    id:{ type:Number, required:true},
    date:{ type:Date, ///////////sa7/////////////////////////////////////////////
        required:true},
    checkIn:{ type:Number},
    checkOut:{type:Number},
    extraHours:{type:Number}
})
module.exports=mongoose.model('attendance',attendance);