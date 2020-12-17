const express= require('express');
const HRroutes=require('./routes/hr')
const mongoose= require ('mongoose'); 
const app = express();
const PORT = 5000;
console.log(`this server is running on port1 ${PORT}`);

app.listen(PORT,()=>{
    console.log(`this server is running on port ${PORT}`);
});
/*
const staffMembers = require('./models/staffMembers.js');
const attendance=require('./models/attendance.js');
const course=require('./models/course.js');
const courseDep=require('./models/courseDep.js');
const coverage=require('./models/coverage.js');
const faculty=require('./models/faculty.js');
const instructors=require('./models/instructors.js');
const locations=require('./models/attendance.js');
const requests=require('./models/requests.js');

*/
app.use(express.json());
require('dotenv').config()

const jwt=require('jsonwebtoken')
const { nextTick } = require('process')

app.use('',HRroutes) // if you get / go to user_routes 

app.use((req,res,next)=>{ // mid,next dleware ( has to be before post)  // middleware take a third parater takes next to conplete the next routes 
    const token=req.headers.token

    const result=jwt.verify(token,process.env.TOKEN_SECRET)
    next()
})


app.use(express.urlencoded({extended:false}));

/*const url = "mongodb+srv://advancedpro:advanced1234@cluster0.lugj5.mongodb.net/acml?retryWrites=true&w=majority";///change
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true
}
mongoose.connect(url,connectionParams).then(()=>{
    console.log("db is successfuly connected")
}).catch((error)=>{
    console.log(error)
});*/




