//Imports
import express from "express";
import {globalErr} from "./middlewares/globalErr.js"
//import location from "./routes/locations.js"


//Setups
const app = express();
const PORT = 3000;

//Middleware 
app.use(express.json()); //Parses the request body into JSON
//logging middleware:
app.use((req,res,next)=>{
    console.log(`${req.method}- ${req.url}`);

    if(req.body){
        console.log(`req Date:`, req.body)
    }
    next
});

app.get('/',(req,res)=>{
    res.send('hollo')
})


//Customer View Engine

//Set it into express

//Routes
// app.get("/home",(req,res)=> {
//     res.render("index")
// });

//app.use("/location",location)

//Global Err handling middleware
//app.use(globalErr);
//Listener
app.listen(PORT,()=>{
    console.log(`Server running on PORT: ${PORT}`)
})