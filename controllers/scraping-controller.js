/** *************************************************************************************
 * File name: scraping-controller.js
 * 
 * This file scrapes job postings from dice.com and indeed.com
 * returns all the data in json format
 ************************************************************************************** */


// Import dependencies
const handle = require('../utils/promise-handler');
const indeedJobsModule = require('./indeed-scrape');
const diceJobsModule = require('./dice-scrape');


const scrapedJobs = async (req, res) => {

    console.log("Inside scrapedJobs()");

    // console.log("req.params.location: " + req.params.location);

    // Get location value from query parameters
    let location = req.params.location; // "New York, NY" => default value
    location = location.replace(" ", "+");
    location = location.replace(",", "%2C");

    // An empty array to save the data that we'll scrape
    let allScrapedJobs = [];

    // Call indeed Jobs function to scrape all the jobs
    // const [indeedErr, indeedJobsData] = await handle(indeedJobs(location));
    const [indeedErr, indeedJobsData] = await handle(indeedJobsModule.indeedJobs(location));

    if (indeedErr) {
        return res.json(indeedErr);
    }

    //Call dice Jobs function to scrape all the jobs
    // const [diceErr, diceJobsData] = await handle(diceJobs(location));
    const [diceErr, diceJobsData] = await handle(diceJobsModule.diceJobs(location));

    if (diceErr) {
        return res.json(diceErr);
    }

    // Combine jobs returned from indeed Jobs and dice Jobs
    allScrapedJobs = [...indeedJobsData, ...diceJobsData];

    // console.log("--------------------------");
    // console.log(allScrapedJobs);
    // console.log("--------------------------");

    return res.status(200).json(allScrapedJobs);

};


// Exports object
module.exports = {
    scrapedJobs
}
