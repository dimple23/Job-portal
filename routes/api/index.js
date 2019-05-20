/** *************************************************************************************
 * File name: index.js
 * 
 * This file collects the other routes and provides the endpoint names
 ************************************************************************************** */


const router = require('express').Router();

const userRoutes = require('./user-routes');
const jobsRoutes = require('./jobs-routes');
const scrapeRoutes = require('./scrape-routes');


// prepend endpoints
router.use('/user', userRoutes);
router.use('/jobs', jobsRoutes);
router.use('/scrape', scrapeRoutes);


module.exports = router;