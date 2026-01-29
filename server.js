//Imports
import express from "express";
import globalErr from "./middlewares/globalErr.js"
import { logReq, activityLog } from "./middlewares/middleware.js"
import db from "./database/database.js"
import users from "./routes/users.js"
import jobs from "./routes/jobs.js"
import response from "./routes/response.js"
import fs from "fs"


//Setups
const app = express();
const PORT = 3001;


//Middleware 
app.use(express.json()); //Parses the request body into JSON
//logging middleware:
app.use(logReq)
app.use(activityLog)



//Customer View Engine
app.engine("html", function (filePath, options, cb) {


    // fs.readFile(filePath,(err,content)=>{
    fs.readFile(filePath, (err, content) => {

        if (err) return cb(err);
        //Turn each data set into dictionaries & removed repetative id values
        //Key value pairs where key is the ID of the row in the list of users
        //Value is the rest of the object
        let list = "";
        let users = db.applicants.reduce((userDict, user) => {
            userDict[user.id] = user;
            delete userDict[user.id]["id"]
            return userDict;
        }, {})
        let jobs = db.jobs.reduce((jobDict, job) => {
            jobDict[job.id] = job;
            delete jobDict[job.id]["id"]
            
            return jobDict;
        }, {})
        let applications = db.applications.reduce((applicationDict, application) => {
            applicationDict[application.id] = application;
            delete applicationDict[application.id]["id"]
            
            return applicationDict;
        }, {})
        
        let responses = db.responses.reduce((responseDict, response) => {
            responseDict[response.id] = response;
            delete responseDict[response.id]["id"]
            
            return responseDict;
        }, {})
        
        //Copmbine the rows based on present data show relevant fields
        //Keys are the index of the applications ID
        //Values are the combined set of keys in all other objects
        let finalObj = {}
        Object.keys(applications).forEach(key =>{
            let applicantID = applications[key]["applicantId"] 
            let jobId = applications[key]["jobId"]
            let user = users[applicantID]
            let job = jobs[jobId]
            let response = responses[key]
            finalObj[key]={...user,  ...job, ...response}
            
        })
        console.log(finalObj)
        //Headers used to name the row of the output table (Hard Coded b/c not changed later)
        let headers = ["name","email","company","role","location","status",'appliedDate']
            console.log(headers)
            for (let head of headers){
                console.log(head)
                    list += `<th>${head}</th>`

        }
        //Dynamically generating the rows using HTML
        Object.keys(finalObj).forEach(obj =>{
            list +=`<tr>`
            for (let head of headers){

                list += `<td>${finalObj[obj][head]}</td>`;
            }
            list += `</tr>`
        })
        let rendered = content.toString().replace("#list#", list);
        //  return cb(null,list)
        return cb(null, rendered)
    })
})

//Set it into express
app.set("views", "./views");
app.set("view engine", "html");
app.use(express.static("./styles"));

//Routes
app.get("/", (req, res) => {
    // let list = "";

    //     for (let user of db.applicants ){
    //         list += `<li>${user.email}</li>`;
    //     }
    //     let rendered = content.toString().replace("#list#", list);

    res.render("index");
});

app.use('/api/users', users)
app.use('/api/roles', jobs)
app.use('/api/response', response)
// app.use('/api/response',responses)




//Global Err handling middleware
app.use(globalErr);
//Listener
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})