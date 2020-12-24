const express= require('express');
const amRoutes=require('./routes/am')
const HRroutes=require('./routes/hr')
const app = express();
const mongoose= require ('mongoose'); 
//const bcryptjs=require('bcrypt.js');
//const jwt =require('jsonwebtoken');
app.listen(process.env.PORT,()=>{
    console.log("this server is running on port "+process.env.PORT);
});

/*const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`this server is running on port ${PORT}`);
});*/
app.use(express.json());
//app.use(express.urlencoded({extended:false}));
//require('dotenv').config()

//app.use('',HRroutes) 
app.use('',amRoutes)
module.exports.app=app;





