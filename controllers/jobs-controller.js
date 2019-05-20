/***************************************************************************************
 * File name: jobs-controller.js
 * 
 * This file imports data from 'models' folder  and exposes 2 apis to 
 * see all jobs & create/post a new job in DB
 * Returns: all the data is returned in json format
 ***************************************************************************************/

/* eslint-disable no-underscore-dangle */

//Import dependencies

const User = require('../models').user;
const Jobs = require('../models').job;
const handle = require('../utils/promise-handler');


// GET savedjobs Ids '/api/jobs' for a user
const getSavedJobs = async (req, res) => {

  console.log("Inside GET '/api/jobs' -> getSavedJobs");

  const [userErr, userData] = await handle(User.findById(req._id));

  if (userErr) {
    return res.json(500).json(userErr);
  }

  //Get all the job Ids from 'savedJobsArray[]' that are related to the particular user
  const jobsIds = userData.savedJobsArray;
  console.log("jobsIds: " + jobsIds);

  let arrayOfJobsData = [];

  const start = async () => {

    await asyncForEach(jobsIds, async (jobId) => {

      const [jobErr, jobData] = await handle(Jobs.findById(jobId));

      if (jobErr) {
        return res.json(500).json(jobErr);
      }

      arrayOfJobsData.push(jobData);

    })

    // console.log(arrayOfJobsData);
    return res.status(200).json(arrayOfJobsData);
  }

  start();

};

// This function handles the foreach async await problem
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}



// CREATE/POST jobs for a user '/api/jobs'
const createNewJob = async (req, res) => {

  console.log("Inside POST '/api/jobs' -> createNewJob");


  //Fields required (which ever is available):
  //jobTitle, jobtype, position, salary, location, company, link, description, posted

  // Create a new user using req.body
  Jobs.create(req.body)

    .then(function (dbNewJobData) {

      // If saved successfully, send the the new job document to the client
      pushToSavedJobsArray(req._id, dbNewJobData._id);

      res.status(200).json({
        success: true,
        message: "Job successfully added!"
      });

    })
    .catch(function (err) {
      // If an error occurs, send the error to the client
      console.log(err);

      res.status(500).json({
        success: false,
        message: "Error adding job details to DB, please try again."
      });

    });

};


async function pushToSavedJobsArray(userId, newJobId) {

  console.log("Inside pushToSavedJobsArray()");

  //Update User table with job id of the current saved job
  const [userFindErr, userData] = await handle(User.findById(userId));

  // console.log("------------------------------");
  // console.log(userData);
  // console.log("------------------------------");

  if (userFindErr) {
    return (userFindErr);
  }

  return User.findOneAndUpdate({
      _id: userId
    }, {
      $push: {
        savedJobsArray: newJobId
      }
    }, {
      new: true
    }).then(userInfo => {
      if (userInfo !== null) {
        return userInfo;
      }

      return res.json({
        message: 'Job already saved!'
      });
    })
    .catch(err => {
      console.log(err);
      return (err);
    });

}

// DELETE jobs for a user '/api/jobs'
const deleteSavedJob = async (req, res) => {

  console.log("Inside DELETE '/api/jobs' -> deleteSavedJob");

  const userID = req._id;
  const jobIdToBeDeleted = req.body.jobId;
  console.log("req.id: " + userID);
  console.log("req.body.jobId: " + jobIdToBeDeleted);


  //Delete the jobId from 'savedJobsArray' in User collection
  const [userErr, userData] = await handle(User.findById(userID));

  if (userErr) {
    return res.json(500).json(userErr);
  }

  let newSavedJobsArray = userData.savedJobsArray;
  newSavedJobsArray.splice(newSavedJobsArray.indexOf(jobIdToBeDeleted), 1);

  // console.log("-------userData-------");
  // console.log(userData);


  User.findByIdAndUpdate(userID, {
    savedJobsArray: newSavedJobsArray
  }, (err, user) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error updating new data."
      });
    }


    //Delete document from Jobs collection -------------------
    Jobs.findByIdAndRemove(jobIdToBeDeleted, (err, jobData) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error deleting job."
        });
      }

      console.log("jobData after deletion: ");
      console.log(jobData);

      return res.status(200).json({
        success: true,
        message: "Job successfully deleted!"
      });

    });
    
    //-------------------------------------------------------


  });

} //End of deleteSavedJob()





module.exports = {
  createNewJob,
  getSavedJobs,
  deleteSavedJob
};