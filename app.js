const express= require('express');
const mongoose= require ('mongoose'); 
const app = express();
const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`this server is running on port ${PORT}`);
});

const staffMembers = require('./staffMembers.js');
const attendance=require('./attendance.js');
const course=require('./course.js');
const courseDep=require('./courseDep.js');
const coverage=require('./coverage.js');
const faculty=require('./faculty.js');
const instructors=require('./instructors.js');
const locations=require('./attendance.js');
const requests=require('./requests.js');


app.use(express.json());
app.use(express.urlencoded({extended:false}));

const url = "mongodb+srv://advancedpro:advanced1234@cluster0.lugj5.mongodb.net/acml?retryWrites=true&w=majority";///change
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true
}
mongoose.connect(url,connectionParams).then(()=>{
    console.log("db is successfuly connected")
}).catch((error)=>{
    console.log(error)
});