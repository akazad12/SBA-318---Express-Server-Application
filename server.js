//Imports
import express from "express";
import globalErr from "./middlewares/globalErr.js"
import {logReq,activityLog} from "./middlewares/middleware.js"
// import db from "./database/database.js"
import users from "./routes/users.js"
import jobs from "./routes/jobs.js"
import response from "./routes/response.js"


//Setups
const app = express();
const PORT = 3000;


//Middleware 
app.use(express.json()); //Parses the request body into JSON
//logging middleware:
app.use(logReq)
app.use(activityLog)



//Customer View Engine
// app.engine("html",function(filePath,options,cb){
//     fs.readFile(filePath,(error,content)=>{
//         if (err) return cb(err);
//         let 
//     })
// })

//Set it into express

//Routes

app.use('/api/users',users)
app.use('/api/roles',jobs)
app.use('/api/response',response)
// app.use('/api/response',responses)



//Global Err handling middleware
app.use(globalErr);
//Listener
app.listen(PORT,()=>{
    console.log(`Server running on PORT: ${PORT}`)
})