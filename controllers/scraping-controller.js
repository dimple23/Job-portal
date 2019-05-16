/***************************************************************************************
 * File name: scraping-controller.js
 * 
 * This file scrapes job postings from dice.com and indeed.com
 * returns all the data in json format
 ***************************************************************************************/

//Import dependencies
const axios = require('axios');
const cheerio = require("cheerio");
//const request = require("request");
const handle = require('../utils/promise-handler');


const scrapedJobs = async (req, res) => {

    console.log("Inside scrapedJobs()");

    //Later this location value will be taken as user input
    let location = "New York, NY";
    location = location.replace(" ", "+");
    location = location.replace(",", "%2C");

    let jobsData = await indeedJobs(location); 
    //const [err, {jobsData}] = await indeedJobs(location); //With this i am getting only 1st object of the array

    // if (err) {
    //     return res.status(500).json(err);
    // }

    //return res.status(200).json(results);
    return res.status(200).json(jobsData);

};


// scrape indeed.com and send to front end when GET '/api/scrape' is hit
//const indeedJobs = async (req, res) => {
async function indeedJobs(location) {

    console.log("Inside indeedJobs()");

    //Later this location value will be taken as user input
    // let location = "New York, NY";
    // location = location.replace(" ", "+");
    // location = location.replace(",", "%2C");

    // Make a request via axios to grab the HTML body from www.indeed.com
    const [err, {
        data
    }] = await handle(axios.get(`https://www.indeed.com/jobs?q=full+stack+web+developer&l=${location}`));

    if (err) {
        //return res.status(500).json(err);
        return json(err);
    }

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    //var $ = cheerio.load(response.data);
    const $ = cheerio.load(data);

    //Fields required (which ever is available):
    //jobTitle, jobtype, position, salary, location, company, link, description, posted

    // An empty array to save the data that we'll scrape
    var results = [];

    var jobs = $('#resultsCol').children('.row');

    jobs.each(function (i, e) {

        let jobData = {
            jobTitle: $(e).find('.jobtitle').text().trim(),
            salary: $(e).find('div > span.salary').text().trim(),
            location: $(e).find('.location').text().trim(),
            company: $(e).find('.company, .company .turnstileLink').text().trim().replace(/\n.*/, ''),
            description: $(e).find('.summary').text().trim()
        };

        // Save these results in an object that we'll push into the results array we defined earlier
        results.push(jobData);
    });

    // Log the results once you've looped through each of the elements found with cheerio
    console.log(results);

    // returns scraped data
    // return res.status(200).json(results);
    return (results);

};



// scrape dice.com &and send to front end when GET '/api/scrape' is hit
const diceJobs = async (req, res) => {
    /*
        // Set parameters as variables
        const query = req.params.query;
        const location = req.params.location;

        // Run request to dice.com, replaces spaces with +
        request(`https://www.dice.com/jobs?q=${query.replace(" ", "+")}&l=${location.split(" ").join("+")}`,
            function (error, result, html) {
                // set array to store results
                const jobs = [];
                // Set cheerio to html result
                const $ = cheerio.load(html);

                // For each element with the specified class, look for text or
                // attribute to target and store
                $("div.serp-result-content").each(function (i, element) {
                    // results stores targeted data into an object
                    // title: targets the job title
                    // link: targets a link refrence inside an attribute, adds a header
                    // company: adds company name
                    const results = {
                        "title": $(element).find("h3").text().trim(),
                        "link": "https://www.dice.com" + $(element).find("a.loggedInVisited").attr("href"),
                        "company": $(element).find("span.compName").text()
                    };
                    // push results into array
                    jobs.push(results)
                });

                // returns scraped data
                // res.json(jobs);
                return res.status(200).json(jobs);
            }
        );
    */
};





// Exports object
module.exports = {
    // diceJobs,
    scrapedJobs
    // indeedJobs
}