/**************************************************************
 * File name: jobs-controller.js
 * This file imports data from 'models' folder  
 * Returns: all the data in json format
 ***************************************************************/

/* eslint-disable no-underscore-dangle */

const {
    User,
    Job
} = require('../models');

const handle = require('../utils/promise-handler');

// GET savedjobs '/api/savedjobs' for a user
const getSavedJobs = async (req, res) => {

    const [userErr, jobsData] = await handle(User.findById(req._id));

    if (userErr) {
        return res.json(500).json(userErr);
    }
    //jobsData obj will have all the job details listed 1-by-1
    return res.status(200).json(jobsData);

};


// CREATE/POST jobs for a user '/api/newjob'
const createNewJob = async (req, res) => {

  // get information about user out of req.body
  const { title, jobtype, position, location, company, description } = req.body;

    //create new job posting
    const newJob  = userProfile.job.create(req.body);
    //   const newJob = new Job({title, jobtype, position, location, company, description});
    
    console.log("User id (req._id) = " + req._id);

    //updateUserWithNewJob(newJob);

    /*
    const [userFindErr, userProfile] = await handle(User.findById(req._id));

    if (userFindErr) {
        return res.status(500).json(userFindErr);
    }

    //create new job posting
      const newJob  = userProfile.job.create(req.body);

      return User.findOneAndUpdate(
        {
          _id: req._id,
          'job.link': {
            $ne: req.body.link
          }
        },
        {
          $addToSet: { job: newjob }
        },
        {
          new: true
        }
      )
        .then(userInfo => {
          if (userInfo !== null) {
            return res.json(userInfo);
          }

          return res.json({
            message: 'you already saved this job'
          });
        })
        .catch(err => {
          console.log(err);
          return res.json(err);
        });
        */
};

module.exports = {
    createNewJob,
    getSavedJobs
};