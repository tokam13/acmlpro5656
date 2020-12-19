
const mongoose=require('mongoose');
const router = require('../routes/hr');
const attendance=mongoose.Schema({
    id:{ type:String, required:true},
    date:{ type:Date,required:true},
    checkIn:{ type:Number},
    checkOut:{type:Number}
})
attendance.index({id:1,date:1},{unique:true})
module.exports=mongoose.model('attendance',attendance);