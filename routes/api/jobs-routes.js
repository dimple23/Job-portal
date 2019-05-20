
/***************************************************************************************
 * File name: jobs-routes.js
 * 
 * This file collects the other routes and provides the endpoint names
 ***************************************************************************************/

//Import express.router() functionality
const router = require('express').Router();

// Import methods we exported from jobs-controller
const { createNewJob, getSavedJobs, deleteSavedJob } = require('../../controllers/jobs-controller');

//Import authentication method 
const withAuth = require('../../middleware/authentication');


// set up withAuth as router-level middleware this will ensure that authorization will be performed before both operations getSavedJobs() & createNewJob()
router.use(withAuth);


// create GET and POST route that matches '/api/job'
router
  .route('/')
  .get(getSavedJobs)
  .post(createNewJob)
  .delete(deleteSavedJob);


//Export router
module.exports = router;
