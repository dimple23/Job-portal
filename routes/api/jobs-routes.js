const router = require('express').Router();

// import methods we exported from jobs-controller
const { getSavedJobs, createNewJob } = require('../../controllers/jobs-controller');


const withAuth = require('../../middleware/authentication');


// set up withAuth as router-level middleware this will ensure that authorization will be performed before both operations getSavedJobs() & createNewJob()
router.use(withAuth);

// create GET and POST route that matches '/api/bookmarks'
router
  .route('/')
  .get(getSavedJobs)
  .post(createNewJob);

module.exports = router;
