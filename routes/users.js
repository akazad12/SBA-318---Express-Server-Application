import express from 'express'
import db from "../database/database.js"

const router = express.Router();


router.route('/')
//Create
.post((req,res) =>{
    let{name,email}= req.body

    //Error handling
    if (name&&email){
        let id;
        if (db.applicants.length ==0){
            id = 1
        } else {
            id = db.applicants[db.applicants.length -1].id +1
        }
        let newApply = {
            id : id,
            name,
            email
        }
        db.applicants.push(newApply);
        res.status(201).json(newApply)


    } else{
        res.status(400).json({error: 'Insufficent Data'})
    }
})
//Read
.get((req, res) => {
    res.json(db.applicants);
  });
//Update 
router
  .route("/:id")
  .put((req, res) => {
    let id = req.params.id;

    let updatedUser = db.applicants.find((userInfo) => {
      if (userInfo.id == id) {
        for (let key in req.body) {
          userInfo[key] = req.body[key];
        }
        return true;
      }
    });

    if (updatedUser) {
      res.json({ updatedUser });
    } else {
      res.status(400).json({ error: "Could not find todo!" });
    }
  })
   .delete((req, res) => {
    let id = req.params.id;

    let deletedUser = db.applicants.find((userInfo, i) => {
      if (userInfo.id == id) {
        return db.applicants.splice(i, 1);
      }
    });

    if (deletedUser) {
      res.json({ deletedUser });
    } else {
      res.status(400).json({ error: "Could not find todo!" });
    }
  });


//Delete

//Filter Route

export default router;