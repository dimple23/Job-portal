/* **************************************************************************************
 * File name: dice-scrape.js
 * 
 * This file scrapes job postings from dice.com 
 * returns all the data in json format
 ************************************************************************************** */


// Import dependencies
const axios = require('axios');
const cheerio = require("cheerio");
const handle = require('../utils/promise-handler');


// scrape dice.com & send to front end when GET '/api/scrape' is hit
function diceJobs(location) {

    return new Promise(async (resolve, reject) => {

        console.log("Inside diceJobs()");

        // Make a request via axios to grab the HTML body from www.dice.com
        const [err, {
            data
        }] = await handle(axios.get(`https://www.dice.com/jobs?q=Full+Stack+Web+Developer&l=${location}`));

        if (err) {
            return reject(err);
        }


        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        const $ = cheerio.load(data);

        // An empty array to save the data that we'll scrape
        let allScrapedJobs = [];

        //Fields required (which ever is available):
        //jobTitle, jobtype, position, salary, location, company, link, description, posted

        const jobs = $('.complete-serp-result-div');

        jobs.each(function scrapeJob(i, e) {

            const jobData = {

                jobTitle: $(e).find('.list-inline').find('h3').find("a").find("span").text().trim(),
                company: $(e).find('li.employer span.hidden-xs a').text().trim().replace(/\n.*/, ''),
                location: $(e).find('.jobLoc').text().trim(),
                description: $(e).find('.shortdesc').find("span").text().trim("\n\t").replace(/\n.*/, ''),
                posted: $(e).find('.list-inline').find(".posted").text().trim("\n\t").replace(/\n.*/, '')
            }

            if (jobData.jobTitle.includes("(")) {
                jobData.jobTitle = jobData.jobTitle.split("(").shift().trim();
            }

            // Save these results in an object that we'll push into the results array we defined earlier
            allScrapedJobs.push(jobData);

        });

        // Log the results once you've looped through each of the elements found with cheerio
        // console.log(allScrapedJobs);

        // returns scraped data
        return resolve(allScrapedJobs);
    });

};

// Exports object
module.exports = {
    diceJobs
}