import express from 'express'
import db from "../database/database.js"

const router = express.Router();


router.route('/')
//Create
.post((req,res) =>{
    let{name,email}= req.body
    const regex = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]+$/

    //Error handling
    //Checks if user has inputed both name and email parameters
    if (!name || !email){
        res.status(400).json({error: 'Insufficent Data'})
    }

    else if (!regex.test(email)){ //Checks if the format for the email is correct using Regex
        res.status(400).json({error: 'Invalid Email Format (use: name@company.com)'})
    }
    else{
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
      res.status(400).json({ error: `Could not find user for id: ${id}`});
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
      res.status(400).json({ error: `Could not find user for id: ${id}` });
    }
  });


//Delete

//Filter Route

export default router;