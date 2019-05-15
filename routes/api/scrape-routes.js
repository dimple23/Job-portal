const router = require('express').Router();

const {diceJobs} = require("../../controllers/scraping-controller");

// GET route to match '/api/scrape'
router
  .route('/')
  .get(diceJobs);

module.exports = router;
