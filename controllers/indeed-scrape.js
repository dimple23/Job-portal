/** *************************************************************************************
 * File name: indeed-scrape.js
 * 
 * This file scrapes job postings from indeed.com
 * returns all the data in json format
 ************************************************************************************** */


// Import dependencies
const axios = require('axios');
const cheerio = require("cheerio");
const handle = require('../utils/promise-handler');


// scrape indeed.com and send to front end when GET '/api/scrape' is hit
function indeedJobs(location) {

    return new Promise(async (resolve, reject) => {

        console.log("Inside indeedJobs()");

        // Make a request via axios to grab the HTML body from www.indeed.com
        const [err, {
            data
        }] = await handle(axios.get(`https://www.indeed.com/jobs?q=full+stack+web+developer&l=${location}`));

        if (err) {
            return reject(err);
        }

        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        const $ = cheerio.load(data);

        // Fields required (which ever is available):
        // jobTitle, jobtype, position, salary, location, company, link, description, posted

        // An empty array to save the data that we'll scrape
        let allScrapedJobs = [];

        const jobs = $('#resultsCol').children('.row');
        jobs.each(function scrapeJob(i, e) {

            const jobData = {
                jobTitle: $(e).find('.jobtitle').text().trim(),
                salary: $(e).find('div > span.salary').text().trim(),
                location: $(e).find('.location').text().trim(),
                company: $(e).find('.company, .company .turnstileLink').text().trim().replace(/\n.*/, ''),
                description: $(e).find('.summary').text().trim()
            };

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
    indeedJobs
}