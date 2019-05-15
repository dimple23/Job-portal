
/***************************************************************************************
 * File name: scrape-routes.js
 * 
 * This file collects the scrape routes and provides the endpoint names
 ***************************************************************************************/


//Import express.router() functionality
const router = require('express').Router();

// Import methods we exported from scraping-controller
const { diceJobs } = require("../../controllers/scraping-controller");

// GET route to match '/api/scrape'
router
  .route('/')
  .get(diceJobs);


module.exports = router;
