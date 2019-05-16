/**************************************************************
 * File name: scraping-controller.js
 * 
 * This file scrapes job postings from dice.com and 
 * returns all the data in json format
 ***************************************************************/
const axios = require("axios");
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
// };

// // Exports object
// module.exports = {
//     diceJobs
// }