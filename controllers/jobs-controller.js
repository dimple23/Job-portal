/***************************************************************************************
 * File name: jobs-controller.js
 * 
 * This file imports data from 'models' folder  and exposes 2 apis to 
 * see all jobs & create/post a new job in DB
 * Returns: all the data is returned in json format
 ***************************************************************************************/

/* eslint-disable no-underscore-dangle */

const User = require('../models').user;
const Jobs = require('../models').job;
const handle = require('../utils/promise-handler');


// GET savedjobs '/api/jobs' for a user
const getSavedJobs = async (req, res) => {

 console.log("Inside GET '/api/jobs' -> getSavedJobs");

 const [userErr, jobsData] = await handle(User.findById(req._id));

 if (userErr) {
   return res.json(500).json(userErr);
 }
 //jobsData obj will have all the job details listed 1-by-1
 return res.status(200).json(jobsData);

};


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


module.exports = {
 createNewJob,
 getSavedJobs
};