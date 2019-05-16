/***************************************************************************************
 * File name: scraping-controller.js
 * 
 * This file scrapes job postings from dice.com and 
 * returns all the data in json format
<<<<<<< HEAD
 ***************************************************************************************/

=======
 ***************************************************************/
const axios = require("axios");
>>>>>>> ce821cd95f8b24a88d21b6422de8623e3f4538b8
const cheerio = require("cheerio");
//const request = require("request");

const diceJobs = async (req, res) => {

    var location = "New York, NY";
    location = location.replace(" ", "+");
    location = location.replace(",", "%2C");

    // Make a request via axios to grab the HTML body from www.indeed.com
    console.log(location);
    axios.get(`https://www.dice.com/jobs?q=Full+Stack+Web+Developer&l=${location}`).then(function (response) {

        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(response.data);
        console.log(response);
        // An empty array to save the data that we'll scrape
        var results = [];
        var jobTitle = "";
        var company = "";
        var jobLoc = "";
        var description = "";

        var jobs = $('.complete-serp-result-div')
        jobs.each(function (i, e) {

            jobTitle = $(e).find('.list-inline').text().trim();
            company = $(e).find('.compName').text().trim().replace(/\n.*/, '');
            jobLoc = $(e).find('.jobLoc').text().trim();
            description = $(e).find('.shortdesc').text().trim();


            // Save these results in an object that we'll push into the results array we defined earlier
            results.push({
                jobTitle,
                company,
                jobLoc,
                description
            });
        });




        // Log the results once you've looped through each of the elements found with cheerio
        console.log(results);

        res.json(results);
    });

}


// Exports object
module.exports = {
    diceJobs
}
