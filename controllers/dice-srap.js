/***************************************************************************************
 * File name: scraping-indeed-controller.js
 * 
 * This file scrapes job postings from indeed.com and 
 * returns all the data in json format
 ***************************************************************************************/

var cheerio = require("cheerio");
var axios = require("axios");

 const diceJobs = async (req, res) => {

     //Later this location value will be taken as user input
    var location = "New York, NY";
    location = location.replace(" ", "+");
    location = location.replace(",", "%2C");

     // Make a request via axios to grab the HTML body from www.indeed.com
     
    axios.get(`https://www.dice.com/jobs?q=Full+Stack+Web+Developer&l=${location}`).then(function (response) {

         // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(response.data);

         // An empty array to save the data that we'll scrape
        var results = [];
        var jobTitle = "";
        var company = "";
        var salary = "";
        var description = "";

         var jobs = $('#resultsCol').children('.row');

         jobs.each(function (i, e) {

             jobTitle = $(e).find('.jobtitle').text().trim();
            company = $(e).find('.company, .company .turnstileLink').text().trim().replace(/\n.*/, '');
            salary = $(e).find('div > span.no-wrap').text().trim();
            description = $(e).find('.summary').text().trim();


             // Save these results in an object that we'll push into the results array we defined earlier
            results.push({
                jobTitle,
                company,
                salary,
                description
            });
        });




         // Log the results once you've looped through each of the elements found with cheerio
        console.log(results);
    });

 }


 // Exports object
module.exports = {
  diceJobs
} 