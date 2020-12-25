require('dotenv').config()
const mongoose=require('mongoose')
const app=require ('./app')

mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
 useUnifiedTopology: true,
})
.then(console.log("Successfully Connected to The Test Database"));

/*app.listen(process.env.PORT,()=>{
    console.log("this server is running on port ");
});*/

//module.exports.app = app;
//mongoose.connect( "mongodb+srv://advancedpro:advanced1234@cluster0.lugj5.mongodb.net/acml?retryWrites=true&w=majority"
//, { useNewUrlParser: true },{ useUnifiedTopology: true }).then(console.log("thank you , you're in "))
