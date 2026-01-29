import express from 'express'
import db from "../database/database.js"

const router = express.Router();

router.route('/')
//Create
.post((req,res) =>{
    let{company, role, location}= req.body

    //Error handling
    if (company&&role&&location){
        let id;
        if (db.jobs.length ==0){
            id = 1
        } else {
            id = db.jobs[db.jobs.length -1].id +1
        }
        let newJob = {
            id : id,
            company,
            role,
            location
        }
        db.jobs.push(newJob);
        res.status(201).json(newJob)


    } else{
        res.status(400).json({error: 'Insufficent Data'})
    }
})
//Read
.get((req, res) => {
    res.json(db.jobs);
  });
//Update 
router
  .route("/:id")
  .put((req, res) => {
    let id = req.params.id;

    let updatedjob = db.jobs.find((jobInfo) => {
      if (jobInfo.id == id) {
        for (let key in req.body) {
          jobInfo[key] = req.body[key];
        }
        return true;
      }
    });

    if (updatedjob) {
      res.json({ updatedjob });
    } else {
      res.status(400).json({ error: `Could not find job for id: ${id}` });
    }
  })
   .delete((req, res) => {
    let id = req.params.id;

    let deletedjob = db.jobs.find((jobInfo, i) => {
      if (jobInfo.id == id) {
        return db.jobs.splice(i, 1);
      }
    });

    if (deletedjob) {
      res.json({ deletedjob });
    } else {
      res.status(400).json({ error: `Could not find job for id: ${id}` });
    }
  });


//Delete

//Filter Route

export default router;