//Imports
import express from "express";
import globalErr from "./middlewares/globalErr.js"
import logReq from "./middlewares/globalErr.js"
import db from "./database/database.js"
import users from "./routes/users.js"


//Setups
const app = express();
const PORT = 3000;
const { applicants, jobs, applications, responses } = db;

//Middleware 
app.use(express.json()); //Parses the request body into JSON
//logging middleware:
app.use(logReq)



//Customer View Engine

//Set it into express

//Routes

app.use('/api/users',users)
// app.use('/api/roles',jobs)
// app.use('/api/link',applications)
// app.use('/api/response',responses)


//app.use("/location",location)

//Global Err handling middleware
app.use(globalErr);
//Listener
app.listen(PORT,()=>{
    console.log(`Server running on PORT: ${PORT}`)
})