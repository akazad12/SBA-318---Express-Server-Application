import express from 'express'
import db from "../database/database.js"

const router = express.Router();

router.route('/')
  //Create
  .post((req, res) => {
    let { applicationId, status, appliedDate } = req.body
    const regex = /^\d{4}-\d{2}-\d{2}$/

    //Error handling
    //checks if input values are empty
    if (applicationId && status && appliedDate) {
      //checks if format for date is correct
      if (regex.test(appliedDate)) {
        let id;
        if (db.responses.length == 0) {
          id = 1
        } else {
          id = db.responses[db.responses.length - 1].id + 1
        }
        let newResponse = {
          id: id,
          applicationId,
          status,
          appliedDate
        }
        db.responses.push(newResponse);
        res.status(201).json(newResponse)

      } else {
        res.status(400).json({ error: 'Wrong Date Format' })
      }
    } else {
      res.status(400).json({ error: 'Insufficent Data' })
    }
  })
  //Read
  .get((req, res) => {
    res.json(db.responses);
  });
//Update 
router
  .route("/:id")
  .put((req, res) => {
    let id = req.params.id;

    let updatedresponse = db.responses.find((responseInfo) => {
      if (responseInfo.id == id) {
        for (let key in req.body) {
          responseInfo[key] = req.body[key];
        }
        return true;
      }
    });

    if (updatedresponse) {
      res.json({ updatedresponse });
    } else {
      res.status(400).json({ error: `Could not find response for id: ${id}` });
    }
  })
  .delete((req, res) => {
    let id = req.params.id;

    let deletedresponse = db.responses.find((responseInfo, i) => {
      if (responseInfo.id == id) {
        return db.responses.splice(i, 1);
      }
    });

    if (deletedresponse) {
      res.json({ deletedresponse });
    } else {
      res.status(400).json({ error: `Could not find response for id: ${id}` });
    }
  });


//Delete

//Filter Route

export default router;