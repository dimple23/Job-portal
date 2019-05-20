
/** *************************************************************************************
 * File name: scrape-routes.js
 * 
 * This file collects the scrape routes and provides the endpoint names
 ************************************************************************************** */


// Import express.router() functionality
const router = require('express').Router();

// Import methods we exported from scraping-controller
const { scrapedJobs } = require("../../controllers/scraping-controller");

// GET route to match '/api/scrape'
router
  .route('/:location')
  .get(scrapedJobs);

module.exports = router;
